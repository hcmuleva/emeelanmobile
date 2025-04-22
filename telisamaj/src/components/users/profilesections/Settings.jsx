import React, { useContext, useEffect } from "react";
import { Card, Switch, Form, Input, Button, Toast, List } from "antd-mobile";
import { CheckOutline, CloseOutline } from "antd-mobile-icons";
import { AuthContext } from "../../../context/AuthContext";
import { updateUserData } from "../../../services/api";

export default function Settings() {
  const { user, setUser, jwt } = useContext(AuthContext);
  const [form] = Form.useForm();

  const settingsData = user?.mybasicdata?.settings || {
    hidePhoneNumber: false,
    hidePhotos: false,
    hideLocation: false,
    notifications: false,
  };

  //   useEffect(() => {
  //     form.setFieldsValue(settingsData);
  //   }, [form, settingsData]);

  const handleSubmit = async () => {
    const formValues = form.getFieldsValue();
    console.log("Setting values:", settingsData);
    console.log("Current form values:", form.getFieldsValue());
    const updatedUser = {
      ...user,
      mybasicdata: {
        ...user.mybasicdata,
        settings: formValues,
      },
    };

    try {
      await updateUserData({ mybasicdata: updatedUser.mybasicdata }, user.id);

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      Toast.show({ icon: "success", content: "settings updated!" });
    } catch (err) {
      console.error("Failed to save settings", err);
      Toast.show({ icon: "fail", content: "Failed to save settings" });
    }
  };

  return (
    <div style={{ padding: "10px" }}>
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

        <Button
          style={{ backgroundColor: "#004080", color: "white", marginTop: 16 }}
          block
          onClick={handleSubmit}
        >
          Save settings
        </Button>
      </Form>
    </div>
  );
}
