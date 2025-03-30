import { useCustom } from '@refinedev/core';
import React, { useState, useEffect, useRef } from 'react';
import UserTableView from './UserDashboard/UserTableView';
import { HomeOutlined, UserOutlined, HeartOutlined } from '@ant-design/icons';

import MyInfo from './UserDashboard/MyInfo';
import { Tab } from '@mui/material';
import { Tabs } from 'antd';

const API_URL = import.meta.env.VITE_SERVER_URL;

export default function UserDashboard() {


  const onChange = (key) => {
    console.log(key);
  };

const items= [
  {
    key: '1',
    label: (
      <span>
        <HomeOutlined />
        <span style={{ marginLeft: 8 }}>Home</span>
      </span>
    ),
    children: <>
     <h3>✨ ई-मीलन(E-Meelan) ✨</h3>
            <p>अब रिश्ता ढूंढ़ना हुआ और आसान! 💍💖</p>
            <p>
              अब आप <strong>आयु, कार्य, स्थान और वैवाहिक स्थिति</strong> के आधार पर अपने लिए उपयुक्त रिश्ता आसानी से ढूंढ सकते हैं।
              <strong> अपना सही जीवनसाथी खोजें, आज ही शुरू करें!</strong>
            </p>
            <p>Finding a match is now easier than ever! 💍💖</p>
            <p>
              Now, you can search for relationships based on <strong>age, profession, location, and marital status</strong> effortlessly.
              <strong> Find your perfect match today!</strong>
            </p>
    </>,
  },
  {
    key: '2',
    label: (
      <span>
        <UserOutlined />
        <span style={{ marginLeft: 8 }}>Profiles</span>
      </span>
    ),
    children: <UserTableView />,
  },
  {
    key: '3',
    label: (
      <span>
        <HeartOutlined />
        <span style={{ marginLeft: 8 }}>myChoice</span>
      </span>
    ),
    children: 'Content of Tab Pane 3',
  },
];
  return (
    <div>
     <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}
