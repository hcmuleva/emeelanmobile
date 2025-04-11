import React, { useContext, useEffect, useState } from 'react'
import { Form, Input, Selector, Button, Toast,Tadio, Radio, Divider } from "antd-mobile";

import { AuthContext } from '../../context/AuthContext'
import { getPincode } from '../../services/api';
import GotraSelector from '../authentication/registration/GotraSelector';
import gotra from "../../utils/gotra.json";
import MaritialStatus from '../authentication/registration/MaritialStatus';
import { Country } from 'country-state-city';

export default function RegisterUser() {
    const [form] = Form.useForm();
    const [emeelanrole,setEmeelanrole] = useState("MEELAN")
    const [customdata,setCustomdata] = useState({})
    const {user} = useContext(AuthContext)
    const [visiblePickers, setVisiblePickers] = useState({
        DOB: false,
        Gotra: false,
        marital: false,
    
      });
    
    const getButtonActions = ()=>{
        switch(user.emeelanrole){
            case "SUPERADMIN":
                return (<>
                    <Button onClick={()=>setEmeelanrole("SUPERADMIN")}>SUPERADMIN</Button>
                    <Button onClick={()=>setEmeelanrole("ADMIN")}>ADMINROLE</Button>
                    <Button onClick={()=>setEmeelanrole("CENTER")}>CENTERROLE</Button>
                 </>)
            case "CENTER":
                return (<>
                     <Button onClick={()=>setEmeelanrole("ADMIN")}>ADMINROLE</Button>
                   
                 </>)
          
        }
    }
   

    const openPicker = (key) => {
        setVisiblePickers({ ...visiblePickers, [key]: true });
      };
    
      const closePicker = (key) => {
        // console.log(key, "key")
        setVisiblePickers({ ...visiblePickers, [key]: false });
      };
    
    const handlePincodeChange = async () => {
        const pincode = form.getFieldValue("pincode");
        if (/^\d{6}$/.test(pincode)) {
          try {
            const res = await getPincode(pincode);
            const attributes = res?.data?.[0]?.attributes;
            if (attributes) {
              form.setFieldsValue({
                City: attributes.taluk || "",
                District: attributes.districtName || "",
                State: attributes.stateName || "",
              });
            }
          } catch (err) {
            Toast.show({ icon: "fail", content: "Failed to fetch location from pincode." });
          }
        }
      };
      const onFinish = (values) => {
        console.log("customdata",customdata)
        const {gotra:Gotra, marititalstatus:maritial} = customdata
        console.log("Custm data",customdata)
        values["emeelanrole"] =emeelanrole;
        values["username"] = values["MobileNumber"];
        values["userstatus"] = "APPROVED";
        
        values["role"] = 1;
        //values['Gotra'] = customdata?.gotra
        values['Gotra'] = Gotra
        values["maritial"] =maritial
        console.log("✅ Form Submitted:", values);
        const {gotra,marititalstatus, ...payload} = values
        console.log("payload ", payload)

      };
    
      const onFinishFailed = (errors) => {
        console.warn("❌ Validation Failed:", errors);
      };
  return (
    <div>
         <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        footer={
          <Button block type="submit" color="primary" onClick={() => form.submit()}>
            Create
          </Button>
        }
        initialValues={{

            Sex: "Male",         // default value for Sex
            isdivyang: false ,    // default value for isdivyang
            Country:"India"
        }}
      >

        <Divider > Admin Role</Divider>
        {getButtonActions()}
        <Divider/>
      <Form.Item
        name="FirstName"
        label="First Name"
        rules={[{ required: true, message: "Required" }]}
      >
        <Input placeholder="Enter First Name" />
      </Form.Item>
      <Form.Item name="FatherName" label="Father's Name">
        <Input placeholder="Enter Father's Name" />
      </Form.Item>
      <Form.Item
      name="email"
      label="Email"
      rules={[
        {
          type: 'email',
          message: 'Please enter a valid email address',
        },
        {
          required: true,
          message: 'Email is required',
        },
      ]}
    >
      <Input type="email" placeholder="Enter your email" />
    </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          { required: true, message: "Required" },
          { min: 6, message: "Min 6 characters" },
        ]}
      >
        <Input type="password" placeholder="Enter Password" />
      </Form.Item>

      <Form.Item
        name="Sex"
        label="Sex"
        rules={[{ required: true, message: "Required" }]}
       
      >
        <Radio.Group
          style={{
            display: "flex",
            "--font-size": "13px",
            gap: "10px",
            "--icon-size": "18px",
          }}
        >
          <Radio value="Male">Male</Radio>
          <Radio value="Female">Female</Radio>
        </Radio.Group>
        
      </Form.Item>
     
      <GotraSelector
        gotraData={gotra.Gotra}
        customdata={customdata}
        setCustomdata={setCustomdata}
      />
      <MaritialStatus customdata={customdata} setCustomdata={setCustomdata} />
    
      <Form.Item
        name="MobileNumber"
        label="Mobile Number"
        rules={[{ required: true, message: "Required" }]}
      >
        <Input placeholder="Enter Mobile Number" />
      </Form.Item>
      <Form.Item name="pincode" label="Pincode">
            <Input onChange={handlePincodeChange} />
          </Form.Item>

          <Form.Item name="City" label="City">
            <Input />
          </Form.Item>

          <Form.Item name="District" label="District">
            <Input />
          </Form.Item>

          <Form.Item name="State" label="State">
            <Input />
          </Form.Item>

          <Form.Item name="Country" label="Country">
            <Input />
          </Form.Item>

          <Form.Item name="isdivyang" label="Is Divyang?">
          <Radio.Group
          style={{
            display: "flex",
            "--font-size": "13px",
            gap: "10px",
            "--icon-size": "18px",
          }}
        >
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
        
</Form.Item>

          <Form.Item name="divyangDescription" label="Disability Detail">
            <Input />
          </Form.Item>

      </Form>
    </div>
  )
}
