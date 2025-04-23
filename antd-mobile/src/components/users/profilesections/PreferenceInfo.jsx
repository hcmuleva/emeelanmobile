import { Button, Form, Input, Selector, Space, Tabs, TextArea, Toast } from "antd-mobile";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { updateUser } from "../../../services/api";

const maritalStatusOptions = [
  { label: "Married", value: "Married" },
  { label: "Bachelor", value: "Bachelor" },
  { label: "Widow", value: "Widow" },
  { label: "Vidur", value: "Vidur" },
];

const businessTypeOptions = [
  { label: "HouseWork", value: "HouseWork" },
  { label: "Job", value: "Job" },
  { label: "BusinessAny", value: "BusinessAny" },
];

const defaultFormValues = {
  agerange: "",
  maritialstatus: "Bachelor",
  color: "",
  businesstype: "Job",
  height: "",
  description: "",
};

const PreferenceInfo = () => {
  const { user, setUser } = useContext(AuthContext);
  const [preferences, setPreferences] = useState(user?.mybasicdata?.preferences || []);
  const [form] = Form.useForm();
  const [editingIndex, setEditingIndex] = useState(null);
  const [activeTab, setActiveTab] = useState(preferences.length ? "view" : "edit");

  useEffect(() => {
    if (preferences.length === 0) setActiveTab("edit");
  }, [preferences]);

  const handleEdit = (index) => {
    form.setFieldsValue(preferences[index]);
    setEditingIndex(index);
    setActiveTab("edit");
  };

  const handleDelete = (index) => {
    const updated = [...preferences];
    updated.splice(index, 1);
    setPreferences(updated);
  };

  const handleAddOrUpdate = () => {
    form.validateFields().then((values) => {
      const updated = [...preferences];
      if (editingIndex !== null) {
        updated[editingIndex] = values;
        setEditingIndex(null);
      } else {
        updated.push(values);
      }
      setPreferences(updated);
      form.resetFields();
      setActiveTab("view");
    });
  };

  const handleSaveToServer = async () => {
    const updatedUser = {
      ...user,
      mybasicdata: { ...user.mybasicdata, preferences },
    };

    try {
      await updateUser({ mybasicdata: updatedUser.mybasicdata }, user.id);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      Toast.show({ icon: "success", content: "Preferences saved!" });
    } catch (err) {
      console.error("Save error", err);
      Toast.show({ icon: "fail", content: "Failed to save preferences." });
    }
  };

  return (
    <Tabs activeKey={activeTab} onChange={setActiveTab}>
      <Tabs.Tab title="View Preferences" key="view">
        {preferences.length ? (
          <>
            {preferences.map((pref, index) => (
              <div
                key={index}
                style={{
                  background: "linear-gradient(135deg, #ff9966, #ff5e62)",
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
                    💖 Preference Summary
                  </div>
                  <div><strong>🎯 Age Range:</strong> {pref.agerange}</div>
                  <div><strong>💍 Marital Status:</strong> {pref.maritialstatus}</div>
                  <div><strong>🎨 Color:</strong> {pref.color}</div>
                  <div><strong>🏢 Business Type:</strong> {pref.businesstype}</div>
                  <div><strong>📏 Height:</strong> {pref.height}</div>
                  <div><strong>📝 Description:</strong> {pref.description}</div>

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
              style={{ backgroundColor: "#d42f00", color: "white" }}
              onClick={handleSaveToServer}
            >
              Save Preferences
            </Button>
          </>
        ) : (
          <div>No preferences added yet.</div>
        )}
      </Tabs.Tab>

      <Tabs.Tab title="Add / Edit Preference" key="edit">
        <div
          style={{
            background: "linear-gradient(135deg, #ff9966, #ff5e62)",
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
              <Form.Item name="agerange" label="Age Range">
                <Input placeholder="e.g. 25-30" />
              </Form.Item>

              <Form.Item name="maritialstatus" label="Marital Status">
                <Selector
                  options={maritalStatusOptions}
                  value={form.getFieldValue("maritialstatus")}
                  onChange={(val) => form.setFieldValue("maritialstatus", val)}
                />
              </Form.Item>

              <Form.Item name="color" label="Color">
                <Input placeholder="e.g. Fair, Wheatish" />
              </Form.Item>

              <Form.Item name="businesstype" label="Business Type">
                <Selector
                  options={businessTypeOptions}
                  value={form.getFieldValue("businesstype")}
                  onChange={(val) => form.setFieldValue("businesstype", val)}
                />
              </Form.Item>

              <Form.Item name="height" label="Height">
                <Input placeholder='e.g. 5\6' />
              </Form.Item>

              <Form.Item name="description" label="Description">
                <TextArea placeholder="Extra details or expectations" rows={3} />
              </Form.Item>

              <Space block justify="center" style={{ marginTop: 20 }}>
                <Button
                  block
                  color="primary"
                  style={{ backgroundColor: "#d42f00", color: "white" }}
                  onClick={handleAddOrUpdate}
                >
                  {editingIndex !== null ? "Update Preference" : "Add Preference"}
                </Button>
              </Space>
            </Form>
          </div>
        </div>
      </Tabs.Tab>
    </Tabs>
  );
};

export default PreferenceInfo;
