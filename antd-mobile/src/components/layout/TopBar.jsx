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
    <div
      style={{
        position: "relative",
        background: '#E83F25',
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
              {user?.FirstName} {user?.LastName} {user?.Gotra},
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
        {/* <Avatar
              src={"logo.png"}
              style={{
                cursor: "pointer",
                "--size": "55px",
                borderRadius: "50%",
              }}
            /> */}
<DynamicLogo color="#FFA500" backgroundColor="#FFFFFF" />
</div>
        {/* <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Popover
            content={
              <List style={{ minWidth: 180 }}>
                <List.Item onClick={() => handleStatusClick("PENDING")}>
                  🕒 Pending ({notificationStats.PENDING})
                </List.Item>
                <List.Item onClick={() => handleStatusClick("APPROVED")}>
                  ✅ Approved ({notificationStats.APPROVED})
                </List.Item>
                <List.Item onClick={() => handleStatusClick("REJECTED")}>
                  ❌ Rejected ({notificationStats.REJECTED})
                </List.Item>
              </List>
            }
            trigger="click"
            placement="bottom"
          >
            <Badge
              content={
                <div
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: "12px",
                    fontSize: "14px",
                    minWidth: "20px",
                    textAlign: "center",
                    lineHeight: "20px",
                    fontWeight: 600,
                  }}
                >
                  {notificationStats.total}
                </div>
              }
            >
              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "50%",
                  width: "42px",
                  height: "42px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MessageOutlined style={{ fontSize: 25, color: "white" }} />
              </div>
            </Badge>
          </Popover>

          <StatusNotification
            userId={JSON.parse(localStorage.getItem("user"))?.id}
            setNotificationStats={setNotificationStats}
          />
        </div> */}
      </div>
    </div>
  );
};

export default TopBar;
