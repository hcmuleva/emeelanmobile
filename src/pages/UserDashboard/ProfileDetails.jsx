import { Button, Space, Tabs } from 'antd';
import React, { useState, useEffect } from 'react';
import { useOne, useUpdate } from '@refinedev/core';
import ImageGallery from './profile/ImageGallery';
import PreferencesDisplay from './profile/PreferencesDisplay';
import FamilyAndOtherInfo from './profile/FamilyAndOtherInfo';

export default function ProfileDetails({ setView, profileData }) {
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
            populate: ["requestsby"],
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
        console.log("currentUserId",currentUserId,"Otheruser",otherUserData)

        try {
            setIsLoadingOtherUser(true);
            console.log("OTHERUDEER DATA",otherUserData)
            const secondUserPending = otherUserData?.requestsby?.Notification?.PENDING ?? [];
           // const newPending = [...new Set([...secondUserPending, currentUserId])]; // Avoid duplicate IDs
            const newPending = [...new Set([
              ...secondUserPending.map(id => parseInt(id, 10)), // Convert existing IDs to integers
              parseInt(currentUserId, 10),                     // Ensure currentUserId is an integer
          ])].filter(Number.isInteger); 
          const requestedByObject = otherUserData?.requestsby??[];
          const requestbyIds = requestedByObject.map((elm)=>elm.id); 
            console.log("Seconduser",secondUserPending, "New Pendings", newPending)
            // Send update mutation
            const payload ={requestsby: [...requestbyIds, parseInt(currentUserId,10)],
              Notification: {
                  PENDING: newPending,
              },}
            console.log("before upload",payload)
            updateRequestBy({
                resource: "users",
                id: String(otherUserId),
                values: payload,
               
                // successNotification: {
                //     message: "Request Sent",
                //     description: "Your request has been sent successfully.",
                // },
                errorNotification: {
                    message: "Error",
                    description: "There was an issue sending the request.",
                },
            });
            notification.success({
              message: "Success",
              description: `आपकी रिक्वेस्ट को ${otherUserData?.FirstName}भेज दी गयी है उनके स्वीकार करने पर आपको लिस्ट में दिखेगी `,
            });
        } catch (error) {
            console.error("Error updating notifications:", error);
            notification.error({
              message: "Error",
              description: `आपकी रिक्वेस्ट ${otherUserData?.FirstName} को  भेजने में प्रॉब्लम आ रही है `,
            });
        } finally {
            setIsLoadingOtherUser(false);
            setView("LIST")

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
            children: 'Under Development',
        },
        {
            key: '4',
            label: 'BioData',
            children: 'Under Development',
        },
    ];

    return (
        <>
            <Space>
                <Button onClick={() => setView("LIST")}>Back To List</Button>
                <Button
                    onClick={handleSelectProfile}
                    loading={isUpdating || isLoading || isLoadingOtherUser}
                    type="primary"
                >
                    Select Profile
                </Button>
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
        </>
    );
}
