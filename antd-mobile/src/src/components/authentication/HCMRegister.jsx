import React, { useState } from 'react';
import { Form, DatePicker, Button, Toast } from 'antd-mobile';
import AddressSelector from './registration/AddressSelector';
import GotraSelector from './registration/GotraSelector';
import MobileImageUploader from './registration/MobileImageUploader';
import '../../styles/registration.css';

const formatDateToDDMMYYYY = (date) => {
  if (!date) return '';
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

const HCMRegister = ({customdata,setCustomdata}) => {
  const now = new Date();
  const eighteenYearsAgo = new Date(
    now.getFullYear() - 18,
    now.getMonth(),
    now.getDate()
  );
  const hundredYearsAgo = new Date(
    now.getFullYear() - 100,
    now.getMonth(),
    now.getDate()
  );

  const [form] = Form.useForm();
  const [dobVisible, setDobVisible] = useState(false);

  // Initialize form with default value
  React.useEffect(() => {
    form.setFieldsValue({ DOB: eighteenYearsAgo });
  }, [form]);

  const handleDateConfirm = (date) => {
    setCustomdata({...customdata, DOB: date});
    form.setFieldsValue({ DOB: date });
    setDobVisible(false);
    Toast.show(`Selected: ${formatDateToDDMMYYYY(date)}`);
  };

  const onFinish = (values) => {
    console.log('Form values:', values);
    console.log('Formatted DOB:', formatDateToDDMMYYYY(values.DOB));
    Toast.show(`Submitted: ${formatDateToDDMMYYYY(values.DOB)}`);
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item name="DOB" label="Date of Birth">
        <div 
          onClick={() => setDobVisible(true)}
          style={{ 
            padding: '6px 0',
            color: 'var(--adm-color-text)',
            cursor: 'pointer'
          }}
        >
          {formatDateToDDMMYYYY(form.getFieldValue('DOB')) || 'Select Date'}
        </div>
      </Form.Item>

      <DatePicker
        title="Select Date of Birth"
        visible={dobVisible}
        onClose={() => setDobVisible(false)}
        onConfirm={handleDateConfirm}
        min={hundredYearsAgo}
        max={eighteenYearsAgo}
        value={form.getFieldValue('DOB')}
      />
        <AddressSelector Form = {Form}/>
          <MobileImageUploader/>
        <GotraSelector name="gotra" label="Select Your Gotra"  />
      <Button type="submit" block color="primary" size="large">
        Submit
      </Button>
    </Form>
  );
};

export default HCMRegister;