import {
  Button,
  Card,
  Form,
  Input,
  Selector,
  Space,
  Tabs,
  TextArea,
  Toast,
} from "antd-mobile";
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
  const [preferences, setPreferences] = useState(
    user?.mybasicdata?.preferences || []
  );
  const [form] = Form.useForm();
  const [editingIndex, setEditingIndex] = useState(null);
  const [activeTab, setActiveTab] = useState(
    preferences.length ? "view" : "edit"
  );

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

  // Get appropriate emoji based on preference
  const getPreferenceEmoji = (pref) => {
    return "💖";
  };

  return (
    <Card
      style={{
        borderRadius: "8px",
        margin: "10px 0",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        border: "1px solid #eee",
      }}
      headerStyle={{ color: "#8B0000", fontWeight: "bold" }}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "18px" }}>💖 Partner Preferences</span>
        </div>
      }
    >
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        style={{
          "--title-active-color": "#8B0000",
          "--active-line-color": "#8B0000",
        }}
      >
        <Tabs.Tab title="View Preferences" key="view">
          {preferences.length > 0 ? (
            <>
              {preferences.map((pref, index) => (
                <Card
                  key={index}
                  style={{
                    margin: "10px 0",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
                    border: "1px solid #eee",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: "#8B0000",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                      }}
                    >
                      {getPreferenceEmoji(pref)}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          color: "#8B0000",
                        }}
                      >
                        Preference {index + 1}
                      </div>
                      <div style={{ fontSize: 14, color: "#666" }}>
                        {pref.agerange} Years
                      </div>
                    </div>
                  </div>

                  <div
                    style={{ margin: "10px 0", fontSize: 14, color: "#333" }}
                  >
                    <div style={{ margin: "3px 0" }}>
                      <strong>Marital Status:</strong> {pref.maritialstatus}
                    </div>
                    <div style={{ margin: "3px 0" }}>
                      <strong>Skin Tone:</strong> {pref.color}
                    </div>
                    <div style={{ margin: "3px 0" }}>
                      <strong>Business Type:</strong> {pref.businesstype}
                    </div>
                    <div style={{ margin: "3px 0" }}>
                      <strong>Height:</strong> {pref.height}
                    </div>
                    {pref.description && (
                      <div style={{ margin: "3px 0" }}>
                        <strong>Description:</strong> {pref.description}
                      </div>
                    )}
                  </div>

                  <Space block justify="between" style={{ marginTop: 10 }}>
                    <Button
                      size="small"
                      style={{
                        backgroundColor: "#8B0000",
                        color: "white",
                        borderRadius: "4px",
                        border: "none",
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
                        border: "none",
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
            <div>No preferences added yet.</div>
          )}
          <Button
            block
            style={{
              backgroundColor: "#8B0000",
              color: "white",
              marginTop: 15,
              borderRadius: "4px",
              border: "none",
            }}
            onClick={handleSaveToServer}
          >
            Save All Preferences
          </Button>
        </Tabs.Tab>

        <Tabs.Tab title="Add / Edit Preference" key="edit">
          <Form
            form={form}
            initialValues={defaultFormValues}
            layout="vertical"
            style={{ padding: "10px 0" }}
          >
            <Form.Item
              name="agerange"
              label="Age Range"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Input
                placeholder="e.g. 25-30"
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "10px",
                }}
              />
            </Form.Item>

            <Form.Item name="maritialstatus" label="Marital Status">
              <Selector
                options={maritalStatusOptions}
                value={form.getFieldValue("maritialstatus")}
                onChange={(val) => form.setFieldValue("maritialstatus", val)}
                style={{ "--checked-color": "#8B000040" }}
              />
            </Form.Item>

            <Form.Item
              name="color"
              label="Skin Tone"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Input
                placeholder="e.g. Fair, Wheatish"
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "10px",
                }}
              />
            </Form.Item>

            <Form.Item name="businesstype" label="Business Type">
              <Selector
                options={businessTypeOptions}
                value={form.getFieldValue("businesstype")}
                onChange={(val) => form.setFieldValue("businesstype", val)}
                style={{ "--checked-color": "#8B000040" }}
              />
            </Form.Item>

            <Form.Item
              name="height"
              label="Height"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Input
                placeholder="e.g. 5'6"
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "10px",
                }}
              />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              style={{ display: "flex", alignItems: "center" }}
            >
              <TextArea
                placeholder="Extra details or expectations"
                rows={3}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "10px",
                }}
              />
            </Form.Item>

            <Button
              block
              style={{
                backgroundColor: "#8B0000",
                color: "white",
                marginTop: 15,
                borderRadius: "4px",
                border: "none",
              }}
              onClick={handleAddOrUpdate}
            >
              {editingIndex !== null ? "Update Preference" : "Add Preference"}
            </Button>
          </Form>
        </Tabs.Tab>
      </Tabs>
    </Card>
  );
};

export default PreferenceInfo;
