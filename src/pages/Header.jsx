import React from "react";
import "../styles/dashboard-header.css";
import Logo from "../../public/logo.png";
import { Input } from "antd";
//import Hamburger, { Divide } from "hamburger-react";
import { CaretRightOutlined, SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useOne } from "@refinedev/core";

const Header = ({ setSearch } ) => {
  const userid = localStorage.getItem("userid");
  
  const navigate = useNavigate();
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
  console.log("Data for header ",data)
  if (isLoading){
    return <p>Loading...</p>;
  }
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div style={{ display: "flex", gap: "0.3rem", color: "white" }}>
          <div className="name-scale-on-mobile">
            <h2 style={{ marginBottom: "-0.5rem" }}>EMEELAN</h2>
            <span style={{ marginTop: "-10rem" }}>गठजोड़</span>
          </div>
          <div className="logo-hide-on-mobile">
            <img
              src={Logo}
              alt="logo"
              style={{ width: "2.5rem", marginTop: "0.3rem" }}
            ></img>
          </div>
        </div>
        {/* <div style={{ width: "25rem", display: "flex", gap: "1rem" }}>
          <Input
            prefix={
              <div
               className="hamburger"
              >
                <Hamburger size={20}></Hamburger>
              </div>
            }
            onChange={(e) => setSearch(e.target.value)}
            suffix={<SearchOutlined></SearchOutlined>}
            style={{ borderRadius: "1rem" }}
            placeholder="Search Profiles By Name"
          ></Input>
          <UserAddOutlined className="matches-icon" style={{fontSize: "1.5rem", cursor: "pointer", color: "white"}} onClick={() => navigate('/matches')}/>
        </div> */}
        <div style={{display: "flex", alignItems: "center", gap: "1rem", cursor: "pointer"}} onClick={() => navigate(`/myprofile/${userid}`)}>
            <div style={{width: "2rem", height: "2rem", borderRadius: "50%", objectFit: "cover", backgroundColor: "white", overflow: "hidden"}}>
                <img style={{width: "2rem"}} src={photos} alt="" />
            </div>
            <div style={{color: "white"}} className="dashboard-username">
                 {user?.username}<CaretRightOutlined />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
