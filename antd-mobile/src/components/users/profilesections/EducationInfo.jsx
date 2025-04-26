import { Button, Form, Input, Selector, Space, Tabs, Toast, Card } from "antd-mobile";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { updateUser } from "../../../services/api";

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
      await updateUser({ mybasicdata: updatedUser.mybasicdata }, user.id);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      Toast.show({ icon: "success", content: "Education data saved!" });
    } catch (err) {
      console.error("Save error", err);
      Toast.show({ icon: "fail", content: "Failed to save education data." });
    }
  };

  return (
    <Card
      style={{
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #eee',
      }}
      headerStyle={{ color: '#8B0000', fontWeight: 'bold' }}
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '18px' }}>🎓 Education Information</span>
        </div>
      }
    >
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        style={{
          '--title-active-color': '#8B0000',
          '--active-line-color': '#8B0000',
        }}
      >
        <Tabs.Tab title="Education Records" key="view">
          {educations.length ? (
            <>
              {educations.map((edu, index) => (
                <Card
                  key={index}
                  style={{
                    margin: '10px 0',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #eee',
                  }}
                >
                  <div style={{ margin: '5px 0' }}>
                    <div style={{ fontSize: 16, fontWeight: "bold", color: "#8B0000", marginBottom: 5 }}>
                      {edu.degreeName || "Degree"}
                    </div>
                    <div style={{ fontSize: 14, color: "#333", margin: '3px 0' }}>
                      <strong>Level:</strong> {edu.level}
                    </div>
                    <div style={{ fontSize: 14, color: "#333", margin: '3px 0' }}>
                      <strong>Institute:</strong> {edu.institute}
                    </div>
                    <div style={{ fontSize: 14, color: "#333", margin: '3px 0' }}>
                      <strong>Location:</strong> {edu.location}
                    </div>
                    <div style={{ fontSize: 14, color: "#333", margin: '3px 0' }}>
                      <strong>Year:</strong> {edu.year}
                    </div>
                  </div>

                  <Space block justify="between" style={{ marginTop: 10 }}>
                    <Button
                      size="small"
                      style={{
                        backgroundColor: "#8B0000",
                        color: "white",
                        borderRadius: "4px",
                        border: "none"
                      }}
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      style={{
                        backgroundColor: "#888",
                        color: "white",
                        borderRadius: "4px",
                        border: "none"
                      }}
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </Button>
                  </Space>
                </Card>
              ))}
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px 0', color: '#666' }}>
              No education records added yet. Click the "Add / Edit Education" tab to add information.
            </div>
          )}

          <Button
            block
            style={{
              backgroundColor: "#8B0000",
              color: "white",
              marginTop: 15,
              borderRadius: "4px",
              border: "none"
            }}
            onClick={handleSaveToServer}
          >
            Save All Changes
          </Button>
        </Tabs.Tab>

        <Tabs.Tab title="Add / Edit Education" key="edit">
          <Form form={form} initialValues={defaultFormValues} layout="vertical" style={{ padding: '10px 0' }}>
            <Form.Item name="level" label="Education Level">
              <Selector
                options={levelOptions}
                value={form.getFieldValue("level")}
                onChange={(val) => form.setFieldValue("level", val)}
                style={{ '--checked-color': '#8B000040' }}
              />
            </Form.Item>

            <Form.Item name="degreeName" label="Degree Name">
              <Input
                placeholder="e.g. BSc Computer Science"
                style={{ border: "1px solid #ddd", borderRadius: "4px" }}
              />
            </Form.Item>

            <Form.Item name="year" label="Passing Year">
              <Input
                type="number"
                placeholder="e.g. 2022"
                style={{ border: "1px solid #ddd", borderRadius: "4px" }}
              />
            </Form.Item>

            <Form.Item name="institute" label="Institute Name">
              <Input
                placeholder="e.g. BITS Pilani"
                style={{ border: "1px solid #ddd", borderRadius: "4px" }}
              />
            </Form.Item>

            <Form.Item name="location" label="Institute Location">
              <Input
                placeholder="e.g. Hyderabad"
                style={{ border: "1px solid #ddd", borderRadius: "4px" }}
              />
            </Form.Item>

            <Button
              block
              style={{
                backgroundColor: "#8B0000",
                color: "white",
                marginTop: 15,
                borderRadius: "4px",
                border: "none"
              }}
              onClick={handleAddOrUpdate}
            >
              {editingIndex !== null ? "Update Education" : "Add Education"}
            </Button>
          </Form>
        </Tabs.Tab>
      </Tabs>
    </Card>
  );
};

export default EducationInfo;