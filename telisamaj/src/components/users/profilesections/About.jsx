import { Button, Card, Form, Input, Space, TextArea, Toast } from "antd-mobile";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { updateUser } from "../../../services/api";

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
      await updateUser({ mybasicdata: updatedUser.mybasicdata }, user.id);
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
          <span style={{ fontSize: "18px" }}>👤 About Me</span>
        </div>
      }
    >
      {isEditing ? (
        <Form
          form={form}
          initialValues={aboutmeData}
          layout="vertical"
          style={{ padding: "10px 0" }}
        >
          <Form.Item name="about" label="About Me">
            <TextArea
              rows={5}
              maxLength={500}
              showCount
              placeholder="Write about yourself..."
              style={{
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            />
          </Form.Item>

          <Form.Item
            name="height"
            label="Height"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Input
              placeholder="e.g. 5'6"
              style={{
                border: "1px solid #ddd",
                solid: "#ddd",
                borderRadius: "4px",
                padding: "10px",
              }}
            />
          </Form.Item>

          <Form.Item
            name="hobby"
            label="Hobbies"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Input
              placeholder="e.g. Reading, Painting, Cycling"
              style={{
                border: "1px solid #ddd",
                borderRadius: "4px",
                padding: "10px",
              }}
            />
          </Form.Item>

          <Form.Item
            name="color"
            label="Skin Tone"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Input
              placeholder="e.g. Fair, Wheatish, Dark"
              style={{
                border: "1px solid #ddd",
                borderRadius: "4px",
                padding: "10px",
              }}
            />
          </Form.Item>

          <Space block style={{ marginTop: 15 }}>
            <Button
              style={{
                backgroundColor: "#888",
                color: "white",
                borderRadius: "4px",
                border: "none",
                flex: 1,
              }}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button
              style={{
                backgroundColor: "#8B0000",
                color: "white",
                borderRadius: "4px",
                border: "none",
                flex: 1,
              }}
              onClick={handleSave}
            >
              Save
            </Button>
          </Space>
        </Form>
      ) : (
        <div style={{ padding: "10px 0" }}>
          <div
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              borderRadius: "8px",
              padding: "15px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
              border: "1px solid #eee",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}
            >
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
                👤
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#8B0000",
                    marginBottom: "8px",
                  }}
                >
                  Personal Information
                </div>

                <div style={{ fontSize: 14, marginBottom: 8 }}>
                  <strong>Bio:</strong> {aboutmeData.about || "Not provided"}
                </div>
                <div style={{ fontSize: 14, marginBottom: 8 }}>
                  <strong>Height:</strong>{" "}
                  {aboutmeData.height || "Not specified"}
                </div>
                <div style={{ fontSize: 14, marginBottom: 8 }}>
                  <strong>Hobbies:</strong>{" "}
                  {aboutmeData.hobby || "Not specified"}
                </div>
                <div style={{ fontSize: 14, marginBottom: 8 }}>
                  <strong>Skin Tone:</strong>{" "}
                  {aboutmeData.color || "Not specified"}
                </div>
              </div>
            </div>
          </div>

          <Button
            block
            style={{
              backgroundColor: "#8B0000",
              color: "white",
              marginTop: 15,
              borderRadius: "4px",
              border: "none",
            }}
            onClick={() => setIsEditing(true)}
          >
            Edit Info
          </Button>
        </div>
      )}
    </Card>
  );
};

export default About;
