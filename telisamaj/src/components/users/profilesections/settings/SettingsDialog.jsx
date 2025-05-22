import {
  Button,
  CapsuleTabs,
  Card,
  Form,
  Input,
  NavBar,
  Toast
} from "antd-mobile";
import {
  CheckOutline,
  CloseOutline,
} from "antd-mobile-icons";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import { getUserById, updateUser } from "../../../../services/api";
import "../../../../styles/settings.css";
import MobileImageUploader from "../../../common/ProfilePictureImageUploader";
import Preferences from "./Prefrences";

export const SettingsDialog = () => {
  const { user } = useContext(AuthContext)
  const jwt = localStorage.getItem("jwt")
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    hidePhoneNumber: false,
    hidePhotos: false,
    hideLocation: false,
  });
  const [profile, setProfile] = useState({
    AboutMe: "",
    education_level: "",
    Profession: "",
    OtherActivities: "",
  });

  useEffect(() => {
    const loadFields = async () => {
      try {
        const response = await getUserById(user?.id, jwt);
        const updatedProfile = {};
        Object.keys(profile).forEach((key) => {
          updatedProfile[key] = response?.[key] || "";
        });
        setProfile(updatedProfile)
      } catch (err) {
        console.error("error", err)
      };
    }
    loadFields();
  }, [])

  const [editingField, setEditingField] = useState(null);
  const [tempValues, setTempValues] = useState({});
  // const [fileList, setFileList] = useState([]);

  const handleToggleChange = (key, checked) => {
    setPreferences({
      ...preferences,
      [key]: checked,
    });
    Toast.show({
      content: `${key} ${checked ? "enabled" : "disabled"}`,
      position: "bottom",
    });
  };

  const startEditing = (field) => {
    setEditingField(field);
    setTempValues({
      ...tempValues,
      [field]: profile[field],
    });
  };

  const cancelEdit = () => {
    setEditingField(null);
  };

  const saveEdit = async (field) => {
    try {
      setProfile({
        ...profile,
        [field]: tempValues[field],
      });
      setEditingField(null);
      Toast.show({
        content: "Saved successfully",
        position: "bottom",
      });
      // console.log([field], "temp field")
      const response = await updateUser(profile, jwt, user?.id)
      console.log(response, "response")

      //having issue with updating data using api
    } catch (err) {
      console.error("error", err)
    }
  };

  const handleFieldChange = (field, value) => {
    setTempValues({
      ...tempValues,
      [field]: value,
    });
  };

  const renderProfileField = (label, field) => {
    return (
      <div className="profile-field">
        <div className="profile-field-label">{label}</div>
        {editingField === field ? (
          <div className="profile-field-edit">
            <Input
              value={tempValues[field]}
              onChange={(val) => handleFieldChange(field, val)}
              placeholder={`Enter your ${label.toLowerCase()}`}
              className="profile-input"
            />
            <div className="profile-actions">
              <Button
                size="small"
                onClick={cancelEdit}
                className="cancel-btn"
                icon={<CloseOutline />}
              >
                Cancel
              </Button>
              <Button
                size="small"
                onClick={() => saveEdit(field)}
                className="save-btn"
                icon={<CheckOutline />}
              >
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div className="profile-field-display">
            <span>{profile[field] || `Add your ${label.toLowerCase()}`}</span>
            <Button
              size="small"
              onClick={() => startEditing(field)}
              className="edit-btn"
            >
              Edit
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="settings-container">
      <NavBar onBack={() => navigate(-1)} className="settings-navbar">
        Settings
      </NavBar>

      <CapsuleTabs defaultActiveKey="profile" className="settings-tabs">
        <CapsuleTabs.Tab title="Profile" key="profile">
          <Card className="settings-card">
            {renderProfileField("About Me", "AboutMe")}
            {renderProfileField("Education", "education_level")}
            {renderProfileField("Profession", "Profession")}
            {renderProfileField("Hobby", "OtherActivities")}
          </Card>
        </CapsuleTabs.Tab>

        <CapsuleTabs.Tab title="Preferences" key="preferences">
          <Preferences />
        </CapsuleTabs.Tab>
        {/* upload image */}
        {/* <CapsuleTabs.Tab title="Upload Images" key="images">
          <Card className="settings-card">
            <div className="upload-section">
              <ImageUploader
                value={fileList}
                onChange={setFileList}
                upload={async (file) => {
                  // Mock upload - in real app you'd send to server
                  Toast.show("Uploading...");
                  return {
                    url: URL.createObjectURL(file),
                  };
                }}
                multiple={true}
                maxCount={9}
                showUpload={fileList.length < 9}
              >
                <div className="upload-button">
                  <PictureOutline />
                  <span>Upload Photos</span>
                </div>
              </ImageUploader>
            </div>
          </Card>
        </CapsuleTabs.Tab> */}
        <CapsuleTabs.Tab title="Photos" key="images">
          <MobileImageUploader />
        </CapsuleTabs.Tab>
      </CapsuleTabs>
    </div>
  );
};
