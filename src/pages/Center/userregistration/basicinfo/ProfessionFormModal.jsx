import React, { useState } from "react";
import { Modal, Form, Input, Select, Button, Radio } from "antd";

const { Option } = Select;
const { TextArea } = Input;

const ProfessionFormModal = ({ visible, setVisible, professionList, setProfessionList}) => {
  const [form] = Form.useForm();
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [showBusinessForm, setShowBusinessForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [nojob, setNojob] = useState(false);
  const [showAgricultureForm, setShowAgricultureForm] = useState(false);

  const handleTypeChange = (value) => {
    setShowEducationForm(value === "Student");
    setShowBusinessForm(value === "Businessman" || value === "SelfEmployed" || value === "Owner");
    setNojob(value === "Berojgar" || value === "housewife" || value === "Labor" || value === "Other");
    setShowAgricultureForm(value === "Agriculture");
    setShowServiceForm(value === "Service");
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log("Values for profession", values);
      setProfessionList([...professionList, values]);
      setShowEducationForm(false);
      setShowBusinessForm(false);
      setShowServiceForm(false);
      setShowAgricultureForm(false);
      setNojob(false);
      form.resetFields();
      setVisible(false);

    });
  };
   const handleCancel = () => {
        setVisible(false);
        form.resetFields();
        setShowEducationForm(false);
        setShowBusinessForm(false);
        setShowServiceForm(false);
        setShowAgricultureForm(false);
        setNojob(false);
  };

  return (
    <Modal title="Add Profession" open={visible} onOk={handleOk} onCancel={handleCancel} footer={null}>
      <Form form={form} layout="vertical">
        {/* Profession Type Selection */}
        <Form.Item name="type" label="Profession Type" rules={[{ required: true, message:"Please Select Profession Type" }]}>
          <Select placeholder="Select Profession type" onChange={handleTypeChange}>
            <Option value="Student">Student</Option>
            <Option value="Businessman">Businessman</Option>
            <Option value="SelfEmployed">SelfEmployed</Option>
            <Option value="Berojgar">Berojgar</Option>
            <Option value="housewife">HouseWife</Option>
            <Option value="Service">Service</Option>
            <Option value="Owner">Owner</Option>
            <Option value="Agriculture">Agriculture</Option>
            <Option value="Labor">Labor</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>

        {/* Common Fields */}
        {nojob && (<>
          <Form.Item name="currentlocation" label="Current Location" rules={[{ required: true , message:"Please Enter currentlocation" }]}>
            <Input placeholder="Enter currentlocation" />
          </Form.Item>
        </>) }

        {/* Education Fields */}
        {showEducationForm && (
          <>
            <Form.Item name="educationType" label="Education Type" rules={[{ required: true, message:"Please select your education Type" }]}>
              <Radio.Group>
                <Radio value="uneducated">Uneducated</Radio>
                <Radio value="primary">Primary</Radio>
                <Radio value="secondary">Secondary</Radio>
                <Radio value="diploma">Diploma</Radio>
                <Radio value="graduate">Graduate</Radio>
                <Radio value="postgraduate">Postgraduate</Radio>
                <Radio value="phd">PhD</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="institute" label="Institute Name">
              <Input placeholder="Enter Institute Name" />
            </Form.Item>

            <Form.Item name="passingYear" label="Passing Year">
              <Input placeholder="Enter Passing Year" />
            </Form.Item>

            <Form.Item name="percentage" label="Percentage/Grade">
              <Input placeholder="Enter Percentage/Grade" />
            </Form.Item>

            <Form.Item name="educationDescription" label="Education Description">
              <TextArea placeholder="Education Description" autoSize={{ minRows: 2, maxRows: 8 }} />
            </Form.Item>
          </>
        )}

        {/* Business Fields */}
        {showBusinessForm && (
          <>
            <Form.Item name="businessName" label="Business Name" rules={[{ required: true , message:"Enter Business Name" }]}>
              <Input placeholder="Enter Business Name" />
            </Form.Item>

            <Form.Item name="businessDescription" label="Business Description">
              <TextArea placeholder="Describe your business" autoSize={{ minRows: 2, maxRows: 8 }} />
            </Form.Item>

            <Form.Item name="income" label="Income">
              <Input placeholder="Enter Income from Business" />
            </Form.Item>
          </>
        )}

        {/* Service Fields */}
        {showServiceForm && (
          <>
            <Form.Item name="organization" label="Organization Name">
              <Input placeholder="Enter Organization Name" />
            </Form.Item>

            <Form.Item name="designation" label="Designation">
              <Input placeholder="Enter Designation" />
            </Form.Item>

            <Form.Item name="salary" label="Salary">
              <Input placeholder="Enter Monthly Salary" />
            </Form.Item>

            <Form.Item name="serviceDescription" label="Job Description">
              <TextArea placeholder="Describe your job" autoSize={{ minRows: 2, maxRows: 8 }} />
            </Form.Item>
          </>
        )}

        {/* Agriculture Fields */}
        {showAgricultureForm && (
          <>
            <Form.Item name="landSize" label="Land Size (in acres)">
              <Input placeholder="Enter Land Size" />
            </Form.Item>

            <Form.Item name="Income" label="Income(yearly)">
              <Input placeholder="Enter Crop Type" />
            </Form.Item>

            <Form.Item name="Description" label="Description">
              <TextArea placeholder="Describe " autoSize={{ minRows: 2, maxRows: 8 }} />
            </Form.Item>
          </>
        )}
      
        {/* Submit Button */}
        <Button type="primary" onClick={handleOk} block>
          Add Profession
        </Button>
      </Form>
    </Modal>
  );
};

export default ProfessionFormModal;
