import React, { useState } from "react";
import { Tabs, Card, Form, Input, Button, Select,Typography, Divider } from "antd";
const { Title } = Typography;

import {
  IdcardOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  CalendarOutlined,
  PhoneOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useOne } from "@refinedev/core";
import FamilyAndOtherInfo from "../UserDashboard/profile/FamilyAndOtherInfo";
import ResetPassword from "./ResetPassword";
const { Option } = Select;

const { TabPane } = Tabs;

const FamilyMembersList = ({ FamilyMembers }) => {
  if (!FamilyMembers || FamilyMembers.length === 0) {
    return <p>No family members available.</p>;
  }

  // Group family members by type
  const groupedMembers = FamilyMembers.reduce((acc, member) => {
    if (!acc[member.type]) acc[member.type] = [];
    acc[member.type].push(member);
    return acc;
  }, {});

  return (
    <>
      {["parent", "siblings", "maternal"].map((type) =>
        groupedMembers[type]?.length > 0 ? (
          <Card key={type} style={{ marginBottom: 16, background: "#f9f9f9" }}>
            {/* Centered Title for the Group */}
            <Title level={4} style={{ textAlign: "center", marginBottom: 10 }}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Title>

            {/* Display each family member */}
            {groupedMembers[type].map((member, index) => (
              <p key={index}>
                {member.name}, {member.age} years old, {member.gender} ({member.relation})
              </p>
            ))}

            {/* Separator after each section */}
            <Divider />
          </Card>
        ) : null
      )}
    </>
  );
};
const calculateAge = (dob) => {
  if (!dob) return "DOB not provided";
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};


const UserCard = ({ selectedUser }) => {
  const id = selectedUser.id;
  const { data, isLoading, isError } = useOne({
    resource: "users",
    id,
    populate: ["Pictures"],
  });

  const userinfo = data?.data;
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching user data</div>;

  const initialData = {
    id: userinfo?.id,
    name: `${userinfo?.FirstName} ${userinfo?.LastName}`,
    vastipatNo: `profileId: ${userinfo?.id}`,
    address: userinfo?.Address || "Address not available",
    city: userinfo?.City || "City not available",
    profession: userinfo?.Profession || "Profession not available",
    dob: userinfo?.DOB || "DOB not available",
    age: calculateAge(userinfo?.DOB),
    userstatus: userinfo?.userstatus || "Status not available",
    phone:
      userinfo?.MobileNumber ||
      userinfo?.PhoneNumber ||
      userinfo?.PhoneNumber2 ||
      "Phone not available",
    email: userinfo?.email || "Email not available",
    picture: "https://via.placeholder.com/100",
    FamilyMembers: userinfo?.FamilyMembers || [
      {
          "type": "parent",
          "name": "abv",
          "age": "22",
          "gender": "male",
          "relation": "father"
      },
      {
          "type": "siblings",
          "name": "ssd",
          "age": "22",
          "gender": "female",
          "relation": "sister"
      }
  ], 
  };

  console.log("Initial Data:", initialData);
  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldsValue(initialData);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      console.log("Updated Values:", values);
      setIsEditing(false);
    });
  };
  
  return (
    <Card
      style={{ maxWidth: 600, margin: "auto", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
      bodyStyle={{ padding: 16 }}
    >
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <img
          src={initialData.picture}
          alt="Profile"
          style={{ width: 100, height: 100, borderRadius: "50%", objectFit: "cover", border: "2px solid #eaeaea" }}
        />
      </div>
      
      <Form form={form} layout="vertical" initialValues={initialData}>
        <Tabs defaultActiveKey="basic" centered>
          <TabPane tab="Basic" key="basic">
            <Form.Item name="name" label="Name">
              <Input disabled={!isEditing} prefix={<IdcardOutlined />} />
            </Form.Item>
            <Form.Item name="vastipatNo" label="Profile ID">
              <Input disabled prefix={<IdcardOutlined />} />
            </Form.Item>
            <Form.Item name="dob" label="Date of Birth">
              <Input disabled prefix={<CalendarOutlined />} />
            </Form.Item>
            <Form.Item name="age" label="Age">
              <Input disabled prefix={<CalendarOutlined />} />
            </Form.Item>
            <Form.Item name="phone" label="Phone">
              <Input disabled={!isEditing} prefix={<PhoneOutlined />} />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input disabled={!isEditing} prefix={<MailOutlined />} />
            </Form.Item>
            <Form.Item name="address" label="Address">
              <Input disabled={!isEditing} prefix={<HomeOutlined />} />
            </Form.Item>
            <Form.Item name="city" label="City">
              <Input disabled={!isEditing} prefix={<EnvironmentOutlined />} />
            </Form.Item>
            <Form.Item name="userstatus" label="Status">
  <Select placeholder="Select status" >
    <Option value="APPROVED">APPROVED</Option>
    <Option value="REJECTED">REJECTED</Option>
    <Option value="PENDING">PENDING</Option>
    <Option value="ENGGAGED">ENGGAGED</Option>
    <Option value="BLOCKED">BLOCKED</Option>
    <Option value="UNAPPROVED">UNAPPROVED</Option>
  </Select>
</Form.Item>
          </TabPane>

        

          <TabPane tab="Family" key="family">
          <Form.List name="FamilyMembers">
  {(fields, { add, remove }) => (
    <>
      {fields.map(({ key, name, ...restField }) => (
        <Card key={key} style={{ marginBottom: 10, background: "#f9f9f9" }}>
          <Form.Item
            {...restField}
            name={[name, "type"]}
            label="Type"
            rules={[{ required: true, message: "Select type" }]}
          >
            <Select placeholder="Select Type">
              <Select.Option value="parent">Parent</Select.Option>
              <Select.Option value="siblings">Siblings</Select.Option>
              <Select.Option value="maternal">Maternal</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            {...restField}
            name={[name, "name"]}
            label="Name"
            rules={[{ required: true, message: "Enter name" }]}
          >
            <Input placeholder="Enter Name" />
          </Form.Item>

          <Form.Item
            {...restField}
            name={[name, "age"]}
            label="Age"
            rules={[{ required: true, message: "Enter age" }]}
          >
            <Input type="number" placeholder="Enter Age" />
          </Form.Item>

          <Form.Item
            {...restField}
            name={[name, "gender"]}
            label="Gender"
            rules={[{ required: true, message: "Select gender" }]}
          >
            <Select placeholder="Select Gender">
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            {...restField}
            name={[name, "relation"]}
            label="Relation"
            rules={[{ required: true, message: "Enter relation" }]}
          >
            <Input placeholder="Enter Relation (e.g., Father, Brother)" />
          </Form.Item>

          <Button danger onClick={() => remove(name)}>
            Remove
          </Button>
        </Card>
      ))}
      <Button type="dashed" onClick={() => add()} block>
        + Add Family Member
      </Button>
     
      <>
      
      <FamilyMembersList FamilyMembers={initialData.FamilyMembers} />
  </>
    </>

  )}
</Form.List>

          </TabPane>

          <TabPane tab="Profession" key="profession">
            <Form.Item name="profession" label="Profession">
              <Input disabled={!isEditing} prefix={<IdcardOutlined />} />
            </Form.Item>
          </TabPane>
          <TabPane tab="ResetPassword" key="resetpassword">
            <ResetPassword id={initialData.id} />
          </TabPane>
        </Tabs>

        {!isEditing ? (
          <Button type="primary" onClick={handleEdit} block>Edit</Button>
        ) : (
          <Button type="primary" onClick={handleSave} block>Save</Button>
        )}
      </Form>
    </Card>
  );
};

export default UserCard;
