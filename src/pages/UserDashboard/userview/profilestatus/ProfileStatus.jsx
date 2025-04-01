import React from 'react';
import { Button, Card, Typography } from 'antd';

const { Text, Title } = Typography;
export default function ProfileStatus({profileData,requestType,setRequestType,onBack}) {
  console.log("profileData",profileData)
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
      <Card title={<Title level={3}>Request Details</Title>}>
        <Text>You clicked on: {requestType}</Text>
        <br />
        <Button type="primary" onClick={onBack} style={{ marginTop: '16px' }}>
          Back to Status
        </Button>
      </Card>
    </div>
  );
};