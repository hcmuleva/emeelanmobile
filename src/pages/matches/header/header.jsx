import React from "react";
import "../../../styles/profile-header.css";
import Logo from "../../../../public/logo.png";
import { Button, Input } from "antd";
import Hamburger, { Divide } from "hamburger-react";
import { CaretRightOutlined, HomeOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useOne } from "@refinedev/core";

const Header = () => {
  const navigate = useNavigate();
  const userid = localStorage.getItem("userid");
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
  if (isLoading){
    return <p>Loading...</p>;
  }
  return (
    <div className="profile-container">
      <div className="profile-content">
        <div style={{ display: "flex", gap: "0.3rem"}}>
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
          <p style={{color: "black", marginTop: "1rem", cursor: "pointer"}} onClick={() => navigate('/dashboard')}><HomeOutlined /> Back To Home</p>
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
            <img style={{ width: "2rem" }} src={photos} alt="profile" />
          </div>
          <div style={{cursor: "pointer"}} onClick={() => navigate(`/myprofile/${userid}`)}>
            {user?.username} <CaretRightOutlined />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
