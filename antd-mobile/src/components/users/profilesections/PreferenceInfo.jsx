import React, { useContext, useState } from "react";
import { Form, Input, Selector, Button, Toast, Space, TextArea } from "antd-mobile";
import { AuthContext } from "../../../context/AuthContext";
import { updateUserData } from "../../../services/api";

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

const PreferenceInfo = () => {
  const { user, setUser, jwt } = useContext(AuthContext);
  const [preferences, setPreferences] = useState(user?.mybasicdata?.preferences || []);
  const [form] = Form.useForm();
  const [editingIndex, setEditingIndex] = useState(null);
  console.log("Preferences", preferences)
  const defaultFormValues = {
    agerange: "",
    maritialstatus: "Bachelor",
    color: "",
    businesstype: "Job",
    height: "",
    description: "",
  };

  const handleEdit = (index) => {
    form.setFieldsValue(preferences[index]);
    setEditingIndex(index);
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
    });
  };

  const handleSaveToServer = async () => {
    const updatedUser = {
      ...user,
      mybasicdata: {
        ...user.mybasicdata,
        preferences,
      },
    };

    try {
      await updateUserData({ mybasicdata: updatedUser.mybasicdata }, jwt, user.id);
      setUser(updatedUser);
      Toast.show({ icon: "success", content: "Preferences saved!" });
    } catch (err) {
      console.error("Save error", err);
      Toast.show({ icon: "fail", content: "Failed to save preferences." });
    }
  };

  return (
    <div>
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
        <Input placeholder={'e.g. 5\'6"'} />

        </Form.Item>

        <Form.Item name="description" label="Description">
          <TextArea placeholder="Extra details or expectations" rows={3} />
        </Form.Item>

        <Button block color="primary" onClick={handleAddOrUpdate}>
          {editingIndex !== null ? "Update Preference" : "Add Preference"}
        </Button>
      </Form>

      <h3 style={{ marginTop: 20 }}>Preference List</h3>
      {preferences.map((pref, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            marginBottom: 10,
            padding: 10,
            borderRadius: 6,
          }}
        >
          <div><b>Age Range:</b> {pref.agerange}</div>
          <div><b>Marital Status:</b> {pref.maritialstatus}</div>
          <div><b>Color:</b> {pref.color}</div>
          <div><b>Business Type:</b> {pref.businesstype}</div>
          <div><b>Height:</b> {pref.height}</div>
          <div><b>Description:</b> {pref.description}</div>

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
        Save Preferences
      </Button>
    </div>
  );
};

export default PreferenceInfo;
