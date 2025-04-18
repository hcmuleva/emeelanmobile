import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Divider, Row } from 'antd';
import React from 'react'

const DetailsCard = () => {
    const { name, gender, age, height, interests, preferences, avatarUrl } = profile;
  return (
    <Card
      title={null}
      bordered={true}
      style={{ width: 300 }}
      cover={
        <Avatar
          size={100}
          src={avatarUrl}
          icon={!avatarUrl && <UserOutlined />}
          style={{ marginTop: '-50px' }}
        />
      }
    >
      <Row>
        <Col span={12}><b>Gender:</b></Col>
        <Col span={12}>{gender}</Col>
      </Row>
      <Divider />
      <Row>
        <Col span={12}><b>Age:</b></Col>
        <Col span={12}>{age}</Col>
      </Row>
      <Divider />
      <Row>
        <Col span={12}><b>Height:</b></Col>
        <Col span={12}>{height}</Col>
      </Row>
      <Divider />
      <Row>
        <Col span={12}><b>Interests:</b></Col>
        <Col span={12}>{interests.join(', ')}</Col>
      </Row>
      <Divider />
      <Row>
        <Col span={12}><b>Preferences:</b></Col>
        <Col span={12}>{preferences}</Col>
      </Row>
    </Card>
  );
}

const profile = {
    name: 'Ravi Kumar',
    gender: 'Male',
    age: 30,
    height: '5\'9"',
    interests: ['Reading', 'Traveling', 'Music'],
    preferences: 'Vegetarian, Non-smoker',
    avatarUrl: '' 
};

export default DetailsCard;
