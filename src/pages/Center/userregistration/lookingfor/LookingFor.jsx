import React from 'react'
import { Modal, Form, Input, Select, Button, Radio, Space } from "antd";

const { Option } = Select;
const { TextArea } = Input;
export default function LookingFor({setLookingForData,activeTab, setActiveTab,handleSubmit}) {
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        console.log("LookingFor",values);
        setLookingForData(values);
        form.resetFields();
        handleSubmit()
     
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
         <Button type="primary"  onClick={()=>setActiveTab((prev)=>String(Number(prev)-1))}>
         Previous
            </Button>
           
            <Button type="primary"  onClick={()=>{
                handleFinish();
              
                }}>
             Create Profile
            </Button>
            </Space>
    </Form>
    </div>
  )
}
