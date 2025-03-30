import React, { useState } from "react";
import { Modal, Select, Form, Button, Input, InputNumber } from "antd";
import dayjs from "dayjs";

export default function FilterUserDialog({ isFilterModalOpen, setIsFilterModalOpen }) {
  const [form] = Form.useForm();
  const [filters, setFilters] = useState(null);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const handleApplyFilters = (values) => {
    console.log("Form values:", values);

    const { ageRange, gotra, location, profession } = values;

    if (!ageRange || ageRange.length !== 2) {
      console.warn("Invalid age range selected");
      return;
    }

    const [minAge, maxAge] = ageRange;
    const startDOB = dayjs().subtract(maxAge, "year").format("YYYY-MM-DD");
    const endDOB = dayjs().subtract(minAge, "year").format("YYYY-MM-DD");

    const newFilters = [
      { field: "Sex", operator: "eq", value: "Female" },
      { field: "DOB", operator: "gte", value: startDOB },
      { field: "DOB", operator: "lte", value: endDOB },
      gotra && { field: "Gotra", operator: "eq", value: gotra },
      location && { field: "Location", operator: "eq", value: location },
      profession && { field: "Profession", operator: "eq", value: profession },
    ].filter(Boolean);

    setFilters(newFilters);
    setIsFilterApplied(true);
    setIsFilterModalOpen(false);
  };

  return (
    <Modal
      title="Filter Users"
      open={isFilterModalOpen}
      onCancel={() => setIsFilterModalOpen(false)}
      footer={null}
    >
      <Form form={form} onFinish={handleApplyFilters} layout="vertical">
        {/* Age Range */}
        <Form.Item label="Age Range">

  <div style={{ display: "flex", gap: "10px" }}>
    <Form.Item name={["ageRange", "min"]} noStyle>
      <InputNumber placeholder="Min Age" min={18} />
    </Form.Item>
    <span>to</span>
    <Form.Item name={["ageRange", "max"]} noStyle>
      <InputNumber placeholder="Max Age" min={24} />
    </Form.Item>
  </div>
</Form.Item>

        {/* Gotra */}
        <Form.Item label="Gotra" name="gotra">
          <Select placeholder="Select Gotra">
            <Select.Option value="Bhardwaj">Bhardwaj</Select.Option>
            <Select.Option value="Kashyap">Kashyap</Select.Option>
          </Select>
        </Form.Item>

        {/* Location */}
        <Form.Item label="Location" name="location">
          <Select placeholder="Select Location">
            <Select.Option value="Delhi">Delhi</Select.Option>
            <Select.Option value="Mumbai">Mumbai</Select.Option>
          </Select>
        </Form.Item>

        {/* Profession */}
        <Form.Item label="Profession" name="profession">
          <Select placeholder="Select Profession">
            <Select.Option value="Engineer">Engineer</Select.Option>
            <Select.Option value="Doctor">Doctor</Select.Option>
          </Select>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Apply Filters
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
