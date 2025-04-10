import { Card, Image, Tag, Space, Divider, Button, List } from 'antd-mobile'
import {
UserOutline,
  EnvironmentOutline,
  AppOutline, // For profession
  EditOutline // For bio
} from 'antd-mobile-icons'
import { useContext, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import NewProfileCard from '../NewProfileCard'
import BasicInfoUpdate from './BasicInfoUpdate'
const BasicInfoCard = () => {

  const {user} = useContext(AuthContext)
  const userData = user
  console.log("BasicInfo =>",userData)
  const [isEditMode, setIsEditMode] = useState(false)
  return(
    <>
   {!isEditMode&& <Button onClick={() => setIsEditMode(true)} size='small' color='primary' fill='outline'>Editdddd</Button>}
  {isEditMode&&<BasicInfoUpdate user={user.user} setIsEditMode={setIsEditMode} />}
  {!isEditMode &&
  <div>
  <h3 style={{ color: "#8B0000" }}>Basic Information</h3>
  <List
    style={{
      "--border-inner": "1px solid #f5f5f5",
      "--border-bottom": "none",
    }}
  >
    <List.Item title="Mobile">
      { user?.mobile}
    </List.Item>
    <List.Item title="Email">
     {user.email}
    </List.Item>
    <List.Item title="Date of Birth">
     { user.DOB}
    </List.Item>
    <List.Item title="Gender">
     { user.sex}
    </List.Item>
    <List.Item title="Gotra">
     { user.gotra}
    </List.Item>
    <List.Item title="Marital Status">
      { user.marital}
    </List.Item>
    <List.Item title="Height (cm)">
     { user.height}

    </List.Item>
    <List.Item title="City">
    { user.city || "Not specified"}
    </List.Item>
    <List.Item title="State">
      { user.state}
    </List.Item>
    <List.Item title="Country">
      { user.country}
    </List.Item>
    <List.Item title="Is Divyang">
      {user.isDivyang ? (
        "Yes"
      ) : (
        "No"
      )}
    </List.Item>
  </List>
</div>}
  
  </>
  )
}
  

export default BasicInfoCard