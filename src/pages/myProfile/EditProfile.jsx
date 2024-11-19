import React, { useState } from "react";
import { Card, Avatar, Button, Form, Input, Tabs, Typography, Space, notification } from "antd";
import { EditOutlined, SettingOutlined } from "@ant-design/icons";
import { useUpdate } from "@refinedev/core";

const API_URL = import.meta.env.VITE_SERVER_URL;

const { TabPane } = Tabs;
const { Text } = Typography;

export default function EditProfile({ user }) {


const { mutate: updateUser } = useUpdate();

  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState("1");

  // User data
  const userInfo = {
    avatar: "https://joeschmoe.io/api/v1/random", // Example avatar URL
    name: "Harish",
    FatherName: "Bhikaji Muleva",
    age: 28,
    MotherName: "Zumabai",
    FatherName: "Bhikaji",
    Gotra: "Muleva",
    NanajiName: "Amaraji",
    MaternalGotra: "Rathor",
    job: "Software Engineer",
    location: "Bangalore, Karnataka",
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };
  const onFinish = async (values) => {

    try {
        // Map uploaded media values
        
        // Update the user resource
        await updateUser(
          {
            resource: "users",
            id: user.id,
            values: values,
          },
          {
            onSuccess: () => {
              notification.success({
                message: "Success",
                description: "आपकी प्रोफाइल अपडेट हो गयी है(Your profile successfully updated)",
              });
              form.resetFields();
            },
          }
        );
      } catch (error) {
        notification.error({
          message: "Error",
          description: "आपकी प्रोफाइल अपडेट में कुछ त्रुटि है(There was an issue with the upload process.)",
        });
      }
  };

  return (
    <Card style={{ width: 600 }} bodyStyle={{ padding: 16 }}>
      {/* Upper Section */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <Avatar src={userInfo.avatar} size={64} />
        <div style={{ flex: 1, marginLeft: 16 }}>
          <Space direction="vertical">
            <div>
              <Text strong style={{ fontSize: 18 }}>{userInfo.name}</Text>
              <br />
              <Text type="secondary" style={{ marginLeft: 8 }}>
                ({userInfo.age} years old)
              </Text>
            </div>
            <Space>
              <Button icon={<EditOutlined />} type="link">
                Edit
              </Button>
              <Button icon={<SettingOutlined />} type="link">
                Settings
              </Button>
            </Space>
          </Space>
        </div>
      </div>

      {/* Form with Tabs */}
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={userInfo} // Set initial form values
        layout="vertical"
      >
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          <TabPane tab="Info" key="1">
            <div style={{ display: "flex" }}>
              {/* Column 1 */}
              
              {/* Column 2 */}
              <div style={{ width: "70%" }}>
                <Space direction="vertical" size="small">
                  <Form.Item name="MotherName" label="माताजी">
                    <Input placeholder="Enter mother's name" />
                  </Form.Item>
                  <Form.Item name="FatherName" label="पिताजी">
                    <Input placeholder="Enter father's name" />
                  </Form.Item>
                  <Form.Item name="Gotra" label="गोत्र">
                    <Input placeholder="Enter Gotra" />
                  </Form.Item>
                  <Form.Item name="NanajiName" label="नानाजी">
                    <Input placeholder="Enter Nanaji's name" />
                  </Form.Item>
                  <Form.Item name="MaternalGotra" label="नानाजी गोत्र">
                    <Input placeholder="Enter maternal Gotra" />
                  </Form.Item>
                </Space>
              </div>
            </div>
          </TabPane>
          <TabPane tab="Family" key="2">
            <Form.Item name="Profession" label="Job">
              <Input placeholder="Enter job title" />
            </Form.Item>
            <Form.Item name="home_address" label="Current Location">
              <Input placeholder="Enter current location" />
            </Form.Item>
          </TabPane>
          <TabPane tab="About Me" key="3">
            <Form.Item name="AboutMe" label="AboutMe">
              <Input.TextArea placeholder="Describe yourself" rows={4} />
            </Form.Item>
          </TabPane>
          <TabPane tab="PreDescription" key="4">
            <Form.Item name="PreDescription" label="Looking For">
              <Input.TextArea placeholder="What are you looking for?" rows={4} />
            </Form.Item>
          </TabPane>
        </Tabs>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginTop: 16 }}>
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
