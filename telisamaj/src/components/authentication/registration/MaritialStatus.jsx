import React, { useState } from "react";
import { Form, Picker, Toast } from "antd-mobile";

const maritalStatusOptions = [
  { Id: "MARRIED", EName: "MARRIED", HName: "शादीशुदा" },
  { Id: "NOTMARRIED", EName: "BACHELOR", HName: "कुंवारा/कुवारी" },
  { Id: "DIVORCED", EName: "DIVORCED", HName: "तलाकशुदा" },
  { Id: "WIDOW", EName: "WIDOW", HName: "विधवा" },
  { Id: "VIDUR", EName: "VIDUR", HName: "विधुर" },
];

const MaritalStatus = ({ customdata, setCustomdata, form }) => {
  const [visible, setVisible] = useState(false);

  const handleConfirm = (value) => {
    const selectedValue = value[0];
    form.setFieldsValue({
      marital: selectedValue,
    });
    setVisible(false);
    const selectedMaritalStatus = maritalStatusOptions.find(
      (g) => g.EName === selectedValue
    );
    setCustomdata({ ...customdata, marital: selectedMaritalStatus.Id });
    Toast.show(`Selected: ${selectedMaritalStatus?.EName}`);
  };

  return (
    <Form.Item
      name="marital"
      rules={[{ required: true, message: "Please select your marital status" }]}
    >
      <div
        onClick={() => setVisible(true)}
        style={{
          color: "var(--adm-color-text)",
          cursor: "pointer",
        }}
      >
        {(() => {
          const selectedValue = form.getFieldValue("marital");
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
