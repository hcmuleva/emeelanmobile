import React, { useContext, useEffect, useState } from "react";
import { Avatar } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { getCustomMe } from "../../services/api";
// import DynamicLogo from "./DynamicLogo";

const TopBar = ({ userRole }) => {
  const { jwt, profileUpdated, setProfileUpdated } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [greet, setGreet] = useState("");
  const navigate = useNavigate();

  const greetArr = ["Hello!", "Hey!"];

  useEffect(() => {
    const getMe = async () => {
      try {
        const res = await getCustomMe(jwt);
        setUser(res);
        setProfileUpdated(false);
      } catch (error) {
        console.error("error", error);
      }
    };
    getMe();
  }, [jwt, profileUpdated]);

  useEffect(() => {
    setGreet(greetArr[Math.floor(Math.random() * greetArr.length)]);
  }, []);

  let userProfile = user?.Pictures?.profilePicture?.url ||
    user?.images?.pictures?.[0] ||
    user?.Pictures?.photos?.[0]?.url ||
    (user?.Sex === "Female" ? "/assets/woman-user-circle-icon.png" :
      (user?.Sex === "Male" ? "/assets/man-user-circle-icon.png" : "/assets/question-mark-circle-outline-icon.png"));

  return (
    <div style={{ zIndex: 100, position: "sticky", top: 0, background: '#BC0226', padding: '35px 12px 20px', color: 'white', }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div onClick={() => navigate("/userprofile")} style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={userProfile}
            style={{ cursor: "pointer", "--size": "55px", borderRadius: "50%" }}
          />
          <div style={{ marginLeft: "12px", textAlign: "left" }}>
            <span style={{ fontWeight: "600", fontSize: "18px", lineHeight: "30px" }}>
              {greet} {user?.FirstName}
            </span>
            <br />
            <span style={{ fontWeight: "400", fontSize: "15px" }}>
              {userRole}
            </span>
          </div>
        </div>
        <div>
          <img style={{
            fill: "#fff",
          }} src="/logo.svg" alt="Logo" width="40" height="40" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
