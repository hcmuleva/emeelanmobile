import { LogoutOutlined } from "@ant-design/icons";
import { Button, Divider, ProgressCircle } from "antd-mobile";
import React, { useContext, useEffect, useState } from "react";
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
import { getUserById } from "../../services/api";

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
  const { user, jwt } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic");

  const { completionBar } = useContext(AuthContext);
  const [userProfileData, setUserProfileData] = useState(null)
  
  console.log(user)

  return (
    <div style={{ padding: 10, backgroundColor: "#fff", color: "#333" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
          backgroundColor: "#8B0000",
          padding: 12,
          borderRadius: 8,
          color: "white",
        }}
      >
        <h2 style={{ margin: 0 }}>My Profile</h2>
        <ProgressCircle
          percent={completionBar}
          style={{
            "--size": "48px",
            "--track-width": "5px",
            "--fill-color":
              completionBar < 40
                ? "Red"
                : completionBar < 60
                ? "Yellow"
                : completionBar < 80
                ? "Blue"
                : completionBar >= 80
                ? "Green"
                : "Chaos",
          }}
        >
          {completionBar}
        </ProgressCircle>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            overflowX: "auto",
            whiteSpace: "nowrap",
            marginBottom: 16,
            padding: "4px 0",
            borderBottom: "0px solid #eee",
            scrollbarWidth: "none",
          }}
        >
          {tabLinks.map((tab) => (
            <span
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                display: "inline-block",
                padding: "8px 12px",
                cursor: "pointer",
                margin: "0 4px",
                color: activeTab === tab.key ? "#8B0000" : "#666",
                fontWeight: activeTab === tab.key ? "bold" : "normal",
                borderBottom:
                  activeTab === tab.key ? "2px solid #8B0000" : "none",
              }}
            >
              {tab.label}
            </span>
          ))}
        </div>

        <div style={{ flex: 1 }}>
          {activeTab === "photos" && (
            <PhotoUpload
            />
          )}

          {activeTab === "basic" && (
            <BasicInfoUpdate
            />
          )}

          {activeTab === "family" && (
            <FamilyInfo
            />
          )}

          {activeTab === "education" && (
            <EducationInfo
            />
          )}

          {activeTab === "profession" && (
            <ProfessionInfo
            />
          )}

          {activeTab === "preferences" && (
            <PreferenceInfo
            />
          )}

          {activeTab === "about" && (
            <About
            />
          )}

          {activeTab === "settings" && <Settings />}
          {activeTab === "resetpassword" && <ResetPassword userId={user.id} />}
        </div>
      </div>

      <Divider style={{ margin: "16px 0" }} />

      <Button
        block
        style={{ backgroundColor: "#8B0000", color: "white" }}
        onClick={async () => {
          await authContext.logout();
          navigate("/login", { replace: true });
        }}
      >
        <LogoutOutlined
          style={{ fontSize: 16, color: "white", marginRight: 8 }}
        />{" "}
        Logout
      </Button>

      <Divider style={{ margin: "16px 0" }} />
    </div>
  );
};

export default ProfileDetails;
