import { Button, Form, Input, Toast } from "antd-mobile";
import { EyeInvisibleOutline, EyeOutline } from "antd-mobile-icons";
import React, { useState } from "react";
import { resetpassword } from "../../../services/api";

export default function ResetPassword({userId}) {
  const [form] = Form.useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (values) => {
    console.log("Submit Clicked");
    try {
      // Get user from localStorage
      //const userId = user?.id ?? null;z

      if (!userId) {
        Toast.show({
          content: "Password reset cannot be completed. You are not logged in!",
          position: "bottom",
          duration: 4000,
        });
        return;
      }
      if (values.password !== values.confirmPassword) {
        Toast.show({
          content: "Passwords do not match!",
          position: "bottom",
          duration: 4000,
        });
        return;
      }

      await resetpassword(userId, values.password); // Make sure to use values.password

      console.log("New Password:", values.password);
      Toast.show({
        content: "Password reset successfully!",
        position: "bottom",
        duration: 2000,
      });
    } catch (error) {
      console.error("Password reset error:", error);
      Toast.show({
        content: "An error occurred during password reset",
        position: "bottom",
        duration: 4000,
      });
    }
  };

  return (
    <>
      <Form form={form} layout="horizontal" onFinish={handleSubmit}>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please enter new password" },
            { min: 6, message: "Password must be at least 6 characters" },
          ]}
        >
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            clearable
            suffix={
              <div onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOutline /> : <EyeInvisibleOutline />}
              </div>
            }
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          rules={[
            { required: true, message: "Please confirm password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            clearable
            suffix={
              <div onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <EyeOutline /> : <EyeInvisibleOutline />}
              </div>
            }
          />
        </Form.Item>
        <Button style={{ margin: "10px" }} type="submit" color="primary">
          Save Password
        </Button>
      </Form>
    </>
  );
}
