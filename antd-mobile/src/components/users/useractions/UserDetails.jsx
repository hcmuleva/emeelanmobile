import {
  Divider,
  Image,
  List,
  NavBar,
  Space,
  Toast
} from "antd-mobile";
import {
  TeamOutline,
  UserOutline,
  PictureOutline
} from "antd-mobile-icons";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { customsingleuser } from "../../../services/api";

const theme = {
  primary: "#800000",
  secondary: "#A52A2A",
  accent: "#D2691E",
  light: "#F5F5DC",
  text: "#333333",
  textLight: "#666666",
  success: "#006400",
  warning: "#FFA500",
  danger: "#8B0000",
  background: "#FFFFFF",
};

const UserDetails = ({ profileid }) => {
  const { jwt } = useContext(AuthContext);

  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [basicData, setbasicData] = useState({});
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [toggleProfile, setToggleProfile] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const res = await customsingleuser(profileid, jwt);
        setbasicData(res.mybasicdata);
        setUser(res);
        console.log("RES ", res);
      } catch (error) {
        console.error("Error fetching profile:", error);
        Toast.show("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [profileid, jwt]);

  const handleBack = () => navigate(-1);

  if (isLoading)
    return (
      <div style={{ padding: 24, textAlign: "center", fontWeight: "bold" }}>Loading profile...</div>
    );

  let userImage = ""
  if (user?.Pictures?.profilePicture) {
    userImage = user?.Pictures.profilePicture?.url
  } else if (Array.isArray(user?.Pictures?.pictures) && user?.Pictures?.pictures[0]) {
    userImage = user?.Pictures?.pictures[0]
  } else if (user?.Pictures?.photos?.[0]?.url) {
    userImage = user?.Pictures.photos?.[0]?.url
  } else if (user?.Sex === "Female") {
    userImage = "/assets/woman-user-circle-icon.png"
  } else if (user?.Sex === "Male") {
    userImage = "/assets/man-user-circle-icon.png"
  } else {
    userImage = "/assets/question-mark-circle-outline-icon.png"
  }

  const images = Object.values(user?.Pictures?.photos || {});

  const normalizedFamilies = (basicData?.families || []).map((member) => ({
    firstName: member.firstName || member.name || "Unknown",
    lastName: member.lastName || "",
    type: Array.isArray(member.type)
      ? member.type.join(", ")
      : member.type || "Unknown",
    relation: Array.isArray(member.relation)
      ? member.relation.join(", ")
      : member.relation || "Unknown",
    age: member.age || "Unknown",
    gotra: member.gotra || "Unknown",
    profession: member.profession || "Unknown",
  }));

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <div>
        {/* Header */}
        <NavBar
          onBack={handleBack}
          style={{ position: "sticky", top: "0", backgroundColor: theme.primary, color: "white" }}
        >
          Profile Details
        </NavBar>
        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 16px" }}>
          {/* Profile Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "20px 0",
            }}
          >
            <Image
              src={userImage}
              width={80}
              height={80}
              style={{ borderRadius: "50%", marginRight: 16, objectFit: "cover", border: `2px solid ${theme.primary}` }}
              onClick={() => userImage && setSelectedImage(userImage)}
            />
            <div>
              <h2 style={{ margin: 0, color: theme.primary }}>
                {user?.FirstName || "First"} {user?.LastName || "Last"}
              </h2>
              <div style={{ color: theme.textLight }}>
                {user?.age ? `${user.age} yrs` : "Age Unknown"} •{" "}
                {user?.location || "Location Unknown"}
              </div>
            </div>
          </div>
          {/* User Summary */}
          <List>
            {user?.FirstName || "First"}{" "}
            {basicData?.families?.[0]?.name || "Father"}{" "}
            {basicData?.families?.[0]?.gotra || "Gotra"} ({profileid})
          </List>
          {/* SwitchTabs */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              margin: "16px 0",
            }}
          >
            <button
              onClick={() => setToggleProfile(false)}
              style={{
                fontSize: "16px",
                padding: "12px 24px",
                border: "none",
                borderRadius: "30px",
                backgroundColor: toggleProfile ? "rgba(139, 0, 0, 0.1)" : theme.primary,
                color: toggleProfile ? theme.primary : "white",
                fontWeight: "bold",
                boxShadow: toggleProfile ? "none" : "0 2px 5px rgba(0,0,0,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                flex: 1,
                cursor: "pointer",
              }}
            >
              <UserOutline style={{ marginRight: "8px" }} />
              Profile
            </button>
            <button
              onClick={() => setToggleProfile(true)}
              style={{
                fontSize: "16px",
                padding: "12px 24px",
                border: "none",
                borderRadius: "30px",
                backgroundColor: toggleProfile ? theme.primary : "rgba(139, 0, 0, 0.1)",
                color: toggleProfile ? "white" : theme.primary,
                fontWeight: "bold",
                boxShadow: toggleProfile ? "0 2px 5px rgba(0,0,0,0.2)" : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                flex: 1,
                cursor: "pointer",
              }}
            >
              <PictureOutline style={{ marginRight: "8px" }} />
              Photos
            </button>
          </div>
        </div>
      </div>

      {!toggleProfile ? (
        <div style={{ paddingBottom: "60px" }}>
          {/* About Me Section */}
          <>
            <Divider contentPosition="left" style={{ color: theme.primary }}>
              <Space align="center">
                <UserOutline />
                <span>About</span>
              </Space>
            </Divider>
            <List>
              {basicData?.aboutme?.about ? (
                <List.Item description={basicData.aboutme.about}>
                  About Me
                </List.Item>
              ) : (
                <List.Item description={"No About Me Given"}>
                  About Me
                </List.Item>
              )}
              {basicData?.aboutme?.hobby ? (
                <List.Item description={basicData.aboutme.hobby}>
                  Hobby
                </List.Item>
              ) : (
                <List.Item description={"No Hobby Given"}>Hobby</List.Item>
              )}
              {basicData?.aboutme?.height ? (
                <List.Item description={basicData.aboutme.height}>
                  Height
                </List.Item>
              ) : (
                <List.Item description={"No Height Given"}>Height</List.Item>
              )}
              {basicData?.aboutme?.color ? (
                <List.Item description={basicData.aboutme.color}>
                  Color
                </List.Item>
              ) : (
                <List.Item description={"No Color Given"}>Color</List.Item>
              )}
            </List>
          </>
          {/* Family Section */}
          <>
            <Divider contentPosition="left" style={{ color: theme.primary }}>
              <Space align="center">
                <TeamOutline />
                <span>Family</span>
              </Space>
            </Divider>
            <List>
              {normalizedFamilies.length > 0 ? (
                normalizedFamilies.map((member, index) => (
                  <List.Item
                    key={index}
                    description={`${member.relation} • ${member.age} • ${member.profession}`}
                  >
                    {member.firstName} {member.lastName}
                  </List.Item>
                ))
              ) : (
                <List.Item description="No Family Info Available">
                  Family
                </List.Item>
              )}
            </List>
          </>
          {/* Education Section */}
          <>
            <Divider contentPosition="left" style={{ color: theme.primary }}>
              <Space align="center">
                <UserOutline />
                <span>Education</span>
              </Space>
            </Divider>
            <List>
              {basicData?.educations?.length > 0 ? (
                basicData.educations.map((edu, index) => (
                  <List.Item
                    key={index}
                    description={`${edu.institute || "Unknown Institute"}${edu.year ? ` • ${edu.year}` : ""
                      }`}
                  >
                    {edu.degreeName || "Degree"}
                  </List.Item>
                ))
              ) : (
                <List.Item description="No Education Info Given">
                  Education
                </List.Item>
              )}
            </List>
          </>
          {/* Profession Section */}
          <>
            <Divider contentPosition="left" style={{ color: theme.primary }}>
              <Space align="center">
                <UserOutline />
                <span>Profession</span>
              </Space>
            </Divider>
            <List>
              {basicData?.professions?.length > 0 ? (
                basicData.professions.map((job, index) => (
                  <List.Item
                    key={index}
                    description={`${job.organization || "Unknown Org"}${job.salary ? ` • ${job.salary}` : ""
                      }`}
                  >
                    {job.title || "Title Unknown"}
                  </List.Item>
                ))
              ) : (
                <List.Item description="No Profession Info Given">
                  Profession
                </List.Item>
              )}
            </List>
          </>
        </div>
      ) : (
        <div style={{ padding: "0px 16px 60px 16px" }}>
          <Divider contentPosition="left" style={{ color: theme.primary }}>
            <Space align="center">
              <PictureOutline />
              <span>Photo Gallery</span>
            </Space>
          </Divider>

          {images.length > 0 ? (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "12px",
              marginTop: "16px"
            }}>
              {images.map((photo, index) => (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    borderRadius: "8px",
                    overflow: "hidden",
                    aspectRatio: "1",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                  }}
                  onClick={() => setSelectedImage(photo.url)}
                >
                  <img
                    src={photo.url}
                    alt={photo.name || `Photo ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.3s ease"
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: "center",
              padding: "40px 0",
              color: theme.textLight,
              backgroundColor: "rgba(139, 0, 0, 0.05)",
              borderRadius: "8px",
              marginTop: "16px"
            }}>
              <PictureOutline style={{ fontSize: "48px", marginBottom: "16px" }} />
              <h3>No Photos Available</h3>
            </div>
          )}
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.85)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
          padding: "20px"
        }} onClick={closeImageModal}>
          <div style={{ position: "relative", maxWidth: "100%", maxHeight: "90vh" }}>
            <img
              src={selectedImage}
              alt="Enlarged view"
              style={{
                maxWidth: "100%",
                maxHeight: "90vh",
                objectFit: "contain",
                borderRadius: "8px"
              }}
            />
            <button
              style={{
                position: "absolute",
                top: "-20px",
                right: "-20px",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "white",
                color: theme.primary,
                border: "none",
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
              }}
              onClick={closeImageModal}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ padding: 16, borderTop: "1px solid #f0f0f0" }}></div>
    </div>
  );
};

export default UserDetails;