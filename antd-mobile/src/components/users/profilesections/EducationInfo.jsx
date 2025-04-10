import React, { useContext, useState } from "react";
import { Form, Input, Selector, Button, Toast, Space } from "antd-mobile";
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

const EducationInfo = () => {
  const { user, setUser, jwt } = useContext(AuthContext);
  const [educations, setEducations] = useState(user?.mybasicdata?.educations || []);
  const [form] = Form.useForm();
  const [editingIndex, setEditingIndex] = useState(null);

  const defaultFormValues = {
    level: "DEGREE",
    degreeName: "",
    year: "",
    institute: "",
    location: "",
  };


  const handleEdit = (index) => {
    form.setFieldsValue(educations[index]);
    setEditingIndex(index);
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
    });
  };

  const handleSaveToServer = async () => {
    const updatedUser = {
      ...user,
      mybasicdata: {
        ...user.mybasicdata,
        educations,
      },
    };

    try {
      await updateUserData({ mybasicdata: updatedUser.mybasicdata }, jwt, user.id);
      setUser(updatedUser);
      Toast.show({ icon: "success", content: "Education data saved!" });
    } catch (err) {
      console.error("Save error", err);
      Toast.show({ icon: "fail", content: "Failed to save education data." });
    }
  };

  return (
    <div>
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

        <Form.Item name="year" label="Year">
          <Input type="number" placeholder="e.g. 2022" />
        </Form.Item>

        <Form.Item name="institute" label="Institute">
          <Input placeholder="e.g. BITS Pilani" />
        </Form.Item>

        <Form.Item name="location" label="Location">
          <Input placeholder="e.g. Hyderabad" />
        </Form.Item>

        <Button block color="primary" onClick={handleAddOrUpdate}>
          {editingIndex !== null ? "Update Education" : "Add Education"}
        </Button>
      </Form>

      <h3>Education Records</h3>
      {educations.map((edu, index) => (
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
            <b>{edu.level}</b> - {edu.degreeName}, {edu.institute}, {edu.location} ({edu.year})
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
        style={{ backgroundColor: "#004080", color: "white", marginTop: 16 }}
        onClick={handleSaveToServer}
      >
        Save Education Info
      </Button>
    </div>
  );
};

export default EducationInfo;
