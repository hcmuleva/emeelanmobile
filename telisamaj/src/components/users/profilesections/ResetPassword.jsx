import { Button, Card, Form, Input, Space, Toast } from "antd-mobile";
import { EyeInvisibleOutline, EyeOutline } from "antd-mobile-icons";
import React, { useState } from "react";
import { resetpassword } from "../../../services/api";

export default function ResetPassword({ userId }) {
  const [form] = Form.useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (values) => {
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

      Toast.show({
        icon: "success",
        content: "Password reset successfully!",
        position: "bottom",
        duration: 2000,
      });
    } catch (error) {
      console.error("Password reset error:", error);
      Toast.show({
        icon: "fail",
        content: "An error occurred during password reset",
        position: "bottom",
        duration: 4000,
      });
    }
  };

  return (
    <Card
      style={{
        borderRadius: "8px",
        margin: "10px 0",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        border: "1px solid #eee",
      }}
      headerStyle={{ color: "#8B0000", fontWeight: "bold" }}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#8B0000",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
            }}
          >
            🔐
          </div>
          <span style={{ fontSize: "18px" }}>Reset Password</span>
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ padding: "10px 0" }}
      >
        <Form.Item
          name="password"
          label="New Password"
          rules={[
            { required: true, message: "Please enter new password" },
            { min: 6, message: "Password must be at least 6 characters" },
          ]}
        >
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            clearable
            style={{
              border: "1px solid #ddd",
              borderRadius: "4px",
              "--placeholder-color": "#888",
            }}
            suffix={
              <div
                onClick={() => setShowPassword(!showPassword)}
                style={{ color: "#8B0000" }}
              >
                {showPassword ? <EyeOutline /> : <EyeInvisibleOutline />}
              </div>
            }
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
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
            placeholder="Confirm your password"
            clearable
            style={{
              border: "1px solid #ddd",
              borderRadius: "4px",
              "--placeholder-color": "#888",
            }}
            suffix={
              <div
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ color: "#8B0000" }}
              >
                {showConfirmPassword ? <EyeOutline /> : <EyeInvisibleOutline />}
              </div>
            }
          />
        </Form.Item>

        <Button
          block
          style={{
            backgroundColor: "#8B0000",
            color: "white",
            marginTop: 15,
            borderRadius: "4px",
            border: "none",
            height: "40px",
            fontWeight: "500",
          }}
          type="submit"
        >
          Save Password
        </Button>
      </Form>
    </Card>
  );
}
