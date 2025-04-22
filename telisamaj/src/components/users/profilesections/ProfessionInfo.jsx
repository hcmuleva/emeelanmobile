import React, { useContext, useState } from "react";
import { Form, Input, Selector, Button, Toast, Space, TextArea } from "antd-mobile";
import { AuthContext } from "../../../context/AuthContext";
import { updateUserData } from "../../../services/api";

const professionOptions = [
  { label: "Job", value: "JOB" },
  { label: "Business", value: "BUSINESS" },
  { label: "Freelance", value: "FREELANCE" },
  { label: "Research", value: "RESEARCH" },
  { label: "Other", value: "OTHER" },
];

const ProfessionInfo = () => {
  const { user, setUser, jwt } = useContext(AuthContext);
  const [professions, setProfessions] = useState(user?.mybasicdata?.professions || []);
  const [form] = Form.useForm();
  const [editingIndex, setEditingIndex] = useState(null);

  const defaultFormValues = {
    type: "JOB",
    title: "",
    organization: "",
    fromYear: "",
    toYear: "",
    details: "",
    salary: "",
    totalExperience: "",
    location: "",
  };

  const handleEdit = (index) => {
    form.setFieldsValue(professions[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updated = [...professions];
    updated.splice(index, 1);
    setProfessions(updated);
  };

  const handleAddOrUpdate = () => {
    form.validateFields().then((values) => {
      const updated = [...professions];
      if (editingIndex !== null) {
        updated[editingIndex] = values;
        setEditingIndex(null);
      } else {
        updated.push(values);
      }
      setProfessions(updated);
      form.resetFields();
    });
  };

  const handleSaveToServer = async () => {
    const updatedUser = {
      ...user,
      mybasicdata: {
        ...user.mybasicdata,
        professions,
      },
    };

    try {
      await updateUserData({ mybasicdata: updatedUser.mybasicdata }, user.id);
      
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser)); // ✅ Sync localStorage
      
      Toast.show({ icon: "success", content: "Profession data saved!" });
    } catch (err) {
      console.error("Save error", err);
      Toast.show({ icon: "fail", content: "Failed to save profession data." });
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <Form form={form} initialValues={defaultFormValues} layout="horizontal">
        <Form.Item name="type" label="Profession Type">
          <Selector
            options={professionOptions}
            value={form.getFieldValue("type")}
            onChange={(val) => form.setFieldValue("type", val)}
          />
        </Form.Item>

        <Form.Item name="title" label="Title / Role">
          <Input placeholder="e.g. Software Engineer, Founder" />
        </Form.Item>

        <Form.Item name="organization" label="Organization">
          <Input placeholder="e.g. Google, MyStartup" />
        </Form.Item>

        <Form.Item name="fromYear" label="From (Year)">
          <Input type="number" placeholder="e.g. 2019" />
        </Form.Item>

        <Form.Item name="toYear" label="To (Year)">
          <Input type="number" placeholder="e.g. 2023 or Present" />
        </Form.Item>

        <Form.Item name="details" label="Details">
          <TextArea
            placeholder="Describe responsibilities or key highlights"
            rows={2}
          />
        </Form.Item>

        <Form.Item name="salary" label="Salary">
          <Input type="number" placeholder="e.g. 60000" />
        </Form.Item>

        <Form.Item name="totalExperience" label="Total Experience (Years)">
          <Input type="number" placeholder="e.g. 3" />
        </Form.Item>

        <Form.Item name="location" label="Location">
          <Input placeholder="e.g. Bengaluru" />
        </Form.Item>

        <Button block color="primary" onClick={handleAddOrUpdate}>
          {editingIndex !== null ? "Update Profession" : "Add Profession"}
        </Button>
      </Form>

      <h3>Profession Records</h3>
      {professions.map((prof, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            marginBottom: 10,
            padding: 10,
            borderRadius: 8,
          }}
        >
          <div>
            <b>{prof.type}</b> - {prof.title} at {prof.organization}, {prof.location} ({prof.fromYear} - {prof.toYear})
          </div>
          <div style={{ fontSize: 13 }}>
            {prof.details && <div><b>Details:</b> {prof.details}</div>}
            {prof.salary && <div><b>Salary:</b> ₹{prof.salary}</div>}
            {prof.totalExperience && <div><b>Experience:</b> {prof.totalExperience} years</div>}
          </div>
          <Space style={{ marginTop: 8 }}>
            <Button size="mini" color="primary" onClick={() => handleEdit(index)}>
              Edit
            </Button>
            <Button size="mini" color="danger" onClick={() => handleDelete(index)}>
              Delete
            </Button>
          </Space>
        </div>
      ))}

      <Button
        block
        style={{ backgroundColor: "#004080", color: "white", marginTop: 16 }}
        onClick={handleSaveToServer}
      >
        Save Profession Info
      </Button>
    </div>
  );
};

export default ProfessionInfo;
