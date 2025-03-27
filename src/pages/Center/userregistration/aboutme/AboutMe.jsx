import { Modal, Form, Input, Select, Button, Radio } from "antd";
import React from 'react'

const { Option } = Select;
const { TextArea } = Input;
export default function AboutMe({aboutMItems,setAboutmeItems}) {
  return (
    <div>
         <Form.Item name="aboutMe" label="About Me" rules={[{ required: true, message: "Please enter about yourself!" }]}> 
          <TextArea placeholder="Describe yourself" autoSize={{ minRows: 3, maxRows: 6 }} />
        </Form.Item>

        {/* Habits Section */}
        <Form.Item name="foodHabit" label="Food Habit" rules={[{ required: true }]}> 
          <Select placeholder="Select your food habit">
            <Option value="Vegetarian">Vegetarian</Option>
            <Option value="Non-Vegetarian">Non-Vegetarian</Option>
            <Option value="Eggetarian">Eggetarian</Option>
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
    </div>
  )
}
