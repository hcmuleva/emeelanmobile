import { Card, Image, Tag, Space, Divider, Button } from 'antd-mobile'
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
  const user = useContext(AuthContext)
  const [isEditMode, setEditMode] = useState(false)
  return(
    <>
   {!isEditMode&& <Button onClick={() => setEditMode(true)} size='small' color='primary' fill='outline'>Edit</Button>}
  {isEditMode?<BasicInfoUpdate user={user.user} setEditMode={setEditMode} />:<NewProfileCard user={user.user} />}
  </>
  )
}
  

export default BasicInfoCard