import { Button, Form, Input, Selector, Space, Tabs, TextArea, Toast } from "antd-mobile";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { updateUser } from "../../../services/api";

const professionOptions = [
  { label: "Job", value: "JOB" },
  { label: "Business", value: "BUSINESS" },
  { label: "Freelance", value: "FREELANCE" },
  { label: "Research", value: "RESEARCH" },
  { label: "Other", value: "OTHER" },
];

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

const ProfessionInfo = () => {
  const { user, setUser } = useContext(AuthContext);
  const [professions, setProfessions] = useState(user?.mybasicdata?.professions || []);
  const [form] = Form.useForm();
  const [editingIndex, setEditingIndex] = useState(null);
  const [activeTab, setActiveTab] = useState(professions.length ? "view" : "edit");

  useEffect(() => {
    if (professions.length === 0) setActiveTab("edit");
  }, [professions]);

  const handleEdit = (index) => {
    form.setFieldsValue(professions[index]);
    setEditingIndex(index);
    setActiveTab("edit");
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
      setActiveTab("view");
    });
  };

  const handleSaveToServer = async () => {
    const updatedUser = {
      ...user,
      mybasicdata: { ...user.mybasicdata, professions },
    };
    try {
      await updateUser({ mybasicdata: updatedUser.mybasicdata }, user.id);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      Toast.show({ icon: "success", content: "Profession data saved!" });
    } catch (err) {
      console.error("Save error", err);
      Toast.show({ icon: "fail", content: "Failed to save profession data." });
    }
  };

  return (
    <Tabs activeKey={activeTab} onChange={setActiveTab}>
      <Tabs.Tab title="View Profession History" key="view">
        {professions.length ? (
          <>
            {professions.map((prof, index) => (
              <div
                key={index}
                style={{
                  background: "linear-gradient(135deg, #89f7fe, #66a6ff)",
                  padding: 16,
                  borderRadius: 20,
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.85)",
                    borderRadius: 20,
                    padding: 16,
                    boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                  }}
                >
                  <div style={{ fontSize: 20, fontWeight: "bold", color: "#003366" }}>
                    🔧 {prof.title} <span style={{ fontSize: 14 }}>({prof.type})</span>
                  </div>
                  <div style={{ fontSize: 16, marginBottom: 4 }}>
                    🏢 <b>{prof.organization}</b> | 📍 {prof.location}
                  </div>
                  <div style={{ fontSize: 14, marginBottom: 8 }}>
                    🗓 {prof.fromYear} – {prof.toYear || "Present"}
                  </div>
                  {prof.details && (
                    <div style={{ fontSize: 14, fontStyle: "italic", marginBottom: 6 }}>
                      “{prof.details}”
                    </div>
                  )}
                  <div style={{ fontSize: 14 }}>
                    💰 <b>Salary:</b> ₹{prof.salary} | ⏳ <b>Experience:</b> {prof.totalExperience} years
                  </div>

                  <Space justify="between" style={{ marginTop: 12 }}>
                    <Button size="mini" color="primary" onClick={() => handleEdit(index)}>
                      Edit
                    </Button>
                    <Button size="mini" color="danger" onClick={() => handleDelete(index)}>
                      Delete
                    </Button>
                  </Space>
                </div>
              </div>
            ))}
            <Button
              block
              style={{ backgroundColor: "#003366", color: "white" }}
              onClick={handleSaveToServer}
            >
              Save Profession Info
            </Button>
          </>
        ) : (
          <div>No profession records yet.</div>
        )}
      </Tabs.Tab>

      <Tabs.Tab title="Add / Edit Profession" key="edit">
        <div
          style={{
            background: "linear-gradient(135deg, #89f7fe, #66a6ff)",
            padding: 10,
            borderRadius: 20,
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              borderRadius: 20,
              padding: 10,
              boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
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
                <Input type="text" placeholder="e.g. 2023 or Present" />
              </Form.Item>

              <Form.Item name="details" label="Details">
                <TextArea placeholder="Describe responsibilities or key highlights" rows={3} />
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

              <Space block justify="center" style={{ marginTop: 20 }}>
                <Button
                  block
                  color="primary"
                  style={{ backgroundColor: "#003366", color: "white" }}
                  onClick={handleAddOrUpdate}
                >
                  {editingIndex !== null ? "Update Profession" : "Add Profession"}
                </Button>
              </Space>
            </Form>
          </div>
        </div>
      </Tabs.Tab>
    </Tabs>
  );
};

export default ProfessionInfo;
