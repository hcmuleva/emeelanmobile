import React, { useContext, useState } from "react";
import { Form, Input, TextArea, Button, Toast } from "antd-mobile";
import { AuthContext } from "../../../context/AuthContext";
import { updateUserData } from "../../../services/api";

const About = () => {
  const { user, setUser, jwt, setProfileUpdated } = useContext(AuthContext);
  const [form] = Form.useForm();

  const aboutmeData = user?.mybasicdata?.aboutme || {
    about: "",
    height: "",
    hobby: "",
    color: "",
  };

  const handleSave = async () => {
    const values = form.getFieldsValue();

    const updatedUser = {
      ...user,
      mybasicdata: {
        ...user.mybasicdata,
        aboutme: values,
      },
    };

    try {
      await updateUserData({ mybasicdata: updatedUser.mybasicdata }, user.id);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser)); // ✅ Sync localStorage
      setProfileUpdated(true)
      Toast.show({ icon: "success", content: "About Me updated!" });
    } catch (err) {
      console.error("Failed to save About Me", err);
      Toast.show({ icon: "fail", content: "Failed to save About Me" });
    }
  };

  return (
    <div>
      <Form
        form={form}
        initialValues={aboutmeData}
        layout="horizontal"
        
        footer={
          <Button  block color="primary" onClick={handleSave}>
            Save
          </Button>
        }
      >
        <Form.Item name="about" label="About Me">
          <TextArea
            placeholder="Write about yourself..."
            rows={5}
            maxLength={500}
            showCount
          />
        </Form.Item>

        <Form.Item name="height" label="Height">
        <Input placeholder="e.g. 5'6&quot;" />
        </Form.Item>

        <Form.Item name="hobby" label="Hobbies">
          <Input placeholder="e.g. Reading, Painting, Cycling" />
        </Form.Item>

        <Form.Item name="color" label="Color">
          <Input placeholder="e.g. Fair, Wheatish, Dark, etc." />
        </Form.Item>
      </Form>
    </div>
  );
};

export default About;
