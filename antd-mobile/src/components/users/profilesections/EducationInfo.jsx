import React, { useContext, useState, useEffect } from "react";
import { Form, Input, Selector, Button, Tabs, Toast, Space } from "antd-mobile";
import { AuthContext } from "../../../context/AuthContext";
import { updateUserData } from "../../../services/api";

const levelOptions = [
  { label: "Primary", value: "PRIMARY" },
  { label: "High School", value: "HIGHSCHOOL" },
  { label: "Diploma", value: "DIPLOMA" },
  { label: "Degree", value: "DEGREE" },
  { label: "Master", value: "MASTER" },
  { label: "PhD", value: "PHD" },
];

const defaultFormValues = {
  level: "DEGREE",
  degreeName: "",
  year: "",
  institute: "",
  location: "",
};

const EducationInfo = () => {
  const { user, setUser } = useContext(AuthContext);
  const [educations, setEducations] = useState(user?.mybasicdata?.educations || []);
  const [form] = Form.useForm();
  const [editingIndex, setEditingIndex] = useState(null);
  const [activeTab, setActiveTab] = useState(educations.length ? "view" : "edit");

  useEffect(() => {
    if (educations.length === 0) setActiveTab("edit");
  }, [educations]);

  const handleEdit = (index) => {
    form.setFieldsValue(educations[index]);
    setEditingIndex(index);
    setActiveTab("edit");
  };

  const handleDelete = (index) => {
    const updated = [...educations];
    updated.splice(index, 1);
    setEducations(updated);
  };

  const handleAddOrUpdate = () => {
    form.validateFields().then((values) => {
      const updated = [...educations];
      if (editingIndex !== null) {
        updated[editingIndex] = values;
        setEditingIndex(null);
      } else {
        updated.push(values);
      }
      setEducations(updated);
      form.resetFields();
      setActiveTab("view");
    });
  };

  const handleSaveToServer = async () => {
    const updatedUser = {
      ...user,
      mybasicdata: { ...user.mybasicdata, educations },
    };

    try {
      await updateUserData({ mybasicdata: updatedUser.mybasicdata }, user.id);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      Toast.show({ icon: "success", content: "Education data saved!" });
    } catch (err) {
      console.error("Save error", err);
      Toast.show({ icon: "fail", content: "Failed to save education data." });
    }
  };

  return (
    <Tabs activeKey={activeTab} onChange={setActiveTab}>
      <Tabs.Tab title="Education Cards" key="view">
        {educations.length ? (
          <>
            {educations.map((edu, index) => (
              <div
                key={index}
                style={{
                  background: "linear-gradient(135deg, #43cea2, #185a9d)",
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
                  <div style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
                    🎓 {edu.degreeName || "Degree Name"}
                  </div>
                  <div style={{ fontSize: 16, marginBottom: 4 }}>
                    <strong>📘 Level:</strong> {edu.level}
                  </div>
                  <div style={{ fontSize: 16, marginBottom: 4 }}>
                    <strong>🏛️ Institute:</strong> {edu.institute}
                  </div>
                  <div style={{ fontSize: 16, marginBottom: 4 }}>
                    <strong>📍 Location:</strong> {edu.location}
                  </div>
                  <div style={{ fontSize: 16 }}>
                    <strong>📅 Year:</strong> {edu.year}
                  </div>

                  <hr style={{ margin: "16px 0" }} />

                  <Space block justify="between">
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
              style={{ backgroundColor: "#004080", color: "white" }}
              onClick={handleSaveToServer}
            >
              Save Education Info
            </Button>
          </>
        ) : (
          <div>No education records added yet.</div>
        )}
      </Tabs.Tab>

      <Tabs.Tab title="Add / Edit Education" key="edit">
        <div
          style={{
            background: "linear-gradient(135deg, #43cea2, #185a9d)",
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
              <Form.Item name="level" label="Level">
                <Selector
                  options={levelOptions}
                  value={form.getFieldValue("level")}
                  onChange={(val) => form.setFieldValue("level", val)}
                />
              </Form.Item>

              <Form.Item name="degreeName" label="Degree Name">
                <Input placeholder="e.g. BSc Computer Science" />
              </Form.Item>

              <Form.Item name="year" label="Passing Year">
                <Input type="number" placeholder="e.g. 2022" />
              </Form.Item>

              <Form.Item name="institute" label="Institute Name">
                <Input placeholder="e.g. BITS Pilani" />
              </Form.Item>

              <Form.Item name="location" label="Institute Location">
                <Input placeholder="e.g. Hyderabad" />
              </Form.Item>

              <Space block justify="center" style={{ marginTop: 20 }}>
                <Button
                  block
                  color="primary"
                  style={{ backgroundColor: "#004080", color: "white" }}
                  onClick={handleAddOrUpdate}
                >
                  {editingIndex !== null ? "Update Education" : "Add Education"}
                </Button>
              </Space>
            </Form>
          </div>
        </div>
      </Tabs.Tab>
    </Tabs>
  );
};

export default EducationInfo;
