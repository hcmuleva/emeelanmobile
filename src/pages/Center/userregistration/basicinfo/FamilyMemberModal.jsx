import React, { useState } from "react";
import { Modal, Form, Input, Select, Button, Radio } from "antd";

const { Option } = Select;

const FamilyMemberModal = ({ visible, setVisible, familyMembers, setFamilyMembers }) => {
  const [form] = Form.useForm();
  const [showMaritalStatus, setShowMaritalStatus] = useState(false);

  // Handle Member Type Change
  const handleTypeChange = (value) => {
    setShowMaritalStatus(value === "Sibling");
  };

  // Handle Modal Submit
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

  // Handle Modal Cancel
  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
    setShowMaritalStatus(false);
  };

  return (
    <Modal
      title="Add Family Member"
      open={visible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form form={form} layout="vertical">
        {/* Member Type */}
        <Form.Item
          name="type"
          label="Member Type"
          rules={[{ required: true, message: "Please select member type" }]}
        >
          <Select placeholder="Select member type" onChange={handleTypeChange}>
            <Option value="Parent">Parent</Option>
            <Option value="Sibling">Sibling</Option>
            <Option value="Maternal">Maternal</Option>
          </Select>
        </Form.Item>

        {/* First Name */}
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: "Please enter first name" }]}
        >
          <Input placeholder="Enter first name" />
        </Form.Item>

        {/* Last Name */}
        <Form.Item name="lastName" label="Last Name">
          <Input placeholder="Enter last name" />
        </Form.Item>

        {/* Age */}
        <Form.Item name="age" label="Age">
          <Input type="number" placeholder="Enter age" />
        </Form.Item>

        {/* Marital Status (Conditional for Sibling) */}
        {showMaritalStatus && (
          <Form.Item
            name="maritalStatus"
            label="Marital Status"
            rules={[{ required: true, message: "Please select marital status" }]}
          >
            <Radio.Group>
              <Radio value="Married">Married</Radio>
              <Radio value="Unmarried">Unmarried</Radio>
            </Radio.Group>
          </Form.Item>
        )}

        {/* Profession */}
        <Form.Item name="profession" label="Profession">
          <Input placeholder="Enter profession" />
        </Form.Item>

        {/* Location */}
        <Form.Item name="location" label="Location">
          <Input placeholder="Enter location" />
        </Form.Item>

        {/* Business Detail */}
        <Form.Item name="businessDetail" label="Business Detail">
          <Input placeholder="Enter business detail" />
        </Form.Item>

        {/* Submit Button */}
        <Button type="primary" onClick={handleOk} block>
          Add Member
        </Button>
      </Form>
    </Modal>
  );
};

export default FamilyMemberModal;
