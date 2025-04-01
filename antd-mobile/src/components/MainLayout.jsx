import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NavBar, TabBar } from "antd-mobile";
import { HomeOutlined, UserOutlined, MessageOutlined, SearchOutlined, ProfileTwoTone, ProfileOutlined } from "@ant-design/icons";
import TopBar from "./TopBar";
import { TeamFill } from "antd-mobile-icons";

const MainLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { key: "/home", title: "Home", icon: <HomeOutlined /> },
    {key:"/profiles", title:"profiles", icon:<TeamFill/>},
    { key: "/matches", title: "Matches", icon: <UserOutlined /> },
    { key: "/mailbox", title: "Mailbox", icon: <MessageOutlined />, badge: 99 },
    { key: "/chat", title: "Chat", icon: <MessageOutlined /> },
    { key: "/search", title: "Search", icon: <SearchOutlined /> },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Header */}
      <TopBar/>
      {/* <NavBar backArrow={false} style={{ backgroundColor: "#fff", color: "#000", fontWeight: "bold" }}>
        {tabs.find((tab) => tab.key === location.pathname)?.title || "App"}
      </NavBar> */}

      {/* Main Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>{children}</div>

      {/* Footer (Bottom Navbar) */}
      <TabBar activeKey={location.pathname} onChange={(key) => navigate(key)}>
        {tabs.map((tab) => (
          <TabBar.Item key={tab.key} icon={tab.icon} title={tab.title} badge={tab.badge} />
        ))}
      </TabBar>
    </div>
  );
};

export default MainLayout;
