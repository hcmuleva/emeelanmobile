import { Button, Form, Space, Switch, Toast } from "antd-mobile";
import { CheckOutline, CloseOutline } from "antd-mobile-icons";
import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { updateUser } from "../../../services/api";

export default function Settings() {
  const { user, setUser } = useContext(AuthContext);
  const [form] = Form.useForm();

  const settingsData = user?.mybasicdata?.settings || {
    hidePhoneNumber: false,
    hidePhotos: false,
    hideLocation: false,
    notifications: false,
  };

  const handleSubmit = async () => {
    const formValues = form.getFieldsValue();
    const updatedUser = {
      ...user,
      mybasicdata: {
        ...user.mybasicdata,
        settings: formValues,
      },
    };

    try {
      await updateUser({ mybasicdata: updatedUser.mybasicdata }, user.id);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      Toast.show({ icon: "success", content: "Settings updated!" });
    } catch (err) {
      console.error("Failed to save settings", err);
      Toast.show({ icon: "fail", content: "Failed to save settings" });
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
          Settings
        </h2>

        <Form form={form} layout="horizontal" initialValues={settingsData}>
          <Form.Item
            name="hidePhoneNumber"
            label="Hide Phone Number"
            valuePropName="checked"
          >
            <Switch
              checkedText={<CheckOutline />}
              uncheckedText={<CloseOutline />}
            />
          </Form.Item>

          <Form.Item
            name="hidePhotos"
            label="Hide Photos"
            valuePropName="checked"
          >
            <Switch
              checkedText={<CheckOutline />}
              uncheckedText={<CloseOutline />}
            />
          </Form.Item>

          <Form.Item
            name="hideLocation"
            label="Hide Location"
            valuePropName="checked"
          >
            <Switch
              checkedText={<CheckOutline />}
              uncheckedText={<CloseOutline />}
            />
          </Form.Item>

          <Form.Item
            name="notifications"
            label="Notifications"
            valuePropName="checked"
          >
            <Switch
              checkedText={<CheckOutline />}
              uncheckedText={<CloseOutline />}
            />
          </Form.Item>

          <Space block style={{ marginTop: 24 }}>
            <Button
              block
              color="primary"
              style={{ backgroundColor: "#004080", color: "#fff" }}
              onClick={handleSubmit}
            >
              Save Settings
            </Button>
          </Space>
        </Form>
      </div>
    </div>
  );
}
