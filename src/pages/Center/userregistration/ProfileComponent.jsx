

import { ArrowLeftOutlined, EditOutlined, LogoutOutlined, UploadOutlined } from "@ant-design/icons";
import { Avatar, Button, DatePicker, Descriptions, Form, Input,Upload, Select,Layout, message, Space, Tabs, theme, Typography } from "antd";
import React, { useState } from "react";
import FamilyForm from "./family/FamilyForm";
import gotra from "../../../utils/gotra.json";
import ProfessionForm from "./profession/ProfessionForm";
import AboutMe from "./aboutme/AboutMe";
import LookingFor from "./lookingfor/LookingFor";
const { Title, Text } = Typography
const { Content } = Layout


const users= [
  { name: "Isaiah", avatar: "/placeholder.svg?height=80&width=80" },
  { name: "Jayden", avatar: "/placeholder.svg?height=80&width=80" },
  { name: "Hunter", avatar: "/placeholder.svg?height=80&width=80" },
  { name: "Ethel", avatar: "/placeholder.svg?height=80&width=80" },
  { name: "Kate", avatar: "/placeholder.svg?height=80&width=80" },
  { name: "Michael", avatar: "/placeholder.svg?height=80&width=80" },
  { name: "Sarah", avatar: "/placeholder.svg?height=80&width=80" },
]

export default function ProfileComponent({userid}) {
  
   
      
  const { token } = theme.useToken()
  const [activeTab, setActiveTab] = useState("1")

  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [submittedData, setSubmittedData] = useState(null);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [aboutMItems,setAboutmeItems] = useState(null);
  const [lookingForItems,setLookingForItems] = useState(null);
    const handleUpload = ({ fileList }) => setFileList(fileList);
  
  const handleSubmit = (values) => {
    console.log(values);
    console.log("familyMembers",familyMembers);
    // const formData = { ...values, profileImages: fileList.map(file => file.name) };
    // setSubmittedData(formData);
    message.success("Registration Successful!");
  };
  const containerStyle = {
    maxWidth: "480px",
    margin: "0 auto",
    background: token.colorBgLayout,
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  }

  const headerStyle = {
    padding: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: token.colorBgContainer,
  }

  const profileStyle = {
    display: "flex",
    alignItems: "center",
    padding: "0 24px 24px",
    background: token.colorBgContainer,
  }

  const sectionStyle = {
    padding: "16px",
    background: token.colorBgContainer,
    marginTop: "8px",
  }

  const scrollContainerStyle = {
    display: "flex",
    overflowX: "auto",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    padding: "0 30px",
  }

  const userItemStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 10px",
    minWidth: "70px",
  }

  const navButtonStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 1,
  }

  const tabsContainerStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    marginTop: "8px",
  }

  const tabContentStyle = {
    flex: 1,
    padding: "16px",
    background: "#f0f8ff",
  }

  const logoutContainerStyle = {
    padding: "16px",
    textAlign: "center",
    background: token.colorBgContainer,
  }
  const onChange = (key) => {
    console.log(key);
  };
  
  const [mainImage, setMainImage] = useState("/placeholder.svg?height=100&width=100");

  const thumbnails = [
    "/placeholder.svg?height=100&width=100",
    "/placeholder.svg?height=100&width=100&1",
    "/placeholder.svg?height=100&width=100&2",
    "/placeholder.svg?height=100&width=100&3"
  ];
  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
    <Tabs activeKey={activeTab} onChange={setActiveTab} centered>

      <Tabs.TabPane tab="Personal" key="1">
     
            {/* File Upload Section */}
    <Form.Item label="Upload Profile Pictures">
      <Upload multiple fileList={fileList} onChange={handleUpload} beforeUpload={() => false}>
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
    </Form.Item>
    <Form.Item name="username" label="UserId"> 
          <Input placeholder="Enter UserId" />
        </Form.Item>
        <Form.Item name="email" label="Email Id"> 
          <Input type="email" placeholder="Enter Email Id" />
        </Form.Item>
        <Form.Item name="password" label="Password" > 
          <Input type="password" placeholder="Enter min 6 character password" />
        </Form.Item>
        <Form.Item name="MobileNumber" label="Mobile Number" rules={[{ required: true, message: 'Please enter your or your parent mobile number' }]}>
                  <Input placeholder="Enter your/parent Mobile Number" />
                </Form.Item>
        <Form.Item name="FirstName" label="Name" rules={[{ required: true, message: "Enter your Name" }]}> 
            <Input placeholder="Enter your full name" />
          </Form.Item>
          <Form.Item name="Father" label="FatherName" rules={[{ required: true, message: "Enter your father name" }]}> 
            <Input placeholder="Enter your full name" />
          </Form.Item>
          <Form.Item name="dob" label="Date of Birth" rules={[{ required: true }]}> 
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
                  name="Gotra"
                  label="Gotra"
                  rules={[{ required: true, message: "Please select your gotra." }]}
                >
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Select Your Gotra"
                    showSearch
                    optionFilterProp="label"
                  >
                    {gotra.Gotra.map((g) => (
                      <Option key={g.EName} value={g.EName} label={g.EName}>
                        {g.EName} ({g.HName})
                      </Option>
                    ))}
                    <Option value="Other" label="Other">
                      Other
                    </Option>
                  </Select>
                </Form.Item>
          <Form.Item name="address" label="Address" rules={[{ required: true }]}> 
            <Input.TextArea placeholder="Enter your address" />
          </Form.Item>
      
      </Tabs.TabPane>
      
      <Tabs.TabPane tab="Family" key="2">
        <FamilyForm familyMembers={familyMembers} setFamilyMembers={setFamilyMembers}/>
      </Tabs.TabPane>

      <Tabs.TabPane tab="Profession" key="3">
       <ProfessionForm/>  
      </Tabs.TabPane>

      <Tabs.TabPane tab="AboutMe" key="4">
       <AboutMe aboutMItems={aboutMItems} setAboutmeItems={setAboutmeItems}/>
      </Tabs.TabPane>

      <Tabs.TabPane tab="LookingFor" key="5">
        <LookingFor lookingForItems={lookingForItems} setLookingForItems={setLookingForItems} />
      </Tabs.TabPane>
    
    </Tabs>
    
  
    
    <Space>
      <Button type="primary" onClick={() => form.submit()}>Submit</Button>
      <Button onClick={() => form.resetFields()}>Reset</Button>
    </Space>
    </Form>
    {/* Display Submitted Data */}
    {submittedData && (
      <pre style={{ background: "#f5f5f5", padding: "10px", marginTop: "20px" }}>
        {JSON.stringify(submittedData, null, 2)}
      </pre>
    )}
  </div>
  )
}

