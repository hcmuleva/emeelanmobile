import React, { useContext, useEffect, useState } from "react";
import { MessageOutlined } from "@ant-design/icons";
import { Avatar, Badge, Popover, List } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import StatusNotification from "./StatusNotification";
import { AuthContext } from "../../context/AuthContext";
import { getCustomMe } from "../../services/api";
import DynamicLogo from "./DynamicLogo";

const TopBar = ({ userRole }) => {
  const { jwt, profileUpdated, setProfileUpdated } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [greet, setGreet] = useState("")
  let greetArr = ["Hello!", "Hey!"]

  useEffect(() => {
    const getMe = async () => {
      try {
        const res = await getCustomMe(jwt);
        setUser(res);
        setProfileUpdated(false)
      } catch (error) {
        console.error("error", error);
      }
    };
    getMe();
  }, [jwt, profileUpdated]);

  useEffect(() => {
    let idx = Math.floor(Math.random() * greetArr.length)
    setGreet(greetArr[idx])
  }, [])

  const [notificationStats, setNotificationStats] = useState({
    PENDING: 0,
    APPROVED: 0,
    REJECTED: 0,
    total: 0,
  });

  const navigate = useNavigate();

  let userProfile = "";
  if (user?.Pictures?.profilePicture) {
    userProfile = user?.Pictures.profilePicture?.url;
  } else if (
    Array.isArray(user?.images?.pictures) &&
    user?.images?.pictures[0]
  ) {
    userProfile = user?.images?.pictures[0];
  } else if (user?.Pictures?.photos?.[0]?.url) {
    userProfile = user?.Pictures.photos?.[0]?.url;
  } else if (user?.Sex === "Female") {
    userProfile = "/assets/woman-user-circle-icon.png";
  } else if (user?.Sex === "Male") {
    userProfile = "/assets/man-user-circle-icon.png";
  } else {
    userProfile = "/assets/question-mark-circle-outline-icon.png";
  }

  const handleStatusClick = (status) => {
    navigate(`/status?filter=${status}`);
  };

  return (
    <div style={{
      paddingTop: 'env(safe-area-inset-top)'
    }}>
      <div
        style={{
          position: "relative",
          background: '#BC0226',
          padding: "12px 20px",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            onClick={() => navigate("/userprofile")}
            style={{ display: "flex", alignItems: "center" }}
          >
            <div
              style={{
                width: "80px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                src={userProfile}
                style={{
                  cursor: "pointer",
                  "--size": "55px",
                  borderRadius: "50%",
                }}
              />
            </div>
            <div style={{ textAlign: "left" }}>
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "18px",
                  lineHeight: "30px",
                  letterSpacing: ".5px",
                }}
              >
                {greet} {user?.FirstName}
              </span>
              <br />
              <span
                style={{
                  fontWeight: "400",
                  fontSize: "15px",
                }}
              >
                {userRole}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
           
            <DynamicLogo color="#FFA500" backgroundColor="#FFFFFF" />
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default TopBar;
