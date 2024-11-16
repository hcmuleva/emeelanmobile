import { HeartTwoTone } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Input, message, Modal, Row, Typography } from 'antd';
import React, { useState } from 'react';
import './Engaggement.css';
const { Text, Title } = Typography;

const EngagementCard = ({engagedCouple}) => {
  
  console.log("En ",engagedCouple )

  

  return (
    <div>
     
     
        <Card
          style={{
            maxWidth: '600px',
            margin: '20px auto',
            background: 'linear-gradient(to bottom right, #ffe4e1, #e6e6fa)',
            borderRadius: '16px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Title level={3} style={{ color: '#eb2f96' }}>
              {engagedCouple[0].FirstName} & {engagedCouple[1].FirstName}
            </Title>
            <Row justify="center" align="middle" gutter={[24, 24]}>
              {engagedCouple.map((person, index) => (
                <Col key={index} style={{ textAlign: 'center' }}>
                  <Avatar
                    size={120}
                    src={person?.Pictures?.[0]}
                    style={{
                      border: '4px solid white',
                      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                    }}
                  />
                  <div>
                    <Text strong style={{ fontSize: '16px', color: '#722ed1' }}>
                      {person.FirstName}
                    </Text>
                  </div>
                  <div>
                    <Text type="secondary">Son/Daughter of</Text>
                  </div>
                  <div>
                    <Text>{person?.mother} & {person?.father}</Text>
                  </div>
                </Col>
              ))}
            </Row>
            <HeartTwoTone
              twoToneColor="#eb2f96"
              style={{ fontSize: '48px', margin: '20px 0', animation: 'pulse 1.5s infinite' }}
            />
            <Title level={4} style={{ color: '#722ed1' }}>Are Engaged!</Title>
            <div style={{ marginTop: '20px', fontSize: '14px', color: '#8c8c8c' }}>
              - The Emeelan Team
            </div>
          </div>
        </Card>
    
    </div>
  );
};

export default EngagementCard;

