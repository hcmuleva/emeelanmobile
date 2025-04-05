import React, { useRef } from "react";
import { Tag, Space } from "antd-mobile";
import {
  EnvironmentOutline,
  StarOutline,
  HeartOutline,
  CloseOutline,
  UserOutline,
} from "antd-mobile-icons";

const NewProfileCard = ({user}) => {
  const imagesrc =user?.images?.pictures?.[0] ||
  user?.images?.profilePicture ||
  user?.images?.photos?.[0]?.url 
  //console.log(user, "New User Obj")
  //console.log("imagesrc ", imagesrc ,  " from user", user.id)
  console.log("phtos", imagesrc, " from user", user.id)
  
    if(user?.images.length>0) {
      console.log("Pictures", user.images)
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
        }
      };
  return (
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
          backdropFilter: "blur(10px)",
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
  imagesrc||
  "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
}              alt="Profile"
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
            borderRadius:"200px",
          }}
        >
          {/* Name and Age */}
          <Space
            block
            justify="between"
            align="center"
            style={{ 
                marginBottom: "16px",
                marginTop:"20px",
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
  {user?.LastName && user?.FirstName !== user?.LastName ? ` ${user.LastName}` : ""}
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
            <UserOutline style={{ fontSize: "18px", color: colors.secondary }} />
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
            <EnvironmentOutline style={{ fontSize: "18px", color: colors.secondary }} />
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
              <StarOutline style={{ color: colors.secondary, fontSize: "18px" }} />
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
              <StarOutline style={{ color: colors.secondary, fontSize: "18px" }} />
              <span>{user?.Profession || "Profession Not Specified"}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
            }}
          >
            <button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                backgroundColor: colors.primary,
                color: colors.light,
                border: "none",
                borderRadius: "12px",
                padding: "12px 24px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(139, 0, 0, 0.25)",
                transition: "all 0.2s ease",
                flex: 1,
              }}
            >
              <HeartOutline style={{ fontSize: "18px" }} />
              Accept
            </button>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                backgroundColor: "rgba(139, 0, 0, 0.1)",
                color: colors.primary,
                border: "none",
                borderRadius: "12px",
                padding: "12px 24px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s ease",
                flex: 1,
              }}
            >
              <CloseOutline style={{ fontSize: "18px" }} />
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProfileCard