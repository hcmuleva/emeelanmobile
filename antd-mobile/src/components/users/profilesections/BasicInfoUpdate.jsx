import React, { useContext } from "react";
import { Form, Input, Selector, Button, Toast } from "antd-mobile";
import { AuthContext } from "../../../context/AuthContext";

// Assuming you have this component
import TitleSelector from "../../common/TitleSelector";
import { updateUserData } from "../../../services/api";
const maritalOptions = [
  { label: "Single", value: "Never Married" },
  { label: "Married", value: "Married" },
  { label: "Divorced", value: "Divorced" },
  { label: "Widowed", value: "Widowed" },
];

const BasicInfoUpdate = ({setEditMode}) => {
  const { user,jwt, setUser } = useContext(AuthContext);
  const [form] = Form.useForm(); // ✅ this is required to access form methods

  const handleSubmit = async(values) => {
    const FirstName= values?.title+user.FirstName
    const email= values?.email
    const marital= values?.marital?.[0] // Selector returns array
    const payload ={}
    if (FirstName) payload.FirstName = FirstName;
    if (email) payload.email = email;
    if (marital) payload.marital = marital;
    
    const userupdateResp=await updateUserData(payload, jwt, user.id)
    const updated = {
      ...user,
      ...values,
      marital: values.marital?.[0], // Selector returns array
    };
    setUser(updated);
    console.log("Updated user data:", updated);
    Toast.show({ icon: "success", content: "Profile updated!" });
    setEditMode(false)
  };

  return (
    <Form
      form={form} // ✅ bind the form instance
      layout="horizontal"
      initialValues={{
        title: user?.title || "",
        marital: user?.marital ? [user.marital] : [],
        email: user?.email || "",
      }}
      onFinish={handleSubmit}
      footer={
        <Button block type="submit" color="primary">
          Save
        </Button>
      }
    >
      <Form.Item name="title" label="Title" rules={[{ required: true, message: "Please select title" }]}>
        <TitleSelector
          value={form.getFieldValue("title")}
          onChange={(val) => form.setFieldValue("title", val)}
        />
      </Form.Item>

      <Form.Item name="email" label="Email" rules={[{ type: "email", required: true }]}>
        <Input placeholder="Enter your email" />
      </Form.Item>

      <Form.Item name="marital" label="Marital Status" rules={[{ required: true }]}>
        <Selector options={maritalOptions} />
      </Form.Item>
    </Form>
  );
};

export default BasicInfoUpdate;
