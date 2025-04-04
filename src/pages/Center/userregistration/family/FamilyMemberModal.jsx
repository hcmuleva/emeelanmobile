import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Button, Radio } from "antd";
import { use } from "react";

const { Option } = Select;

const FamilyMemberModal = ({ visible, setVisible, familyMembers, setFamilyMembers }) => {
  const [form] = Form.useForm();
  const [showMaritalStatus, setShowMaritalStatus] = useState(false);
  const handleTypeChange = (value) => {
    console.log("handleTypeChange value",value); 
    setShowMaritalStatus(value === "Sibling");
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      // Append new member to array
      setFamilyMembers([...familyMembers, values]);

      // Close modal and reset form
      setVisible(false);
      form.resetFields();
      setShowMaritalStatus(false); // Reset state

    });
  };
  console.log("showmaritialstatus",showMaritalStatus);  
  return (
    <Modal title="Add Family Member" open={visible} onOk={handleOk} onCancel={() => setVisible(false)} footer={null}>
      <Form form={form} layout="vertical">
        <Form.Item name="type" label="Member Type" rules={[{ required: true }]} >
          <Select placeholder="Select member type" onChange={handleTypeChange}>
            <Option value="Parent">Parent</Option>
            <Option value="Sibling">Sibling</Option>
            <Option value="Maternal">Maternal</Option>
          </Select>
        </Form.Item>
        
        <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
          <Input placeholder="Enter first name" />
        </Form.Item>

        <Form.Item name="lastName" label="Last Name">
          <Input placeholder="Enter last name" />
        </Form.Item>

        <Form.Item name="age" label="Age">
          <Input placeholder="Enter age" />
        </Form.Item>
    

        {/* Show Marital Status Radio Button for Sibling */}
        {showMaritalStatus && (
          <Form.Item name="maritalStatus" label="Marital Status" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value="Married">Married</Radio>
            <Radio value="Unmarried">Unmarried</Radio>
          </Radio.Group>
        </Form.Item>
        )}
        <Form.Item name="profession" label="Profession">
          <Input placeholder="Enter profession" />
        </Form.Item>

        <Form.Item name="location" label="Location">
          <Input placeholder="Enter location" />
        </Form.Item>

        <Form.Item name="businessDetail" label="Business Detail">
          <Input placeholder="Enter business detail" />
        </Form.Item>

        <Button type="primary" onClick={handleOk} block>
          Add Member
        </Button>
      </Form>
    </Modal>
  );
};

export default FamilyMemberModal;
