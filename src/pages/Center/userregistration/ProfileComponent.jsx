

import { UploadOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Layout, message, notification, Select, Space, Tabs, theme, Typography, Upload } from "antd";
import React, { useState } from "react";
import gotra from "../../../utils/gotra.json";
import AboutMe from "./aboutme/AboutMe";
import FamilyForm from "./family/FamilyForm";
import LookingFor from "./lookingfor/LookingFor";
import ProfessionForm from "./profession/ProfessionForm";
import { useCreate } from '@refinedev/core';

const { Title, Text } = Typography
const { Content } = Layout


const users = [
  { name: "Isaiah", avatar: "/placeholder.svg?height=80&width=80" },
  { name: "Jayden", avatar: "/placeholder.svg?height=80&width=80" },
  { name: "Hunter", avatar: "/placeholder.svg?height=80&width=80" },
  { name: "Ethel", avatar: "/placeholder.svg?height=80&width=80" },
  { name: "Kate", avatar: "/placeholder.svg?height=80&width=80" },
  { name: "Michael", avatar: "/placeholder.svg?height=80&width=80" },
  { name: "Sarah", avatar: "/placeholder.svg?height=80&width=80" },
]



export default function ProfileComponent({ userid }) {



  const { token } = theme.useToken()
  const [activeTab, setActiveTab] = useState("3")
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [submittedData, setSubmittedData] = useState(null);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [professionList, setProfessionList] = useState([]);
  const [aboutmeData, setAboutmeData] = useState(null);
  const [lookingForData, setLookingForData] = useState(null);
  const { mutate: createUser } = useCreate();
  const [userPictureIds, setUserPictureIds] = useState([]);
  const API_URL = import.meta.env.VITE_SERVER_URL;


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

  const handleUpload = async ({ fileList }) => {
    const formData = new FormData();

    const newFileList = fileList.map(file => {
      // Generate a preview URL for each image
      return {
        ...file,
        preview: file.url || URL.createObjectURL(file.originFileObj),
      };
    });

    setFileList(newFileList); // ✅ Update fileList with previews

    console.log("fileList", fileList);
    fileList.forEach(file => {
      formData.append("files", file.originFileObj);
    });

    console.log("API_URL", API_URL);

    try {
      // ✅ Upload files to Strapi
      const uploadResponse = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error("Upload failed");
      }

      const uploadedFiles = await uploadResponse.json();
      const pictureIds = uploadedFiles.map(file => file.id);
      setUserPictureIds(pictureIds);
      console.log("Uploaded Picture IDs:", pictureIds);

    } catch (error) {
      console.error("Upload Error:", error);
    }
  };
  const resetAllFormState = () => {
    // Reset form fields
    form.resetFields();
    
    // Reset all state variables
    setFileList([]);
    setSubmittedData(null);
    setFamilyMembers([]);
    setProfessionList([]);
    setAboutmeData(null);
    setLookingForData(null);
    setUserPictureIds([]);
    setActiveTab("1"); // Reset to first tab
  };

  const handleSubmit = (values) => {
    console.log("handleSubmit",values);

    if (!values.email && values.MobileNumber) {
      values.email = values.MobileNumber + "@hph.com";
    }
    values['role'] = 1
    values['profilecreatedby'] = localStorage.getItem("userid")
    values['userstatus'] = "APPROVED"
    values['emeelanrole'] = "MEELAN"
    
    
    const professionjson = { family: familyMembers, profession: professionList, aboutme: aboutmeData, lookingfor: lookingForData }
    const payload = { ...values, professionjson: professionjson, photos:userPictureIds };
    console.log("payload full", payload)
    // createUser(
    //   {
    //     resource: "users",
    //     values: {
    //       ...payload 
    //     },
    //   },
    //   {
    //     onSuccess: () => {
    //       notification.success({
    //         message: "Success",
    //         description: "User registered successfully",
    //       });
    //       resetAllFormState(); // Clear all form fields and state
    //     },
    //   }
    // );
  };

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
              <Upload
                listType="picture-card" // Enables image preview
                multiple
                fileList={fileList}
                onChange={handleUpload}
                beforeUpload={() => false} // Prevent automatic upload
              >
                {fileList.length >= 5 ? null : <Button icon={<UploadOutlined />}>Upload</Button>}
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
            <Space>
         
            <Button type="primary"  onClick={()=>setActiveTab((prev)=>String(Number(prev)+1))}>
            Next
            </Button>
          <Button onClick={() => form.resetFields()}>Reset</Button>
        </Space>
          </Tabs.TabPane>

          <Tabs.TabPane tab="Family" key="2">
            <FamilyForm familyMembers={familyMembers} setFamilyMembers={setFamilyMembers} activeTab={activeTab} setActiveTab={setActiveTab}/>
          </Tabs.TabPane>

          <Tabs.TabPane tab="Profession" key="3">
            <ProfessionForm professionList={professionList} setProfessionList={setProfessionList} activeTab={activeTab} setActiveTab={setActiveTab}/>
          </Tabs.TabPane>

          <Tabs.TabPane tab="AboutMe" key="4" >
            <AboutMe setAboutmeData={setAboutmeData} activeTab={activeTab} setActiveTab={setActiveTab} />
          </Tabs.TabPane>

          <Tabs.TabPane tab="LookingFor" key="5">
            <LookingFor setLookingForData={setLookingForData} activeTab={activeTab} setActiveTab={setActiveTab} handleSubmit={handleSubmit}/>
          </Tabs.TabPane>
        </Tabs>      
      </Form>
      
    </div>
  )
}

