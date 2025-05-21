import React, { useState } from "react";
import { Picker, Toast } from "antd-mobile";

const GotraSelector = ({
  form,
  gotra_for,
  gotraData,
  customdata,
  setCustomdata,
}) => {
  const [visible, setVisible] = useState(false);
  const fieldName = "gotra";

  const selectedValue = form?.getFieldValue?.(fieldName) || ""; // Safe access
  const selectedGotra =
    gotraData.find((g) => g.EName === selectedValue) ||
    gotraData.find((g) => g.Id === customdata?.gotra); // fallback for customdata

  const handleConfirm = (value) => {
    const selected = gotraData.find((g) => g.EName === value[0]);

    if (form?.setFieldValue) {
      form.setFieldValue(fieldName, value[0]);
    }

    setCustomdata({
      ...customdata,
      ...(gotra_for
        ? { matranal_gotra: selected?.Id }
        : { gotra: selected?.Id }),
    });

    setVisible(false);
    Toast.show({ content: `Selected: ${selected?.EName}` });
  };

  return (
    <>
      <div
        onClick={() => setVisible(true)}
        style={{
          padding: "6px 0",
          color: "var(--adm-color-text)",
          cursor: "pointer",
          marginLeft: "16px",
        }}
      >
        {selectedGotra
          ? `${selectedGotra.EName} (${selectedGotra.HName})`
          : "Select Gotra"}
      </div>
      <Picker
        columns={[
          gotraData.map((gotra) => ({
            label: `${gotra.EName} (${gotra.HName})`,
            value: gotra.EName,
          })),
        ]}
        visible={visible}
        onClose={() => setVisible(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default GotraSelector;
