import React, { useState } from "react";
import { Modal, Form, Input, Button, notification } from "antd";
const API_URL = import.meta.env.VITE_SERVER_URL;

const ResetPassword = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleResetPassword = async (values) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: parseInt(id, 10), newPassword: values.newPassword }),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw { response: { data: { error: errorData.error || "Failed to reset password" } } };
      }
      
      const data = await res.json();
      
      notification.success({
        message: "Success",
        description: data.message || "Password reset successfully!",
      });
  
      form.resetFields();
     
    } catch (error) {
      console.error("Failed to reset password:", error);
      notification.error({
        message: "Error",
        description: error.response?.data?.error || "Failed to reset password!",
      });
    }
    setLoading(false);
  };
  return (
  
      <Form form={form} layout="vertical" onFinish={handleResetPassword}>
        <Form.Item
          label="User ID"
          name="userId"
          rules={[{ required: true, message: "Please enter User ID" }]}
        >
          <Input placeholder="Enter User ID" />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[{ required: true, message: "Please enter new password" }]}
        >
          <Input.Password placeholder="Enter New Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Reset Password
          </Button>
        </Form.Item>
      </Form>
   
  );
};

export default ResetPassword;
