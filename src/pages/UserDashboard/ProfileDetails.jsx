import { Button } from 'antd'
import React, { useState } from 'react'
import { Card, Row, Col } from 'antd';
import ImageGallery from './profile/ImageGallery';
import { Tabs } from 'antd';
import PreferencesDisplay from './profile/PreferencesDisplay';
import FamilyAndOtherInfo from './profile/FamilyAndOtherInfo';
import PreferencesInfo from './profile/PreferenceInfo';


export default function ProfileDetails({setView,profileData}) {

    console.log("profileData",profileData)
    const onChange = (key) => {
        console.log(key);
      };
      const tabData = [
        {
          key: '1',
          label: 'Basic',
          children: <PreferencesDisplay profileData={profileData}/>,
        },
        {
          key: '2',
          label: 'Family',
          children: <FamilyAndOtherInfo profileData={profileData}/>,
        },
        {
          key: '3',
          label: 'Preferences',
          children: <PreferencesInfo profileData={profileData}/>,
        },
        {
            key: '4',
            label: 'BioDta',
            children: 'Under Development',
          },
      ];
return (
    <>
    <Button onClick={()=>setView("LIST")}>Back To List</Button>
    {profileData?.Pictures&&<ImageGallery pictures={profileData?.Pictures}/>}
    <Tabs 
      defaultActiveKey="1" 
      type="line" 
      items={tabData.map(tab => ({
        key: tab.key,
        label: tab.label,
        children: tab.children,
      }))}
    />
    </>

)
}
