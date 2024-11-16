'use client';

import React, { useState, useEffect } from 'react';
import { Card, Avatar, Input, Button, Form } from 'antd';
import EngagementCard from './EngagementCard';

export default function UserPartenerSelector({ firstUser, rowData ,  setIsModalVisible}) {
  const [leftUser, setLeftUser] = useState({
    firstName: firstUser.FirstName,
    lastName: firstUser.LastName,
    profileId: firstUser.id,
    avatarUrl: firstUser?.Pictures?.[0],
  });
 const [engaggedCardView, setEnggedCardView] = useState(false)

  const [pariObject,setPairObject]=useState([])
  const [user, setUser] = useState(null); // Right card user state
  const [inputProfileId, setInputProfileId] = useState('');
  const [isSearching, setIsSearching] = useState(true);

  // Update leftUser when firstUser changes
  useEffect(() => {
    setLeftUser({
      firstName: firstUser.FirstName,
      lastName: firstUser.LastName,
      profileId: firstUser.id,
      avatarUrl: firstUser?.Pictures?.[0],
    });
  }, [firstUser]);

  // Handle profile ID change
  const handleProfileIdChange = (e) => {
    console.log("Profiule ID change ",e.target.value)
    const value = e.target.value.replace(/\D/g, ''); // Allow only numbers
    console.log("value",value)
    setInputProfileId(value);
  };

  // Simulate finding a user by profile ID
  const handleFind = () => {
    console.log('inputProfileId',inputProfileId)
    const matchedUser = rowData.find((item) => item.id == inputProfileId);
    if (matchedUser) {
      setUser({
        firstName: matchedUser.FirstName,
        lastName: matchedUser.LastName,
        profileId: matchedUser.id,
        avatarUrl: matchedUser?.Pictures?.[0],
      });
      setIsSearching(false);
    } else {
      setUser(null);
      setIsSearching(false);
    }
    setPairObject([firstUser,matchedUser])
   
  };

  const handleReset = () => {
    setIsSearching(true);
    setInputProfileId('');
  };

  const UserInfo = ({ user }) => (
    <div style={{ textAlign: 'center' }}>
      <Avatar size={64} src={user?.avatarUrl} style={{ marginBottom: '16px' }} />
      <h2 style={{ margin: '0 0 8px' }}>
        {user?.firstName} {user?.lastName}
      </h2>
      <p style={{ margin: 0, color: 'rgba(0, 0, 0, 0.45)' }}>
        Profile ID: {user?.profileId}
      </p>
    </div>
  );

  return (
    <>
     <Button  onClick={
            ()=>{
             setEnggedCardView(true)
            }
          }>Pair</Button>
         
         {engaggedCardView&&<EngagementCard engagedCouple={pariObject}/>}
         <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '16px',
        maxWidth: '800px',
        margin: 'auto',
      }}
    >
      {/* Left User Card */}
      <Card style={{ flex: 1 }} bordered>
        <UserInfo user={leftUser} />
      </Card>

      {/* Right User Search/Profile Card */}
      <Card style={{ flex: 1 }} bordered>
        {isSearching ? (
          <Form layout="vertical" onFinish={handleFind}>
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
            <UserInfo user={user || { firstName: 'Not Found', lastName: '', profileId: '' }} />
            <Button type="primary" onClick={handleReset} block style={{ marginTop: '16px' }}>
              Search Again
            </Button>
          </div>
        )}
      </Card>
        </div>
    </>
  );
}
