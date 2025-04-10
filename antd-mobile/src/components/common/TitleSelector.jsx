// TitleSelector.jsx
import React, { useState } from "react";
import { Popup, List, Radio, Selector, Button } from "antd-mobile";
export const indianTitles = [
    "Mr.", "Mrs.", "Miss", "Master", "Dr.", "Prof.",
    "Sri", "Smt", "Shrimati", "Kumari", "Babu", "Pandit",
    "Swami", "Acharya", "Adv.", "Er.", "CA", "CS", "Lt.",
  ];
const TitleSelector = ({ value, onChange }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button
        block
        onClick={() => setVisible(true)}
        style={{
          textAlign: "left",
          padding: "0 12px",
          height: "40px",
          lineHeight: "40px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
        {value || "Select Title"}
      </Button>

      <Popup
        visible={visible}
        onMaskClick={() => setVisible(false)}
        bodyStyle={{ height: "50vh" }}
      >
        <List header="Select Your Title">
          <Radio.Group
            value={value}
            onChange={(val) => {
              onChange(val);
              setVisible(false);
            }}
          >
            {indianTitles.map((title, idx) => (
              <Radio key={idx} value={title} style={{ padding: "10px 0" }}>
                {title}
              </Radio>
            ))}
          </Radio.Group>
        </List>
      </Popup>
    </>
  );
};

export default TitleSelector;
