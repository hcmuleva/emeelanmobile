import { Button, notification, Space, Tabs } from 'antd';
import React, { useState, useEffect } from 'react';
import { useOne, useUpdate } from '@refinedev/core';
import ImageGallery from './profile/ImageGallery';
import PreferencesDisplay from './profile/PreferencesDisplay';
import FamilyAndOtherInfo from './profile/FamilyAndOtherInfo';
import Preference from './Preference';
import ProfileViewer from './ProfileViewer';

export default function ProfileDetails({ setView, profileData, calledBy }) {
    const { mutate: updateRequestBy, isLoading: isUpdating } = useUpdate();
    const [currentUserId] = useState(localStorage.getItem("userid"));
    const [otherUserId] = useState(profileData?.id);
    const [otherUserData, setOtherUserData] = useState(null);
    const [isLoadingOtherUser, setIsLoadingOtherUser] = useState(false);

    // Fetch other user data using `useOne` hook
    const { data: fetchedData, isLoading } = useOne({
        resource: "users",
        id: String(otherUserId),
        meta: {
            populate: ["requestsby", "Pictures"],
        },
        queryOptions: {
            enabled: !!otherUserId, // Only fetch when ID is present
        },
    });

    // Update local state when `fetchedData` changes
    useEffect(() => {
        if (fetchedData) {
            setOtherUserData(fetchedData.data);
        }
    }, [fetchedData]);

    const handleSelectProfile = async () => {
        if (!currentUserId || !otherUserData) {
            console.error("Required data is missing.");
            return;
        }

        try {
            setIsLoadingOtherUser(true);

            const secondUserPending = otherUserData?.requestsby?.Notification?.PENDING ?? [];


            const newPending = [...new Set([
              ...secondUserPending.map(id => parseInt(id, 10)), // Convert existing IDs to integers
              parseInt(currentUserId, 10),                     // Ensure currentUserId is an integer
          ])].filter(Number.isInteger); // Filter out any invalid or non-integer values
            // Send update mutation

            const myrequestByExistingId= otherUserData?.requestsby?.map((elm)=>elm.id)??[]
            const mypayload={
              requestsby:[...myrequestByExistingId,parseInt(currentUserId,10)],
              Notification: {
                PENDING: newPending,
            },
            } 
            updateRequestBy({
                resource: "users",
                id: String(otherUserId),
                values:mypayload,
                },
                notification.success({
                  message: "Success",
                  description: `Your request has been sent to  ${otherUserData.FirstName} for review"`
                })
                
              )
        } catch (error) {
            console.error("Error updating notifications:", error);
            notification.error({
              message: "Error",
              description: `Error in sending request to ${otherUserData.FirstName}`,
            })
        } finally {
            setIsLoadingOtherUser(false);
        }
    };

    const tabData = [
        {
            key: '1',
            label: 'Basic',
            children: <PreferencesDisplay profileData={profileData} />,
        },
        {
            key: '2',
            label: 'Family',
            children: <FamilyAndOtherInfo profileData={profileData} />,
        },
        {
            key: '3',
            label: 'Preferences',
            children: <Preference profileData={profileData} />,
        },
        {
            key: '4',
            label: 'BioData',
            children: <ProfileViewer profileData={profileData}/>,
        },
    ];

    return (
        <>
            <Space>
                <Button onClick={() => setView("LIST")}>Back To List</Button>
              
            </Space>
            {profileData?.Pictures && <ImageGallery pictures={profileData?.Pictures} />}
            <Tabs
                defaultActiveKey="1"
                type="line"
                items={tabData.map((tab) => ({
                    key: tab.key,
                    label: tab.label,
                    children: tab.children,
                }))}
            />
             {calledBy==="USER" &&
                <Button
                    onClick={handleSelectProfile}
                    loading={isUpdating || isLoading || isLoadingOtherUser}
                    type="primary"
                >
                   Request For Connection
                </Button>}
        </>
    );
}
