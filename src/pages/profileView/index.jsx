import React, { useEffect, useState } from "react";
import Header from "./header/header";
import Woman from "../../../public/woman.png";
import {
  EnvironmentOutlined,
  HeartFilled,
  LoadingOutlined,
} from "@ant-design/icons";
import "../../styles/profile.css";
import Person from "../../../public/Location.png";
import Calender from "../../../public/Calender.png";
import Contact from "../../../public/Contact.png";
import Scholar from "../../../public/Scholar.png";
import PassportSize from "../../../public/Person.png";
import Family from "../../../public/family.png";
import Hobbies from "../../../public/hobbies.png";
import Business from "../../../public/business.png";
import Horoscope from "../../../public/horoscope.png";
import AddRequest from "../../../public/add-request.png";
import RequestAccepted from "../../../public/request-accepted.png";
import Fitness from "../../../public/fitness.png";
import { Button, Modal, Spin } from "antd";
import { useParams } from "react-router-dom";
import { useCustom, useOne, useUpdate } from "@refinedev/core";
import calculateAge from "../../utils/age-finder";
import { Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_SERVER_URL;

const ProfileView = () => {
  const { id } = useParams();
  const userid = localStorage.getItem("userid");
  const jwt_token = localStorage.getItem("jwt-token");
  const [like, setLike] = useState(false);
  const [request, setRequest] = useState(false);
  const [connection, setConnection] = useState(false);
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useCustom({
    url: `${API_URL}/api/custom-like-request-connection-check`,
    method: "get",
    config: {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
        "x-custom-header": "foo-bar",
      },
      query: {
        id: id,
        userid: userid,
      },
    },
  });
  useEffect(() => {
    setLike(data?.data?.data?.liked);
    setConnection(data?.data?.data?.isConnection);
    setRequest(data?.data?.data?.requested);
  }, [data]);
  const user = data?.data?.data;
  let profile = null;
  profile = `${API_URL}${user?.profilePicture?.url}`
  if (!user?.profilePicture) {
    profile = user?.Pictures?.replace(/[\[\]']/g, "").split(", ");
  }
  const handleLike = async () => {
    if (!like) {
      await fetch(`${API_URL}/api/custom-update-likes/${id}/userid/${userid}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`, // Include the token in the Authorization header
        },
      });
    } else {
      await fetch(`${API_URL}/api/custom-like-delete/${id}/userid/${userid}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`, // Include the token in the Authorization header
        },
      });
      console.log("record removed from likes");
    }
    setLike(!like);
  };
  const handleRequest = async () => {
    if (!request) {
      await fetch(
        `${API_URL}/api/custom-update-requests/${id}/userid/${userid}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`, // Include the token in the Authorization header
          },
        }
      );
    } else {
      await fetch(
        `${API_URL}/api/custom-remove-request/${userid}/userid/${id}`,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`, // Include the token in the Authorization header
          },
        }
      );
    }
    setRequest(!request);
  };
  const handleSeeMore = () => {

  }
  if (isLoading) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoadingOutlined style={{ fontSize: "4rem" }} />
      </div>
    );
  }
  return (
    <div>
      <Header></Header>
      <div
        style={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}
      >
        <div style={{ width: "60%", color: "#36454F" }} className="profile-view-container">
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid darkgray",
              paddingBottom: "1rem",
            }}
            className="profile-main-photos-container"
          >
            <div className="profile-image">
              <img src={profile} alt="photo"></img>
              <div className="profile-name">
                <div style={{ fontSize: "1.5rem", display: "flex", alignItems: "center", gap: 6 }} className="profile-name-mobile">
                  <span>{user?.FirstName} {user?.LastName}</span>{" "}
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <HeartFilled
                     className="profile-name-like-request"
                      style={
                        like
                          ? { color: "red", cursor: "pointer" }
                          : { color: "white", cursor: "pointer" }
                      }
                      onClick={handleLike}
                    />
                    {connection ? <span
                        style={{ fontSize: "1rem", cursor: "pointer", color: "green" }}
                        className="profile-name-like-request"
                        onClick={handleRequest}
                      >
                        Connected
                      </span> : request ? (
                      <span
                        style={{ fontSize: "1rem", cursor: "pointer", color: "orange" }}
                        className="profile-name-like-request"
                        onClick={handleRequest}
                      >
                        Request Sent
                      </span>
                    ) : (
                      <span
                        style={{ fontSize: "1rem", cursor: "pointer" }}
                        className="profile-name-like-request"
                        onClick={handleRequest}
                      >
                        <img
                          style={{ width: "1.8rem" }}
                          src={AddRequest}
                          alt="person"
                        ></img>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-photos">
              <div className="profile-photos-heading-container">
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "darkred",
                    marginLeft: "1rem",
                    pointerEvents: "none",
                  }}
                  className="profile-photos-heading"
                >
                  PHOTOS
                </Button>
                <span style={{color: "darkred", cursor: "pointer"}} onClick={() => setOpen(true)} className="see-more">See More</span>
              </div>
              <div
                style={{
                  display: "flex",
                  marginBottom: "1rem",
                  marginTop: "2rem",
                  gap: 9,
                  marginLeft: "1rem",
                }}
              >
                <div className="profile-photos-small">
                  <img src={`${user?.photos?.[0] ? user?.photos?.[0]?.url : ""}`} alt="photo"></img>
                  <div className="profile-name"></div>
                </div>
                <div className="profile-photos-small" id="profile-photos-small-mobile">
                  <img src={`${user?.photos?.[1] ? user?.photos?.[1]?.url : ""}`} alt="photo"></img>
                  <div className="profile-name"></div>
                </div>
                <div className="profile-photos-small" id="profile-photos-small-mobile">
                  <img src={`${user?.photos?.[2] ? user?.photos?.[2]?.url : ""}`} alt="photo"></img>
                  <div className="profile-name"></div>
                </div>
              </div>
              <div style={{ display: "flex", marginLeft: "1rem", gap: 9 }}>
                <div className="profile-photos-small" id="profile-photos-small-mobile">
                  <img src={`${user?.photos?.[3] ? user?.photos?.[3]?.url : ""}`} alt="photo"></img>
                  <div className="profile-name"></div>
                </div>
                <div className="profile-photos-small" id="profile-photos-small-mobile">
                  <img src={`${user?.photos?.[4] ? user?.photos?.[4]?.url : ""}`} alt="photo"></img>
                  <div className="profile-name"></div>
                </div>
                <div
                  style={{display: "flex", justifyContent: "center", alignItems: "center", color: "white", backgroundColor: "black", cursor: "pointer"}}
                  className="profile-photos-small"
                  id="profile-photos-small-mobile"
                  onClick={() => setOpen(true)}
                >
                  <b>See More</b>
                </div>
              </div>
              {/* <div className="profile-name">
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span>Radhika Sharma</span> <HeartFilled />
                </div>
              </div> */}
            </div>
          </div>
          <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            <Button
              type="primary"
              style={{ backgroundColor: "darkred", pointerEvents: "none" }}
            >
              About
            </Button>
          </div>
          <div className="about-section">
            <div
              style={
                tab == 0
                  ? { backgroundColor: "darkred", color: "white" }
                  : { color: "black" }
              }
              className="about-tabs"
              onClick={() => setTab(0)}
            >
              Basic Info
            </div>
            <div
              style={
                tab == 1
                  ? { backgroundColor: "darkred", color: "white" }
                  : { color: "black" }
              }
              className="about-tabs"
              onClick={() => setTab(1)}
            >
              Family & Other Info
            </div>
            <div
              style={
                tab == 2
                  ? { backgroundColor: "darkred", color: "white" }
                  : { color: "black" }
              }
              className="about-tabs"
              onClick={() => setTab(2)}
            >
              Preferences
            </div>
          </div>
          {tab == 0 && (
            <div style={{ marginTop: "3rem", display: "flex" }} className="about-me-sections-mobile-view">
              <div className="about-me-sections">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div>
                    <span style={{ fontSize: "3rem" }}>
                      <EnvironmentOutlined />
                    </span>
                  </div>
                  <div>
                    <span>
                      <b>City</b>: {user?.home_address}
                    </span>
                    <br />
                    <span>
                      <b>State</b>: {user?.State}
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 12,
                    marginTop: "2rem",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "3rem" }}>
                      <img
                        style={{ width: "3rem", height: "100$" }}
                        src={Person}
                        alt="person"
                      ></img>
                    </span>
                  </div>
                  <div>
                    <span>
                      <b>Gender</b>: {user?.Sex}
                    </span>
                    <br />
                    <span>
                      <b>Marital Status</b>: {user?.marital}
                    </span>
                    <br />
                    <span>
                      <b>Language</b>: {user?.Language}
                    </span>
                    <br />
                    <span>
                      <b>Height</b>:{user?.Height}
                    </span>
                    <br />
                    <span>
                      <b>Samaj</b>: {user?.Samaj}
                    </span>
                    <br />
                    <span>
                      <b>Gotra</b>: {user?.Gotra}
                    </span>
                  </div>
                </div>
              </div>
              <div className="about-me-sections">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div>
                    <span style={{ fontSize: "3rem" }}>
                      <img
                        style={{ width: "3rem", height: "100%" }}
                        src={Calender}
                        alt="person"
                      ></img>
                    </span>
                  </div>
                  <div>
                    <span>
                      <b>Birthday</b>: {user?.DOB}
                    </span>
                    <br />
                    <span>
                      <b>Age</b>: {calculateAge(user?.DOB)}
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 12,
                    marginTop: "2rem",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "3rem" }}>
                      <img
                        style={{ width: "3rem", height: "100%" }}
                        src={Contact}
                        alt="person"
                      ></img>
                    </span>
                  </div>
                  <div>
                    <span>
                      <b>Number</b>: +91 92********
                    </span>
                    <br />
                    <span>
                      <b>Email</b>: *****@gmail.com
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="about-me-sections"
                style={{ borderRight: "none" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div>
                    <span style={{ fontSize: "3rem" }}>
                      <img
                        style={{ width: "3rem", height: "100%" }}
                        src={Scholar}
                        alt="person"
                      ></img>
                    </span>
                  </div>
                  <div>
                    <span>
                      <b>Education</b>: {user?.HighestDegree}
                    </span>
                    <br />
                    <span>
                      <b>Profession</b>: {user?.Profession}
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 12,
                    marginTop: "2rem",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "3rem" }}>
                      <img
                        style={{ width: "3rem", height: "100%" }}
                        src={PassportSize}
                        alt="person"
                      ></img>
                    </span>
                  </div>
                  <div>
                    <span>
                      <b>About Me</b> <br /> Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit. Nunc maximus, nulla ut
                      commodo sagittis, sapien dui mattis dui, non pulvinar
                      lorem felis nec erat
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {tab == 1 && (
            <div style={{ marginTop: "3rem", display: "flex" }} className="about-me-sections-mobile-view">
              <div className="about-me-sections">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div>
                    <span style={{ fontSize: "3rem" }}>
                      <img
                        style={{ width: "3rem", height: "100%" }}
                        src={Family}
                        alt="person"
                      ></img>
                    </span>
                  </div>
                  <div>
                    <p style={{ fontSize: "1rem" }}>
                      <b>Paternal</b>
                    </p>{" "}
                    <span>
                      <b>Family Type:</b>
                      {user.FamilyType}
                    </span>{" "}
                    <br />
                    <span>
                      <b>Father Name:</b> {user.FatherName}
                    </span>{" "}
                    <br />
                    <span>
                      <b>Mother Name:</b>
                      {user.MotherName}
                    </span>{" "}
                    <br />
                    <span>
                      <b>GrandFather Name:</b>
                      {user.MotherName}
                    </span>{" "}
                    <br />
                    <span>
                      <b>GrandMother Name:</b>
                      {user.MotherName}
                    </span>{" "}
                    <br />
                    <span>
                      <b>Father Mob. No.:</b> +91-92xxx-xxxxx
                    </span>{" "}
                    <br />
                    <span>
                      <b>Siblings:</b>
                      {user.Siblings}
                    </span>{" "}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 12,
                    marginTop: "2rem",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "3rem" }}>
                      <img
                        style={{ width: "3rem", height: "100%" }}
                        src={Business}
                        alt="person"
                      ></img>
                    </span>
                  </div>
                  <div>
                    <span>
                      <b>Family Business</b> <br /> {user?.FamilyBusiness}
                    </span>
                  </div>
                </div>
              </div>
              <div className="about-me-sections">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div>
                    <span style={{ fontSize: "3rem" }}>
                      <img
                        style={{ width: "3rem", height: "100%" }}
                        src={Family}
                        alt="person"
                      ></img>
                    </span>
                  </div>
                  <div>
                    <p style={{ fontSize: "1rem" }}>
                      <b>Maternal</b> {user.FatherName}
                    </p>{" "}
                    <span>
                      <b>MamaJi Name</b>: {user?.MamajiName}
                    </span>
                    <br />
                    <span>
                      <b>NanaJi Name</b>: {user?.NanajiName}
                    </span>
                    <br />
                    <span>
                      <b>NaniJi Name</b>: {user?.NanijiName}
                    </span>
                    <br />
                    <span>
                      <b>Phone Number</b>: {user?.MamajiMobileNumber}
                    </span>
                    <br />
                    <span>
                      <b>Gotra</b>: {user?.MaternalGotra}
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 12,
                    marginTop: "2rem",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "3rem" }}>
                      <img
                        style={{ width: "3rem", height: "100%" }}
                        src={Hobbies}
                        alt="person"
                      ></img>
                    </span>
                  </div>
                  <div>
                    <span>
                      <b>Hobbies</b>: {user?.Hobbies}
                    </span>
                    <br />
                    <span>
                      <b>Other Interests</b>: {user?.Profession}
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="about-me-sections"
                style={{ borderRight: "none" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div>
                    <span style={{ fontSize: "3rem" }}>
                      <img
                        style={{ width: "3rem", height: "100%" }}
                        src={Fitness}
                        alt="person"
                      ></img>
                    </span>
                  </div>
                  <div>
                    <span>
                      <b>Lifestyle</b>: Fitness Freak {user?.LifeStyle}
                    </span>
                    <br />
                    <span>
                      <b>Other Activities</b>: {user?.Profession}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 12,
                    marginTop: "2rem",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "3rem" }}>
                      <img
                        style={{ width: "3rem", height: "100%" }}
                        src={Horoscope}
                        alt="person"
                      ></img>
                    </span>
                  </div>
                  <div>
                    <span>
                      <b>Horoscope Details</b> <br />
                      {user?.Horoscope}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {tab == 2 && (
            <div style={{ marginTop: "3rem", display: "flex" }} className="about-me-sections-mobile-view">
              <div className="about-me-sections">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 12,
                    marginTop: "2rem",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "3rem" }}>
                      <img
                        style={{ width: "3rem", height: "100$" }}
                        src={Person}
                        alt="person"
                      ></img>
                    </span>
                  </div>
                  <div>
                    <span>
                      <b>Gender Pref</b>:{" "}
                      {user?.Sex === "Male" ? "Female" : "Male"}
                    </span>
                    <br />
                    <span>
                      <b>Marital Status</b>: {user?.marital}
                    </span>
                    <br />
                    <span>
                      <b>Preferred Language</b>: {user?.Language}
                    </span>
                    <br />
                    <span>
                      <b>Min Height</b>:{user?.PreMinHeight}
                    </span>
                    <br />
                    <span>
                      <b>Max Height</b>:{user?.PreMaxHeight}
                    </span>
                    <br />
                    <span>
                      <b>Pref Gotra</b>: {user?.Gotra}
                    </span>
                  </div>
                </div>
              </div>
              <div className="about-me-sections">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div>
                    <span style={{ fontSize: "3rem" }}>
                      <img
                        style={{ width: "3rem", height: "100%" }}
                        src={Calender}
                        alt="person"
                      ></img>
                    </span>
                  </div>
                  <div>
                    <span>
                      <b>Min. Age</b>: {user?.PreMinAge}
                    </span>
                    <br />
                    <span>
                      <b>Max. Age</b>: {user?.PreMaxAge}
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 12,
                    marginTop: "2rem",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "3rem" }}>
                      <img
                        style={{ width: "3rem", height: "100%" }}
                        src={Contact}
                        alt="person"
                      ></img>
                    </span>
                  </div>
                  <div>
                    <span>
                      <b>Number</b>: +91 92********
                    </span>
                    <br />
                    <span>
                      <b>Email</b>: *****@gmail.com
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="about-me-sections"
                style={{ borderRight: "none" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div>
                    <span style={{ fontSize: "3rem" }}>
                      <img
                        style={{ width: "3rem", height: "100%" }}
                        src={Scholar}
                        alt="person"
                      ></img>
                    </span>
                  </div>
                  <div>
                    <span>
                      <b>Preferred Qualification</b>: {user?.HighestDegree}
                    </span>
                    <br />
                    <span>
                      <b>Preferred Profession</b>: {user?.PreProfession}
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 12,
                    marginTop: "2rem",
                  }}
                >
                  <div>
                    <span style={{ fontSize: "3rem" }}>
                      <img
                        style={{ width: "3rem", height: "100%" }}
                        src={PassportSize}
                        alt="person"
                      ></img>
                    </span>
                  </div>
                  <div>
                    <span>
                      <b>Preference Description</b> <br /> Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit. Nunc maximus, nulla ut
                      commodo sagittis, sapien dui mattis dui, non pulvinar
                      lorem felis nec erat
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal open={open} onCancel={() => setOpen(false)} footer={null} title={<div style={{width: "100%", display: "flex", justifyContent: "center"}}>Photos</div>}>
        {user?.photos?.map((photo) => <img src={API_URL + photo?.url} alt="photo"></img>)}
        <Button onClick={() => setOpen(false)} style={{backgroundColor: "darkred", color: "white"}}>OK</Button>
      </Modal>
      <div className="profile-footer"></div>
    </div>
  );
};

export default ProfileView;
