import { Form, Input, Radio, Select,Button, Space } from "antd";
import React from "react";

const { Option } = Select;
const { TextArea } = Input;

export default function AboutMe({  setAboutmeData, activeTab, setActiveTab }) {
    const [form] = Form.useForm();
  // Listen for form value changes and update state
  const handleFinish = (values) => {
    setAboutmeData(values);
    form.resetFields();
  };

  return (
    <>
    <Form form={form} onFinish={handleFinish}>
      <Form.Item
        name="aboutMe"
        label="About Me"
       
      >
        <TextArea placeholder="Describe yourself" autoSize={{  minRows: 3, maxRows: 10}} />
      </Form.Item>

      <Form.Item
        name="achievements"
        label="Achievements"
        
      >
        <TextArea placeholder="Describe Achievements" autoSize={{  minRows: 3, maxRows: 10}} />
      </Form.Item>
      {/* Hobbies Section */}
      <Form.Item name="hobbies" label="Hobbies">
        <TextArea placeholder="List your hobbies, separated by commas" autoSize={{ minRows: 3, maxRows: 8 }} />
      </Form.Item>
       {/* BirthPlace */}
        <Form.Item name="birthplace" label="BirthPlace">
        <Input placeholder="Enter BirthPlace" />
      </Form.Item>
          {/* BirthPlace */}
          <Form.Item name="timeofbirth" label="TimeOfBirth">
        <Input placeholder="Enter BirthTime" />
      </Form.Item>
          {/* Mother Toung */}
          <Form.Item name="othertongue" label="Mother Tongue">
        <Input placeholder="Enter  Mother Tongue" />
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
      <Form.Item name="height" label="Height ">
        <Input placeholder="Enter your height"  />
      </Form.Item>
      

      <Form.Item name="weight" label="Weight">
        <Input placeholder="Enter your weight"  />
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

      <Form.Item
        name="disabilitydesc"
        label="Describe"
        rules={[{ required: true, message: "Please enter about yourself!" }]}
      >
        <TextArea placeholder="Describe Disability" autoSize={{  maxRows: 6 }} />
      </Form.Item>

      <Form.Item name="isMonglik" label="Is Mangalik?">
        <Select placeholder="Select">
          <Option value="Yes">Yes</Option>
          <Option value="No">No</Option>
          <Option value="Partial">Partial</Option>
          <Option value="DontKnow">Don't Know</Option>
        </Select>
      </Form.Item>
     
    </Form>
    <Space>
         <Button type="primary"  onClick={()=>{
            handleFinish();
                setActiveTab((prev)=>String(Number(prev)-1))}}>
              Previous
            </Button>
           
            <Button type="primary"  onClick={()=>{ handleFinish();
                setActiveTab((prev)=>String(Number(prev)+1))
            }
        }>
              Next
            </Button>
            </Space>
    </>
  );
}
