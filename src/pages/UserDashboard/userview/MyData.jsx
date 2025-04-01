import React, { useState } from 'react';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { Card, Typography, Row, Col, theme, Spin } from "antd";
import { useOne } from '@refinedev/core';
import ProfileStatus from './profilestatus/ProfileStatus';

const { Text } = Typography;

const MyData = () => {
  const { token } = theme.useToken();
  const [requestType, setRequestType] = useState('');
  const { data, isLoading } = useOne({
    resource: "users",
    id: String(localStorage.getItem("userid")),
    meta: {
      populate: ["profilePicture", "likesto", "likesby"],
    },
  });
  if(isLoading) {
    return <Spin/>;
  }
  const rejectedbyme = data?.data?.rejectedbyme;
  const rejected = data?.data?.rejected;
  const accepted = data?.data?.accepted;
  const likesto = data?.data?.likesto;
  const likesby = data?.data?.likesby;
  console.log("user",data?.data);
  // Custom styles for cards
  const cardStyle = {
    backgroundColor: "#f7f0ff",
    borderRadius: token.borderRadiusLG,
    marginBottom: 16,
  };

  const titleStyle = {
    color: "#722ed1",
    fontSize: 16,
    fontWeight: "bold",
  };

  const handleClick = (value) => {
    console.log("RejectedByMe",data?.data?.rejectedbyme)
    console.log("RequestType",data?.data?.rejected)
    console.log("Accepted",data?.data?.accepted)
    console.log("LikesTo",data?.data?.likesto)
    console.log("LikesBy",data?.data?.likesby)
    setRequestType(value);
  };

  // If a request type is selected, render the RequestStatus component
  if (requestType) {
    return <ProfileStatus profileData={data?.data} requestType={requestType} onBack={() => setRequestType('')} />;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
      <Card
        style={{ ...cardStyle }}
        headStyle={{ borderBottom: "none" }}
        title={<span style={{ ...titleStyle }}>Request Status</span>}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Text style={{ fontSize: 16, display: "block" }}>Received</Text>
          </Col>
          <Col span={12} style={{ cursor: 'pointer' }} onClick={() => handleClick('Received: 22')}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#722ed1", display: "block" }}>
              <FileTextOutlined /> 22
            </Text>
          </Col>

          <Col span={12}>
            <Text style={{ fontSize: 16, display: "block" }}>Accepted</Text>
          </Col>
          <Col span={12} style={{ cursor: 'pointer' }} onClick={() => handleClick('Accepted: 3')}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#52c41a", display: "block" }}>
              <CheckCircleOutlined /> 3
            </Text>
          </Col>

          <Col span={12}>
            <Text style={{ fontSize: 16, display: "block" }}>Rejected</Text>
          </Col>
          <Col span={12} style={{ cursor: 'pointer' }} onClick={() => handleClick('Rejected: 11')}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#f5222d", display: "block" }}>
              <CloseCircleOutlined /> 11
            </Text>
          </Col>

          <Col span={12}>
            <Text style={{ fontSize: 16, display: "block" }}>Pending</Text>
          </Col>
          <Col span={12} style={{ cursor: 'pointer' }} onClick={() => handleClick('Pending: 8')}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#faad14", display: "block" }}>
              <ClockCircleOutlined /> 8
            </Text>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default MyData;
