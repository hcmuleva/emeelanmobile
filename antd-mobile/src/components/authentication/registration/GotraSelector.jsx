import React, { useState } from "react";
import { Form, Picker, Button, Toast } from "antd-mobile";

const GotraSelector = ({ gotra_for, gotraData, customdata, setCustomdata }) => {
  const [name, label] = ["gotra", "Gotra"];

  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const handleConfirm = (value) => {
    form.setFieldsValue({ [name]: value[0] });
    setVisible(false);
    const selectedGotra = gotraData.find((g) => g.EName === value[0]);
    gotra_for
      ? setCustomdata({ ...customdata, matranal_gotra: selectedGotra.Id })
      : setCustomdata({ ...customdata, gotra: selectedGotra.Id });
    Toast.show(`Selected: ${selectedGotra?.EName}`);
  };

  return (
    <Form.Item
      name={name}
    
    >
      {" "}
      <div
        onClick={() => setVisible(true)}
        style={{
          padding: "6px 0",
          color: "var(--adm-color-text)",
          cursor: "pointer",
        }}
      >
        {(() => {
          const selectedValue = form.getFieldValue(name);
          const selectedGotra = gotraData.find(
            (g) => g.EName === selectedValue
          );
          return selectedGotra
            ? `${selectedGotra.EName} (${selectedGotra.HName})`
            : "Select Gotra";
        })()}
      </div>
      <Picker
        columns={[
          gotraData.map((gotra) => ({
            label: `${gotra.EName} (${gotra.HName})`, // Display format
            value: gotra.EName, // Store only EName
          })),
        ]}
        visible={visible}
        onClose={() => setVisible(false)}
        onConfirm={handleConfirm}
      />
    </Form.Item>
  );
};
export default GotraSelector;
