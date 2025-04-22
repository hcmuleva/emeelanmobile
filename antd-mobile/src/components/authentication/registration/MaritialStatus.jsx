

import React, { useState } from 'react';
import { Form, Picker, Button, Toast } from 'antd-mobile';

const marititalstatus = [
  { Id: "MARRIED", EName: "MARRIED", HName: "शादीशुदा" },
  { Id: "NOTMARRIED", EName: "BACHELOR", HName: "कुंवारा/कुवारी" },
  { Id: "DIVORCED", EName: "DIVORCED", HName: "तलाकशुदा" },
];

const MaritialStatus = ({ customdata, setCustomdata }) => {
  const [name, label] = ["marititalstatus", "marititalstatus"];

  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const handleConfirm = (value) => {
    form.setFieldsValue({ [name]: value[0] });
    setVisible(false);
    const selectedMaritialStatus = marititalstatus.find(g => g.EName === value[0]);
    setCustomdata({ ...customdata, marititalstatus: selectedMaritialStatus.Id });
    Toast.show(`Selected: ${selectedMaritialStatus?.EName}`);
  };

  return (
    <Form.Item name={name} label={label}>
      <div
        onClick={() => setVisible(true)}
        style={{
          padding: '6px 0',
          color: 'var(--adm-color-text)',
          cursor: 'pointer'
        }}
      >
        {(() => {
          const selectedValue = form.getFieldValue(name);
          const selectedMaritialStatus = marititalstatus.find(g => g.EName === selectedValue);
          return selectedMaritialStatus
            ? `${selectedMaritialStatus.EName} (${selectedMaritialStatus.HName})`
            : 'Select Maritial Status';
        })()}
      </div>

      <Picker
        columns={[
          marititalstatus.map(maritial => ({
            label: `${maritial.EName} (${maritial.HName})`, // Display format
            value: maritial.EName // Store only EName
          }))
        ]}
        visible={visible}
        onClose={() => setVisible(false)}
        onConfirm={handleConfirm}
      />
    </Form.Item>
  );
};
export default MaritialStatus;


