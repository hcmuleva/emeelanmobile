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

// Indian currency formatter function
const formatIndianCurrency = (amount) => {
  if (!amount) return "";

  // Convert to number if it's a string
  const num =
    typeof amount === "string"
      ? parseFloat(amount.replace(/[^\d.]/g, ""))
      : amount;

  if (isNaN(num)) return "";

  // Format using Indian number system
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};

// Function to parse formatted currency back to number
const parseCurrencyToNumber = (formattedValue) => {
  if (!formattedValue) return "";
  return formattedValue.replace(/[^\d]/g, "");
};

const ProfessionInfo = () => {
  const { user, setUser } = useContext(AuthContext);
  const [professions, setProfessions] = useState(
    user?.mybasicdata?.professions || []
  );
  const [form] = Form.useForm();
  const [editingIndex, setEditingIndex] = useState(null);
  const [activeTab, setActiveTab] = useState(
    professions.length ? "view" : "edit"
  );
  const [salaryDisplay, setSalaryDisplay] = useState("");

  const handleEdit = (index) => {
    const professionData = professions[index];
    form.setFieldsValue(professionData);
    // Set the display value for salary
    setSalaryDisplay(
      professionData.salary ? formatIndianCurrency(professionData.salary) : ""
    );
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
      setSalaryDisplay("");
      setActiveTab("view");
    });
  };

  const handleSaveToServer = async () => {
    const updatedUser = {
      ...user,
      mybasicdata: { ...user.mybasicdata, professions },
    };
    try {
      console.log(updatedUser);
      await updateUser({ mybasicdata: updatedUser.mybasicdata }, user.id);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      Toast.show({ icon: "success", content: "Profession data saved!" });
    } catch (err) {
      console.error("Save error", err);
      Toast.show({ icon: "fail", content: "Failed to save profession data." });
    }
  };

  // Handle salary input change with formatting
  const handleSalaryChange = (value) => {
    // Remove all non-digit characters to get the raw number
    const numericValue = value.replace(/[^\d]/g, "");

    // Update the form field with the numeric value
    form.setFieldValue("salary", numericValue);

    // Update the display with formatted currency
    setSalaryDisplay(numericValue ? formatIndianCurrency(numericValue) : "");
  };

  // Get appropriate emoji based on profession type
  const getProfessionEmoji = (type) => {
    const emojis = {
      JOB: "💼",
      BUSINESS: "🏢",
      FREELANCE: "💻",
      RESEARCH: "🔬",
      OTHER: "📋",
    };
    return emojis[type] || "💼";
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
          <span style={{ fontSize: "18px" }}>💼 Professional History</span>
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
        <Tabs.Tab title="View Profession History" key="view">
          {professions.length > 0 ? (
            <>
              {professions.map((prof, index) => (
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
                      {getProfessionEmoji(prof.type)}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          color: "#8B0000",
                        }}
                      >
                        {prof.title}
                      </div>
                      <div style={{ fontSize: 14, color: "#666" }}>
                        {prof.organization}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{ margin: "10px 0", fontSize: 14, color: "#333" }}
                  >
                    <div style={{ margin: "3px 0" }}>
                      <strong>Type:</strong> {prof.type}
                    </div>
                    <div style={{ margin: "3px 0" }}>
                      <strong>Duration:</strong> {prof.fromYear} -{" "}
                      {prof.toYear || "Present"}
                    </div>
                    <div style={{ margin: "3px 0" }}>
                      <strong>Location:</strong> {prof.location}
                    </div>
                    <div style={{ margin: "3px 0" }}>
                      <strong>Salary:</strong>{" "}
                      {prof.salary
                        ? formatIndianCurrency(prof.salary)
                        : "Not specified"}
                    </div>
                    <div style={{ margin: "3px 0" }}>
                      <strong>Experience:</strong> {prof.totalExperience} years
                    </div>
                    {prof.details && (
                      <div style={{ margin: "3px 0" }}>
                        <strong>Details:</strong> {prof.details}
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
            <div>No profession records yet.</div>
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
            Save All Profession Info
          </Button>
        </Tabs.Tab>

        <Tabs.Tab title="Add / Edit Profession" key="edit">
          <Form
            form={form}
            initialValues={defaultFormValues}
            layout="vertical"
            style={{ padding: "10px 0" }}
          >
            <Form.Item name="type" label="Profession Type">
              <Selector
                options={professionOptions}
                value={form.getFieldValue("type")}
                onChange={(val) => form.setFieldValue("type", val)}
                style={{ "--checked-color": "#8B000040" }}
              />
            </Form.Item>

            <Form.Item
              name="title"
              label="Title / Role"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Input
                placeholder="e.g. Software Engineer, Founder"
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "10px",
                }}
              />
            </Form.Item>

            <Form.Item
              name="organization"
              label="Organization"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Input
                placeholder="e.g. Google, MyStartup"
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "10px",
                }}
              />
            </Form.Item>

            <Form.Item
              name="fromYear"
              label="From (Year)"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Input
                type="number"
                placeholder="e.g. 2019"
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "10px",
                }}
              />
            </Form.Item>

            <Form.Item
              name="toYear"
              label="To (Year)"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Input
                type="text"
                placeholder="e.g. 2023 or Present"
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "10px",
                }}
              />
            </Form.Item>

            <Form.Item
              name="location"
              label="Location"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Input
                placeholder="e.g. Bengaluru"
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "10px",
                }}
              />
            </Form.Item>

            <Form.Item
              name="salary"
              label="Salary (Per Annum)"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Input
                value={salaryDisplay}
                onChange={handleSalaryChange}
                placeholder="e.g. ₹6,00,000"
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "10px",
                }}
              />
            </Form.Item>

            <Form.Item
              name="totalExperience"
              label="Total Experience (Years)"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Input
                type="number"
                placeholder="e.g. 3"
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "10px",
                }}
              />
            </Form.Item>

            <Form.Item
              name="details"
              label="Details"
              style={{ display: "flex", alignItems: "center" }}
            >
              <TextArea
                placeholder="Describe responsibilities or key highlights"
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
              {editingIndex !== null ? "Update Profession" : "Add Profession"}
            </Button>
          </Form>
        </Tabs.Tab>
      </Tabs>
    </Card>
  );
};

export default ProfessionInfo;
