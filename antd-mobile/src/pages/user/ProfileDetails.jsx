import { LogoutOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  ProgressCircle,
  Card
} from "antd-mobile";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import About from "../../components/users/profilesections/About";
import BasicInfoUpdate from "../../components/users/profilesections/BasicInfoUpdate";
import EducationInfo from "../../components/users/profilesections/EducationInfo";
import FamilyInfo from "../../components/users/profilesections/Family";
import PhotoUpload from "../../components/users/profilesections/PhotoUpload";
import ProfessionInfo from "../../components/users/profilesections/ProfessionInfo";
import { AuthContext } from "../../context/AuthContext";
import Settings from "../../components/users/profilesections/Settings";
import PreferenceInfo from "../../components/users/profilesections/PreferenceInfo";
import ResetPassword from "../../components/users/profilesections/ResetPassword";

const tabLinks = [
  { key: "photos", label: "Photos" },
  { key: "basic", label: "Basic Info" },
  { key: "family", label: "Family" },
  { key: "education", label: "Education" },
  { key: "profession", label: "Profession" },
  { key: "preferences", label: "Preferences" },
  { key: "about", label: "About Me" },
  { key: "settings", label: "Settings" },
  { key: "resetpassword", label: "ResetPassword" },
];

const ProfileDetails = () => {
  const authContext = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic");

  const { completionBar } = useContext(AuthContext);
  const [userProfileData, setUserProfileData] = useState(null)

  const getCompletionColor = (percent) => {
    if (percent < 40) return "#ff4d4f"; // Red
    if (percent < 60) return "#faad14"; // Yellow
    if (percent < 80) return "#1890ff"; // Blue
    return "#52c41a"; // Green
  };

  return (
    <div style={{ padding: 10, backgroundColor: "#f7f7f7", color: "#333", boxSizing: "border-box", minHeight: "100vh" }}>
      {/* Profile Header with Gradient Background */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
          padding: 12,
          borderRadius: 12,
          background: 'linear-gradient(45deg, #8b0000, #b00000)',
          color: "white",
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>{user?.FirstNamep} Profile</h2>
          <p style={{ margin: 0, fontSize: 14 }}>ID: {user?.id}</p>
        </div>
        <ProgressCircle
          percent={completionBar || 0}  // Fallback to 0 if undefined
          style={{
            "--size": "48px",
            "--track-width": "5px",
            "--fill-color": getCompletionColor(completionBar || 0),
          }}
        >
          {completionBar !== undefined ? `${completionBar}%` : '0%'}
        </ProgressCircle>
      </div>

      {/* Tab Navigation */}

      <div style={{ display: "flex", flexDirection: "column", marginBottom: 16 }}>

        <div
          style={{
            overflowX: "auto",
            whiteSpace: "nowrap",
            marginBottom: 16,
            padding: "4px 0",
            borderBottom: "0px solid #eee",
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE 10+
          }}
        >
          <div style={{ display: "inline-flex", width: "max-content" }}>
            {tabLinks.map((tab) => (
              <span
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: "10px 16px",
                  cursor: "pointer",
                  margin: "0 8px",
                  color: activeTab === tab.key ? "#8B0000" : "#666",
                  fontWeight: activeTab === tab.key ? "bold" : "normal",
                  borderBottom: activeTab === tab.key ? "3px solid #8B0000" : "none",
                  transition: "all 0.3s ease",
                  borderRadius: 4,
                  backgroundColor: activeTab === tab.key ? "rgba(139, 0, 0, 0.1)" : "transparent",
                }}
              >
                {tab.label}
              </span>
            ))}
          </div>
        </div>
        {/* Dynamic Content Based on Active Tab */}
        <Card style={{ padding: "0", margin: "0", marginBottom: 16, borderRadius: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          {activeTab === "photos" && <PhotoUpload />}
          {activeTab === "basic" && <BasicInfoUpdate />}
          {activeTab === "family" && <FamilyInfo />}
          {activeTab === "education" && <EducationInfo />}
          {activeTab === "profession" && <ProfessionInfo />}
          {activeTab === "preferences" && <PreferenceInfo />}
          {activeTab === "about" && <About />}
          {activeTab === "settings" && <Settings />}
          {activeTab === "resetpassword" && <ResetPassword userId={user.id} />}
        </Card>
      </div>

      {/* Logout Button */}
      <Divider style={{ margin: "16px 0" }} />
      <Button
        block
        style={{ backgroundColor: "#8B0000", color: "white", fontWeight: 600 }}
        onClick={async () => {
          await authContext.logout();
          navigate("/login", { replace: true });
        }}
      >
        <LogoutOutlined style={{ fontSize: 18, color: "white", marginRight: 8 }} /> Logout
      </Button>
      <Divider style={{ margin: "16px 0" }} />
    </div>
  );
};

export default ProfileDetails;
