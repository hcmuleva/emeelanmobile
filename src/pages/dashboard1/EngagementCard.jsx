import React, { useState } from 'react';
import { Modal, Button, Input, Card, Avatar, Typography, Row, Col, message } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';
import './Engaggement.css'
const { Text, Title } = Typography;

// Dummy data for rowData
const rowData = [
  { id: 1, name: 'Emily', photo: '/placeholder1.svg', mother: 'Sarah', father: 'Michael' },
  { id: 2, name: 'James', photo: '/placeholder2.svg', mother: 'Linda', father: 'Robert' },
  { id: 3, name: 'Sophia', photo: '/placeholder3.svg', mother: 'Anna', father: 'David' },
  { id: 4, name: 'William', photo: '/placeholder4.svg', mother: 'Grace', father: 'John' },
];

const EngagementCard = () => {
  const [firstPerson, setFirstPerson] = useState(null);
  const [secondPerson, setSecondPerson] = useState(null);
  const [engagedCouple, setEngagedCouple] = useState(null);
  const [secondPersonId, setSecondPersonId] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSearch = () => {
    const person = rowData.find((item) => item.id === parseInt(secondPersonId, 10));
    if (person) {
      setSecondPerson(person);
      message.success(`Found person: ${person.name}`);
    } else {
      message.error('Person not found!');
    }
  };

  const handleEngage = () => {
    if (firstPerson && secondPerson) {
      setEngagedCouple([firstPerson, secondPerson]);
      setIsModalVisible(false);
      message.success('Engagement successful!');
    } else {
      message.error('Both persons must be selected!');
    }
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => setIsModalVisible(true)}
      >
        Engage Users
      </Button>

      <Modal
        title="Engagement Setup"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Text>Select the First Person:</Text>
            <Row>
              {rowData.map((person) => (
                <Button
                  key={person.id}
                  type={firstPerson?.id === person.id ? 'primary' : 'default'}
                  onClick={() => setFirstPerson(person)}
                >
                  {person.name}
                </Button>
              ))}
            </Row>
          </Col>
          <Col span={24}>
            <Text>Enter ID for the Second Person:</Text>
            <Input
              placeholder="Enter ID"
              value={secondPersonId}
              onChange={(e) => setSecondPersonId(e.target.value)}
            />
            <Button type="primary" onClick={handleSearch} style={{ marginTop: '10px' }}>
              Search
            </Button>
            {secondPerson && (
              <div style={{ marginTop: '10px' }}>
                <Avatar src={secondPerson.photo} size={64} />
                <Text style={{ marginLeft: '10px' }}>{secondPerson.name}</Text>
              </div>
            )}
          </Col>
        </Row>
        <Button
          type="primary"
          block
          style={{ marginTop: '20px' }}
          onClick={handleEngage}
        >
          Engage
        </Button>
      </Modal>

      {engagedCouple && (
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
              {engagedCouple[0].name} & {engagedCouple[1].name}
            </Title>
            <Row justify="center" align="middle" gutter={[24, 24]}>
              {engagedCouple.map((person, index) => (
                <Col key={index} style={{ textAlign: 'center' }}>
                  <Avatar
                    size={120}
                    src={person.photo}
                    style={{
                      border: '4px solid white',
                      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                    }}
                  />
                  <div>
                    <Text strong style={{ fontSize: '16px', color: '#722ed1' }}>
                      {person.name}
                    </Text>
                  </div>
                  <div>
                    <Text type="secondary">Son/Daughter of</Text>
                  </div>
                  <div>
                    <Text>{person.mother} & {person.father}</Text>
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
      )}
    </div>
  );
};

export default EngagementCard;

