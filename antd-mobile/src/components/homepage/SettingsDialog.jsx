import React from 'react';
import { Dialog, Form, Input, Switch } from 'antd-mobile';

export const SettingsDialog = ({ visible, onClose }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    console.log('Settings updated:', form.getFieldsValue());
    onClose();
  };
  const handleCancel = ()=>{
    onClose()
  }
  return (
    <Dialog
      visible={visible}
      title="Settings"
      actions={[
        { key: 'cancel', text: 'Cancel',onClick:handleCancel },
        { key: 'submit', text: 'Save', onClick: handleSubmit }
      ]}
      onClose={onClose}
    >
      <Form form={form}>
        <Form.Item name="theme" label="Theme">
          <Input placeholder="Select theme" />
        </Form.Item>
        <Form.Item name="notifications" label="Notifications" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item name="language" label="Language">
          <Input placeholder="Select language" />
        </Form.Item>
      </Form>
    </Dialog>
  );
};