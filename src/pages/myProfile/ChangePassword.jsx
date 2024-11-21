import React from "react";
import { Form, Input, Button, notification } from "antd";
import axios from "axios";
import { useForm } from "@refinedev/core";
const API_URL = import.meta.env.VITE_SERVER_URL;
export const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;
const ChangePassword = () => {
  const { formProps, saveButtonProps } = useForm({
    redirect: false, // Prevent automatic redirection
  });

  const handleFinish = async (values) => {
    const { currentPassword, newPassword, confirmNewPassword } = values;

    const token = localStorage.getItem(TOKEN_KEY); // Replace TOKEN_KEY with your actual key
    if (!token) {
        notification.error({
          message: "Error",
          description: "No token found. Please log in again.",
        });
        return null;
      }
    
    try {
      // Make a request to the Strapi reset password endpoint
      const response = await axios.post(`${API_URL}/api/auth/change-password`, {
        currentPassword,
        password: newPassword, // new password
        passwordConfirmation: confirmNewPassword, // confirm new password
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in request headers
        },
      }
      
      );

      if (response.status === 200) {
        notification.success({
          message: "Success",
          description: "Your password has been successfully reset.",
        });
      } else {
        throw new Error("Failed to reset password");
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description:
          error.response?.data?.message || "Your current password is wrong.",
      });
    }
  };

  return (
    <Form {...formProps} onFinish={handleFinish} layout="vertical">
     
     <Form.Item
        name="currentPassword"
        label="Current Password"
        rules={[{ required: true, message: "Please input your current password!" }]}
      >
        <Input.Password placeholder="Enter your current password" />
      </Form.Item>

      <Form.Item
        name="newPassword"
        label="New Password"
        rules={[{ required: true, message: "Please input your new password!" }]}
      >
        <Input.Password placeholder="Enter your new password" />
      </Form.Item>

      <Form.Item
        name="confirmNewPassword"
        label="Confirm New Password"
        dependencies={['newPassword']}
        rules={[
          { required: true, message: "Please confirm your new password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('newPassword') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords do not match!'));
            },
          }),
        ]}
      >
        <Input.Password placeholder="Confirm your new password" />
      </Form.Item>

      <Form.Item>
        <Button {...saveButtonProps} type="primary" htmlType="submit">
          Change Password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangePassword;