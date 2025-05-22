import { Avatar } from "antd-mobile";
import { PhoneFill, UserOutline } from "antd-mobile-icons";
import React from "react";

export default function AdminCard({ user }) {
  const images = user.images || {};
  let userProfile = "https://demo.adminkit.io/img/avatars/avatar-4.jpg";
  if (images.photos?.[0]?.url) {
    userProfile = images.photos[0].url;
  } else if (images.profilePicture?.url) {
    userProfile = images.profilePicture.url;
  } else if (Array.isArray(images.pictures) && images.pictures[0]) {
    userProfile = images.pictures[0];
  }

  const name = user?.FirstName + " " + user?.LastName;

  return (
    <div
      key={user.id}
      className="admin-card"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        padding: "12px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        marginBottom: "12px",
        gap: "12px",
      }}
    >
      <Avatar
        src={userProfile}
        style={{
          "--size": "70px",
          borderRadius: "12px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
        }}
      />
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#333",
            marginBottom: "6px",
            lineHeight: "1.4",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: "14px",
            color: "#777",
            marginBottom: "6px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <PhoneFill style={{ fontSize: "14px", color: "#800000" }} />
          {user?.MobileNumber}
        </div>
        <div
          style={{
            fontSize: "14px",
            color: "#999",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <UserOutline style={{ fontSize: "14px", color: "#800000" }} />
          {user?.City} - {user?.State}
        </div>
        <div
          style={{
            fontSize: "13px",
            fontWeight: "500",
            color: "#555",
            marginTop: "8px",
          }}
        >
          Age: {user.age}
        </div>
      </div>
    </div>
  );
}
