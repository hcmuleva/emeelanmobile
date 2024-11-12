import React, { useEffect, useState } from "react";
import Header from "./header/header";
import Woman from "../../../public/woman.png";
import {
  EnvironmentOutlined,
  HeartFilled,
  LoadingOutlined,
  PlusOutlined,
  SettingOutlined,
  UnderlineOutlined,
  UploadOutlined,
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
import Preferences from "../../../public/preferences.png";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Spin,
  Upload,
} from "antd";
import { useParams } from "react-router-dom";
import { useOne, useUpdate } from "@refinedev/core";
import calculateAge from "../../utils/age-finder";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { getValueProps } from "@refinedev/strapi-v4";
import axios from "axios";
import Settings from "./settings/settings";
import "../../styles/settings.css";
const API_URL = import.meta.env.VITE_SERVER_URL;

dayjs.extend(utc);
dayjs.extend(timezone);

const { TextArea } = Input;

const MyProfile = () => {
  const { id } = useParams();
  const userid = localStorage.getItem("userid");
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([{
    uid: "0",
    name: "0",
    url: "0"
  }]);
  const [profilePicture, setProfilePicture] = useState([{
    uid: "0",
    name: "0",
    url: "0"
  }]);
  const { data, isLoading } = useOne({
    resource: "users",
    id,
    meta: {
      populate: ["photos","profilePicture", "user_setting"],
    },
  });
  useEffect(() => {
    const photos = data?.data?.photos?.map((photo) => {
      return {
        uid: photo?.id,
        name: photo?.name,
        url: photo?.url,
      };
    });
    setImages(photos);
  }, [data]);
  if (id !== userid) {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Unathorized !! Sorry you don't have access to this Resource
      </div>
    );
  }
  const { mutate: updateUser } = useUpdate();
  const [edit, setEdit] = useState(false);
  const user = data?.data;
  let profile = null;
  profile = `${user?.profilePicture?.url}`
  if (!user?.profilePicture) {
    profile = user?.profilePicture?.replace(/[\[\]']/g, "").split(", ");
  }
  const handleClick = () => {
    setEdit(!edit);
    setTab(0);
  };
  const handleFinish = (values) => {
    const formattedDate = dayjs(values["DOB"])
      .startOf("day")
      .tz("Asia/Kolkata")
      .format();
    updateUser({
      resource: "users",
      id,
      values: { ...values, DOB: formattedDate },
    });
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
        color: "black",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  const handlePhotoSubmit = async () => {
    const photos = images?.map((image) => image.uid);
    const profile = profilePicture?.map((profile) => profile.uid);
    await updateUser({
      resource: "users",
      id: userid,
      values: {
        photos: photos,
        profilePicture: profile
      },
    });
    handleProfileChange
  };
  let flag = false
  const customRequest = ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("files", file);

    axios
      .post(`${API_URL}/api/upload`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      })
      .then((response) => {
        const img = {
          uid: response?.data?.[0]?.id,
          name: response?.data?.[0]?.name,
          url: response?.data?.[0]?.url,
        };
        let newImages = images.filter((user) => typeof user.uid === "number");
        newImages.push(img);
        setImages(newImages);
        flag = true;
        onSuccess(response?.data);
      })
      .catch((error) => {
        console.error("Upload failed", error);
        onError(error);
      });
  };
  let flag1 = false
  const customProfileRequest = ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("files", file);

    axios
      .post(`${API_URL}/api/upload`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
        },
      })
      .then((response) => {
        const img = {
          uid: response?.data?.[0]?.id,
          name: response?.data?.[0]?.name,
          url: response?.data?.[0]?.url,
        };
        setProfilePicture([img]);
        flag1 = true;
        onSuccess(response?.data);
      })
      .catch((error) => {
        console.error("Upload failed", error);
        onError(error);
      });
  };
  const handleProfileChange = ({fileList}) => {
    if (!flag1){
      setProfilePicture(fileList)
    }
    flag1 = false
  }
  const handleChange = ({ fileList }) => {
    if (!flag) setImages(fileList);
    flag = false;
  };
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
        <div style={{ width: "60%", color: "#36454F" }}>
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid darkgray",
              paddingBottom: "1rem",
            }}
          >
            <div className="profile-image">
              <img src={profile} alt="photo"></img>
              <div className="profile-name">
                <div style={{ fontSize: "1.5rem", display: "flex", alignItems: "center", gap: 6 }}>
                  <span>{user?.FirstName} {user?.LastName}</span>
                  <br />
                </div>
              </div>
            </div>
            <div className="profile-photos">
              <Button
                type="primary"
                style={{
                  backgroundColor: "blue",
                  marginLeft: "1rem",
                  pointerEvents: "none",
                }}
              >
                PHOTOS
              </Button>
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
                  <img src={`${data?.data?.photos?.[0] ? data?.data?.photos?.[0]?.url : ""}`} alt="photo"></img>
                  <div className="profile-name"></div>
                </div>
                <div className="profile-photos-small">
                  <img src={`${data?.data?.photos?.[1] ? data?.data?.photos?.[1]?.url : ""}`} alt="photo"></img>
                  <div className="profile-name"></div>
                </div>
                <div className="profile-photos-small">
                  <img src={`${data?.data?.photos?.[2] ? data?.data?.photos?.[2]?.url : ""}`} alt="photo"></img>
                  <div className="profile-name"></div>
                </div>
              </div>
              <div style={{ display: "flex", marginLeft: "1rem", gap: 9 }}>
                <div className="profile-photos-small">
                  <img src={`${data?.data?.photos?.[3] ? data?.data?.photos?.[3]?.url : ""}`} alt="photo"></img>
                  <div className="profile-name"></div>
                </div>
                <div className="profile-photos-small">
                  <img src={`${data?.data?.photos?.[4] ? data?.data?.photos?.[4]?.url : ""}`} alt="photo"></img>
                  <div className="profile-name"></div>
                </div>
                <div>
                  <div>
                    <Button
                      className="upload-photos"
                      onClick={() => setOpen(true)}
                    >
                      Upload Photos
                    </Button>
                    <Modal
                      open={open}
                      onCancel={() => setOpen(false)}
                      onClose={() => setOpen(false)}
                      title={
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "2rem",
                          }}
                        >
                          Upload Your Photos
                        </div>
                      }
                      footer={null}
                    >
                      {/* <Form onFinish={handlePhotoSubmit}>
                        <Form.Item
                          name="photos"
                          valuePropName="fileList"
                          getValueProps={(data) => getValueProps(data, API_URL)}
                        > */}
                      <p>My Profile Picture</p>
                      <Upload.Dragger
                        name="files"
                        fileList={profilePicture}
                        onChange={handleProfileChange}
                        customRequest={customProfileRequest}
                        listType="picture-card"
                        headers={{
                          Authorization: `Bearer ${localStorage.getItem(
                            "jwt-token"
                          )}`,
                        }}
                        accept="*"
                      >
                        {uploadButton}
                      </Upload.Dragger>
                      <p style={{marginTop: "2rem"}}>My Photos</p>
                      <Upload.Dragger
                        name="files"
                        fileList={images}
                        onChange={handleChange}
                        customRequest={customRequest}
                        listType="picture-card"
                        headers={{
                          Authorization: `Bearer ${localStorage.getItem(
                            "jwt-token"
                          )}`,
                        }}
                        accept="*"
                      >
                        {uploadButton}
                      </Upload.Dragger>
                      <Button style={{backgroundColor: "blue", color: "white", marginTop: "2rem"}} onClick={handlePhotoSubmit}>Save</Button>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
          >
            <Button
              type="primary"
              style={{ backgroundColor: "blue" }}
              onClick={() => {setEdit(false), setTab(0)}}
            >
              About Me
            </Button>
            {!edit && (
              <Button
                type="primary"
                style={{
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  color: "blue",
                  boxShadow: "none",
                }}
                onClick={handleClick}
              >
                Edit
              </Button>
            )}
            {edit && (
              <Button
                type="primary"
                style={{
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  color: "blue",
                  boxShadow: "none",
                }}
                onClick={handleClick}
              >
                Cancel
              </Button>
            )}
            <SettingOutlined style={{fontSize: "1.2rem", cursor: "pointer"}} onClick={() => setTab(3)}></SettingOutlined>
          </div>
          
          {!edit && tab !== 3 && (
            <>
              <div className="about-section">
                <div
                  style={
                    tab == 0
                      ? { backgroundColor: "blue", color: "white" }
                      : { color: "black" }
                  }
                  className="about-tabs"
                  onClick={() => setTab(0)}
                >
                  My Basic Info
                </div>
                <div
                  style={
                    tab == 1
                      ? { backgroundColor: "blue", color: "white" }
                      : { color: "black" }
                  }
                  className="about-tabs"
                  onClick={() => setTab(1)}
                >
                  My Family & Other Info
                </div>
                <div
                  style={
                    tab == 2
                      ? { backgroundColor: "blue", color: "white" }
                      : { color: "black" }
                  }
                  className="about-tabs"
                  onClick={() => setTab(2)}
                >
                  My Preferences
                </div>
              </div>
              {tab == 0 && (
                <div style={{ marginTop: "3rem", display: "flex" }}>
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
                <div style={{ marginTop: "3rem", display: "flex" }}>
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
                          <b>Family Type:</b> {user?.FamilyType}
                        </span>{" "}
                        <br />
                        <span>
                          <b>Father Name:</b> {user?.FatherName}
                        </span>{" "}
                        <br />
                        <span>
                          <b>Mother Name:</b>
                          {user?.MotherName}
                        </span>{" "}
                        <br />
                        <span>
                          <b>GrandFather Name:</b>
                          {user?.GrandFatherName}
                        </span>{" "}
                        <br />
                        <span>
                          <b>GrandMother Name:</b>
                          {user?.GrandMotherName}
                        </span>{" "}
                        <br />
                        <span>
                          <b>Father Mob. No.:</b> +91-92xxx-xxxxx
                        </span>{" "}
                        <br />
                        <span>
                          <b>Siblings:</b>
                          {user?.Siblings}
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
                          <b>Maternal</b>
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
                          <b>Phone Number</b>: {user?.MamajiPhoneNumber}
                        </span>
                        <br />
                        <span>
                          <b>Gotra</b>: {user?.NanajiName}
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
                          Aries
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {tab == 2 && (
                <div style={{ marginTop: "3rem", display: "flex" }}>
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
                          <b>Preference Description</b> <br /> Lorem ipsum dolor
                          sit amet, consectetur adipiscing elit. Nunc maximus,
                          nulla ut commodo sagittis, sapien dui mattis dui, non
                          pulvinar lorem felis nec erat
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          {edit && tab !== 3 &&(
            <Form onFinish={handleFinish}>
              <div
                style={{ marginTop: "3rem", display: "flex", color: "black" }}
              >
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
                        <b>City</b>:{" "}
                        <Form.Item name="home_address">
                          <Input defaultValue={user?.home_address}></Input>
                        </Form.Item>
                      </span>
                      <span>
                        <b>State</b>:{" "}
                        <Form.Item name="State">
                          <Input defaultValue={user?.State}></Input>
                        </Form.Item>
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
                        <b>Gender</b>{" "}
                        <Form.Item name="Sex">
                          <Input defaultValue={user?.Sex}></Input>
                        </Form.Item>
                      </span>

                      <span>
                        <b>Marital Status</b>{" "}
                        <Form.Item name="marital">
                          <Input defaultValue={user?.marital}></Input>
                        </Form.Item>
                      </span>

                      <span>
                        <b>Language</b>{" "}
                        <Form.Item name="Language">
                          <Input defaultValue={user?.Language}></Input>
                        </Form.Item>
                      </span>

                      <span>
                        <b>Height</b>
                        <Form.Item name="Height">
                          <Input defaultValue={user?.Height}></Input>
                        </Form.Item>
                      </span>

                      <span>
                        <b>Samaj</b>{" "}
                        <Form.Item name="Samaj">
                          <Input defaultValue={user?.Samaj}></Input>
                        </Form.Item>
                      </span>

                      <span>
                        <b>Gotra</b>{" "}
                        <Form.Item name="Gotra">
                          <Input defaultValue={user?.Gotra}></Input>
                        </Form.Item>
                      </span>
                    </div>
                  </div>
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
                        <b>Maternal</b>
                      </p>{" "}
                      <span>
                        <b>Mamaji Name</b>
                        <Form.Item name="MamajiName">
                          <Input defaultValue={user?.MamajiName}></Input>
                        </Form.Item>
                      </span>
                      <span>
                        <b>Nanaji Name</b>
                        <Form.Item name="NanajiName">
                          <Input defaultValue={user?.NanijiName}></Input>
                        </Form.Item>
                      </span>
                      <span>
                        <b>Naniji Name</b>
                        <Form.Item name="NanijiName">
                          <Input defaultValue={user?.NanijiName}></Input>
                        </Form.Item>
                      </span>
                      <span>
                        <b>Phone Number</b>
                        <Form.Item name="MamajiMobileNumber">
                          <Input
                            defaultValue={user?.MamajiMobileNumber}
                          ></Input>
                        </Form.Item>
                      </span>
                      <span>
                        <b>Gotra</b>
                        <Form.Item name="MaternalGotra">
                          <Input defaultValue={user?.MaternalGotra}></Input>
                        </Form.Item>
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
                          src={Business}
                          alt="person"
                        ></img>
                      </span>
                    </div>
                    <div>
                      <span>
                        <b>Family Business</b> <br />
                        <Form.Item name="FamilyBusiness">
                          <Input defaultValue={user?.FamilyBusiness}></Input>
                        </Form.Item>
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
                        <b>Birthday</b>{" "}
                        <Form.Item name="DOB">
                          <DatePicker
                            defaultValue={dayjs(user?.DOB)}
                          ></DatePicker>
                        </Form.Item>
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
                        <b>Number</b>{" "}
                        <Form.Item name="mobile">
                          <Input disabled defaultValue={user?.mobile}></Input>
                        </Form.Item>
                      </span>
                      <span>
                        <b>Email</b>{" "}
                        <Form.Item name="email">
                          <Input disabled defaultValue={user?.email}></Input>
                        </Form.Item>
                      </span>
                      <span>
                        <b>Username</b>{" "}
                        <Form.Item name="username">
                          <Input defaultValue={user?.username}></Input>
                        </Form.Item>
                      </span>
                    </div>
                  </div>
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
                        <b>Family Type</b>
                        <Form.Item name="FamilyType">
                          <Select
                            placeholder="Select family type"
                            defaultValue={user?.FamilyType}
                          >
                            <Select.Option value="Joint" label="Joint">
                              Joint
                            </Select.Option>
                            <Select.Option value="Nuclear" label="Nuclear">
                              Nuclear
                            </Select.Option>
                          </Select>
                        </Form.Item>
                      </span>{" "}
                      <span>
                        <b>Father Name</b>
                        <Form.Item name="FatherName">
                          <Input
                            placeholder="enter father's name"
                            defaultValue={user?.FatherName}
                          ></Input>
                        </Form.Item>
                      </span>{" "}
                      <span>
                        <b>Mother Name</b>
                        <Form.Item name="MotherName">
                          <Input
                            placeholder="enter mother's name"
                            defaultValue={user?.MotherName}
                          ></Input>
                        </Form.Item>
                      </span>{" "}
                      <span>
                        <b>GrandFather Name</b>
                        <Form.Item name="GrandFatherName">
                          <Input
                            placeholder="enter grandfather's name"
                            defaultValue={user?.GrandFatherName}
                          ></Input>
                        </Form.Item>
                      </span>{" "}
                      <span>
                        <b>GrandMother Name</b>
                        <Form.Item name="GrandMotherName">
                          <Input
                            placeholder="enter grandmother's name"
                            defaultValue={user?.GrandMotherName}
                          ></Input>
                        </Form.Item>
                      </span>{" "}
                      <span>
                        <b>Father Mob. No.</b>
                        <Form.Item name="FatherMobileNumber">
                          <Input
                            placeholder="enter father's mob. no."
                            defaultValue={user?.FatherMobileNumber}
                          ></Input>
                        </Form.Item>
                      </span>{" "}
                      <span>
                        <b>Siblings</b>
                        <Form.Item name="Siblings">
                          <Input
                            placeholder="enter no. of siblings"
                            defaultValue={user?.Siblings}
                          ></Input>
                        </Form.Item>
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
                          src={Fitness}
                          alt="person"
                        ></img>
                      </span>
                    </div>
                    <div>
                      <span>
                        <b>Lifestyle</b>
                        <Form.Item name="LifeStyle">
                          <TextArea defaultValue={user?.LifeStyle}></TextArea>
                        </Form.Item>
                      </span>
                      <span>
                        <b>Other Activities</b>
                        <Form.Item name="OtherActivities">
                          <Input defaultValue={user?.OtherActivities}></Input>
                        </Form.Item>
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
                        <b>Horoscope Details</b>
                        <Form.Item name="Horoscope">
                          <Input defaultValue={user?.Horoscope}></Input>
                        </Form.Item>
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
                        <b>Education</b>{" "}
                        <Form.Item name="HighestDegree">
                          <Input defaultValue={user?.HighestDegree}></Input>
                        </Form.Item>
                      </span>
                      <br />
                      <span>
                        <b>Profession</b>{" "}
                        <Form.Item name="Profession">
                          <Input defaultValue={user?.Profession}></Input>
                        </Form.Item>
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
                        <b>About Me</b> <br />{" "}
                        <Form.Item name="aboutme">
                          <TextArea
                            rows={6}
                            defaultValue={user?.aboutme}
                          ></TextArea>
                        </Form.Item>
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
                          src={Preferences}
                          alt="person"
                        ></img>
                      </span>
                    </div>
                    <div>
                      <p style={{ fontSize: "1rem" }}>
                        <b>Preferences</b>
                      </p>{" "}
                      <span>
                        <b>Min Height</b>
                        <Form.Item name="PreMinHeight">
                          <Input
                            placeholder="enter min. height"
                            defaultValue={user?.PreMinHeight}
                          ></Input>
                        </Form.Item>
                      </span>{" "}
                      <span>
                        <b>Max Height</b>
                        <Form.Item name="PreMaxHeight">
                          <Input
                            placeholder="enter max. height"
                            defaultValue={user?.PreMaxHeight}
                          ></Input>
                        </Form.Item>
                      </span>{" "}
                      <span>
                        <b>Min Age</b>
                        <Form.Item name="PreMinAge">
                          <Input
                            placeholder="enter min. age"
                            defaultValue={user?.PreMinAge}
                          ></Input>
                        </Form.Item>
                      </span>{" "}
                      <span>
                        <b>Max Age</b>
                        <Form.Item name="PreMaxAge">
                          <Input
                            placeholder="enter max age"
                            defaultValue={user?.PreMaxAge}
                          ></Input>
                        </Form.Item>
                      </span>{" "}
                      <span>
                        <b>Pref Qualification</b>
                        <Form.Item name="PreQualification">
                          <Input
                            placeholder="enter pref qualification"
                            defaultValue={user?.PreQualification}
                          ></Input>
                        </Form.Item>
                      </span>{" "}
                      <span>
                        <b>Pref Profession</b>
                        <Form.Item name="PreProfession">
                          <Input
                            placeholder="enter pref profession"
                            defaultValue={user?.PreProfession}
                          ></Input>
                        </Form.Item>
                      </span>{" "}
                      <span>
                        <b>Pref Description</b>
                        <Form.Item name="PreDescription">
                          <TextArea
                            placeholder="enter pref description"
                            defaultValue={user?.PreDescription}
                            rows={6}
                          ></TextArea>
                        </Form.Item>
                      </span>{" "}
                    </div>
                  </div>
                </div>
              </div>
              <Form.Item>
                <Button htmlType="submit">Save</Button>
              </Form.Item>
            </Form>
          )}
          {tab === 3 && <Settings setting={user?.user_setting}></Settings>
          }
        </div>
      </div>
      <div className="profile-footer"></div>
    </div>
  );
};

export default MyProfile;
