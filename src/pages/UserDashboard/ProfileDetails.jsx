import { Button, Space } from 'antd'
import React, { useState } from 'react'
import { Card, Row, Col } from 'antd';
import ImageGallery from './profile/ImageGallery';
import { Tabs } from 'antd';
import PreferencesDisplay from './profile/PreferencesDisplay';
import FamilyAndOtherInfo from './profile/FamilyAndOtherInfo';
import { Heart, HeartHandshake } from 'lucide-react'
import { useCreate, useOne, useUpdate } from '@refinedev/core';
import { notification } from 'antd';


export default function ProfileDetails({setView,profileData}) {
    const userId= localStorage.getItem("userid")
    const { data, isLoading } = useOne({
      resource: "users",
      id: String(userId),
      meta: {
        populate: ["requeststo"], // Ensure proper population
      },
    });
    
    const { mutate: updateUser } = useUpdate();
    
    const handleLikeClick = () => {
      // Check if data is still loading or not available
      if (isLoading || !data) {
        notification.warning({
          message: "Warning",
          description: "User data is not loaded yet. Please wait.",
          placement: "topRight",
        });
        return;
      }
    
      // Safely map over `requeststo` if it exists
      const existingRequeststo = Array.isArray(data?.data?.requeststo)
        ? data.data.requeststo.map((reqpro) => reqpro.id)
        : [];
    
      console.log("Existing Requeststo:", existingRequeststo);
    
      // Check if the profileData.id is already in the list
      const updatedRequeststo = profileData?.id
        ? [...new Set([...existingRequeststo, profileData.id])] // Add new ID, ensuring uniqueness
        : existingRequeststo;
    
      if (updatedRequeststo.length === existingRequeststo.length) {
        notification.info({
          message: "No Change",
          description: "This profile is already in your list.",
          placement: "topRight",
        });
        return;
      }
    
      // Perform the update
      updateUser(
        {
          resource: "users",
          id: userId,
          values: {
            requeststo: updatedRequeststo, // Updated list of `requeststo`
            requestsby: userId, // Add current user's ID
          },
        },
        {
          onSuccess: () => {
            notification.success({
              message: "Success",
              description: "Successfully added to your list.",
              placement: "topRight",
            });
          },
          onError: (error) => {
            notification.error({
              message: "Error",
              description: "Failed to update the list. Please try again.",
              placement: "topRight",
            });
          },
        }
      );
    };
    
  
  
  
    
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
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <Card>
    <Space>
      <Button color="danger" variant="dashed" onClick={()=>setView("LIST")}>Back To List</Button>
      <Button 
        onClick={()=>console.log("yet to implement")} 
        variant="outline"
        className="flex items-center space-x-2 hover:bg-red-50"
      >
        <HeartHandshake  color="#FF5733" className="w-4 h-4 text-red-500 fill-red-500"  />
        <span>Add To My List</span>
      </Button>
   
      </Space>
    </Card>
     
      
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
    </div>

)
}
