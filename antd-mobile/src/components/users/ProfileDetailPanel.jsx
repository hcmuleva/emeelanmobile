import { Button, Divider, Image, List, NavBar, Space, Tag } from "antd-mobile";
import {
  HeartOutline,
  TeamOutline,
  UserOutline,
  LeftOutline,
} from "antd-mobile-icons";
import React, { useEffect, useState } from "react";
import { userService } from "../../services";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../../services/api";

// Maroon theme colors
const theme = {
  primary: "#800000", // Maroon
  secondary: "#A52A2A", // Brown
  accent: "#D2691E", // Chocolate
  light: "#F5F5DC", // Beige
  text: "#333333",
  textLight: "#666666",
  success: "#006400", // Dark Green
  warning: "#FFA500", // Orange
  danger: "#8B0000", // Dark Red
  background: "#FFFFFF",
};

const demoProfile = {
  id: 123,
  firstName: "Harish",
  lastName: "Muleva",
  age: 43,
  location: "Bangalore, India",
  profileImage: "https://example.com/profile.jpg",
  json: {
    family: [
      {
        age: "104",
        type: "Parent",
        lastName: "Keshaji Muleva",
        location: "Siwai, Barwani dist MP",
        firstName: "Shri Bhikaji",
        profession: "Farmer",
        businessDetail: "100 acr agriculture land. Tobbacco business",
      },
      {
        age: "75",
        type: "Sibling",
        lastName: "Bhikaji",
        location: "Siwai",
        firstName: "Mr Bhagwan",
        profession: "Farmer",
        maritalStatus: "Married",
        businessDetail: "Agriculture",
      },
    ],
    aboutMe: {
      caste: "Seervi",
      height: "5'11''",
      weight: "80",
      aboutMe:
        "Results-driven Senior Architect with over two decades of expertise in software\ndevelopment, testing, and architectural leadership. Proven track record in\ndesigning and implementing innovative solutions to address complex business\nchallenges. Adept at leading DevOps initiatives, automating infrastructure, and\noptimizing testing processes.",
      hobbies: "Social Activity\nPlaying Cricket",
      subcaste: "Muleva",
      isMonglik: "DontKnow",
      birthplace: "Indore",
      bloodGroup: "B+",
      complexion: "Fair",
      disability: "None",
      othertongue: "Hindi",
      timeofbirth: "5:30AM",
      achievements:
        "1) Owner of two software company\n2) Worked for 9 Top companies\n3) KMS initiative\n4) more than 100 got job in software companies",
      disabilitydesc: "NA",
    },
    mychoice: {
      preference: "1) Accept Joint family.\n2) Natural life style.",
      must_choice:
        "Looking behalf working in Software field or education field",
    },
    profession: [
      {
        type: "Student",
        institute: "IIT Delhi",
        percentage: "7.5",
        passingYear: "2000",
        educationType: "postgraduate",
        educationDescription: "Communication & Radar",
      },
      {
        type: "Service",
        salary: "1,75,00,000",
        designation: "Sr. Director",
        organization: "Dell India",
        serviceDescription: "Managing 3 geo teams",
      },
    ],
  },
};

const ProfileDetailPanel = ({ user }) => {
  const { profileid } = useParams();
  const jwt = localStorage.getItem("jwt")
  const navigate = useNavigate();
  const [requestSent, setRequestSent] = useState(false);
  const [actionTaken, setActionTaken] = useState(null);
  const [profile, setProfile] = useState(demoProfile || [])
  // Using sample profile data from original code

  const toLowerKeys = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map(toLowerKeys);
    } else if (obj && typeof obj === 'object') {
      return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key.toLowerCase(), toLowerKeys(value)])
      );
    }
    return obj;
  };

  useEffect(()=>{
    const userDetail = async () => {
      try {
        const res = await getUserById(profileid, jwt);
        const lowered = toLowerKeys(res);
        setProfile(lowered);
        console.log("Profile", lowered);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    userDetail();
  },[profileid])

  const handleBack = () => {
    navigate(-1);
  };


  const safeProfile = {
    ...demoProfile,
    json: {
      family: demoProfile.json?.family || [],
      aboutMe: demoProfile.json?.aboutMe || {},
      mychoice: demoProfile.json?.mychoice || {},
      profession: demoProfile.json?.profession || [],
      ...demoProfile.json,
    },
  };

  //   const safeProfile = {
  //   ...profile,
  //   json: {
  //     family: profile.json?.family || [],
  //     aboutMe: profile.json?.aboutMe || {},
  //     mychoice: profile.json?.mychoice || {},
  //     profession: profile.json?.profession || [],
  //     ...profile.json,
  //   },
  // };

  const onAction = (action, userData) => {
    console.log("Action", action, userData);
    setActionTaken(action);
    switch (action) {
      case "edit":
        navigate(`/settings`);
        break;
      case "connect":
        setRequestSent(true);
        console.log(`${action} Request Sent to userID: ${userData.id}`);
        break;
      case "approve":
      case "reject":
      case "block":
        console.log(`userID: ${userData.id}, Status: ${action}`);
        break;
      default:
        break;
    }
  };

  const role = "ADMIN"; // HARD CODED ROLE

  const renderActions = () => {
    if (role === "SELF") {
      return (
        <>
          <button
            onClick={() => onAction("edit", profile)}
            style={{
              display: "block",
              width: "100%",
              padding: "12px",
              backgroundColor: theme.primary,
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Edit Profile
          </button>
        </>
      );
    } else if (role === "ADMIN" || role === "SUPERADMIN") {
      if (actionTaken) {
        return (
          <div
            style={{
              textAlign: "center",
              fontSize: "16px",
              color: theme.primary,
              fontWeight: "bold",
            }}
          >
            {actionTaken === "approve" && "Profile Approved"}
            {actionTaken === "reject" && "Profile Rejected"}
            {actionTaken === "block" && "Profile Blocked"}
          </div>
        );
      }

      return (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <button
            onClick={() => onAction("approve", profile)}
            style={{
              flex: 1,
              padding: "12px",
              margin: "0 5px",
              backgroundColor: theme.success,
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            APPROVE
          </button>
          <button
            onClick={() => onAction("reject", profile)}
            style={{
              flex: 1,
              padding: "12px",
              margin: "0 5px",
              backgroundColor: theme.warning,
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            REJECT
          </button>
          <button
            onClick={() => onAction("block", profile)}
            style={{
              flex: 1,
              padding: "12px",
              margin: "0 5px",
              backgroundColor: theme.danger,
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            BLOCK
          </button>
        </div>
      );
    } else if (role === "USER") {  
      return (
        <button
          onClick={() => onAction("connect", profile)}
          disabled={requestSent}
          style={{
            display: "block",
            width: "100%",
            padding: "12px",
            backgroundColor: requestSent ? "#f0f0f0" : theme.primary,
            color: requestSent ? theme.textLight : "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: requestSent ? "default" : "pointer",
          }}
        >
          {requestSent
            ? "Request Sent" 
            : `Connect with ${safeProfile.firstName}`}
        </button>
      );
    }

    return null;
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.background,
        color: theme.text,
      }}
    >
      {/* Header/Navigation Bar */}
      <NavBar
        onBack={handleBack}
        right={<UserOutline fontSize={24} />}
        style={{
          borderBottom: "1px solid #f0f0f0",
          position: "sticky",
          top: -1,
          zIndex: 10,
          backgroundColor: theme.primary,
          color: "white",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        Profile Details
      </NavBar>

      {/* Main content - Scrollable */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Profile Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "20px 16px",
            background: "white",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <Image
            src={safeProfile.profileImage || "https://via.placeholder.com/100"}
            width={100}
            height={100}
            style={{
              borderRadius: "50%",
              marginRight: "16px",
              objectFit: "cover",
              border: `3px solid ${theme.primary}`,
            }}
            fit="cover"
          />
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "22px",
                color: theme.primary,
                fontWeight: "600",
              }}
            >
              {safeProfile.firstName || "No name"} {safeProfile.lastName || ""}
            </h2>
            <div
              style={{
                color: theme.textLight,
                fontSize: "16px",
                marginTop: "4px",
              }}
            >
              {safeProfile.age ? `${safeProfile.age} yrs` : ""} •{" "}
              {safeProfile.location || ""}
            </div>
            {safeProfile.status === "PENDING" && !actionTaken && (
              <Tag
                color={theme.accent}
                style={{
                  marginTop: "8px",
                  fontSize: "14px",
                  padding: "4px 8px",
                }}
              >
                Request Sent
              </Tag>
            )}
          </div>
        </div>

        {/* Content Sections */}
        <div style={{ padding: "0 16px 80px" }}>
          {/* Family Section */}
          {safeProfile.json.family.length > 0 && (
            <>
              <Divider
                contentPosition="left"
                style={{
                  color: theme.primary,
                  borderColor: `${theme.primary}33`, // 20% opacity
                }}
              >
                <Space align="center">
                  <TeamOutline fontSize={20} />
                  <span
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                      color: theme.primary,
                    }}
                  >
                    Family
                  </span>
                </Space>
              </Divider>
              <List
                style={{
                  "--border-inner": "1px solid #f0f0f0",
                  "--border-bottom": "1px solid #f0f0f0",
                }}
              >
                {safeProfile.json.family.map((member, index) => (
                  <List.Item
                    key={index}
                    description={
                      <div style={{ fontSize: "15px", color: theme.textLight }}>
                        {member.type && (
                          <div>
                            {member.type} • {member.age || ""} yrs
                          </div>
                        )}
                        {member.profession && <div>{member.profession}</div>}
                        {member.businessDetail && (
                          <div>{member.businessDetail}</div>
                        )}
                        {member.location && <div>{member.location}</div>}
                      </div>
                    }
                  >
                    <span
                      style={{
                        fontWeight: "600",
                        fontSize: "16px",
                        color: theme.text,
                      }}
                    >
                      {member.firstName || ""} {member.lastName || ""}
                    </span>
                  </List.Item>
                ))}
              </List>
            </>
          )}

          {/* About Me Section */}
          <Divider
            contentPosition="left"
            style={{
              color: theme.primary,
              borderColor: `${theme.primary}33`, // 20% opacity
            }}
          >
            <Space align="center">
              <UserOutline fontSize={20} />
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "18px",
                  color: theme.primary,
                }}
              >
                About
              </span>
            </Space>
          </Divider>
          <List
            style={{
              "--border-inner": "1px solid #f0f0f0",
              "--border-bottom": "1px solid #f0f0f0",
            }}
          >
            {Object.entries({
              Height: safeProfile.json.aboutMe.height,
              Weight: safeProfile.json.aboutMe.weight,
              Caste: safeProfile.json.aboutMe.caste,
              Subcaste: safeProfile.json.aboutMe.subcaste,
              Complexion: safeProfile.json.aboutMe.complexion,
              "Blood Group": safeProfile.json.aboutMe.bloodGroup,
            }).map(
              ([label, value]) =>
                value && (
                  <List.Item
                    key={label}
                    extra={
                      <span
                        style={{ fontSize: "15px", color: theme.textLight }}
                      >
                        {value}
                      </span>
                    }
                  >
                    <span
                      style={{
                        fontWeight: "500",
                        fontSize: "16px",
                        color: theme.text,
                      }}
                    >
                      {label}
                    </span>
                  </List.Item>
                )
            )}

            {safeProfile.json.aboutMe.aboutMe && (
              <List.Item>
                <div
                  style={{
                    fontWeight: "600",
                    marginBottom: "8px",
                    fontSize: "16px",
                    color: theme.text,
                  }}
                >
                  About Me
                </div>
                <div
                  style={{
                    whiteSpace: "pre-line",
                    color: theme.textLight,
                    fontSize: "15px",
                    lineHeight: "1.5",
                  }}
                >
                  {safeProfile.json.aboutMe.aboutMe}
                </div>
              </List.Item>
            )}
          </List>

          {/* Profession Section */}
          {safeProfile.json.profession.length > 0 && (
            <>
              <Divider
                contentPosition="left"
                style={{
                  color: theme.primary,
                  borderColor: `${theme.primary}33`, // 20% opacity
                }}
              >
                <Space align="center">
                  <UserOutline fontSize={20} />
                  <span
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                      color: theme.primary,
                    }}
                  >
                    Profession
                  </span>
                </Space>
              </Divider>
              <List
                style={{
                  "--border-inner": "1px solid #f0f0f0",
                  "--border-bottom": "1px solid #f0f0f0",
                }}
              >
                {safeProfile.json.profession.map((job, index) => (
                  <List.Item
                    key={index}
                    description={
                      <div
                        style={{
                          fontSize: "15px",
                          color: theme.textLight,
                          lineHeight: "1.4",
                        }}
                      >
                        <div>
                          {job.organization || job.institute || "Unknown"}
                        </div>
                        {job.designation && <div>{job.designation}</div>}
                        {job.salary && <div>Salary: {job.salary}</div>}
                        {job.passingYear && <div>Year: {job.passingYear}</div>}
                        {(job.serviceDescription ||
                          job.educationDescription) && (
                          <div
                            style={{ whiteSpace: "pre-line", marginTop: "6px" }}
                          >
                            {job.serviceDescription || job.educationDescription}
                          </div>
                        )}
                      </div>
                    }
                  >
                    <span
                      style={{
                        fontWeight: "600",
                        fontSize: "16px",
                        color: theme.text,
                      }}
                    >
                      {job.type === "Student" ? "Education" : "Career"}
                    </span>
                  </List.Item>
                ))}
              </List>
            </>
          )}

          {/* Preferences Section */}
          {(safeProfile.json.mychoice.preference ||
            safeProfile.json.mychoice.must_choice) && (
            <>
              <Divider
                contentPosition="left"
                style={{
                  color: theme.primary,
                  borderColor: `${theme.primary}33`, // 20% opacity
                }}
              >
                <Space align="center">
                  <HeartOutline fontSize={20} />
                  <span
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                      color: theme.primary,
                    }}
                  >
                    Preferences
                  </span>
                </Space>
              </Divider>
              <List
                style={{
                  "--border-inner": "1px solid #f0f0f0",
                  "--border-bottom": "1px solid #f0f0f0",
                }}
              >
                {safeProfile.json.mychoice.preference && (
                  <List.Item>
                    <div
                      style={{
                        fontWeight: "600",
                        marginBottom: "8px",
                        fontSize: "16px",
                        color: theme.text,
                      }}
                    >
                      Preferences
                    </div>
                    <div
                      style={{
                        whiteSpace: "pre-line",
                        color: theme.textLight,
                        fontSize: "15px",
                        lineHeight: "1.5",
                      }}
                    >
                      {safeProfile.json.mychoice.preference}
                    </div>
                  </List.Item>
                )}
                {safeProfile.json.mychoice.must_choice && (
                  <List.Item>
                    <div
                      style={{
                        fontWeight: "600",
                        marginBottom: "8px",
                        fontSize: "16px",
                        color: theme.text,
                      }}
                    >
                      Must Have
                    </div>
                    <div
                      style={{
                        whiteSpace: "pre-line",
                        color: theme.textLight,
                        fontSize: "15px",
                        lineHeight: "1.5",
                      }}
                    >
                      {safeProfile.json.mychoice.must_choice}
                    </div>
                  </List.Item>
                )}
              </List>
            </>
          )}
        </div>
      </div>

      {/* Fixed Footer */}
      <div
        style={{
          position: "sticky",
          bottom: 0,
          left: 0,
          right: 0,
          background: "white",
          padding: "16px",
          borderTop: "1px solid #f0f0f0",
          zIndex: 10,
          boxShadow: "0px -2px 10px rgba(0,0,0,0.05)",
        }}
      >
        {renderActions()}
      </div>
    </div>
  );
};

export default ProfileDetailPanel;
