import React, { useState, useContext } from 'react';
import { Form, Input, TextArea, Radio, Button, Toast, ImageUploader, Dialog } from 'antd-mobile';
import { UploadOutline } from 'antd-mobile-icons';
import { AuthContext } from '../../context/AuthContext';
import { createAndUpdateDonners, uploadImage } from '../../services/api';
// import gotraData from "../../utils/gotra.json"; // Gotra data import
import GotraSelector from '../authentication/registration/GotraSelector';
import GotraController from '../../../../telisamaj/src/utils/GotraController';

const DonationForm = () => {
  const gotraData = GotraController()


  const { jwt } = useContext(AuthContext);
  const [form] = Form.useForm();
  const [photoFileList, setPhotoFileList] = useState([]);
  const [receiptFileList, setReceiptFileList] = useState([]);
  const [imageId, setImageId] = useState("");
  const [donorType, setDonorType] = useState('individual');
  const [customdata, setCustomdata] = useState({}); // For storing custom data like gotra
  const MAX_IMAGES = 1;

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      Toast.show({ icon: 'fail', content: 'Only JPG/PNG files allowed!' });
      return null;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      Toast.show({ icon: 'fail', content: 'Image must be smaller than 2MB!' });
      return null;
    }
    return file;
  };

  const handleUpload = async (file) => {
    const uploadData = new FormData();
    uploadData.append('files', file);

    try {
      const response = await uploadImage(uploadData, jwt);
      const uploadedFile = response[0];
      setImageId(uploadedFile.id); // Save the image ID

      const uploadedImage = {
        url: uploadedFile.url,
        file,
      };

      setPhotoFileList([uploadedImage]);
      return uploadedImage; // Must return for ImageUploader
    } catch (error) {
      console.error('Upload failed:', error);
      Toast.show({ icon: 'fail', content: 'Upload failed' });
      throw error;
    }
  };

  const onPreview = (file) => {
    Dialog.alert({
      content: (
        <img
          src={file.url}
          style={{ width: '100%', height: 'auto', borderRadius: 8 }}
          alt="Preview"
        />
      ),
    });
  };

  const handleSubmit = async (values) => {
    if (!imageId) {
      Toast.show({ icon: 'fail', content: 'Please upload a photo' });
      return;
    }

    try {
      const payload = { ...values, ...customdata, photo: imageId, receipt: receiptFileList.id };
      const response = await createAndUpdateDonners(payload, jwt);
      if (response?.id) {
        Toast.show({ icon: 'success', content: 'Donation saved successfully!' });
        form.resetFields();
        setPhotoFileList([]);
        setReceiptFileList([]);
        setDonorType('individual');
      } else {
        throw new Error('Unexpected API response');
      }
    } catch (error) {
      console.error('Failed to submit donation:', error);
      Toast.show({ icon: 'fail', content: 'Failed to submit donation. Please try again.' });
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      initialValues={{ donorType: 'individual' }}
      footer={
        <Button block type="submit" color="primary" size="large">
          Submit
        </Button>
      }
    >
      <Form.Header>Donation Form</Form.Header>

      <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
        <Input placeholder="Enter full name" />
      </Form.Item>

      <Form.Item name="donorType" label="Donor Type" rules={[{ required: true }]}>
        <Radio.Group onChange={(e) => setDonorType(e.target.value)}>
          <Radio value="individual">Individual</Radio>
          <Radio value="family">Family</Radio>
          <Radio value="group">Group</Radio>
          <Radio value="sanstha">Sanstha</Radio>
        </Radio.Group>
      </Form.Item>

      {donorType === 'individual' && (
        <Form.Item name="parentName" label="Father/Husband Name" rules={[{ required: true }]}>
          <Input placeholder="Enter father's or husband's name" />
        </Form.Item>
      )}

      <Form.Item name="purpose" label="Purpose" rules={[{ required: true }]}>
        <Input placeholder="Enter donation purpose" />
      </Form.Item>

      {/* GotraSelector Component */}
      <Form.Item name="gotra" label="Gotra" rules={[{ required: true }]}>
        <GotraSelector
          gotra_for={true}  // Example flag for using a specific gotra
          gotraData={gotraData.Gotra}  // Passing gotraData from your json file
          customdata={customdata}
          setCustomdata={setCustomdata}
        />
      </Form.Item>

      {/* <Form.Item name="cast" label={<><span style={{ color: 'red' }}>*</span> Cast</>}>
        <Radio.Group style={{ display: "flex", gap: "10px" }}>
          <Radio value="SEERVI0002" style={{ marginRight: "10px" }}>SEERVI</Radio>
          <Radio value="TELI0001" style={{ marginRight: "10px" }}>TELI</Radio>
          <Radio value="DEMO0003">DEMO</Radio>
        </Radio.Group>
      </Form.Item> */}

      {donorType === 'individual' && (
        <>
          <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value="male" style={{ marginRight: "10px" }}>Male</Radio>
              <Radio value="female">Female</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="maritalStatus" label="Marital Status" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value="married" style={{ marginRight: "10px" }}>Married</Radio>
              <Radio value="bachelor" style={{ marginRight: "10px" }}>Bachelor</Radio>
              <Radio value="divorced" style={{ marginRight: "10px" }}>Divorced</Radio>
              <Radio value="na">N/A</Radio>
            </Radio.Group>
          </Form.Item>
        </>
      )}

      <Form.Item name="description" label="Description">
        <TextArea placeholder="Enter description (max 200 characters)" rows={3} maxLength={200} showCount />
      </Form.Item>

      <Form.Item name="amount" label="Amount (₹)" rules={[{ required: true }]}>
        <Input type="number" placeholder="Enter amount" />
      </Form.Item>

      <Form.Item name="photo" label="Photo" rules={[{ required: true }]}>
        <ImageUploader
          value={photoFileList}
          onChange={setPhotoFileList}
          beforeUpload={beforeUpload}
          upload={handleUpload}
          maxCount={MAX_IMAGES}
          showUpload={photoFileList.length < 1}
          uploadText="Upload Photo"
          icon={<UploadOutline />}
          onPreview={onPreview}
        />
      </Form.Item>

      <Form.Item name="receipt" label="Receipt" rules={[{ required: true }]}>
        <ImageUploader
          value={receiptFileList}
          onChange={setReceiptFileList}
          beforeUpload={beforeUpload}
          upload={handleUpload}
          maxCount={MAX_IMAGES}
          showUpload={receiptFileList.length < 1}
          uploadText="Upload Receipt"
          icon={<UploadOutline />}
        />
      </Form.Item>
    </Form>
  );
};

export default DonationForm;
