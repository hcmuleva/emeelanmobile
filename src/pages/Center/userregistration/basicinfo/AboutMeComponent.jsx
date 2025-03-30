import React,{useEffect} from "react";
import { Form, Input, Radio, Select, Button, Space } from "antd";

const { Option } = Select;
const { TextArea } = Input;

const AboutMeComponent = ({ nextStep, prevStep, updateFormData ,formData,setFormData}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (formData && formData.aboutMe) {
        form.setFieldsValue(formData.aboutMe);
    }
}, [form, formData]);
  // Handle form submission for "Next" button
  const handleNext = () => {
    form
      .validateFields()
      .then((values) => {
        setFormData({ ...formData, aboutMe: values });// Update the form data

        //updateFormData("aboutMe", values); // Update the parent component's state
        nextStep(); // Move to the next step
      })
      .catch((errorInfo) => {
        console.log("Next Failed:", errorInfo);
      });
  };

  // Handle form submission for "Previous" button
  const handlePrevious = () => {
    form
      .validateFields()
      .then((values) => {
        setFormData({ ...formData, aboutMe: values });// Update the form data
        //updateFormData("aboutMe", values); // Update the parent component's state
        prevStep(); // Move to the previous step
      })
      .catch((errorInfo) => {
        console.log("Previous Failed:", errorInfo);
      });
  };

  const resetAboutMe = () => {  
    form.resetFields();
  }

  return (
    <>
      <h2>About Me</h2>
      <Form form={form} layout="vertical">
        <Form.Item name="aboutMe" label="About Me">
          <TextArea placeholder="Describe yourself" autoSize={{ minRows: 3, maxRows: 10 }} />
        </Form.Item>

        <Form.Item name="achievements" label="Achievements">
          <TextArea placeholder="Describe Achievements" autoSize={{ minRows: 3, maxRows: 10 }} />
        </Form.Item>

        {/* Hobbies Section */}
        <Form.Item name="hobbies" label="Hobbies">
          <TextArea placeholder="List your hobbies, separated by commas" autoSize={{ minRows: 3, maxRows: 8 }} />
        </Form.Item>

        {/* BirthPlace */}
        <Form.Item name="birthplace" label="BirthPlace">
          <Input placeholder="Enter BirthPlace" />
        </Form.Item>

        {/* BirthTime */}
        <Form.Item name="timeofbirth" label="TimeOfBirth">
          <Input placeholder="Enter BirthTime" />
        </Form.Item>

        {/* Mother Tongue */}
        <Form.Item name="othertongue" label="Mother Tongue">
          <Input placeholder="Enter Mother Tongue" />
        </Form.Item>

        {/* Caste */}
        <Form.Item name="caste" label="Caste">
          <Input placeholder="Enter Caste" />
        </Form.Item>

        {/* Sub Caste */}
        <Form.Item name="subcaste" label="Sub Caste">
          <Input placeholder="Enter SubCaste" />
        </Form.Item>

        {/* Physical Attributes */}
        <Form.Item name="height" label="Height">
          <Input placeholder="Enter your height" />
        </Form.Item>

        <Form.Item name="weight" label="Weight">
          <Input placeholder="Enter your weight" />
        </Form.Item>

        <Form.Item name="complexion" label="Complexion">
          <Select placeholder="Select your complexion">
            <Option value="Fair">Fair</Option>
            <Option value="Wheatish">Wheatish</Option>
            <Option value="Dusky">Dusky</Option>
            <Option value="Dark">Dark</Option>
          </Select>
        </Form.Item>

        {/* Other Details */}
        <Form.Item name="bloodGroup" label="Blood Group">
          <Select placeholder="Select your blood group">
            <Option value="A+">A+</Option>
            <Option value="A-">A-</Option>
            <Option value="B+">B+</Option>
            <Option value="B-">B-</Option>
            <Option value="O+">O+</Option>
            <Option value="O-">O-</Option>
            <Option value="AB+">AB+</Option>
            <Option value="AB-">AB-</Option>
          </Select>
        </Form.Item>

        <Form.Item name="disability" label="Any Disability?">
          <Radio.Group>
            <Radio value="None">None</Radio>
            <Radio value="Yes">Yes</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="disabilitydesc" label="Describe Disability">
          <TextArea placeholder="Describe Disability" autoSize={{ maxRows: 6 }} />
        </Form.Item>

        <Form.Item name="isMonglik" label="Is Mangalik?">
          <Select placeholder="Select">
            <Option value="Yes">Yes</Option>
            <Option value="No">No</Option>
            <Option value="Partial">Partial</Option>
            <Option value="DontKnow">Don't Know</Option>
          </Select>
        </Form.Item>

        {/* Navigation Buttons */}
        <Space>
          <Button onClick={resetAboutMe}>Reset</Button>
          <Button onClick={handlePrevious}>Previous</Button>
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        </Space>
      </Form>
    </>
  );
};

export default AboutMeComponent;
