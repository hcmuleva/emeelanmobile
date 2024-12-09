import { EyeOutlined } from '@ant-design/icons'
import { Card, Col, Row, Typography } from 'antd'
import React from 'react'
const { Title, Text } = Typography;

export default function Preference({profileData}) {
    console.log("profileData",profileData)
  return (
    <div style={{ padding: "20px" }}>
   
    <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>   
      <Col xs={24} sm={24} md={8}>
        <Card
          title={
            <span>
              <EyeOutlined style={{ marginRight: "8px" }} />
              My Choices
            </span>
          }
          bordered={true}
        >
         <Text strong>Age :</Text> {profileData?.PreMinAge} - <Text strong>Se:</Text>  {profileData?.PreMaxAge} <Text strong>Tak:</Text> 
          <br />
          <Text strong>Height :</Text> {profileData?.PreMinHeight} - <Text strong>Se:</Text>  {profileData?.PreMaxHeight} <Text strong>Tak:</Text>   
          <br />
          <Text strong>Preffered Profession :</Text> {profileData?.PreProfession} 
          <br />
          <Text strong>Preffered Qualification :</Text> {profileData?.PreQualification} 
          <br />
        </Card>
      </Col>
    </Row>
  </div>
  )
}
