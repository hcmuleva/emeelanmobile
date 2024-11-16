import React from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';

const ProfileStatusState = ({ rowData }) => {
  // Aggregate data based on userstatus
  const aggregatedStats = rowData.reduce((acc, item) => {
    const { userstatus } = item;
    if (!acc[userstatus]) {
      acc[userstatus] = { title: userstatus, value: 0, color: '', isPositive: false };
    }
    acc[userstatus].value += 1; // Increment count or aggregate as needed
    return acc;
  }, {});

  // Convert the aggregated object into an array
  const stats = Object.keys(aggregatedStats).map((key) => {
    const stat = aggregatedStats[key];
    return {
      title: stat.title,
      value: stat.value,
      color:
        stat.title === 'ACTIVE'
          ? '#3f8600'
          : stat.title === "REJECTED"
          ? '#cf1322'
          : stat.title === "BLOCKED"
          ? '#000000'
          : stat.title === 'PENDING'
          ? '#4d1919'
          : '#000099', // Add more colors as needed
      isPositive: stat.title === 'ACTIVE', // Example: Active is positive
    };
  });

  return (
    <Row
      gutter={[16, 16]}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {stats.map((stat, index) => (
        <Col
          key={index}
          xs={6} // Full-width on mobile
          sm={6} // Half-width on small screens
          md={6} // One-third width on medium screens
          lg={6} // One-sixth width on large screens
          style={
            stat.title === 'Pending' ? { marginLeft: '-16px' } : {} // Shift "Pending" status to the left
          }
        >
          <Card bordered={false} style={{ textAlign: 'center' }}>
            <Statistic
               title={<span style={{ color: stat.color }}>{stat.title}</span>} // Change title color

              value={stat.value}
              precision={0} // No decimal for counts
              valueStyle={{
                color: stat.color,
                fontSize: '0.8rem', // Default font size
              }}
              prefix={
                stat.isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />
              }
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProfileStatusState;
