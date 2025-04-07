import { Space, Tag, Toast } from "antd-mobile";
import {
  CloseOutline,
  EnvironmentOutline,
  HeartOutline,
  StarOutline,
  UserOutline,
} from "antd-mobile-icons";
import React from "react";
import { userService } from "../../services";
import ProfileDetailPanel from "./ProfileDetailPanel";
import { useNavigate } from "react-router-dom";

const getUserFromLocalStorage = () => {
  try {
    const userString = localStorage.getItem("user");
    return userString ? JSON.parse(userString) : null;
  } catch (error) {
    console.error("Failed to parse user data:", error);
    return null;
  }
};

const NewProfileCard = ({ user }) => {
  const navigate = useNavigate();
  const userObj = getUserFromLocalStorage();
  const userId = userObj?.id || null;
  const profileid = user?.id || null;
  const imagesrc =
    user?.images?.pictures?.[0] ||
    user?.images?.profilePicture ||
    user?.images?.photos?.[0]?.url;

  const role = "ADMIN"; // HARD CODED ROLE
  // user?.role?.toUpperCase();

  const handleRequest = () => {
    const response = userService.connectionRequest(userId, profileid);
    console.log("Request response", response);
  };

  const renderActionButtons = () => {
    if (role === "ADMIN" || role === "SUPERADMIN") {
      return (
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button
            onClick={() => console.log("Approve clicked")}
            style={{
              flex: 1,
              padding: "12px 24px",
              borderRadius: "12px",
              backgroundColor: colors.primary,
              color: colors.light,
              border: "none",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(139, 0, 0, 0.25)",
            }}
          >
            Approve
          </button>
          <button
            onClick={() => console.log("Decline clicked")}
            style={{
              flex: 1,
              padding: "12px 24px",
              borderRadius: "12px",
              backgroundColor: "rgb(197, 194, 33)",
              color: colors.light,
              border: "none",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(139, 0, 0, 0.25)",
            }}
          >
            Decline
          </button>
          <button
            onClick={() => navigate("/profile-view")}
            style={{
              flex: 1,
              padding: "12px 24px",
              borderRadius: "12px",
              backgroundColor: "rgba(139, 0, 0, 0.1)",
              color: colors.primary,
              border: "none",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(139, 0, 0, 0.25)",
            }}
          >
            Details
          </button>
        </div>
      );
    } else if (role === "USER") {
      return (
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button
            onClick={handleRequest}
            style={{
              flex: 1,
              padding: "12px 24px",
              borderRadius: "12px",
              backgroundColor: colors.primary,
              color: colors.light,
              border: "none",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(139, 0, 0, 0.25)",
            }}
          >
            Request
          </button>
          <button
            onClick={() => navigate("/profile-view")}
            style={{
              flex: 1,
              padding: "12px 24px",
              borderRadius: "12px",
              backgroundColor: "rgba(139, 0, 0, 0.1)",
              color: colors.primary,
              border: "none",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(139, 0, 0, 0.25)",
            }}
          >
            Details
          </button>
        </div>
      );
    }
  };

  if (user?.images.length > 0) {
    console.log("Pictures", user.images);
  }

  const colors = {
    primary: "#8B0000",
    secondary: "#FF5252",
    light: "#FFFFFF",
    background: "rgba(255, 255, 255, 0.8)",
    border: "rgba(139, 0, 0, 0.2)",
    text: {
      dark: "#333333",
      light: "#777777",
      accent: "#8B0000",
    },
  };
  return (
    <>
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          margin: "0 auto",
          padding: "16px",
          boxSizing: "border-box",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {/* Glass Effect Card */}
        <div
          style={{
            width: "100%",
            borderRadius: "24px",
            overflow: "hidden",
            backgroundColor: colors.background,
            // backdropFilter: "blur(0.1px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            border: `1px solid ${colors.border}`,
          }}
        >
          {/* Header Section with Image */}
          <div
            style={{
              position: "relative",
              padding: "24px 20px 0",
              background: `linear-gradient(135deg, ${colors.primary}88, ${colors.secondary}88)`,
              borderRadius: "24px 24px 0 0",
            }}
          >
            {/* Profile Image */}
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                backgroundColor: colors.light,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                border: `4px solid ${colors.light}`,
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
                marginBottom: "16px",
                position: "relative",
                zIndex: "1",
              }}
            >
              <img
                src={
                  imagesrc ||
                  "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
                }
                alt="Profile"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Semicircle background curve */}
            <div
              style={{
                position: "absolute",
                bottom: "-40px",
                left: "0",
                right: "0",
                height: "90px",
                background: colors.light,
                borderRadius: "100% 100% 0 0",
                zIndex: "0",
              }}
            />
          </div>

          {/* Content Section */}
          <div
            style={{
              padding: "16px 24px 24px",
              backgroundColor: colors.light,
              borderRadius: "200px",
            }}
          >
            {/* Name and Age */}
            <Space
              block
              justify="between"
              align="center"
              style={{
                marginBottom: "16px",
                marginTop: "20px",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "24px",
                  color: colors.text.dark,
                  fontWeight: "700",
                }}
              >
                <span>
                  {user?.FirstName}
                  {user?.LastName && user?.FirstName !== user?.LastName
                    ? ` ${user.LastName}`
                    : ""}
                </span>
              </h2>
              <Tag
                style={{
                  backgroundColor: colors.primary,
                  color: colors.light,
                  borderRadius: "12px",
                  padding: "4px 12px",
                  fontSize: "14px",
                  fontWeight: "600",
                  border: "none",
                }}
              >
                {user?.age || "Age Not Specified"}
              </Tag>
            </Space>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "12px",
                color: colors.text.dark,
                fontSize: "14px",
                fontWeight: "500",
                backgroundColor: "rgba(139, 0, 0, 0.05)",
                borderRadius: "12px",
              }}
            >
              <UserOutline
                style={{ fontSize: "18px", color: colors.secondary }}
              />
              <span>Gender:</span>
              <span style={{ color: colors.primary, fontWeight: "600" }}>
                {user?.Sex || "Not Specified"}
              </span>
              <span>ProfileId:</span>
              <span style={{ color: colors.primary, fontWeight: "600" }}>
                {user?.id || "Not Specified"}
              </span>
            </div>
            {/* Location */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
                color: colors.text.light,
                fontSize: "14px",
              }}
            >
              <EnvironmentOutline
                style={{ fontSize: "18px", color: colors.secondary }}
              />
              <span>{user?.State + ", " + user?.Country}</span>
            </div>

            {/* Tags Section */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "20px",
                flexWrap: "wrap",
              }}
            >
              <Tag
                style={{
                  borderRadius: "12px",
                  padding: "6px 12px",
                  fontSize: "13px",
                  backgroundColor: "rgba(139, 0, 0, 0.1)",
                  color: colors.primary,
                  margin: 0,
                  border: "none",
                }}
              >
                {user?.Height || "Height Not Specified"}
              </Tag>
              <Tag
                style={{
                  borderRadius: "12px",
                  padding: "6px 12px",
                  fontSize: "13px",
                  backgroundColor: "rgba(139, 0, 0, 0.1)",
                  color: colors.primary,
                  margin: 0,
                  border: "none",
                }}
              >
                {user?.Gotra || "Gotra Not Specified"}
              </Tag>
            </div>

            {/* Status Items */}
            <div
              style={{
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                  color: colors.text.dark,
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                <StarOutline
                  style={{ color: colors.secondary, fontSize: "18px" }}
                />
                <span>{user?.marital || "Marital Not Specified"}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: colors.text.dark,
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                <StarOutline
                  style={{ color: colors.secondary, fontSize: "18px" }}
                />
                <span>{user?.Profession || "Profession Not Specified"}</span>
              </div>
            </div>

            {/* Action Buttons */}
            {renderActionButtons()}
            
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProfileCard;
