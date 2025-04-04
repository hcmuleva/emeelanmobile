import React from "react";
import "../styles/dashboard-header.css";
import { Avatar } from "antd";
import { CaretRightOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useOne } from "@refinedev/core";

const Base_Url = import.meta.env.VITE_BASE_URL;

const Header = ({ setSearch }) => {
  const userid = localStorage.getItem("userid");
  const navigate = useNavigate();
  
  const { data, isLoading } = useOne({
    resource: "users",
    id: String(userid),
    meta: {
      populate: ["Pictures"],
    },
  });

  const user = data?.data;

  if (isLoading) {
    return <p>Loading...</p>;
  }
  const imageSrc =
    user?.Photos?.[0]?.formats?.thumbnail?.url || // Primary source
    user?.Pictures?.[0] || // Secondary source
    '/default-profile.png'; // Fallback image

  // Navigate to the Help page
  const handleHelpClick = () => {
    navigate("/help");
  };

  return (
    <div
      className="dashboard-container"
      style={{
        //padding: "0rem 1rem", // Reduced padding for the brown bar
        backgroundColor: "#333", // Ensure the brown bar (background color) stays consistent
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        className="dashboard-content"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Left Side - Logo and App Name */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ textAlign: "center" }}>
            <img
              src={`logo.png`}
              alt="logo"
              style={{ width: "5rem", height: "3rem", objectFit: "contain" }}
            />
            <div style={{ color: "white", marginTop: "0.5rem" }}>
              <h2 style={{ margin: 0, fontSize: "1.0rem" }}>EMeelan</h2>
            </div>
          </div>
        </div>

        {/* Centered Profile Section */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            cursor: "pointer",
            justifyContent: "center",
          }}
          onClick={() => navigate(`/myprofile/${userid}`)}
        >
         <Avatar
      src={imageSrc}
      size={64}
      icon={<UserOutlined />}
      alt="User Avatar"
    />
          <div style={{ color: "white" }} className="dashboard-username">
            {user?.username}
            <CaretRightOutlined />
          </div>
        </div>

        {/* Right Side - Help Icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={handleHelpClick}
        >
          <img
            src={`help.png`}
            alt="help"
            style={{ width: "6rem", height: "4rem", objectFit: "contain" }} // Updated size to match logo
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
