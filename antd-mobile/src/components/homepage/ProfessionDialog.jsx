import React from 'react';
import { Dialog, Form, Input } from 'antd-mobile';

export const ProfessionDialog = ({ visible, onClose }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    console.log('Profession data:', values);
    onClose();
  };

  const handleCancel = ()=>{
    onClose()
  }
  return (
    <Dialog
      visible={visible}
      title="Profession"
      actions={[
        { key: 'cancel', text: 'Cancel', onClick: handleCancel},
        { key: 'submit', text: 'Save', onClick: handleSubmit }
      ]}
      onClose={onClose}
    >
      <Form form={form}>
        <Form.Item name="jobTitle" label="Job Title">
          <Input placeholder="Enter your profession" />
        </Form.Item>
        <Form.Item name="experience" label="Experience">
          <Input type="number" placeholder="Years of experience" />
        </Form.Item>
      </Form>
    </Dialog>
  );
};