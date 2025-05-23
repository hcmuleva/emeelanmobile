import { Dialog, Form, Input } from "antd-mobile";
import React from "react";

export const BhamasahDialog = ({ visible, onClose }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    const values = form.getFieldsValue();

    onClose();
  };
  const handleCancel = () => {
    onClose();
  };
  return (
    <Dialog
      visible={visible}
      title="Bhamasah"
      actions={[
        { key: "cancel", text: "Cancel", onClick: handleCancel },
        { key: "submit", text: "Submit", onClick: handleSubmit },
      ]}
      onClose={onClose}
    >
      <Form form={form}>
        <Form.Item name="bhamasahId" label="ID">
          <Input placeholder="Enter Bhamasah ID" />
        </Form.Item>
        <Form.Item name="amount" label="Amount">
          <Input type="number" placeholder="Enter amount" />
        </Form.Item>
      </Form>
    </Dialog>
  );
};
