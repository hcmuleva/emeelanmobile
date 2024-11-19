import React, { useState } from "react";
import { Card, Avatar, Button, Tabs, Space, Typography } from "antd";
import { EditOutlined, SettingOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;
const { Text } = Typography;

const ProfileCard = () => {
  const [activeTab, setActiveTab] = useState("1");

  // User data
  const userInfo = {
    avatar: "https://joeschmoe.io/api/v1/random", // Example avatar URL
    name: "Harish",
    FatherName:"Bhikaji Muleva",
    age: 28,
    motherName: "Jane Doe",
    fatherName: "Richard Roe",
    job: "Software Engineer",
    location: "San Francisco, CA",
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <Card
      style={{ width: 300 }}
      bodyStyle={{ padding: 10 }}
    >
      {/* Upper Section */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <Avatar src={userInfo.avatar} size={64} />
        <div style={{ flex: 1, marginLeft: 16 }}>
          <Space direction="vertical">
            <div>
              <Text strong style={{ fontSize: 18 }}>{userInfo.name}</Text>
              {userInfo?.FatherName&&<Text strong style={{ fontSize: 18 }}>{' '}{userInfo.FatherName}</Text>}
              <br/>
              <Text type="secondary" style={{ marginLeft: 8 }}>({userInfo.age} years old)</Text>
            </div>
            <Space>
              <Button icon={<EditOutlined />} type="link">Edit</Button>
              <Button icon={<SettingOutlined />} type="link">Settings</Button>
            </Space>
          </Space>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Info" key="1">
        <div style={{ display: "flex" }}>
            {/* Column 1 */}
            <div style={{ width: "30%", fontWeight: "bold" }}>
              <Space direction="vertical" size="small">
                <Text>माताजी:</Text>
                <Text>पिताजी:</Text>
                <Text>गोत्र:</Text>
                <Text>नानाजी:</Text>
                <Text>नानाजी गोत्र:</Text>
              </Space>
            </div>
            {/* Column 2 */}
            <div style={{ width: "70%" }}>
              <Space direction="vertical" size="small">
                <Text>{userInfo?.MotherName}</Text>
                <Text>{userInfo?.FatherName}</Text>
                <Text>{userInfo?.Gotra}</Text>
                <Text>{userInfo?.NanajiName}</Text>
                <Text>{userInfo?.MaternalGotra}</Text>
              </Space>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Family" key="2">
          
        <div style={{ display: "flex" }}>
            {/* Column 1 */}
            <div style={{ width: "35%", fontWeight: "bold" }}>
              <Space direction="vertical" size="small">
                <Text>माताजी:</Text>
                <Text>पिताजी:</Text>
                <Text>गोत्र:</Text>
                <Text>नानाजी:</Text>
                <Text>नानाजी गोत्र:</Text>
              </Space>
            </div>
            {/* Column 2 */}
            <div style={{ width: "65%" }}>
              <Space direction="vertical" size="small">
                <Text>{userInfo?.MotherName}</Text>
                <Text>{userInfo?.FatherName}</Text>
                <Text>{userInfo?.Gotra}</Text>
                <Text>{userInfo?.NanajiName}</Text>
                <Text>{userInfo?.MaternalGotra}</Text>
              </Space>
            </div>
          </div>
        </TabPane>
        <TabPane tab="AboutMe" key="3">
          <p>Settings content goes here...</p>
        </TabPane>
        <TabPane tab="LookingFor" key="4">
          <p>More information content goes here...</p>
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default ProfileCard;
