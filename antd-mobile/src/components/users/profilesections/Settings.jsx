import React, { useContext, useEffect } from "react";
import { Card, Switch, Form, Input, Button, Toast,List } from "antd-mobile";
import { CheckOutline, CloseOutline } from "antd-mobile-icons";
import { AuthContext } from "../../../context/AuthContext";
import { updateUserData } from "../../../services/api";

export default function Settings() {
  const { user, setUser, jwt } = useContext(AuthContext);
  const [form] = Form.useForm();

  const preferencesData = user?.mybasicdata?.preferences || {
    hidePhoneNumber: false,
    hidePhotos: false,
    hideLocation: false,
    notifications: false,
    language: "",
    theme: ""
  };

  useEffect(() => {
    form.setFieldsValue(preferencesData);
  }, [form, preferencesData]);

  const handleSubmit = async () => {
    const formValues = form.getFieldsValue();

    const updatedUser = {
      ...user,
      mybasicdata: {
        ...user.mybasicdata,
        preferences: formValues,
      },
    };

    try {
      await updateUserData(
        { mybasicdata: updatedUser.mybasicdata },
        jwt,
        user.id
      );
      setUser(updatedUser);
      Toast.show({ icon: "success", content: "Preferences updated!" });
    } catch (err) {
      console.error("Failed to save preferences", err);
      Toast.show({ icon: "fail", content: "Failed to save preferences" });
    }
  };

  return (
    <div>
      <Card>
        <Form
          form={form}
          layout="horizontal"
          initialValues={preferencesData}
          footer={
            <Button block color="primary" size="large" onClick={handleSubmit}>
              Save Preferences
            </Button>
          }
        >
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

          <Form.Item name="language" label="Language">
            <Input placeholder="e.g. English, Hindi" />
          </Form.Item>

          <Form.Item name="theme" label="Theme">
            <Input placeholder="e.g. Light, Dark" />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
