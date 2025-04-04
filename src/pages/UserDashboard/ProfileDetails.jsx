import { Typography, Card, Avatar, Row, Col, Button, notification, Space, Tabs } from "antd";
import { User } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useOne, useUpdate } from "@refinedev/core";
import ImageGallery from "./profile/ImageGallery";
import PreferencesDisplay from "./profile/PreferencesDisplay";
import FamilyAndOtherInfo from "./profile/FamilyAndOtherInfo";
import Preference from "./Preference";
import ProfileViewer from "./ProfileViewer";

const { Title, Text } = Typography;

const ProfileDetails = ({ setView, profileData, calledBy }) => {
  const { FirstName, LastName, Gotra, DOB, Profession, WorkingCity, State, Pictures, id } = profileData;

  const { mutate: updateRequestBy, isLoading: isUpdating } = useUpdate();
  const [currentUserId] = useState(localStorage.getItem("userid"));
  const [otherUserId] = useState(id);
  const [otherUserData, setOtherUserData] = useState(null);
  const [isLoadingOtherUser, setIsLoadingOtherUser] = useState(false);

  const { data: fetchedData, isLoading } = useOne({
    resource: "users",
    id: String(otherUserId),
    meta: { populate: ["requestsby", "Pictures"] },
    queryOptions: { enabled: !!otherUserId },
  });

  useEffect(() => {
    if (fetchedData) setOtherUserData(fetchedData.data);
  }, [fetchedData]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  const renderAvatar = () => {
    if (!Pictures || Pictures === "No Images" || (Array.isArray(Pictures) && Pictures.length === 0)) {
      return <Avatar size={120} icon={<User />} />;
    }
    return <Avatar size={120} src={Array.isArray(Pictures) ? Pictures[0] : Pictures} />;
  };

  const handleSelectProfile = async () => {
    if (!currentUserId || !otherUserData) return;
    setIsLoadingOtherUser(true);
    try {
      const existingRequests = otherUserData?.requestsby?.map((elm) => elm.id) ?? [];
      const newPending = [...new Set([...(otherUserData?.requestsby?.Notification?.PENDING ?? []), parseInt(currentUserId, 10)])].filter(Number.isInteger);
      const payload = { requestsby: [...existingRequests, parseInt(currentUserId, 10)], Notification: { PENDING: newPending } };
      updateRequestBy({ resource: "users", id: String(otherUserId), values: payload });
      notification.success({ message: "Success", description: `Your request has been sent to ${otherUserData.FirstName} for review` });
    } catch (error) {
      notification.error({ message: "Error", description: `Error in sending request to ${otherUserData.FirstName}` });
    } finally {
      setIsLoadingOtherUser(false);
    }
  };

  const tabData = [
    { key: "1", label: "Basic", children: <PreferencesDisplay profileData={profileData} /> },
    { key: "2", label: "Family", children: <FamilyAndOtherInfo profileData={profileData} /> },
    { key: "3", label: "Preferences", children: <Preference profileData={profileData} /> },
    { key: "4", label: "BioData", children: <ProfileViewer profileData={profileData} /> },
  ];

  return (
    <Card bordered={false}>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={8} style={{ textAlign: "center" }}>
          {renderAvatar()}
          <Title level={4} style={{ marginTop: "16px", marginBottom: "4px" }}>{FirstName} {LastName}</Title>
          <Text type="secondary">{Gotra}</Text>
        </Col>
        <Col xs={24} sm={16}>
          <Title level={5}>Personal Information</Title>
          <Row gutter={[16, 16]}>
            <Col xs={12}><Text strong>Date of Birth:</Text><br /><Text>{DOB ? formatDate(DOB) : "N/A"} ({DOB ? calculateAge(DOB) : "N/A"} years)</Text></Col>
            <Col xs={12}><Text strong>Gotra:</Text><br /><Text>{Gotra || "N/A"}</Text></Col>
          </Row>
          <Title level={5}>Professional Information</Title>
          <Row gutter={[16, 16]}>
            <Col xs={12}><Text strong>Profession:</Text><br /><Text>{Profession || "N/A"}</Text></Col>
            <Col xs={12}><Text strong>Working City:</Text><br /><Text>{WorkingCity || "N/A"}, {State || "N/A"}</Text></Col>
          </Row>
        </Col>
      </Row>
      <Space><Button onClick={() => setView("LIST")}>Back To List</Button></Space>
      {profileData?.Pictures && <ImageGallery pictures={profileData?.Pictures} />}
      <Tabs defaultActiveKey="1" type="line" items={tabData} />
      {calledBy === "USER" && <Button onClick={handleSelectProfile} loading={isUpdating || isLoading || isLoadingOtherUser} type="primary">Request For Connection</Button>}
    </Card>
  );
};

export default ProfileDetails;
