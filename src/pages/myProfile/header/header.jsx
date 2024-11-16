import React from "react";
import "../../../styles/profile-header.css";
import Logo from "../../../../public/logo.png";
import { Button, Input } from "antd";
import Hamburger, { Divide } from "hamburger-react";
import { CaretRightOutlined, HomeOutlined, LogoutOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useLogout, useOne } from "@refinedev/core";

const Header = () => {
  const navigate = useNavigate();
  const userid = localStorage.getItem("userid");
  const emeelanrole=localStorage.getItem("emeelanrole")
  const {mutate: logout} = useLogout();
  const {data, isLoading} = useOne({
    resource: "users",
    id: String(userid)
  })
  const user = data?.data;
  const pic = user?.Pictures;
  let photos = null;
  if (pic){
    photos = pic?.replace(/[\[\]']/g, "").split(", ");
  }
  const handleLogout = () => {
    navigate('/login');
    logout();
  }
  const handleBackToHome= ()=>{
    console.log("handleBackToHome clicked ", emeelanrole)
    switch(emeelanrole){
      case "CENTER":
        navigate('/dashboard')
      break;
      case "ADMIN":
        navigate('/admin-dashboard')
        break;
        case "MEELAN":
          navigate('/user-dashboard')
          break;
        default :
        navigate('/user-dashboard')
    }
       
}
  if (isLoading){
    return <p>Loading...</p>;
  }

  
  return (
    <div className="profile-container">
      <div className="profile-content">
        <div style={{ display: "flex", gap: "0.3rem" }}>
          <div>
            <h2 style={{ marginBottom: "-0.5rem" }}>EMEELAN</h2>
            <span style={{ marginTop: "-10rem" }}>गठजोड़</span>
          </div>
          <div>
            <img
              src={Logo}
              alt="logo"
              style={{ width: "2.5rem", marginTop: "0.3rem" }}
            ></img>
          </div>
        </div>
        <div style={{ width: "25rem", display: "flex", justifyContent: "center", alignItems: "center"}}>
          <p style={{color: "black", marginTop: "1rem", cursor: "pointer"}} onClick={() => {
            console.log("Clicked home")
            handleBackToHome()
            }}><HomeOutlined /> Back To Home</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              width: "2rem",
              height: "2rem",
              borderRadius: "50%",
              objectFit: "cover",
              backgroundColor: "white",
              overflow: "hidden"
            }}
          > 
          </div>
          <div style={{cursor: "pointer"}} onClick={handleLogout}>
            Logout <LogoutOutlined /> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
