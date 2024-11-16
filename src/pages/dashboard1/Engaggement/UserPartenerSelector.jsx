'use client';

import React, { useState } from 'react';
import { Card, Avatar, Input, Button, Form } from 'antd';

export default function UserPartenerSelector({
  firstUser,rowData 
}) {
  console.log("UserPartenerSelector firstUser",firstUser)
  console.log("UserPartenerSelector rawData",rowData[0])
  const initialUser = {
    firstName: firstUser.FirstName,
    lastName: firstUser.LastName,
    profileId: firstUser.id,
    avatarUrl: firstUser?.Pictures?.[0],
  }
  const [user, setUser] = useState(initialUser);
  const [inputProfileId, setInputProfileId] = useState('');
  const [isSearching, setIsSearching] = useState(true);

  const handleProfileIdChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Allow only numbers
    setInputProfileId(value);
  };

  const handleFind = () => {
    // Simulating an API call to fetch user data
    console.log("handleFind");
    // In a real application, you would make an API call here
    // For demonstration, let's just toggle the view
    setIsSearching(false);
    setUser({ ...user, profileId: inputProfileId });
  };

  const handleReset = () => {
    setIsSearching(true);
    setInputProfileId('');
  };

  const UserInfo = ({ user }) => (
    <div style={{ textAlign: 'center' }}>
      {console.log("USER IN USERINFO ", user)}
      <Avatar size={64} src={user.avatarUrl} style={{ marginBottom: '16px' }} />
      <h2 style={{ margin: '0 0 8px' }}>{user.firstName} {user.lastName}</h2>
      <p style={{ margin: 0, color: 'rgba(0, 0, 0, 0.45)' }}>Profile ID: {user.profileId}</p>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '16px', maxWidth: '800px', margin: 'auto' }}>
      {/* User Profile Card */}
      <Card style={{ flex: 1 }} bordered>
        <UserInfo user={user} />
      </Card>

      {/* Search / Profile Update Card */}
      <Card style={{ flex: 1 }} bordered>
        {isSearching ? (
          <Form
            layout="vertical"
            onFinish={handleFind}
          >
            <Form.Item label="Profile ID" name="profileId">
              <Input
                type="text"
                inputMode="numeric"
                value={inputProfileId}
                onChange={handleProfileIdChange}
                placeholder="Enter profile ID"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Find
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <div>
            <UserInfo user={user} />
            <Button type="primary" onClick={handleReset} block style={{ marginTop: '16px' }}>
              Search Again
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}