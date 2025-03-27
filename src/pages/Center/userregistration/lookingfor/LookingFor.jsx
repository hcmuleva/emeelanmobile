import React from 'react'
import { Modal, Form, Input, Select, Button, Radio } from "antd";

const { Option } = Select;
const { TextArea } = Input;
export default function LookingFor({lookingForItems,setLookingForItems}) {
    const [form] = Form.useForm();

    const handleOk = () => {
      form.validateFields().then((values) => {
        setLookingForItems(values);
        form.resetFields();
      });
    };
  return (
    <div>
     <Form form={form} layout="vertical">
        {/* About Me Section */}
        <Form.Item name="aboutMe" label="About Me" rules={[{ required: true, message: "Please enter about yourself!" }]}> 
          <TextArea placeholder="Describe yourself" autoSize={{ minRows: 3, maxRows: 6 }} />
        </Form.Item>

        {/* Habits Section */}
        <Form.Item name="foodHabit" label="Food Habit" rules={[{ required: true }]}> 
          <Select placeholder="Select your food habit">
            <Option value="Vegetarian">Vegetarian</Option>
            <Option value="Non-Vegetarian">Non-Vegetarian</Option>
            <Option value="Eggetarian">Eggetarian</Option>
            <Option value="StrictVegetarian">Stickt Vegetarian</Option>
            <Option value="NoRestriction">NoRestriction</Option>
          </Select>
        </Form.Item>

        <Form.Item name="smokingHabit" label="Smoking Habit" rules={[{ required: true }]}> 
          <Radio.Group>
            <Radio value="Yes">Yes</Radio>
            <Radio value="No">No</Radio>
            <Radio value="Occasionally">Occasionally</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="drinkingHabit" label="Drinking Habit" rules={[{ required: true }]}> 
          <Radio.Group>
            <Radio value="Yes">Yes</Radio>
            <Radio value="No">No</Radio>
            <Radio value="Never">Never</Radio>
            <Radio value="Occasionally">Occasionally</Radio>
          </Radio.Group>
        </Form.Item>

        {/* Hobbies Section */}
        <Form.Item name="hobbies" label="Hobbies"> 
          <TextArea placeholder="List your hobbies, separated by commas" autoSize={{ minRows: 2, maxRows: 4 }} />
        </Form.Item>

        {/* Physical Attributes */}
        <Form.Item name="height" label="Height (in cm)" rules={[{ required: true }]}> 
          <Input placeholder="Enter your height in cm" type="number" />
        </Form.Item>

        <Form.Item name="weight" label="Weight (in kg)" rules={[{ required: true }]}> 
          <Input placeholder="Enter your weight in kg" type="number" />
        </Form.Item>

        <Form.Item name="complexion" label="Complexion"> 
          <Select placeholder="Select your complexion">
            <Option value="Fair">Fair</Option>
            <Option value="Wheatish">Wheatish</Option>
            <Option value="Dusky">Dusky</Option>
            <Option value="Dark">Dark</Option>
            <Option value="VeryFair">Very Fair</Option>
            <Option value="VeryDark">Very Dark</Option>
            <Option value="DoesntMatter">DoestntMatter</Option>
          </Select>
        </Form.Item>

        {/* Other Details */}
       

        <Form.Item name="okWithDisablility" label="Are You ok For disability?"> 
          <Radio.Group>
            <Radio value="No">No</Radio>
            <Radio value="Yes">Yes</Radio>
           
          </Radio.Group>
        </Form.Item>
        <Form.Item name="disabilitydescribe" label="Describe it" rules={[{ required: true, message: "Please enter about yourself!" }]}> 
          <TextArea placeholder="Describe about disability preference" autoSize={{ minRows: 3, maxRows: 6 }} />
        </Form.Item>
        <Button type="primary" onClick={handleOk} block>
          Save Details
        </Button>
      </Form>
    </div>
  )
}
