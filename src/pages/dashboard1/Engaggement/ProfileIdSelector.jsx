import React,{useState} from 'react'
import { Button, InputNumber } from 'antd';

export default function ProfileIdSelector({rowData, setuserObject}) {
    console.log("rowData",rowData[0])
 const [userid,setUserId] = useState(0)
  const onFinish = (values) => {
    
    console.log("values",setuserObject)
    console.log("rowData[0]",rowData[0])
    
    console.log("sdfdf", profile);
   // setuserObject(profile)
    //userObject(profile)
    
  };
  
  return (
    <div>
      <InputNumber value={userid} onChange={(e)=>setUserId(e)}/>
      <Button htmlType='submit' onClick={()=>{
        console.log("Button with balue",userid)
        const profile = rowData?.find((row) => row.id === userid);
        console.log("profile",profile)
      }}>Find</Button>
    </div>
  )
}
