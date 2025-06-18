import React, { useState } from "react";
import { Form, Picker, Input, Toast } from "antd-mobile";

const professionOptions = [
  { label: "Business", value: "BUSINESS" },
  { label: "Engineer", value: "ENGINEER" },
  { label: "Doctor", value: "DOCTOR" },
  { label: "Teacher", value: "TEACHER" },
  { label: "CA", value: "CA" },
  { label: "Service", value: "SERVICE" },
  { label: "Housework", value: "HOUSEWORK" },
  { label: "Govt Job", value: "GOVTJOB" },
  { label: "Private Job", value: "PRIVATEJOB" },
  { label: "Student", value: "STUDENT" },
  { label: "Other", value: "OTHER" },
];

const ProfessionSelector = ({ customdata, setCustomdata, form }) => {
  const [visible, setVisible] = useState(false);
  const [customProfession, setCustomProfession] = useState("");

  const handleConfirm = (value) => {
    const selectedProfession = value[0];
    form.setFieldsValue({ Profession: selectedProfession });
    setVisible(false);
    setCustomdata({ ...customdata, profession: selectedProfession });
    if (selectedProfession !== "OTHER") {
      setCustomProfession("");
      form.setFieldsValue({ CustomProfession: "" });
    }
    const selectedOption = professionOptions.find(
      (p) => p.value === selectedProfession
    );
    Toast.show(`Selected: ${selectedOption?.label}`);
  };

  return (
    <>
      <Form.Item
        name="Profession"
        rules={[{ required: true, message: "Please select your profession" }]}
      >
        <div
          onClick={() => setVisible(true)}
          style={{
            padding: "0px 0px",
            color: "var(--adm-color-text)",
            cursor: "pointer",
          }}
        >
          {(() => {
            const selectedValue = form.getFieldValue("Profession");
            const selectedProfession = professionOptions.find(
              (p) => p.value === selectedValue
            );
            return selectedProfession
              ? selectedProfession.label
              : "Select Profession";
          })()}
        </div>
      </Form.Item>

      <Picker
        columns={[
          professionOptions.map((p) => ({ label: p.label, value: p.value })),
        ]}
        visible={visible}
        onClose={() => setVisible(false)}
        onConfirm={handleConfirm}
      />

      {form.getFieldValue("Profession") === "OTHER" && (
        <Form.Item
          name="CustomProfession"
          rules={[{ required: true, message: "Please enter your profession" }]}
        >
          <Input
            placeholder="Enter your profession"
            value={customProfession}
            onChange={(value) => {
              setCustomProfession(value);
              setCustomdata({ ...customdata, customProfession: value });
            }}
            clearable
          />
        </Form.Item>
      )}
    </>
  );
};

export default ProfessionSelector;
