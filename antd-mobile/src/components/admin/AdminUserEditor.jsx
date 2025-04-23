import { useState } from 'react'
import React from 'react'
import ResetPassword from '../users/profilesections/ResetPassword'
import { Button, CapsuleTabs, Form, Input, Space,Switch } from 'antd-mobile'
import EnggagedRequestsTable from './EnggagedRequestsTable'
import UpdateStatusToEnggaged from './UpdateUserEnggagement'
import DonationForm from './DonationForm'

export default function AdminUserEditor() {
    const [userId, setUserId] = useState("")
    const [showResetPassword,setShowResetPassword] = useState(false);
    const [engagedButton,setEngagedButton] =useState(false);
    const handleToggle = (checked) => {
        setEngagedButton(checked);
      };
    console.log("resetPassword flag", showResetPassword)
    return (<>
    
    <CapsuleTabs>
    <CapsuleTabs.Tab title='Engaggement' key='engaggement'>
        {engagedButton&&<UpdateStatusToEnggaged/>}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ fontSize: 16 }}>Update Button</div>
        <Switch checked={engagedButton} onChange={handleToggle} />
      </div>
     <EnggagedRequestsTable/>
    </CapsuleTabs.Tab>
    <CapsuleTabs.Tab title='UserPassword' key='resetpassword'>
    <Space>
      <Form.Item
          name='userId'
          label='User ID'
          rules={[{ required: true, message: 'Enter UserId to changePassword' }]}
        >
          <Input onChange={setUserId} placeholder='Enter UserId' />
        </Form.Item>
       {
       showResetPassword? 
       <Button color='primary' onClick={()=>setShowResetPassword(false)} >Reset</Button>:
       <Button color='primary' onClick={()=>setShowResetPassword(true)} >Change</Button>
        
        }
        </Space>
     {showResetPassword &&<ResetPassword userId={userId}/>}
    </CapsuleTabs.Tab>
    <CapsuleTabs.Tab title='Engaggements' key='engaggements'>
    Engaggement list
    </CapsuleTabs.Tab>
    <CapsuleTabs.Tab title="DonationForm" key="donationform">
      <DonationForm/>
    </CapsuleTabs.Tab>
  </CapsuleTabs>
  </>)
}
