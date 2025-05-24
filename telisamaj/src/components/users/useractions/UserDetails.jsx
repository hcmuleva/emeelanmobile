import { BuildOutlined } from "@ant-design/icons";
import { Divider, Image, NavBar, Space, Toast } from "antd-mobile";
import {
  CalendarOutline,
  EnvironmentOutline,
  FileOutline,
  PictureOutline,
  SoundOutline,
  TeamOutline,
  UserOutline,
} from "antd-mobile-icons";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { customsingleuser } from "../../../services/api";

// Simple theme matching the second code sample
const theme = {
  primary: "#8B0000",
  textDark: "#333333",
  textLight: "#666666",
  bgLight: "#FCFCFC",
  highlightBg: "#00000005",
};

const UserDetails = ({ profileid }) => {
  const { jwt } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [basicData, setbasicData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [toggleProfile, setToggleProfile] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const res = await customsingleuser(profileid, jwt);
        setbasicData(res.mybasicdata);
        setUser(res);
      } catch (error) {
        console.error("Error fetching profile:", error);
        Toast.show("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [profileid, jwt]);

  if (isLoading)
    return (
      <div
        style={{
          padding: 24,
          textAlign: "center",
          fontWeight: "bold",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#FCFCFC",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            border: `3px solid ${theme.primary}`,
            borderTop: "3px solid transparent",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            marginBottom: 16,
          }}
        />
        Loading profile...
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );

  // Determine user profile image
  let userImage = "";
  if (user?.Pictures?.profilePicture) {
    userImage = user?.Pictures.profilePicture?.url;
  } else if (
    Array.isArray(user?.Pictures?.pictures) &&
    user?.Pictures?.pictures[0]
  ) {
    userImage = user?.Pictures?.pictures[0];
  } else if (user?.Pictures?.photos?.[0]?.url) {
    userImage = user?.Pictures.photos?.[0]?.url;
  } else if (user?.Sex === "Female") {
    userImage = "/assets/woman-user-circle-icon.png";
  } else if (user?.Sex === "Male") {
    userImage = "/assets/man-user-circle-icon.png";
  } else {
    userImage = "/assets/question-mark-circle-outline-icon.png";
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

  // Get user location string
  const userLocation = [user?.City, user?.State, user?.Country]
    .filter((item) => item)
    .join(", ");

  const getSectionIcon = (sectionName) => {
    switch (sectionName) {
      case "About":
        return <UserOutline style={{ color: theme.primary }} />;
      case "Basic Info":
        return <FileOutline style={{ color: theme.primary }} />;
      case "Family":
        return <TeamOutline style={{ color: theme.primary }} />;
      case "Education":
        return <SoundOutline style={{ color: theme.primary }} />;
      case "Profession":
        return <BuildOutlined style={{ color: theme.primary }} />;
      case "Photo Gallery":
        return <PictureOutline style={{ color: theme.primary }} />;
      default:
        return <UserOutline style={{ color: theme.primary }} />;
    }
  };

  const renderSectionHeader = (title) => (
    <Divider
      contentPosition="left"
      style={{
        color: theme.primary,
        fontSize: "18px",
        fontWeight: "bold",
        margin: "24px 0 16px 0",
      }}
    >
      <Space align="center" style={{ gap: 8 }}>
        {getSectionIcon(title)}
        <span>{title}</span>
      </Space>
    </Divider>
  );

  const renderInfoItem = (label, value) => (
    <div style={{ marginBottom: "12px" }}>
      <div style={{ fontWeight: "bold", color: theme.textDark }}>{label}</div>
      <div
        style={{
          padding: "8px 12px",
          backgroundColor:
            value && !value.includes("No") && value !== "Unknown"
              ? theme.highlightBg
              : "transparent",
          borderRadius: "4px",
          color: theme.textDark,
        }}
      >
        {value || "Not provided"}
      </div>
    </div>
  );

  const handleBack = () => navigate(-1);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FCFCFC",
      }}
    >
      {/* Header */}
      <NavBar
        onBack={handleBack}
        style={{
          position: "sticky",
          top: "0",
          backgroundColor: theme.primary,
          color: "white",
          height: "56px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        Profile Details
      </NavBar>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
        {/* Profile Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "16px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            marginBottom: "16px",
          }}
        >
          <Image
            src={userImage}
            width={80}
            height={80}
            style={{
              borderRadius: "50%",
              marginRight: 16,
              objectFit: "cover",
              border: `2px solid ${theme.primary}`,
            }}
            onClick={() => userImage && setSelectedImage(userImage)}
          />
          <div>
            <h2
              style={{
                margin: 0,
                color: theme.primary,
                fontSize: "15px",
                fontWeight: "bold",
              }}
            >
              {user?.FirstName || "First"} {user?.LastName || "Last"}
            </h2>
            <div
              style={{
                color: theme.textLight,
                marginTop: "8px",
                fontSize: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "4px",
                }}
              >
                <CalendarOutline
                  style={{ marginRight: "8px", fontSize: "12px" }}
                />
                {user?.age ? `${user.age} yrs` : "Age Unknown"}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <EnvironmentOutline
                  style={{ marginRight: "8px", fontSize: "12px" }}
                />
                {userLocation || "Location Unknown"}
              </div>
              <div style={{ marginTop: "4px", fontSize: "12px" }}>
                User ID: {profileid}
              </div>
            </div>
          </div>
        </div>

        {/* Toggle between Profile & Photos */}
        <div
          style={{
            display: "flex",
            backgroundColor: "white",
            borderRadius: "8px",
            overflow: "hidden",
            marginBottom: "16px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
          }}
        >
          <button
            onClick={() => setToggleProfile(false)}
            style={{
              flex: 1,
              padding: "12px",
              border: "none",
              backgroundColor: !toggleProfile ? theme.primary : "white",
              color: !toggleProfile ? "white" : theme.primary,
              fontWeight: "bold",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <UserOutline style={{ marginRight: "8px" }} />
            Profile
          </button>
          <button
            onClick={() => setToggleProfile(true)}
            style={{
              flex: 1,
              padding: "12px",
              border: "none",
              backgroundColor: toggleProfile ? theme.primary : "white",
              color: toggleProfile ? "white" : theme.primary,
              fontWeight: "bold",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PictureOutline style={{ marginRight: "8px" }} />
            Photos
          </button>
        </div>

        {!toggleProfile ? (
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "16px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
            }}
          >
            {/* About Section */}
            {renderSectionHeader("About")}
            {renderInfoItem(
              "About Me",
              basicData?.aboutme?.about || "No About Me Given"
            )}
            {renderInfoItem(
              "Hobby",
              basicData?.aboutme?.hobby || "No Hobby Given"
            )}
            {renderInfoItem(
              "Height",
              basicData?.aboutme?.height || "No Height Given"
            )}
            {renderInfoItem(
              "Skin Color",
              basicData?.aboutme?.color || "No Skin Color Given"
            )}

            {/* Basic Info Section */}
            {renderSectionHeader("Basic Info")}
            {renderInfoItem("Gotra", user?.Gotra || "No Gotra Given")}
            {renderInfoItem("Date of Birth", user?.DOB || "No DOB Given")}
            {renderInfoItem(
              "Marital Status",
              user?.marital || "No Marital Status Given"
            )}

            {/* Family Section */}
            {renderSectionHeader("Family")}
            {normalizedFamilies.length > 0 ? (
              <>
                {normalizedFamilies.map((member, index) => (
                  <div
                    key={index}
                    style={{
                      marginBottom: "16px",
                      padding: "12px",
                      backgroundColor: theme.highlightBg,
                      borderRadius: "4px",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "bold",
                        marginBottom: "8px",
                        color: theme.primary,
                      }}
                    >
                      {member.firstName} {member.lastName} • {member.relation}
                    </div>
                    <div style={{ fontSize: "14px" }}>
                      <div>Age: {member.age}</div>
                      <div>Gotra: {member.gotra}</div>
                      <div>Profession: {member.profession}</div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div style={{ color: theme.textLight }}>
                No Family Info Available
              </div>
            )}

            {/* Education Section */}
            {renderSectionHeader("Education")}
            {basicData?.educations?.length > 0 ? (
              <>
                {basicData.educations.map((edu, index) => (
                  <div
                    key={index}
                    style={{
                      marginBottom: "16px",
                      padding: "12px",
                      backgroundColor: theme.highlightBg,
                      borderRadius: "4px",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "bold",
                        marginBottom: "8px",
                        color: theme.primary,
                      }}
                    >
                      {edu.degreeName || "Degree"}
                    </div>
                    <div style={{ fontSize: "14px" }}>
                      <div>
                        Institute: {edu.institute || "Unknown Institute"}
                      </div>
                      {edu.year && <div>Year: {edu.year}</div>}
                      <div>Level: {edu.level || "Unknown"}</div>
                      <div>Location: {edu.location || "Unknown"}</div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div style={{ color: theme.textLight }}>
                No Education Info Given
              </div>
            )}

            {/* Profession Section */}
            {renderSectionHeader("Profession")}
            {basicData?.professions?.length > 0 ? (
              <>
                {basicData.professions.map((job, index) => (
                  <div
                    key={index}
                    style={{
                      marginBottom: "16px",
                      padding: "12px",
                      backgroundColor: theme.highlightBg,
                      borderRadius: "4px",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "bold",
                        marginBottom: "8px",
                        color: theme.primary,
                      }}
                    >
                      {job.title || "Title Unknown"}
                    </div>
                    <div style={{ fontSize: "14px" }}>
                      <div>
                        Organization: {job.organization || "Unknown Org"}
                      </div>
                      {job.salary && (
                        <div>Salary: ₹ {job.salary} per annum</div>
                      )}
                      <div>Title: {job.title || "Unknown"}</div>
                      <div>Experience: {job.totalExperience || "Unknown"}</div>
                      <div>Type: {job.type || "Unknown"}</div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div style={{ color: theme.textLight }}>
                No Profession Info Given
              </div>
            )}
          </div>
        ) : (
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "16px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
            }}
          >
            {renderSectionHeader("Photo Gallery")}

            {images.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "12px",
                  marginTop: "16px",
                }}
              >
                {images.map((photo, index) => (
                  <div
                    key={index}
                    style={{
                      borderRadius: "6px",
                      overflow: "hidden",
                      aspectRatio: "1",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      border: `1px solid ${theme.primary}22`,
                      cursor: "pointer",
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
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "30px 0",
                  color: theme.textLight,
                  backgroundColor: "rgba(139, 0, 0, 0.05)",
                  borderRadius: "8px",
                  border: "1px dashed rgba(139, 0, 0, 0.2)",
                }}
              >
                <PictureOutline
                  style={{
                    fontSize: "32px",
                    marginBottom: "8px",
                    color: theme.primary,
                  }}
                />
                <div>No Photos Available</div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: "20px",
          }}
          onClick={closeImageModal}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "100%",
              maxHeight: "90vh",
            }}
          >
            <img
              src={selectedImage}
              alt="Enlarged view"
              style={{
                maxWidth: "100%",
                maxHeight: "90vh",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
            <button
              style={{
                position: "absolute",
                top: "-15px",
                right: "-15px",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                backgroundColor: "white",
                color: theme.primary,
                border: "none",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={closeImageModal}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div
        style={{
          padding: 12,
          borderTop: "1px solid #f0f0f0",
          textAlign: "center",
          color: theme.textLight,
          fontSize: "12px",
          backgroundColor: "white",
          marginBottom: "30px",
        }}
      >
        Profile details for {user?.FirstName || "User"} {user?.LastName || ""}
      </div>
    </div>
  );
};

export default UserDetails;
