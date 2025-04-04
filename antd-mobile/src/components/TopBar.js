import React from "react";
import { NavBar, Avatar, Badge } from "antd-mobile";
import { BellOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";

const TopBar = () => {

  const navigate = useNavigate();
  const userProfile = "https://via.placeholder.com/40"; // Replace with actual profile image
  const userData=JSON.parse(localStorage.getItem('user'))
  const userName = [
    "Mr.",
    userData?.FirstName,
    userData?.FatherName,
    userData?.Gotra
  ]
    .filter(Boolean) // Removes null, undefined, and empty strings
    .join(" "); //  console.log("userdata",userData?.FirstName)
  return (
    <div style={{ position: "relative" }}> {/* Wrapper for absolute positioning */}
    <br/>
      <NavBar
        backArrow={false}
        left={<img src="/logo.png" alt="Logo" style={{ height: 30 }} />} // Replace with your logo
        right={
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginRight: "-8px" }}>
            {/* Bell Icon with notification badge */}
            <Badge dot color="red">
            </Badge>

            {/* Avatar with Name Below */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Avatar
                src={userProfile}
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/profile")}
              />
              <span style={{ fontSize: "12px", marginTop: "4px", color: "#666" }}>{userName}</span> 
            </div>
          </div>
        }
      />
      {/* Centered Text */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "14px",
        fontWeight: "bold"
      }}>
       आल इंडिया क्षत्रिय राठौड़ समाज    
      </div>
    </div>
  );
};

export default TopBar;
