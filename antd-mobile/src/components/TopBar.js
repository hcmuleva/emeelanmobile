import React from "react";
import { NavBar, Avatar, Badge } from "antd-mobile";
import { BellOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();
  const userProfile = "https://via.placeholder.com/40"; // Replace with actual profile image

  return (
    <div style={{ position: "relative" }}> {/* Wrapper for absolute positioning */}
      <NavBar
        backArrow={false}
        left={<img src="/logo.png" alt="Logo" style={{ height: 30 }} />} // Replace with your logo
        right={
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginRight: "-8px" }}>
            {/* Bell Icon with notification badge */}
            <Badge dot color="red">
              <BellOutline fontSize={24} style={{ cursor: "pointer" }} onClick={() => navigate("/notifications")} />
            </Badge>
            
            {/* Avatar pushed further right */}
            <Avatar
              src={userProfile}
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/profile")} // Redirect to profile page
            />
          </div>
        }
      />
      {/* Centered Text */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "16px",
        fontWeight: "bold"
      }}>
        Seervi Emeelan
      </div>
    </div>
  );
};

export default TopBar;