import React, { useEffect } from 'react'
import { Modal, Form, Input, Select, Button, Radio, Space } from "antd";
import { useCreate } from '@refinedev/core';

const { Option } = Select;
const { TextArea } = Input;
export default function MyChoice({ nextStep, prevStep, updateFormData, handleSubmit, formData, setFormData }) {
  const [form] = Form.useForm();
  const { mutate: createUser } = useCreate();

  useEffect(() => {
    if (formData && formData.mychoice) {
      form.setFieldsValue(formData.mychoice);
    }
  }, [formData]);
  // Handle form submission for "Next" button

  // Handle form submission for "Previous" button
  const handlePrevious = () => {
    form
      .validateFields()
      .then((values) => {
        setFormData({ ...formData, mychoice: values });// Update the form data
        prevStep(); // Move to the previous step
      })
      .catch((errorInfo) => {
        console.log("Previous Failed:", errorInfo);
      });
  };
  const handleFinish = (values) => {
    if (!formData.personal.email && formData.personal.MobileNumber) {
      formData.personal.email = formData.personal.MobileNumber + "@hph.com";
    }
    const professionjson = { family: formData.family, profession: formData.profession, aboutMe: formData.aboutMe, mychoice: values };
    const payload = { ...formData.personal, professionjson };
    console.log("LookingFor", values);
    console.log("formData", formData);

    payload['role'] = 1
    payload['profilecreatedby'] = localStorage.getItem("userid")
    payload['userstatus'] = "APPROVED"
    payload['emeelanrole'] = "MEELAN"
    createUser(
      {
        resource: "users",
        values: {
          ...payload
        },
      },
      {
        onSuccess: () => {
          notification.success({
            message: "Success",
            description: "User registered successfully",
          });
          setFormData({
            personal: {},
            family: [],
            profession: [],
            aboutMe: {}, // About me details section 
            mychoice: {}, // MyChoice details section

          }) // Clear all form fields and state
          window.location.reload();
        },
      }
    );
  };
  return (
    <div>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        {/* MyChoice Must */}
        <Form.Item name="must_choice" label="Your Choice Details(Must)" >
          <TextArea placeholder="My Special Requirement" autoSize={{ minRows: 3, maxRows: 10 }} />
        </Form.Item>

        {/* MyChoice Good To Have */}
        <Form.Item name="preference" label="Your preference" >
          <TextArea placeholder="My prefrence" autoSize={{ minRows: 3, maxRows: 10 }} />
        </Form.Item>
        {/* Submit Button */}

        <Space>
          <Button onClick={()=>{
            form.resetFields();
          }}>Reset</Button>
          <Button onClick={handlePrevious}>Previous</Button>

          <Button type="primary" htmlType="submit" onClick={handleFinish}>
            CreateUser
          </Button>
        </Space>
      </Form>
    </div>
  )
}
