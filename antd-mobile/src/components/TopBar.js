import React,{useState} from "react";
import { MessageOutlined } from "@ant-design/icons";
import { Avatar, Badge } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import StatusNotification from "./StatusNotification";
import {  Space } from 'antd-mobile'

const TopBar = () => {
  const [totalNotifications, setTotalNotifications] = useState(0);
  const navigate = useNavigate();
  const userProfile = "https://demo.adminkit.io/img/avatars/avatar-4.jpg";
  return (
    <div style={{ 
      position: "relative", 
      backgroundColor: "#FF4D6D", 
      padding: "12px 16px", 
      color: "white"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{display:"flex", alignItems:"center"}}>
        <div style={{ width:"80px",  display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar
            src={userProfile}
            style={{ 
              cursor: "pointer",
              '--size': '55px',
              borderRadius:"50%"
            }}
            onClick={() => navigate("/userprofile")}
          />
        </div>
        <div style={{textAlign:"left"}}>
          <span style={{
            fontWeight: '600',
            fontSize: '18px',
            lineHeight: '30px',
            letterSpacing: '.5px',
          }}>
            Hello,</span>
          <br/>
          <span  style={{
            fontWeight: '400',
            fontSize: '15px',
          }}>
            User!</span>
        </div>
      </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Badge content={totalNotifications} dot color="#FFDF3F">
            <div style={{ 
              backgroundColor: "rgba(255, 255, 255, 0.2)", 
              borderRadius: "50%", 
              width: "42px", 
              height: "42px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
              <MessageOutlined style={{ fontSize: 25, color: "white" }} />
              <StatusNotification userId={JSON.parse(localStorage.getItem('user'))?.id} totalNotifications={totalNotifications} setTotalNotifications={setTotalNotifications}/>
            </div>
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default TopBar