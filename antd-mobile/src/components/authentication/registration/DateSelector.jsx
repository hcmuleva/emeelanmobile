import { Button, DatePicker, Form, Toast } from 'antd-mobile';
import React, { useState } from 'react';

const formatDateToDDMMYYYY = (date) => {
  if (!date) return '';
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

const DateSelector = ({customdata,setCustomdata}) => {
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
    setCustomdata({...customdata, DOB: formatDateToDDMMYYYY(date)});
    form.setFieldsValue({ DOB: date });
    setDobVisible(false);
    Toast.show(`Selected: ${formatDateToDDMMYYYY(date)}`);
  };



  return (
    <Form form={form}>
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
    </Form>
  );
};

export default DateSelector;