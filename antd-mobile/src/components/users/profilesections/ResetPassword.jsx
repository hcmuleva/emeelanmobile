import { Button, Form, Input, Toast, Space } from "antd-mobile";
import { EyeInvisibleOutline, EyeOutline } from "antd-mobile-icons";
import React, { useState } from "react";
import { resetpassword } from "../../../services/api";

export default function ResetPassword({ userId }) {
  const [form] = Form.useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (values) => {
    console.log("Submit Clicked");
    try {
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

      await resetpassword(userId, values.password);

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
    <div
      style={{
        padding: 16,
        minHeight: "100%",
        background: "linear-gradient(135deg, #e0f7fa, #c1d5ff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "15px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 600,
          padding: 24,
          borderRadius: 20,
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <h2 style={{ fontSize: 22, fontWeight: 600, color: "#003366" }}>
          Reset Password
        </h2>

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
              style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
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
              style={{ backgroundColor: "transparent", border: "1px solid #ccc" }}
              suffix={
                <div onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <EyeOutline /> : <EyeInvisibleOutline />}
                </div>
              }
            />
          </Form.Item>

          <Space block style={{ marginTop: 24 }}>
            <Button
              block
              color="primary"
              style={{ backgroundColor: "#004080", color: "#fff" }}
              type="submit"
            >
              Save Password
            </Button>
          </Space>
        </Form>
      </div>
    </div>
  );
}