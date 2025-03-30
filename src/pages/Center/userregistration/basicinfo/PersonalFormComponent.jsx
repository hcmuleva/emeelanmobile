import React, { useState,useEffect } from "react";
import { Form, Input, Button, Upload, DatePicker, Select, Space, Radio } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from 'dayjs'; // Import dayjs
import 'dayjs/locale/en'; // Import the locale you want to use (e.g., English)
import locale from 'antd/locale/en_US';
const { Option } = Select;
const API_URL = import.meta.env.VITE_SERVER_URL;

const PersonalFormComponent = ({ nextStep, updateFormData,formData, setFormData }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [photoIds, setPhotoIds] = useState([]); 
  // Handle file upload
  
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
      setPhotoIds(pictureIds);
      console.log("Uploaded Picture IDs:", pictureIds);

    } catch (error) {
      console.error("Upload Error:", error);
    }
  };
  useEffect(() => {
    if (formData && formData.personal) {
      form.setFieldsValue({
        username: formData?.personal?.username || '',
        email: formData?.personal?.email || '',
        password: formData?.personal?.password || '',
        MobileNumber: formData?.personal?.MobileNumber || '',
        FirstName: formData?.personal?.FirstName || '',
        Father: formData?.personal?.Father || '',
        dob: formData?.personal?.dob ? dayjs(formData?.personal?.dob) : null, // Convert to dayjs object
        Gotra: formData?.personal?.Gotra || '',
        address: formData?.personal?.address || '',
        photos: formData?.personal?.photos || [],
      });
       setFileList(formData?.personal?.fileList || []);
    }
  }, [form, formData]);

  // Handle form submission
  const handleNext = () => {
    form.validateFields().then((values) => {
      const data = { ...values, photos: photoIds };
      setFormData({ ...formData, personal: data }); // Update parent state
      nextStep(); // Move to the next step
    });
  };

  return (
    <div>
      <h2>Basic Information</h2>
      <Form form={form} layout="vertical">
        {/* File Upload Section */}
        <Form.Item label="Upload Profile Pictures">
          <Upload
            listType="picture-card"
            multiple
            fileList={fileList}
            onChange={handleUpload}
            beforeUpload={() => false} // Prevent automatic upload
          >
            {fileList.length >= 5 ? null : (
              <Button icon={<UploadOutlined />}>Upload</Button>
            )}
          </Upload>
        </Form.Item>

        {/* User Details */}
        <Form.Item name="username" label="UserId">
          <Input placeholder="Enter UserId" />
        </Form.Item>
        <Form.Item name="email" label="Email Id">
          <Input type="email" placeholder="Enter Email Id" />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input type="password" placeholder="Enter min 6 character password" />
        </Form.Item>
        <Form.Item
          name="MobileNumber"
          label="Mobile Number"
          rules={[
            { required: true, message: "Please enter your or your parent's mobile number" },
          ]}
        >
          <Input placeholder="Enter your/parent Mobile Number" />
        </Form.Item>
        <Form.Item name="Sex" label="Gender">
          <Radio.Group>
            <Radio value="Male">Male</Radio>
            <Radio value="Female">Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="FirstName"
          label="Name"
          rules={[{ required: true, message: "Enter your Name" }]}
        >
          <Input placeholder="Enter your full name" />
        </Form.Item>
        <Form.Item
          name="Father"
          label="Father Name"
          rules={[{ required: true, message: "Enter your father's name" }]}
        >
          <Input placeholder="Enter your father's full name" />
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
            {/* Replace `gotra.Gotra` with actual data passed as props */}
            {["Gotra1", "Gotra2", "Gotra3"].map((g) => (
              <Option key={g} value={g} label={g}>
                {g}
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

        {/* Navigation Buttons */}
        <Space>
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
          <Button onClick={() => form.resetFields()}>Reset</Button>
        </Space>
      </Form>
    </div>
  );
};

export default PersonalFormComponent;
