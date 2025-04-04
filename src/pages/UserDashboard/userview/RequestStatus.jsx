import React from 'react';
import { Button, Card, Typography } from 'antd';

const { Text, Title } = Typography;

const RequestStatus = ({ requestType, onBack }) => {
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

export default RequestStatus;
