import React, { useContext, useState, useEffect } from "react";
import { Form, Input, Selector, Button, Tabs, Toast, Space, Card, Image } from "antd-mobile";
import { AuthContext } from "../../../context/AuthContext";
import { updateUserData } from "../../../services/api";

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

const defaultFormValues = {
  type: "PARENT",
  relation: "",
  firstName: "",
  lastName: "",
  age: "",
  gotra: "",
  profession: "",
};

const Family = () => {
  const { user, setUser, jwt } = useContext(AuthContext);
  const [families, setFamilies] = useState(user?.mybasicdata?.families || []);
  const [form] = Form.useForm();
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedType, setSelectedType] = useState("PARENT");
  const [activeTab, setActiveTab] = useState(families.length ? "view" : "edit");

  useEffect(() => {
    if (families.length === 0) setActiveTab("edit");
  }, [families]);

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
      await updateUserData({ mybasicdata: updatedUser.mybasicdata }, user.id);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      Toast.show({ icon: "success", content: "Family data saved!" });
    } catch (err) {
      console.error("Save error", err);
      Toast.show({ icon: "fail", content: "Failed to save family data." });
    }
  };

  return (
    <>
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <Tabs.Tab title="Family Cards" key="view" >
          {families.length ? (
            <>
              {families.map((member, index) => (
                <div
                  key={index}
                  style={{
                    background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)',
                    padding: '20px',

                    marginBottom: '16px',
                    borderRadius: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Card
                    style={{
                      width: '100%',  // Ensure the card is 100% width of its container
                      borderRadius: '18px',
                      background: 'rgba(255, 255, 255, 0.85)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: 'none',
                      padding: '16px',
                      boxSizing: 'border-box',  // Prevents padding from affecting width
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Image
                        src="/default-avatar.png"
                        width={80}
                        height={80}
                        fit="cover"
                        style={{
                          borderRadius: '50%',
                          objectFit: 'cover',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                          maxWidth: '100%',  // Ensure image does not overflow
                        }}
                      />
                      <div>
                        <h3 style={{ margin: 0 }}>
                          {member.firstName} {member.lastName}
                        </h3>
                        <div style={{ fontSize: '14px', color: '#555' }}>
                          {member.relation} ({member.type})
                        </div>
                      </div>
                    </div>

                    <hr style={{ margin: '20px 0' }} />

                    <div style={{ fontSize: '14px', lineHeight: 1.5 }}>
                      <p><strong>Age:</strong> {member.age}</p>
                      <p><strong>Gotra:</strong> {member.gotra}</p>
                      <p><strong>Profession:</strong> {member.profession}</p>
                    </div>

                    <Space block style={{ marginTop: 20 }} justify="between">
                      <Button
                        color="primary"
                        fill="solid"
                        size="mini"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </Button>
                      <Button
                        color="danger"
                        fill="outline"
                        size="mini"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </Button>
                    </Space>
                  </Card>
                </div>
              ))}
              <Button
                block
                style={{ backgroundColor: "#004080", color: "white", marginTop: 16 }}
                onClick={handleSaveToServer}
              >
                Save Family Info
              </Button>
            </>
          ) : (
            <div>No family members added yet.</div>
          )}
        </Tabs.Tab>

        <Tabs.Tab title="Add / Edit Member" key="edit">
          <div
            style={{
              background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)',
              padding: '10px',
              height: '100%',
              borderRadius: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Card
              style={{
                width: '100%',
                borderRadius: '18px',
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: 'none',
                padding: '10px',
              }}
            >
              <h3 style={{ margin: 0 }}>Add / Edit Member</h3>
              <hr style={{ margin: '20px 0' }} />
              <div style={{ fontSize: '14px', lineHeight: 1.5 }}>
                <Form
                  form={form}
                  initialValues={defaultFormValues}
                  layout="horizontal"
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
                    />
                  </Form.Item>

                  <Form.Item name="relation" label="Relation">
                    <Selector
                      options={relationOptions[selectedType]}
                      value={form.getFieldValue('relation')}
                      onChange={(val) => form.setFieldValue('relation', val)}
                    />
                  </Form.Item>

                  <Form.Item name="firstName" label="First Name">
                    <Input placeholder="First name" style={{ border: '1px solid rgb(53, 119, 166)', padding: '10px', borderRadius: '5px', width: '90%' }} />
                  </Form.Item>

                  <Form.Item name="lastName" label="Last Name">
                    <Input placeholder="Last name" style={{ border: '1px solid rgb(53, 119, 166)', padding: '10px', borderRadius: '5px', width: '90%' }} />
                  </Form.Item>

                  <Form.Item name="age" label="Age">
                    <Input type="number" placeholder="Age" style={{ border: '1px solid rgb(53, 119, 166)', padding: '10px', borderRadius: '5px', width: '90%' }} />
                  </Form.Item>

                  <Form.Item name="gotra" label="Gotra">
                    <Input placeholder="Gotra" style={{ border: '1px solid rgb(53, 119, 166)', padding: '10px', borderRadius: '5px', width: '90%' }} />
                  </Form.Item>

                  <Form.Item name="profession" label="Profession">
                    <Input placeholder="Profession" style={{ border: '1px solid rgb(53, 119, 166)', padding: '10px', borderRadius: '5px', width: '90%' }} />
                  </Form.Item>

                  <Space block style={{ marginTop: 20, padding: '0 10px 20px' }} justify="between">
                    <Button
                      color="primary"
                      fill="solid"
                      block
                      onClick={handleAddOrUpdate}
                      style={{ backgroundColor: '#004080', color: 'white', marginTop: 16 }}
                    >
                      {editingIndex !== null ? 'Update Member' : 'Add Member'}
                    </Button>
                  </Space>
                </Form>
              </div>
            </Card>
          </div>
        </Tabs.Tab>
      </Tabs>
    </>
  );
};

export default Family;
