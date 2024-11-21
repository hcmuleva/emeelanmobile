import React from "react";
import "../styles/dashboard-header.css";
import Logo from "../../public/logo.png";
import { Avatar, Input } from "antd";
//import Hamburger, { Divide } from "hamburger-react";
import { CaretRightOutlined, SearchOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useOne } from "@refinedev/core";

const Header = ({ setSearch } ) => {
  const userid = localStorage.getItem("userid");
  
  const navigate = useNavigate();
  const {data, isLoading} = useOne({
    resource: "users",
    id: String(userid),
    meta: {
      populate: ["profilePicture"],
    },
  })
  const user = data?.data;
  console.log("logo",Logo)
  console.log("Data for header ",data)
  if (isLoading){
    return <p>Loading...</p>;
  }
  return (
    <div className="dashboard-container"  style={{
      padding: "0.5rem 1rem", // Reduced padding for the brown bar
      backgroundColor: "#333", // Ensure the brown bar (background color) stays consistent
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}>
    <div className="dashboard-content" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      {/* Logo and App Name */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div style={{ textAlign: "center" }}>
          <img
            src="/logo.png"
            alt="logo"
            style={{ width: "3rem", height: "3rem", objectFit: "contain" }}
          />
          <div style={{ color: "white", marginTop: "0.5rem" }}>
            <h2 style={{ margin: 0, fontSize: "1.0rem" }}>EMeelan</h2>
           
          </div>
        </div>
      </div>

      {/* User Profile Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          cursor: "pointer",
        }}
        onClick={() => navigate(`/myprofile/${userid}`)}
      >
        <Avatar src={user?.profilePicture?.formats?.thumbnail?.url || "/default-profile.png"} size={64} icon={<UserOutlined />} />
          
        
        <div style={{ color: "white" }} className="dashboard-username">
          {user?.username}
          <CaretRightOutlined />
        </div>
      </div>
    </div>
  </div>
  );
};

export default Header;