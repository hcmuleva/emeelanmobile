import React, { useContext, useState } from "react";
import { Form, Input, TextArea, Button, Toast, Space } from "antd-mobile";
import { AuthContext } from "../../../context/AuthContext";
import { updateUserData } from "../../../services/api";

const About = () => {
  const { user, setUser } = useContext(AuthContext);
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);

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
      localStorage.setItem("user", JSON.stringify(updatedUser));
      Toast.show({ icon: "success", content: "About Me updated!" });
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to save About Me", err);
      Toast.show({ icon: "fail", content: "Failed to save About Me" });
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
        borderRadius: "15px"
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
        {isEditing ? (
          <Form
            form={form}
            initialValues={aboutmeData}
            layout="horizontal"
            footer={
              <Space block style={{ marginTop: 24 }}>
                <Button
                  block
                  color="default"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button
                  block
                  color="primary"
                  onClick={handleSave}
                  style={{ backgroundColor: "#004080", color: "#fff" }}
                >
                  Save
                </Button>
              </Space>
            }
          >
            <h2 style={{ fontSize: 22, fontWeight: 600, color: "#003366" }}>
              Edit About Me
            </h2>

            <Form.Item name="about" label="About Me">
              <TextArea
                rows={5}
                maxLength={500}
                showCount
                placeholder="Write about yourself..."
              />
            </Form.Item>

            <Form.Item name="height" label="Height">
              <Input placeholder="e.g. 5'6&quot;" />
            </Form.Item>

            <Form.Item name="hobby" label="Hobbies">
              <Input placeholder="e.g. Reading, Painting, Cycling" />
            </Form.Item>

            <Form.Item name="color" label="Skin Tone">
              <Input placeholder="e.g. Fair, Wheatish, Dark" />
            </Form.Item>
          </Form>
        ) : (
          <>
            <h2 style={{ fontSize: 22, fontWeight: 600, color: "#003366" }}>
              About Me
            </h2>
            <div style={{ fontSize: 16, margin: "12px 0" }}>
              <b>Bio:</b> {aboutmeData.about || "Not provided"}
            </div>
            <div style={{ fontSize: 16, marginBottom: 8 }}>
              <b>Height:</b> {aboutmeData.height || "Not specified"}
            </div>
            <div style={{ fontSize: 16, marginBottom: 8 }}>
              <b>Hobbies:</b> {aboutmeData.hobby || "Not specified"}
            </div>
            <div style={{ fontSize: 16, marginBottom: 20 }}>
              <b>Skin Tone:</b> {aboutmeData.color || "Not specified"}
            </div>
            <Button
              block
              color="primary"
              onClick={() => setIsEditing(true)}
              style={{ backgroundColor: "#004080", color: "#fff" }}
            >
              Edit Info
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default About;
