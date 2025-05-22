import React, { useState } from "react";
import { Form, Picker, Toast } from "antd-mobile";

const maritalStatusOptions = [
  { Id: "MARRIED", EName: "MARRIED", HName: "शादीशुदा" },
  { Id: "NOTMARRIED", EName: "BACHELOR", HName: "कुंवारा/कुवारी" },
  { Id: "DIVORCED", EName: "DIVORCED", HName: "तलाकशुदा" },
];

const MaritalStatus = ({ customdata, setCustomdata, form }) => {
  const [visible, setVisible] = useState(false);

  const handleConfirm = (value) => {
    const selectedValue = value[0];
    form.setFieldsValue({ maritalStatus: selectedValue });
    setVisible(false);
    const selectedMaritalStatus = maritalStatusOptions.find(
      (g) => g.EName === selectedValue
    );
    setCustomdata({ ...customdata, maritalStatus: selectedMaritalStatus.Id });
    Toast.show(`Selected: ${selectedMaritalStatus?.EName}`);
  };

  return (
    <Form.Item
      name="maritalStatus"
      rules={[{ required: true, message: "Please select your marital status" }]}
    >
      <div
        onClick={() => setVisible(true)}
        style={{
          padding: "6px 0",
          color: "var(--adm-color-text)",
          cursor: "pointer",
        }}
      >
        {(() => {
          const selectedValue = form.getFieldValue("maritalStatus");
          const selectedMaritalStatus = maritalStatusOptions.find(
            (g) => g.EName === selectedValue
          );
          return selectedMaritalStatus
            ? `${selectedMaritalStatus.EName} (${selectedMaritalStatus.HName})`
            : "Select Marital Status";
        })()}
      </div>

      <Picker
        columns={[
          maritalStatusOptions.map((marital) => ({
            label: `${marital.EName} (${marital.HName})`,
            value: marital.EName,
          })),
        ]}
        visible={visible}
        onClose={() => setVisible(false)}
        onConfirm={handleConfirm}
      />
    </Form.Item>
  );
};

export default MaritalStatus;
