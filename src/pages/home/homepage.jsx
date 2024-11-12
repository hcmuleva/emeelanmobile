import React from "react";
import CoverImage from "../../../public/gathjod-home.png";
import "../../styles/home.css";
import { Button, Image, Select } from "antd";
import Logo from "../../../public/logo.png";
import Help from "../../../public/help.png";
import Stories from "../../../public/success_stories.png";
import Heart from "../../../public/heart.png";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleStart = () => {
    navigate("/login");
  };
  return (
    <>
      <img src={CoverImage} className="root"></img>
      <div className="box">
        <div className="sub-container">
          <div className="header">
            <div style={{ display: "flex", gap: "0.3rem", color: "white" }}>
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
            <div
              style={{
                display: "flex",
                color: "white",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <span
                style={{
                  fontSize: "1.2rem",
                  color: "lightgray",
                  cursor: "pointer",
                }}
                onClick={handleLogin}
              >
                Login
              </span>
              <img src={Help} alt="Help" className="help" />
            </div>
          </div>
          <div>
            <div className="heading">
              <span>We Bring</span>
              <span style={{ marginTop: "-1rem" }}>People Together</span>
            </div>
            <div className="filters">
              <div>
                <span>Looking For a</span>
                <br></br>
                <Select placeholder="select gender" style={{width: "10rem"}}>
                  <Select.Option value="Male">Male</Select.Option>
                  <Select.Option value="Female">Female</Select.Option>
                </Select>
              </div>
              <div style={{ display: "flex", gap: "2rem", marginTop: "1rem" }}>
                <div>
                  <span>Ages From</span>
                  <br></br>
                  <Select placeholder="select age from" style={{width: "10rem"}}>
                    {Array.from(Array(30).keys()).map((_, index) => {
                      return (
                        <Select.Option value={index + 15}>
                          {index + 15}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </div>
                <div>
                  <span>To</span>
                  <br></br>
                  <Select placeholder="to" style={{width: "10rem"}}>
                    {Array.from(Array(30).keys()).map((_, index) => {
                      return (
                        <Select.Option value={index + 15}>
                          {index + 15}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </div>
              </div>
              <div style={{ marginTop: "2rem" }}>
                <Button
                  type="primary"
                  style={{
                    color: "white",
                    backgroundColor: "darkred",
                    borderRadius: "1.5rem",
                    fontSize: "1rem",
                    padding: "1.2rem",
                  }}
                  onClick={handleStart}
                >
                  Let's Start
                </Button>
              </div>
            </div>
          </div>
          <div className="st">
            <div className="middle">
              <h1>Your Love Story Starts Here !</h1>
            </div>
            <div className="st-data">
              <div className="st-box">
                <div className="st-text">
                  <span id="number">1300+</span>
                  <span>Members</span>
                </div>
              </div>
              <div className="st-box">
                <div className="st-text">
                  <span id="number">100+</span>
                  <span>Engaged</span>
                </div>
              </div>
              <div className="st-box">
                <div className="st-text">
                  <span id="number">30+</span>
                  <span>Cities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="stories">
        <img src={Stories} alt="stories"></img>
      </div>
      <div className="why-choose">
        <div className="left-why-choose">
          <div className="choose-text">
            <h2>Why Us?</h2>
            <h1>
              <b>WHY CHOOSE</b>
            </h1>
            <h1>
              <b>EMEELAN</b>
            </h1>
          </div>
        </div>
        <div className="right-why-choose">
          <div style={{ marginTop: "4rem" }}>
            <div style={{ display: "flex", gap: "1rem" }}>
              <img src={Heart} alt="Heart"></img>
              <div>
                <p className="text-detail">Safe and Verified Accounts - Your</p>
                <p>Security is Our Priority</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <img src={Heart} alt="Heart"></img>
              <p id="te">Effortlessly Find Your Loved Ones</p>
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <img src={Heart} alt="Heart"></img>
              <div>
                <p className="text-detail">
                  Exceptional Support - We're Here to
                </p>
                <p> Help</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <img src={Heart} alt="Heart"></img>
              <div>
                <p className="text-detail">Trusted Community - Where Love</p>
                <p>Blossoms</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="statistics">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>Male and Female Membership</h1>
          <h1>Statistics on EMEELAN</h1>
        </div>
      </div>
      <hr style={{ width: "60%" }}></hr>
      <div className="stat">
        <div className="stat-left">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1>1,000+</h1>
            <h2>Males</h2>
          </div>
        </div>
        <div className="stat-right">
          <div>
            <h1>3000+</h1>
            <h2>Females</h2>
          </div>
        </div>
      </div>
      <div className="home-footer"></div>
    </>
  );
};

export default HomePage;
