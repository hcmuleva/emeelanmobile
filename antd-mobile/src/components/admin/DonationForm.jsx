  /**
     *  Need to Create form for with following fields and types:
     *  1) name,fathername or husband,purpose ,cast, gotra,gender (Select using radio buttonfrom MALE/FEMALE), donnertype (radio button from NDIVIDUAL/FAMILY/GROUP/SANSTHA/OTHER)
     *  maritial (Select using radio buttonfrom MARRIED/BACHELOR/DIVEROCED/NA), 
        description (TextArea 3 line) , amount(integer),
        receipt(Image uploader), photo (Image uploader)
    */ 
  
        import React, { useState } from 'react';
        import {
          Form,
          Input,
          TextArea,
          Radio,
          Picker,
          ImageUploader,
          Button,
          Toast
        } from 'antd-mobile';
        import { UploadOutlined } from '@ant-design/icons';
        
        const DonationForm = () => {
          const [form] = Form.useForm();
  const [photoFileList, setPhotoFileList] = useState([]);
  const [receiptFileList, setReceiptFileList] = useState([]);
  const [donorType, setDonorType] = useState('individual'); // Default to individual

  // Sample options for dropdowns
  const castOptions = [
    { label: 'Brahmin', value: 'brahmin' },
    { label: 'Kshatriya', value: 'kshatriya' },
    { label: 'Vaishya', value: 'vaishya' },
    { label: 'Shudra', value: 'shudra' },
    { label: 'Other', value: 'other' },
  ];

  const gotraOptions = [
    { label: 'Kashyap', value: 'kashyap' },
    { label: 'Bhardwaj', value: 'bhardwaj' },
    { label: 'Atri', value: 'atri' },
    { label: 'Vasishtha', value: 'vasishtha' },
    { label: 'Other', value: 'other' },
  ];

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      Toast.show('You can only upload JPG/PNG files!');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      Toast.show('Image must be smaller than 2MB!');
      return false;
    }
    return true;
  };

  const onFinish = (values) => {
    console.log('Received values:', values);
    Toast.show('Form submitted successfully!');
  };

  const handleDonorTypeChange = (value) => {
    setDonorType(value);
    // Reset dependent fields when donor type changes
    if (value === 'family') {
      form.setFieldsValue({
        parentName: undefined,
        maritalStatus: undefined,
        gotra: undefined
      });
    } else if (value === 'sanstha' || value === 'group') {
      form.setFieldsValue({
        gotra: undefined
      });
    }
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      initialValues={{ donorType: 'individual' }}
      footer={
        <Button block type='submit' color='primary' size='large'>
          Submit
        </Button>
      }
    >
      <Form.Header>Donation Form</Form.Header>
      
      <Form.Item name='name' label='Full Name' rules={[{ required: true }]}>
        <Input placeholder='Enter full name' />
      </Form.Item>

      <Form.Item 
        name='donorType' 
        label='Donor Type' 
        rules={[{ required: true }]}
      >
        <Radio.Group onChange={(val) => handleDonorTypeChange(val)}>
          <Radio value='individual'>Individual</Radio>
          <Radio value='family'>Family</Radio>
          <Radio value='group'>Group</Radio>
          <Radio value='sanstha'>Sanstha</Radio>
        </Radio.Group>
      </Form.Item>

      {/* Show parent name only for individual */}
      {(donorType === 'individual') && (
        <Form.Item 
          name='parentName' 
          label='Father/Husband Name' 
          rules={donorType === 'individual' ? [{ required: true }] : []}
        >
          <Input placeholder="Enter father's or husband's name" />
        </Form.Item>
      )}

      <Form.Item name='purpose' label='Purpose' rules={[{ required: true }]}>
        <Input placeholder='Enter donation purpose' />
      </Form.Item>

      <Form.Item name='cast' label='Cast' rules={[{ required: true }]}>
        <Picker columns={[castOptions]}>
          {(value) => (
            <Input
              value={value?.[0]?.label}
              placeholder='Select cast'
              readOnly
            />
          )}
        </Picker>
      </Form.Item>

      {/* Show gotra only for individual and family */}
      {(donorType === 'individual' || donorType === 'family') && (
        <Form.Item 
          name='gotra' 
          label='Gotra' 
          rules={donorType === 'individual' ? [{ required: true }] : []}
        >
          <Picker columns={[gotraOptions]}>
            {(value) => (
              <Input
                value={value?.[0]?.label}
                placeholder='Select gotra'
                readOnly
              />
            )}
          </Picker>
        </Form.Item>
      )}

      {/* Show gender for all except sanstha */}
      {donorType === 'individual' && (
        <Form.Item name='gender' label='Gender' rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value='male'>Male</Radio>
            <Radio value='female'>Female</Radio>
          </Radio.Group>
        </Form.Item>
      )}

      {/* Show marital status only for individual */}
      {donorType === 'individual' && (
        <Form.Item name='maritalStatus' label='Marital Status' rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value='married'>Married</Radio>
            <Radio value='bachelor'>Bachelor</Radio>
            <Radio value='divorced'>Divorced</Radio>
            <Radio value='na'>N/A</Radio>
          </Radio.Group>
        </Form.Item>
      )}

      <Form.Item name='description' label='Description'>
        <TextArea
          placeholder='Enter description (max 200 characters)'
          rows={3}
          maxLength={200}
          showCount
        />
      </Form.Item>

      <Form.Item name='amount' label='Amount (₹)' rules={[{ required: true }]}>
        <Input type='number' placeholder='Enter amount' />
      </Form.Item>

      <Form.Item name='photo' label='Photo' rules={[{ required: true }]}>
        <ImageUploader
          value={photoFileList}
          onChange={setPhotoFileList}
          beforeUpload={beforeUpload}
          upload={async (file) => {
            // Implement your upload logic here
            return { url: URL.createObjectURL(file) };
          }}
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Upload Photo</Button>
        </ImageUploader>
      </Form.Item>

      <Form.Item name='receipt' label='Receipt' rules={[{ required: true }]}>
        <ImageUploader
          value={receiptFileList}
          onChange={setReceiptFileList}
          beforeUpload={beforeUpload}
          upload={async (file) => {
            // Implement your upload logic here
            return { url: URL.createObjectURL(file) };
          }}
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Upload Receipt</Button>
        </ImageUploader>
      </Form.Item>
    </Form>
  );
};

export default DonationForm;
