import React, { useContext, useEffect, useState } from "react";
import {
  Tabs,
  List,
  Input,
  Button,
  Divider,
  ProgressCircle,
  Switch,
  DatePicker,
  Selector,
  TextArea,
} from "antd-mobile";
import MobileImageUploader from "../../components/common/MobileImageUploader";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { LogoutOutlined } from "@ant-design/icons";
import GotraSelector from "../../components/authentication/registration/GotraSelector";
import gotraData from "../../utils/gotra.json";
import { getUserById } from "../../services/api";


const tabLinks = [
  { key: "photos", label: "Photos" },
  { key: "basic", label: "Basic Info" },
  { key: "family", label: "Family" },
  { key: "education", label: "Education" },
  { key: "profession", label: "Profession" },
  { key: "preferences", label: "Preferences" },
  { key: "about", label: "About Me" },
  { key: "settings", label: "Settings" },
];

const ProfileDetails = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic");
  const [editMode, setEditMode] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const jwt = localStorage.getItem("jwt");

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

  const [userData, setUserData] = useState({
    basicInfo: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      DOB: "",
      sex: "",
      gotra: "",
      jati: "",
      cast: "",
      marital: "",
      height: "1",
      mobile: "",
      dialCode: "",
      city: "",
      state: "",
      country: "",
      isDivyang: false,
      divyangDescription: "",
    },
    family: {
      families: [
        {
          age: 0,
          name: "",
          type: "",
          gotra: "",
          gender: "",
          relation: "",
          profession: "",
          mobilenumber: 1234567890,
        },
      ],
      fatherName: "",
      motherName: "",
      grandFatherName: "",
      nanajiName: "",
      mamajiName: "",
      familyType: "",
      bera: "",
      siblings: "",
    },
    education: {
      highestDegree: "",
      additionalQualification: "",
      lastCollege: "",
    },
    profession: {
      profession: "",
      designation: "",
      companyName: "",
      workingCity: "",
      income: "",
    },
    about: {
      aboutMe: "",
      lifeStyle: "",
      otherActivities: "",
      horoscope: "",
      manglik: "",
    },
    preferences: {
      preMinHeight: "",
      preMaxHeight: "",
      preProfession: "",
      preDescription: "",
      preMinAge: "",
      preMaxAge: "",
      preQualification: "",
    },
    settings: {
      theme: "",
      language: "",
      hidePhotos: false,
      hideLocation: false,
      notifications: false,
      hidePhoneNumber: false,
    },
  });
  //test
  const mapToUserData = (apiData) => {
    const safe = (val, fallback = "") => val !== null && val !== undefined ? val : fallback;
    const pref = safe(apiData.settingjson?.prerence, {});
    const my = safe(apiData.mybasicdata, {});
  
    return {
      basicInfo: {
        username: safe(apiData.username),
        email: safe(apiData.email),
        firstName: safe(apiData.firstname),
        lastName: safe(apiData.lastname),
        DOB: safe(apiData.dob),
        sex: safe(apiData.sex),
        gotra: safe(apiData.gotra),
        jati: safe(apiData.jati),
        cast: safe(apiData.cast),
        marital: safe(apiData.marital),
        height: safe(apiData.height),
        mobile: safe(apiData.mobile),
        dialCode: safe(apiData.dial_code),
        city: safe(apiData.city),
        state: safe(apiData.state),
        country: safe(apiData.country),
        isDivyang: safe(apiData.isdivyang, false),
        divyangDescription: safe(apiData.divyangdescription),
      },
      family: {
        families: safe(my.families, []),
        fatherName: safe(apiData.fathername),
        motherName: safe(apiData.mothername),
        grandFatherName: safe(apiData.grandfathername),
        nanajiName: safe(apiData.nanajiname),
        mamajiName: safe(apiData.mamajiname),
        familyType: safe(apiData.familytype),
        bera: safe(apiData.bera),
        siblings: safe(apiData.siblings),
      },
      education: {
        highestDegree: safe(apiData.highestdegree),
        additionalQualification: safe(apiData.additionalqualification),
        lastCollege: safe(apiData.lastcollege),
      },
      profession: {
        profession: safe(apiData.profession),
        designation: safe(apiData.designation),
        companyName: safe(apiData.companyname),
        workingCity: safe(apiData.workingcity),
        income: safe(apiData.income),
      },
      about: {
        aboutMe: safe(apiData.aboutme),
        lifeStyle: safe(apiData.lifestyle),
        otherActivities: safe(apiData.otheractivities),
        horoscope: safe(apiData.horoscope),
        manglik: safe(apiData.manglik),
      },
      preferences: {
        preMinHeight: safe(apiData.preminheight),
        preMaxHeight: safe(apiData.premaxheight),
        preProfession: safe(apiData.preprofession),
        preDescription: safe(apiData.predescription),
        preMinAge: safe(apiData.preminage),
        preMaxAge: safe(apiData.premaxage),
        preQualification: safe(apiData.prequalification),
      },
      settings: {
        theme: safe(pref.theme),
        language: safe(pref.language),
        hidePhotos: safe(pref.hidePhotos, true),
        hideLocation: safe(pref.hideLocation, false),
        notifications: safe(pref.notifications, false),
        hidePhoneNumber: safe(pref.hidePhoneNumber, true),
      },
    };
  };  
  //test
  useEffect(() => {
    const getMyData = async () => {
      try {
        const res = await getUserById(user.id, jwt);
        const lowered = toLowerKeys(res);
        console.log(lowered)
        const mappedUserData = mapToUserData(lowered);
        setUserData(mappedUserData);
        console.log(userData, "updated DATA")
      } catch (error) {
        console.error("err", error);
      }
    };

    getMyData();
  }, [editMode]);

  const handleChange = (section, field, value) => {
    setUserData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleFamilyMemberChange = (index, field, value) => {
    const updatedFamilies = [...userData.family.families];
    updatedFamilies[index] = {
      ...updatedFamilies[index],
      [field]: value,
    };

    setUserData((prev) => ({
      ...prev,
      family: {
        ...prev.family,
        families: updatedFamilies,
      },
    }));
  };

  const handleSave = () => {
    console.log("Saved Data:", userData);
    setEditMode(false);
  };

  const getProfileCompleteness = () => {
    const totalFields = Object.values(userData).reduce((count, section) => {
      return count + Object.keys(section).length;
    }, 0);

    const filledFields = Object.values(userData).reduce((count, section) => {
      return (
        count +
        Object.values(section).filter(
          (value) => value !== null && value !== undefined && value !== ""
        ).length
      );
    }, 0);

    return Math.round((filledFields / totalFields) * 100);
  };

  const completeness = getProfileCompleteness();

  return (
    <div style={{ padding: 10, backgroundColor: "#fff", color: "#333" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
          backgroundColor: "#8B0000",
          padding: 12,
          borderRadius: 8,
          color: "white",
        }}
      >
        <h2 style={{ margin: 0 }}>My Profile</h2>
        <ProgressCircle
          percent={completeness}
          style={{
            "--size": "48px",
            "--track-width": "3px",
            "--fill-color": "#FF5A5A",
          }}
        >
          {completeness}%
        </ProgressCircle>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            overflowX: "auto",
            whiteSpace: "nowrap",
            marginBottom: 16,
            padding: "4px 0",
            borderBottom: "1px solid #eee",
          }}
        >
          {tabLinks.map((tab) => (
            <span
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                display: "inline-block",
                padding: "8px 12px",
                cursor: "pointer",
                margin: "0 4px",
                color: activeTab === tab.key ? "#8B0000" : "#666",
                fontWeight: activeTab === tab.key ? "bold" : "normal",
                borderBottom:
                  activeTab === tab.key ? "2px solid #8B0000" : "none",
              }}
            >
              {tab.label}
            </span>
          ))}
        </div>

        <div style={{ flex: 1 }}>
          {activeTab === "photos" && (
            <div>
              <h3 style={{ color: "#8B0000", padding: "0px 10px" }}>
                Profile Pictures
              </h3>
              <MobileImageUploader />
            </div>
          )}

          {activeTab === "basic" && (
            <div>
              <h3 style={{ color: "#8B0000" }}>Basic Information</h3>
              <List
                style={{
                  "--border-inner": "1px solid #f5f5f5",
                  "--border-bottom": "none",
                }}
              >
                <List.Item title="Mobile">
                  {editMode ? (
                    <Input
                      value={userData.basicInfo.mobile}
                      onChange={(val) =>
                        handleChange("basicInfo", "mobile", val)
                      }
                    />
                  ) : (
                    userData.basicInfo.mobile
                  )}
                </List.Item>
                <List.Item title="Email">
                  {editMode ? (
                    <Input
                      value={userData.basicInfo.email}
                      onChange={(val) =>
                        handleChange("basicInfo", "email", val)
                      }
                    />
                  ) : (
                    userData.basicInfo.email
                  )}
                </List.Item>
                <List.Item title="Date of Birth">
                  {editMode ? (
                    <Input
                      value={userData.basicInfo.DOB}
                      onChange={(val) => handleChange("basicInfo", "DOB", val)}
                      placeholder="YYYY-MM-DD"
                    />
                  ) : (
                    userData.basicInfo.DOB
                  )}
                </List.Item>
                <List.Item title="Gender">
                  {editMode ? (
                    <Selector
                      options={[
                        { label: "Male", value: "Male" },
                        { label: "Female", value: "Female" },
                      ]}
                      value={[userData.basicInfo.sex]}
                      onChange={(val) =>
                        handleChange("basicInfo", "sex", val[0])
                      }
                    />
                  ) : (
                    userData.basicInfo.sex
                  )}
                </List.Item>
                <List.Item title="Gotra">
                  {editMode ? (
                    <Input
                      value={userData.basicInfo.gotra}
                      onChange={(val) =>
                        handleChange("basicInfo", "gotra", val)
                      }
                    />
                  ) : (
                    userData.basicInfo.gotra
                  )}
                </List.Item>
                <List.Item title="Marital Status">
                  {editMode ? (
                    <Selector
                      options={[
                        { label: "Never Married", value: "NeverMarried" },
                        { label: "Divorced", value: "Divorced" },
                        { label: "Widowed", value: "Widowed" },
                      ]}
                      value={[userData.basicInfo.marital]}
                      onChange={(val) =>
                        handleChange("basicInfo", "marital", val[0])
                      }
                    />
                  ) : userData.basicInfo.marital === "NeverMarried" ? (
                    "Never Married"
                  ) : (
                    userData.basicInfo.marital
                  )}
                </List.Item>
                <List.Item title="Height (cm)">
                  {editMode ? (
                    <Input
                      value={userData.basicInfo.height}
                      onChange={(val) =>
                        handleChange("basicInfo", "height", val)
                      }
                      type="number"
                    />
                  ) : (
                    userData.basicInfo.height
                  )}
                </List.Item>
                <List.Item title="City">
                  {editMode ? (
                    <Input
                      value={userData.basicInfo.city}
                      onChange={(val) => handleChange("basicInfo", "city", val)}
                    />
                  ) : (
                    userData.basicInfo.city || "Not specified"
                  )}
                </List.Item>
                <List.Item title="State">
                  {editMode ? (
                    <Input
                      value={userData.basicInfo.state}
                      onChange={(val) =>
                        handleChange("basicInfo", "state", val)
                      }
                    />
                  ) : (
                    userData.basicInfo.state
                  )}
                </List.Item>
                <List.Item title="Country">
                  {editMode ? (
                    <Input
                      value={userData.basicInfo.country}
                      onChange={(val) =>
                        handleChange("basicInfo", "country", val)
                      }
                    />
                  ) : (
                    userData.basicInfo.country
                  )}
                </List.Item>
                <List.Item title="Is Divyang">
                  {editMode ? (
                    <Switch
                      checked={userData.basicInfo.isDivyang}
                      onChange={(val) =>
                        handleChange("basicInfo", "isDivyang", val)
                      }
                    />
                  ) : userData.basicInfo.isDivyang ? (
                    "Yes"
                  ) : (
                    "No"
                  )}
                </List.Item>
              </List>
            </div>
          )}

          {activeTab === "family" && (
            <div>
              <h3 style={{ color: "#8B0000" }}>Family Details</h3>
              {userData.family.families.map((member, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: 16,
                    padding: 12,
                    border: "1px solid #eee",
                    borderRadius: 8,
                  }}
                >
                  <h4>Family Member #{index + 1}</h4>
                  <List
                    style={{
                      "--border-inner": "1px solid #f5f5f5",
                      "--border-bottom": "none",
                    }}
                  >
                    <List.Item title="Name">
                      {editMode ? (
                        <Input
                          value={member.name}
                          onChange={(val) =>
                            handleFamilyMemberChange(index, "name", val)
                          }
                        />
                      ) : (
                        member.name
                      )}
                    </List.Item>
                    <List.Item title="Relation">
                      {editMode ? (
                        <Input
                          value={member.relation}
                          onChange={(val) =>
                            handleFamilyMemberChange(index, "relation", val)
                          }
                        />
                      ) : (
                        member.relation
                      )}
                    </List.Item>
                    <List.Item title="Age">
                      {editMode ? (
                        <Input
                          value={member.age}
                          onChange={(val) =>
                            handleFamilyMemberChange(index, "age", val)
                          }
                          type="number"
                        />
                      ) : (
                        member.age
                      )}
                    </List.Item>
                    <List.Item title="Gender">
                      {editMode ? (
                        <Selector
                          options={[
                            { label: "Male", value: "male" },
                            { label: "Female", value: "female" },
                          ]}
                          value={[member.gender]}
                          onChange={(val) =>
                            handleFamilyMemberChange(index, "gender", val[0])
                          }
                        />
                      ) : (
                        member.gender
                      )}
                    </List.Item>
                    <List.Item title="Gotra">
                      {editMode ? (
                        <GotraSelector
                          gotra_for={""}
                          value={member.gotra}
                          gotraData={gotraData.Gotra}
                          userData={{ ...userData }}
                          setCustomdata={(val) =>
                            handleFamilyMemberChange(
                              index,
                              "gotra",
                              val.gotra.toLowerCase()
                            )
                          }
                        />
                      ) : (
                        member.gotra
                      )}
                    </List.Item>
                    <List.Item title="Profession">
                      {editMode ? (
                        <Input
                          value={member.profession}
                          onChange={(val) =>
                            handleFamilyMemberChange(index, "profession", val)
                          }
                        />
                      ) : (
                        member.profession
                      )}
                    </List.Item>
                    <List.Item title="Mobile Number">
                      {editMode ? (
                        <Input
                          value={member.mobilenumber}
                          onChange={(val) =>
                            handleFamilyMemberChange(index, "mobilenumber", val)
                          }
                          type="number"
                        />
                      ) : (
                        member.mobilenumber
                      )}
                    </List.Item>
                  </List>
                </div>
              ))}
              {editMode && (
                <Button
                  color="primary"
                  style={{ marginTop: 16, backgroundColor: "#8B0000" }}
                  onClick={() => {
                    const newFamilies = [
                      ...userData.family.families,
                      {
                        age: "",
                        name: "",
                        type: "",
                        gotra: "",
                        gender: "",
                        relation: "",
                        profession: "",
                        mobilenumber: "",
                      },
                    ];
                    setUserData((prev) => ({
                      ...prev,
                      family: {
                        ...prev.family,
                        families: newFamilies,
                      },
                    }));
                  }}
                >
                  Add Family Member
                </Button>
              )}
            </div>
          )}

          {activeTab === "education" && (
            <div>
              <h3 style={{ color: "#8B0000" }}>Education</h3>
              <List
                style={{
                  "--border-inner": "1px solid #f5f5f5",
                  "--border-bottom": "none",
                }}
              >
                <List.Item title="Highest Degree">
                  {editMode ? (
                    <Input
                      value={userData.education.highestDegree}
                      onChange={(val) =>
                        handleChange("education", "highestDegree", val)
                      }
                    />
                  ) : (
                    userData.education.highestDegree
                  )}
                </List.Item>
                <List.Item title="Additional Qualification">
                  {editMode ? (
                    <Input
                      value={userData.education.additionalQualification}
                      onChange={(val) =>
                        handleChange(
                          "education",
                          "additionalQualification",
                          val
                        )
                      }
                    />
                  ) : (
                    userData.education.additionalQualification ||
                    "Not specified"
                  )}
                </List.Item>
                <List.Item title="Last College">
                  {editMode ? (
                    <Input
                      value={userData.education.lastCollege}
                      onChange={(val) =>
                        handleChange("education", "lastCollege", val)
                      }
                    />
                  ) : (
                    userData.education.lastCollege || "Not specified"
                  )}
                </List.Item>
              </List>
            </div>
          )}

          {activeTab === "profession" && (
            <div>
              <h3 style={{ color: "#8B0000" }}>Profession</h3>
              <List
                style={{
                  "--border-inner": "1px solid #f5f5f5",
                  "--border-bottom": "none",
                }}
              >
                <List.Item title="Profession">
                  {editMode ? (
                    <Input
                      value={userData.profession.profession}
                      onChange={(val) =>
                        handleChange("profession", "profession", val)
                      }
                    />
                  ) : (
                    userData.profession.profession
                  )}
                </List.Item>
                <List.Item title="Designation">
                  {editMode ? (
                    <Input
                      value={userData.profession.designation}
                      onChange={(val) =>
                        handleChange("profession", "designation", val)
                      }
                    />
                  ) : (
                    userData.profession.designation || "Not specified"
                  )}
                </List.Item>
                <List.Item title="Company Name">
                  {editMode ? (
                    <Input
                      value={userData.profession.companyName}
                      onChange={(val) =>
                        handleChange("profession", "companyName", val)
                      }
                    />
                  ) : (
                    userData.profession.companyName || "Not specified"
                  )}
                </List.Item>
                <List.Item title="Working City">
                  {editMode ? (
                    <Input
                      value={userData.profession.workingCity}
                      onChange={(val) =>
                        handleChange("profession", "workingCity", val)
                      }
                    />
                  ) : (
                    userData.profession.workingCity || "Not specified"
                  )}
                </List.Item>
                <List.Item title="Income">
                  {editMode ? (
                    <Input
                      value={userData.profession.income}
                      onChange={(val) =>
                        handleChange("profession", "income", val)
                      }
                    />
                  ) : (
                    userData.profession.income || "Not specified"
                  )}
                </List.Item>
              </List>
            </div>
          )}

          {activeTab === "preferences" && (
            <div>
              <h3 style={{ color: "#8B0000" }}>Partner Preferences</h3>
              <List
                style={{
                  "--border-inner": "1px solid #f5f5f5",
                  "--border-bottom": "none",
                }}
              >
                <List.Item title="Min Age">
                  {editMode ? (
                    <Input
                      value={userData.preferences.preMinAge}
                      onChange={(val) =>
                        handleChange("preferences", "preMinAge", val)
                      }
                      type="number"
                    />
                  ) : (
                    userData.preferences.preMinAge || "Not specified"
                  )}
                </List.Item>
                <List.Item title="Max Age">
                  {editMode ? (
                    <Input
                      value={userData.preferences.preMaxAge}
                      onChange={(val) =>
                        handleChange("preferences", "preMaxAge", val)
                      }
                      type="number"
                    />
                  ) : (
                    userData.preferences.preMaxAge || "Not specified"
                  )}
                </List.Item>
                <List.Item title="Min Height (cm)">
                  {editMode ? (
                    <Input
                      value={userData.preferences.preMinHeight}
                      onChange={(val) =>
                        handleChange("preferences", "preMinHeight", val)
                      }
                      type="number"
                    />
                  ) : (
                    userData.preferences.preMinHeight || "Not specified"
                  )}
                </List.Item>
                <List.Item title="Max Height (cm)">
                  {editMode ? (
                    <Input
                      value={userData.preferences.preMaxHeight}
                      onChange={(val) =>
                        handleChange("preferences", "preMaxHeight", val)
                      }
                      type="number"
                    />
                  ) : (
                    userData.preferences.preMaxHeight || "Not specified"
                  )}
                </List.Item>
                <List.Item title="Preferred Profession">
                  {editMode ? (
                    <Input
                      value={userData.preferences.preProfession}
                      onChange={(val) =>
                        handleChange("preferences", "preProfession", val)
                      }
                    />
                  ) : (
                    userData.preferences.preProfession || "Not specified"
                  )}
                </List.Item>
                <List.Item title="Preferred Qualification">
                  {editMode ? (
                    <Input
                      value={userData.preferences.preQualification}
                      onChange={(val) =>
                        handleChange("preferences", "preQualification", val)
                      }
                    />
                  ) : (
                    userData.preferences.preQualification || "Not specified"
                  )}
                </List.Item>
                <List.Item title="Description">
                  {editMode ? (
                    <TextArea
                      value={userData.preferences.preDescription}
                      onChange={(val) =>
                        handleChange("preferences", "preDescription", val)
                      }
                      rows={3}
                    />
                  ) : (
                    userData.preferences.preDescription || "Not specified"
                  )}
                </List.Item>
              </List>
            </div>
          )}

          {activeTab === "about" && (
            <div>
              <h3 style={{ color: "#8B0000" }}>About Me</h3>
              <List
                style={{
                  "--border-inner": "1px solid #f5f5f5",
                  "--border-bottom": "none",
                }}
              >
                <List.Item title="About Me">
                  {editMode ? (
                    <TextArea
                      value={userData.about.aboutMe}
                      onChange={(val) => handleChange("about", "aboutMe", val)}
                      rows={3}
                    />
                  ) : (
                    userData.about.aboutMe
                  )}
                </List.Item>
                <List.Item title="Lifestyle">
                  {editMode ? (
                    <TextArea
                      value={userData.about.lifeStyle}
                      onChange={(val) =>
                        handleChange("about", "lifeStyle", val)
                      }
                      rows={3}
                    />
                  ) : (
                    userData.about.lifeStyle || "Not specified"
                  )}
                </List.Item>
                <List.Item title="Other Activities">
                  {editMode ? (
                    <TextArea
                      value={userData.about.otherActivities}
                      onChange={(val) =>
                        handleChange("about", "otherActivities", val)
                      }
                      rows={3}
                    />
                  ) : (
                    userData.about.otherActivities || "Not specified"
                  )}
                </List.Item>
                <List.Item title="Horoscope">
                  {editMode ? (
                    <Input
                      value={userData.about.horoscope}
                      onChange={(val) =>
                        handleChange("about", "horoscope", val)
                      }
                    />
                  ) : (
                    userData.about.horoscope || "Not specified"
                  )}
                </List.Item>
                <List.Item title="Manglik">
                  {editMode ? (
                    <Selector
                      options={[
                        { label: "Yes", value: "yes" },
                        { label: "No", value: "no" },
                        { label: "Not Sure", value: "notSure" },
                      ]}
                      value={[userData.about.manglik || "notSure"]}
                      onChange={(val) =>
                        handleChange("about", "manglik", val[0])
                      }
                    />
                  ) : (
                    userData.about.manglik || "Not specified"
                  )}
                </List.Item>
              </List>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h3 style={{ color: "#8B0000" }}>Settings</h3>
              <List
                style={{
                  "--border-inner": "1px solid #f5f5f5",
                  "--border-bottom": "none",
                }}
              >
                <List.Item title="Language">
                  {editMode ? (
                    <Selector
                      options={[
                        { label: "English", value: "english" },
                        { label: "Hindi", value: "hindi" },
                      ]}
                      value={[userData.settings.language || "english"]}
                      onChange={(val) =>
                        handleChange("settings", "language", val[0])
                      }
                    />
                  ) : (
                    userData.settings.language || "English"
                  )}
                </List.Item>
                <List.Item
                  title="Hide Photos"
                  extra={
                    editMode ? (
                      <Switch
                        checked={userData.settings.hidePhotos}
                        onChange={(val) =>
                          handleChange("settings", "hidePhotos", val)
                        }
                      />
                    ) : userData.settings.hidePhotos ? (
                      "Yes"
                    ) : (
                      "No"
                    )
                  }
                />
                <List.Item
                  title="Hide Location"
                  extra={
                    editMode ? (
                      <Switch
                        checked={userData.settings.hideLocation}
                        onChange={(val) =>
                          handleChange("settings", "hideLocation", val)
                        }
                      />
                    ) : userData.settings.hideLocation ? (
                      "Yes"
                    ) : (
                      "No"
                    )
                  }
                />
                <List.Item
                  title="Notifications"
                  extra={
                    editMode ? (
                      <Switch
                        checked={userData.settings.notifications}
                        onChange={(val) =>
                          handleChange("settings", "notifications", val)
                        }
                      />
                    ) : userData.settings.notifications ? (
                      "Yes"
                    ) : (
                      "No"
                    )
                  }
                />
                <List.Item
                  title="Hide Phone Number"
                  extra={
                    editMode ? (
                      <Switch
                        checked={userData.settings.hidePhoneNumber}
                        onChange={(val) =>
                          handleChange("settings", "hidePhoneNumber", val)
                        }
                      />
                    ) : userData.settings.hidePhoneNumber ? (
                      "Yes"
                    ) : (
                      "No"
                    )
                  }
                />
              </List>
            </div>
          )}

          {/* Edit/Save Buttons */}
          {activeTab !== "photos" && (
            <div style={{ marginTop: 16 }}>
              {editMode ? (
                <Button
                  block
                  style={{ backgroundColor: "#8B0000", color: "white" }}
                  onClick={handleSave}
                >
                  Save
                </Button>
              ) : (
                <Button
                  block
                  style={{ backgroundColor: "#A52A2A", color: "white" }}
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      <Divider style={{ margin: "16px 0" }} />

      <Button
        block
        style={{ backgroundColor: "#8B0000", color: "white" }}
        onClick={async () => {
          await authContext.logout();
          navigate("/login", { replace: true });
        }}
      >
        <LogoutOutlined
          style={{ fontSize: 16, color: "white", marginRight: 8 }}
        />{" "}
        Logout
      </Button>

      <Divider style={{ margin: "16px 0" }} />
    </div>
  );
};

export default ProfileDetails;
