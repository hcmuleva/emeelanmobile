import { Button, Card, Form, Space, Switch, Toast } from "antd-mobile";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { updateUser } from "../../../services/api";

const Settings = () => {
  const { user, setUser } = useContext(AuthContext);
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);

  const settingsData = user?.mybasicdata?.settings || {
    hidePhoneNumber: false,
    hidePhotos: false,
    hideLocation: false,
    notifications: false,
    profileVisibility: false
  };

  const handleSubmit = async () => {
    const formValues = form.getFieldsValue();
    setSaving(true);

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
      Toast.show({ icon: "success", content: "Settings saved successfully!" });
    } catch (err) {
      console.error("Failed to save settings", err);
      Toast.show({ icon: "fail", content: "Failed to save settings" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card
      style={{
        borderRadius: '8px',
        margin: '10px 0',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #eee',
        width: '100%',
        overflow: 'hidden'
      }}
      headerStyle={{ color: '#8B0000', fontWeight: 'bold' }}
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '18px' }}>⚙️ Privacy & Settings</span>
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={settingsData}
        style={{ padding: '10px 0' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: '1', maxWidth: '70%' }}>
              <div style={{ color: "#333", fontWeight: '500' }}>Hide Phone Number</div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Keep your phone number private</div>
            </div>
            <Form.Item
              name="hidePhoneNumber"
              valuePropName="checked"
              style={{ margin: 0 }}
            >
              <Switch
                style={{ '--checked-color': '#8B0000' }}
              />
            </Form.Item>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: '1', maxWidth: '70%' }}>
              <div style={{ color: "#333", fontWeight: '500' }}>Hide Photos</div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Make your photos visible only to connections</div>
            </div>
            <Form.Item
              name="hidePhotos"
              valuePropName="checked"
              style={{ margin: 0 }}
            >
              <Switch
                style={{ '--checked-color': '#8B0000' }}
              />
            </Form.Item>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: '1', maxWidth: '70%' }}>
              <div style={{ color: "#333", fontWeight: '500' }}>Hide Location</div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Keep your location private</div>
            </div>
            <Form.Item
              name="hideLocation"
              valuePropName="checked"
              style={{ margin: 0 }}
            >
              <Switch
                style={{ '--checked-color': '#8B0000' }}
              />
            </Form.Item>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: '1', maxWidth: '70%' }}>
              <div style={{ color: "#333", fontWeight: '500' }}>Notifications</div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Receive notifications for profile views and messages</div>
            </div>
            <Form.Item
              name="notifications"
              valuePropName="checked"
              style={{ margin: 0 }}
            >
              <Switch
                style={{ '--checked-color': '#8B0000' }}
              />
            </Form.Item>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: '1', maxWidth: '70%' }}>
              <div style={{ color: "#333", fontWeight: '500' }}>Profile Visibility</div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Make your profile visible to all users</div>
            </div>
            <Form.Item
              name="profileVisibility"
              valuePropName="checked"
              style={{ margin: 0 }}
            >
              <Switch
                style={{ '--checked-color': '#8B0000' }}
              />
            </Form.Item>
          </div>
        </div>

        <Button
          block
          loading={saving}
          style={{
            backgroundColor: "#8B0000",
            color: "white",
            marginTop: 24,
            borderRadius: "4px",
            border: "none"
          }}
          onClick={handleSubmit}
        >
          Save Settings
        </Button>
      </Form>
    </Card>
  );
};

export default Settings;