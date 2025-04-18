import { PhoneOutlined } from "@ant-design/icons";
import { Space, Tag, Toast } from "antd-mobile";
import {
  EnvironmentOutline,
  StarOutline,
  UserOutline,
} from "antd-mobile-icons";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { newConnectionRequest } from "../../services/api";

function calculateAge(dob) {
  if (!dob) return null;
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  // Adjust age if the birth date hasn't occurred yet this year
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}
const getUserFromLocalStorage = () => {
  try {
    const userString = localStorage.getItem("user");
    return userString ? JSON.parse(userString) : null;
  } catch (error) {
    console.error("Failed to parse user data:", error);
    return null;
  }
};

const NewProfileCard = ({ user, role, action }) => {
  const { user: selfUser, setUser, jwt } = useContext(AuthContext);

  const navigate = useNavigate();
  // const userObj = getUserFromLocalStorage();
  // const userId = userObj?.id || null;
  const profileid = user?.id || null;
  console.log(user)
  let imagesrc = ""

  if ( user?.Pictures?.profilePicture ){
    imagesrc = user?.Pictures.profilePicture?.url
  } else if (Array.isArray(user?.images?.pictures) && user?.images?.pictures[0]){
    imagesrc = user?.images?.pictures[0]
  } else if (user?.Pictures?.photos?.[0]?.url){
    imagesrc = user?.Pictures.photos?.[0]?.url
  } else if ( user?.Sex === "Female") {
    imagesrc = "/assets/woman-user-circle-icon.png"
  } else if (user?.Sex === "Male"){
    imagesrc = "/assets/man-user-circle-icon.png"
  } else {
    imagesrc = "/assets/question-mark-circle-outline-icon.png"
  }

  // user?.role?.toUpperCase();
  const handleRequest = async () => {
    const response = await newConnectionRequest({
      sender: selfUser?.id,
      receiver: user?.id,
      status: "PENDING",
      message:`User Status is pending from id ${user?.id}`

    });
    Toast.show({
      icon: "success",
      content: `Your request successfully send to ${user.FirstName} and status is pending`,
      afterClose: () => {
        console.log(
          `Your request successfully send to ${user.FirstName} and status is pending`
        );
      },
    });
    console.log("Request response", response);
  };

  const renderActionButtons = () => {
    /**
     *  Below piece of code to bypass approval from here
     *
     */
    return (
      <>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button
            onClick={() => navigate(`/profile-view/${profileid}`)}
            style={{
              flex: 1,
              padding: "12px 24px",
              borderRadius: "12px",
              backgroundColor: "rgba(139, 0, 0, 0.1)",
              color: colors.primary,
              border: "none",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(139, 0, 0, 0.25)",
            }}
          >
            Details
          </button>
          <button
            style={{
              flex: 1,
              padding: "12px 24px",
              borderRadius: "12px",
              backgroundColor: colors.primary,
              color: colors.light,
              border: "none",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(139, 0, 0, 0.25)",
            }}
          >
            Status:{user.userstatus}
          </button>
        </div>
      </>
    );

    /**
     *  We are now not allowing approvel on Card instead of it on detail page user can approve
     */
  };

  if (user?.images?.length > 0) {
    console.log("Pictures", user.images);
  }

  const colors = {
    primary: "#8B0000",
    secondary: "#FF5252",
    light: "#FFFFFF",
    background: "rgba(255, 255, 255, 0.8)",
    border: "rgba(139, 0, 0, 0.2)",
    text: {
      dark: "#333333",
      light: "#777777",
      accent: "#8B0000",
    },
  };
  return (
    <>
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          margin: "0 auto",
          padding: "16px",
          boxSizing: "border-box",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {/* Glass Effect Card */}
        <div
          style={{
            width: "100%",
            borderRadius: "24px",
            overflow: "hidden",
            backgroundColor: colors.background,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            border: `1px solid ${colors.border}`,
          }}
        >
          {/* Header Section with Image and Profile ID */}
          <div
            style={{
              position: "relative",
              padding: "24px 20px 0",
              background: 'linear-gradient(to right, #8b0000, #b00000)',
              borderRadius: "24px 24px 0 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              zIndex: 2,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: "16px",
                zIndex: 1,
              }}
            >
              {/* Profile Image */}
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  backgroundColor: colors.light,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  border: `4px solid ${colors.light}`,
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
                  marginBottom: "10px",
                }}
              >
                <img
                  src={imagesrc}
                  alt="Profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Profile ID */}
              <div
                style={{
                  backgroundColor: colors.light,
                  padding: "8px 12px",
                  borderRadius: "12px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  alignSelf: "center",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                <span style={{ marginRight: "4px", color: colors.text.dark }}>
                  Profile ID:
                </span>
                <span style={{ color: colors.primary }}>
                  {user?.id || "Not Specified"}
                </span>
              </div>
            </div>

            {/* Semicircle background curve */}
            <div
              style={{
                position: "absolute",
                bottom: "-40px",
                left: "0",
                right: "0",
                height: "90px",
                background: colors.light,
                borderRadius: "100% 100% 0 0",
                zIndex: "0",
              }}
            />
          </div>

          {/* Content Section */}
          <div
            style={{
              padding: "16px 24px 24px",
              backgroundColor: colors.light,
              borderRadius: "200px",
            }}
          >
            {/* Name and Age */}
            <Space
              block
              justify="between"
              align="center"
              style={{
                marginBottom: "16px",
                marginTop: "20px",
                textTransform: "capitalize",
                flexWrap:"wrap"
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "24px",
                  color: colors.text.dark,
                  fontWeight: "700",
                }}
              >
                <span>
                  {user?.FirstName}
                  {user?.LastName && user?.FirstName !== user?.LastName
                    ? ` ${user.LastName}`
                    : "Name Not Specified"}
                </span>
              </h2>
              <Tag
                style={{
                  backgroundColor: colors.primary,
                  color: colors.light,
                  borderRadius: "12px",
                  padding: "4px 12px",
                  fontSize: "14px",
                  fontWeight: "600",
                  border: "none",
                }}
              >
                Age:{" "}
                {user?.age ?? (user?.DOB ? calculateAge(user.DOB) : "Unknown")}
              </Tag>
            </Space>

            {/* Gender */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "12px",
                color: colors.text.dark,
                fontSize: "14px",
                fontWeight: "500",
                backgroundColor: "rgba(139, 0, 0, 0.05)",
                borderRadius: "12px",
              }}
            >
              <UserOutline
                style={{ fontSize: "18px", color: colors.secondary }}
              />
              <span>Gender:</span>
              <span style={{ color: colors.primary, fontWeight: "600" }}>
                {user?.Sex || "Not Specified"}
              </span>
            </div>

            {/* Location */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
                color: colors.text.light,
                fontSize: "14px",
              }}
            >
              <EnvironmentOutline
                style={{ fontSize: "18px", color: colors.secondary }}
              />
              <span>{user?.State + ", " + user?.Country}</span>
            </div>

            {/* Tags Section */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "20px",
                flexWrap: "wrap",
              }}
            >
              <Tag
                style={{
                  borderRadius: "12px",
                  padding: "6px 12px",
                  fontSize: "13px",
                  backgroundColor: "rgba(139, 0, 0, 0.1)",
                  color: colors.primary,
                  margin: 0,
                  border: "none",
                }}
              >
                Height: {user?.Height || "Not Specified"}
              </Tag>
              <Tag
                style={{
                  borderRadius: "12px",
                  padding: "6px 12px",
                  fontSize: "13px",
                  backgroundColor: "rgba(139, 0, 0, 0.1)",
                  color: colors.primary,
                  margin: 0,
                  border: "none",
                }}
              >
                Gotra: {user?.Gotra || "Not Specified"}
              </Tag>
            </div>

            <hr />

            {/* Status Items */}
            <div style={{ marginBottom: "24px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                  color: colors.text.dark,
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                <StarOutline
                  style={{ color: colors.secondary, fontSize: "18px" }}
                />
                <span>
                  Marital Status: {user?.marital || "Marital Not Specified"}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: colors.text.dark,
                  marginBottom: "12px",
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                <StarOutline
                  style={{ color: colors.secondary, fontSize: "18px" }}
                />
                <span>
                  Profession: {user?.Profession || "Profession Not Specified"}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: colors.text.dark,
                  marginBottom: "12px",
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                <PhoneOutlined
                  style={{ color: colors.secondary, fontSize: "18px" }}
                />
                <span>{user?.MobileNumber || "No Mobile Number"}</span>
              </div>
            </div>

            {/* Action Buttons */}
            {action !== "NOACTION" && renderActionButtons()}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProfileCard;
