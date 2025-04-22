import {
  HomeOutlined,
} from "@ant-design/icons";
import { ChatCheckOutline, CheckCircleFill, TeamOutline } from "antd-mobile-icons";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import { Badge } from "antd-mobile";
import StatusNotification from "./StatusNotification";
//import StatusNotification from "../components/StatusNotification"; // Adjust path if needed

export default function UserLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [notificationStats, setNotificationStats] = useState({ total: 0 });
  console.log("Notification ", JSON.stringify(notificationStats))
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  const footerItems = [
    { icon: <HomeOutlined style={{ fontSize: 24 }} />, key: "home" },
    { icon: <TeamOutline style={{ fontSize: 24 }} />, key: "profiles" },
    {
      icon: (
        <Badge content={notificationStats.total} style={{ '--right': '0%', '--top': '0%' }}>
          <CheckCircleFill style={{ fontSize: 24 }} />
        </Badge>
      ),
      key: "status",
    },
    {
      icon: <TeamOutline style={{ fontSize: 24 }} />,
      key: "adminlist",
    },
    // {icon: <ChatCheckOutline  style={{fontSize:24}}/>,key:"chat"}
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <TopBar userRole={"User"} />
      <div style={{ flex: 1, overflowY: "auto" }}>{children}</div>

      {/* StatusNotification hooks into Ably */}
      <StatusNotification userId={userId} setNotificationStats={setNotificationStats} />

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
          {footerItems.map((item) => {
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
