import {
  CiCircleTwoTone,
  HomeOutlined,
  MessageOutlined,
  SearchOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { CheckCircleFill, TeamOutline, UserAddOutline, UserCircleOutline, UserSetOutline } from "antd-mobile-icons";
import React from "react";
import TopBar from "./TopBar";
import { useNavigate, useLocation } from "react-router-dom";

export default function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Header */}
      <TopBar userRole={"Admin"}/>

      {/* Main Content */}
      <div style={{ flex: 1, overflowY: "auto" }}>{children}</div>

      {/* Footer (Bottom Navbar) */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            padding: "12px 0",
            backgroundColor: "white",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.05)",
            position: "fixed",
            bottom: 0,
            width: "100%",
            zIndex: 100,
          }}
        >
          {[
            { icon: <HomeOutlined style={{ fontSize: 24 }} />, key: "home" },
            { icon: <TeamOutline style={{ fontSize: 24 }} />, key: "profiles" },
            {
              icon: <CheckCircleFill style={{ fontSize: 24 }} />,
              key: "status",
            },
           
            {
              icon: <UserCircleOutline style={{ fontSize: 24 }} />, 
							key: "adminlist"
						},
            {
              icon: <UserAddOutline style={{ fontSize: 24 }} />, 
							key: "NewUserRegister"
						},
          ].map((item) => {
            const isActive = location.pathname === `/${item.key}`;
            return (
              <div
                key={item.key}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  color: isActive ? "#FF1E56" : "#999",
                }}
                onClick={() => navigate(`/${item.key}`)}
              >
                {item.icon}
                <div style={{ fontSize: 12, marginTop: 4 }}>
                  {item.key.charAt(0).toUpperCase() + item.key.slice(1)}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ height: "70px" }} />
      </div>
    </div>
  );
}
