import { Button, Card, Form, Image, Input, Selector, Space, Tabs, Toast } from "antd-mobile";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { updateUser } from "../../../services/api";

const relationOptions = {
  PARENT: [
    { label: "Father", value: "FATHER" },
    { label: "Mother", value: "MOTHER" },
  ],
  SIBLING: [
    { label: "Brother", value: "BROTHER" },
    { label: "Sister", value: "SISTER" },
  ],
  MATERNAL: [
    { label: "Nanaji", value: "NANAJI" },
    { label: "Naniji", value: "NANIJI" },
  ],
};

const Family = () => {
  const { user, setUser } = useContext(AuthContext);
  const [families, setFamilies] = useState(user?.mybasicdata?.families || []);
  const [form] = Form.useForm();
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedType, setSelectedType] = useState("PARENT");
  const [activeTab, setActiveTab] = useState(families.length ? "view" : "edit");

  const defaultFormValues = {
    type: "PARENT",
    relation: "",
    name: "",
    age: "",
    gotra: "",
    mobilenumber: "",
    profession: "",
  };

  const handleEdit = (index) => {
    const member = families[index];
    form.setFieldsValue(member);
    setSelectedType(member.type || "PARENT");
    setEditingIndex(index);
    setActiveTab("edit");
  };

  const handleDelete = (index) => {
    const updated = [...families];
    updated.splice(index, 1);
    setFamilies(updated);
  };

  const handleAddOrUpdate = () => {
    form.validateFields().then((values) => {
      const updated = [...families];
      if (editingIndex !== null) {
        updated[editingIndex] = values;
        setEditingIndex(null);
      } else {
        updated.push(values);
      }
      setFamilies(updated);
      form.resetFields();
      setSelectedType("PARENT");
      setActiveTab("view");
    });
  };

  const handleSaveToServer = async () => {
    const updatedUser = {
      ...user,
      mybasicdata: { ...user.mybasicdata, families },
    };

    try {
      await updateUser({ mybasicdata: updatedUser.mybasicdata }, user.id);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      Toast.show({ icon: "success", content: "Family data saved!" });
    } catch (err) {
      console.error("Save error", err);
      Toast.show({ icon: "fail", content: "Failed to save family data." });
    }
  };

  // Get appropriate emoji based on relation
  const getRelationEmoji = (relation) => {
    const emojis = {
      'FATHER': '👨',
      'MOTHER': '👩',
      'BROTHER': '👦',
      'SISTER': '👧',
      'NANAJI': '👴',
      'NANIJI': '👵',
    };
    return emojis[relation] || '👤';
  };

  return (
    <Card
      style={{
        borderRadius: '8px',
        margin: '10px 0',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #eee',
      }}
      headerStyle={{ color: '#8B0000', fontWeight: 'bold' }}
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '18px' }}>👪 Family Members</span>
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
        <Tabs.Tab title="Family Records" key="view">
          {families.length > 0 && (
            <>
              {families?.map((member, index) => (
                <Card
                  key={index}
                  style={{
                    margin: '10px 0',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #eee',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: '#8B0000',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px'
                    }}>
                      {getRelationEmoji(member.relation)}
                    </div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: "bold", color: "#8B0000" }}>
                        {member.name}
                      </div>
                      <div style={{ fontSize: 14, color: "#666" }}>
                        {member.relation}
                      </div>
                    </div>
                  </div>

                  <div style={{ margin: '10px 0', fontSize: 14, color: "#333" }}>
                    <div style={{ margin: '3px 0' }}><strong>Age:</strong> {member.age}</div>
                    <div style={{ margin: '3px 0' }}><strong>Gotra:</strong> {member.gotra}</div>
                    <div style={{ margin: '3px 0' }}><strong>Profession:</strong> {member.profession}</div>
                    <div style={{ margin: '3px 0' }}><strong>MobileNumber:</strong> {member.mobilenumber}</div>
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


        <Tabs.Tab title="Add / Edit Member" key="edit">
          <Form
            form={form}
            initialValues={defaultFormValues}
            layout="vertical"
            style={{ padding: '10px 0' }}
            onValuesChange={(changed) => {
              if (changed.type) {
                setSelectedType(changed.type);
                form.setFieldValue('relation', '');
              }
            }}
          >
            <Form.Item name="type" label="Family Type">
              <Selector
                options={[
                  { label: 'Parent', value: 'PARENT' },
                  { label: 'Sibling', value: 'SIBLING' },
                  { label: 'Maternal', value: 'MATERNAL' },
                ]}
                value={form.getFieldValue('type')}
                onChange={(val) => {
                  form.setFieldValue('type', val);
                  setSelectedType(val);
                  form.setFieldValue('relation', '');
                }}
                style={{ '--checked-color': '#8B000040' }}
              />
            </Form.Item>

            <Form.Item name="relation" label="Relation">
              <Selector
                options={relationOptions[selectedType]}
                value={form.getFieldValue('relation')}
                onChange={(val) => form.setFieldValue('relation', val)}
                style={{ '--checked-color': '#8B000040' }}
              />
            </Form.Item>

            <Form.Item name="name" label="Name">
              <Input
                placeholder="name"
                style={{ border: "1px solid #ddd", borderRadius: "4px" }}
              />
            </Form.Item>

            <Form.Item name="age" label="Age">
              <Input
                type="number"
                placeholder="Age"
                style={{ border: "1px solid #ddd", borderRadius: "4px" }}
              />
            </Form.Item>

            <Form.Item name="mobilenumber" label="Mobile Number">
              <Input
                type="number"
                placeholder="mobilenumber"
                style={{ border: "1px solid #ddd", borderRadius: "4px" }}
              />
            </Form.Item>

            <Form.Item name="gotra" label="Gotra">
              <Input
                placeholder="Gotra"
                style={{ border: "1px solid #ddd", borderRadius: "4px" }}
              />
            </Form.Item>

            <Form.Item name="profession" label="Profession">
              <Input
                placeholder="Profession"
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
              {editingIndex !== null ? "Update Member" : "Add Member"}
            </Button>
          </Form>
        </Tabs.Tab>
      </Tabs>
    </Card>
  );
};

export default Family;