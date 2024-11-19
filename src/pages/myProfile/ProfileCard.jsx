import React, { useState } from "react";
import { Card, Avatar, Button, Tabs,Form, Space,Upload, Typography, notification } from "antd";
import { EditOutlined, SettingOutlined } from "@ant-design/icons";
import { CameraOutlined } from '@ant-design/icons';
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";
import { useUpdate } from "@refinedev/core";

const { TabPane } = Tabs;
const { Text } = Typography;
const API_URL = import.meta.env.VITE_SERVER_URL;

const ProfileCard = ({user}) => {
  const [activeTab, setActiveTab] = useState("1");
  const [form] = Form.useForm();
  const { mutate: updateUser } = useUpdate();


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
  const onFinish = async (values) => {
    try {
      const { profilePicture } = values;

      const profilePicture_id = profilePicture?.file?.response
      console.log("prof id",profilePicture_id[0].id)
      const payload={profilePicture:parseInt(profilePicture_id[0].id)}
      console.log("Payload",payload )
      await updateUser(
        {
          resource: "users",
          id: user.id,
          values: payload
        },
        {
          onSuccess: () => {
            notification.success({
              message: "Success",
              description: "Your images have been successfully uploaded.",
            });
            form.resetFields();
          },
        }
      );
    } catch (error) {
      console.log("Error",error)
      notification.error({
        message: "Error",
        description: "There was an issue with the upload process.",
      });
    }
  };
  console.log(" user.profilePicture",user.formats)
  return (
    <Card
      style={{ width: 300 }}
      bodyStyle={{ padding: 10 }}
    >
      {/* Upper Section */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        {user?.profilePicture?<Avatar src={user?.profilePicture?.formats?.thumbnail?.url} size={64} />:
        
         <Form
         form={form}
         layout="vertical"
         onFinish={onFinish}
         initialValues={{}}
         style={{ maxWidth: "800px", margin: "0 auto" }}
       >
         {/* Upload Field */}
         <Form.Item
           name="profilePicture"
           valuePropName="fileList"
           getValueProps={(data) => getValueProps(data, API_URL)}
           
           extra={`profile picture`}
         >
            <Upload.Dragger
             style={{}}
             name="files"
             action={API_URL + `/api/upload`}
             listType="picture-card"
             headers={{
                 Authorization: `Bearer ${localStorage.getItem(
                   "jwt-token"
                 )}`,
               }}
           >
             <Button><CameraOutlined/></Button>
           </Upload.Dragger>
         </Form.Item>
         <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Save
          </Button>
          </Form.Item>
         </Form>
        }
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
