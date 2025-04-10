import React, { useContext, useState } from "react";
import { Form, Input, Selector, Button, Toast, Space } from "antd-mobile";
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

const FamilyInfo = () => {
  const { user, setUser, jwt } = useContext(AuthContext);
  const [families, setFamilies] = useState(user?.mybasicdata?.families || []);
  const [form] = Form.useForm();
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedType, setSelectedType] = useState("PARENT");

  const defaultFormValues = {
    type: "PARENT",
    firstName: "",
    lastName: "",
    age: "",
    gotra: "",
    profession: "",
    relation: "",
  };

  const handleEdit = (index) => {
    const member = families[index];
    form.setFieldsValue(member);
    setSelectedType(member.type || "PARENT");
    setEditingIndex(index);
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
    });
  };

  const handleSaveToServer = async () => {
    const updatedUser = {
      ...user,
      mybasicdata: {
        ...user.mybasicdata,
        families,
      },
    };

    try {
      await updateUserData({ mybasicdata: updatedUser.mybasicdata }, jwt, user.id);
      setUser(updatedUser);
      Toast.show({ icon: "success", content: "Family data saved!" });
    } catch (err) {
      console.error("Save error", err);
      Toast.show({ icon: "fail", content: "Failed to save family data." });
    }
  };

  return (
    <div>
      <Form
        form={form}
        initialValues={defaultFormValues}
        layout="horizontal"
        onValuesChange={(changedValues) => {
          if (changedValues.type) {
            setSelectedType(changedValues.type);
            form.setFieldValue("relation", ""); // reset relation on type change
          }
        }}
      >
        <Form.Item name="type" label="Family Type">
          <Selector
            options={[
              { label: "Parent", value: "PARENT" },
              { label: "Sibling", value: "SIBLING" },
              { label: "Maternal", value: "MATERNAL" },
            ]}
            value={form.getFieldValue("type")}
            onChange={(val) => {
              form.setFieldValue("type", val);
              setSelectedType(val);
              form.setFieldValue("relation", ""); // reset relation on type change
            }}
          />
        </Form.Item>

        <Form.Item name="relation" label="Relation">
          <Selector
            options={relationOptions[selectedType || "PARENT"]}
            value={form.getFieldValue("relation")}
            onChange={(val) => form.setFieldValue("relation", val)}
          />
        </Form.Item>

        <Form.Item name="firstName" label="First Name">
          <Input placeholder="First name" />
        </Form.Item>

        <Form.Item name="lastName" label="Last Name">
          <Input placeholder="Last name" />
        </Form.Item>

        <Form.Item name="age" label="Age">
          <Input type="number" placeholder="Age" />
        </Form.Item>

        <Form.Item name="gotra" label="Gotra">
          <Input placeholder="Gotra" />
        </Form.Item>

        <Form.Item name="profession" label="Profession">
          <Input placeholder="Profession" />
        </Form.Item>

        <Button block color="primary" onClick={handleAddOrUpdate}>
          {editingIndex !== null ? "Update Member" : "Add Member"}
        </Button>
      </Form>

      <h3>Family Members</h3>
      {families.map((member, index) => (
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
            <b>{member.relation}</b> ({member.type}) - {member.firstName} {member.lastName}, Age:{" "}
            {member.age}, Gotra: {member.gotra}, Profession: {member.profession}
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
        style={{ backgroundColor: "#8B0000", color: "white", marginTop: 16 }}
        onClick={handleSaveToServer}
      >
        Save Family Info
      </Button>
    </div>
  );
};

export default FamilyInfo;
