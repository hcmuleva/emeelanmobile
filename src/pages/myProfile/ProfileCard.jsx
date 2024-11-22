import React, { useState } from "react";
import { Card, Avatar, Button, Tabs, Form, Space, Upload, Typography, notification, Row, Col } from "antd";
import { EditOutlined, SettingOutlined, CameraOutlined } from "@ant-design/icons";
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";
import { useUpdate } from "@refinedev/core";
import PhotoComponent from "./PhotoComponent";
import ImageGallery from "./ImageGallery";

const { Text } = Typography;
const API_URL = import.meta.env.VITE_SERVER_URL;

const ProfileCard = ({ user }) => {
  const [activeSection, setActiveSection] = useState("personalInfo");
  const [showPhoto, setShowPhoto] = useState(false);
  const [form] = Form.useForm();
  const { mutate: updateUser } = useUpdate();
  console.log("Users for photos to see ",user)
  const onFinish = async (values) => {
    try {
      const { profilePicture } = values;
      const profilePicture_id = profilePicture?.file?.response;
      const payload = { profilePicture: parseInt(profilePicture_id[0].id) };

      await updateUser(
        {
          resource: "users",
          id: user.id,
          values: payload,
        },
        {
          onSuccess: () => {
            notification.success({
              message: "Success",
              description: "Your images have been successfully uploaded.",
            });
            form.resetFields();
          },
        }
      );
    } catch (error) {
      console.error("Error", error);
      notification.error({
        message: "Error",
        description: "There was an issue with the upload process.",
      });
    }
  };

  const renderField = (label, value) => {
    if (label === "Have Children") {
      return (
        <Text>
          <strong>{label}:</strong> {value ? "Yes" : "No"}
        </Text>
      );
    }
    return (
      <Text>
        <strong>{label}:</strong> {value || "N/A"}
      </Text>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case "personalInfo":
        return (
          <Space direction="vertical" size="small">
            {renderField("First Name", user.FirstName)}
            {renderField("Last Name", user.LastName)}
            {renderField("Date of Birth", user.DOB)}
            {renderField("Sex", user.Sex)}
            {renderField("Birth Time", user.birth_time)}
            {renderField("Birth Place", user.birth_place)}
            {renderField("Height", user.Height)}
            {renderField("Manglik", user.manglik)}
            {renderField("Marital Status", user.MeritalStatus)}
            {renderField("Have Children", user.have_child)}
          </Space>
        );
      case "contactInfo":
        return (
          <Space direction="vertical" size="small">
            {renderField("Mobile Number", user.MobileNumber)}
            {renderField("Father's Mobile", user.FatherMobileNumber)}
            {renderField("Mamaji's Mobile", user.MamajiMobileNumber)}
          </Space>
        );
      case "familyDetails":
        return (
          <Space direction="vertical" size="small">
            {renderField("Father's Name", user.FatherName)}
            {renderField("Mother's Name", user.MotherName)}
            {renderField("Father's Profession", user.father_occupation)}
            {renderField("Grandfather's Name", user.GrandFatherName)}
            {renderField("Siblings", user.Siblings)}
            {renderField("Gotra", user.Gotra)}
            {renderField("Nanaji's Name", user.NanajiName)}
            {renderField("Naniji's Name", user.NanijiName)}
            {renderField("Mamaji's Name", user.MamajiName)}
            {renderField("Maternal Gotra", user.MaternalGotra)}
          </Space>
        );
      case "addressInfo":
        return (
          <Space direction="vertical" size="small">
            {renderField("Home Address", user.home_address)}
            {renderField("City", user.City)}
            {renderField("State", user.State)}
            {renderField("Country", user.Country)}
            {renderField("Postal Code", user.postalcode)}
          </Space>
        );
      case "educationInfo":
        return (
          <Space direction="vertical" size="small">
            {renderField("Education", user.education_level)}
            {renderField("Highest Degree", user.HighestDegree)}
            {renderField("Additional Qualification", user.AdditionalQualification)}
            {renderField("Last College", user.LastCollege)}
          </Space>
        );
      case "professionalInfo":
        return (
          <Space direction="vertical" size="small">
            {renderField("Your Profession", user.Profession)}
            {renderField("Company Name", user.CompanyName)}
            {renderField("Designation", user.Designation)}
            {renderField("Working City", user.WorkingCity)}
            {renderField("Income", user.Income)}
            {renderField("Previous Profession", user.PreProfession)}
          </Space>
        );
      case "lifestyle":
        return (
          <Space direction="vertical" size="small">
            {renderField("Lifestyle", user.LifeStyle)}
            {renderField("Horoscope", user.Horoscope)}
            {renderField("Hobbies", user.Hobbies)}
          </Space>
        );
      case "preferences":
        return (
          <Space direction="vertical" size="small">
            {renderField("Preferred Min Age", user.PreMinAge)}
            {renderField("Preferred Max Age", user.PreMaxAge)}
            {renderField("Preferred Min Height", user.PreMinHeight)}
            {renderField("Preferred Max Height", user.PreMaxHeight)}
            {renderField("Preferences Description", user.PreDescription)}
          </Space>
        );
      default:
        return null;
    }
  };

  const sections = [
    { key: "personalInfo", label: "Personal" },
    { key: "contactInfo", label: "Contact " },
    { key: "familyDetails", label: "Family" },
    { key: "addressInfo", label: "Address" },
    { key: "educationInfo", label: "Educational" },
    { key: "professionalInfo", label: "Professional" },
    { key: "lifestyle", label: "Lifestyle" },
    { key: "preferences", label: "Preferences" },
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: 300 }}>
      <Card>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            {user?.profilePicture ? (
              <Avatar src={user?.profilePicture?.formats?.thumbnail?.url} size={64} />
            ) : (
              <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{}}>
                <Form.Item
                  name="profilePicture"
                  valuePropName="fileList"
                  getValueProps={(data) => getValueProps(data, API_URL)}
                  extra={`profile picture`}
                >
                  <Upload.Dragger
                    name="files"
                    action={API_URL + `/api/upload`}
                    listType="picture-card"
                    headers={{
                      Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                    }}
                  >
                    <Button>
                      <CameraOutlined />
                    </Button>
                  </Upload.Dragger>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Save
                  </Button>
                </Form.Item>
              </Form>
            )}
            <div style={{ flex: 1, marginLeft: 16 }}>
              <Space direction="vertical">
                <div>
                  <Text strong style={{ fontSize: 18 }}>
                    {user?.FirstName}
                  </Text>
                  {user?.FatherName && (
                    <Text strong style={{ fontSize: 18 }}>
                      {" "}
                      {user.FatherName}
                    </Text>
                  )}
                  <br />
                  <Text type="secondary" style={{ marginLeft: 8 }}>
                    ({user?.age} years old)
                  </Text>
                </div>
                <Space>
                  {showPhoto && (
                    <Button icon={<EditOutlined />} type="link" onClick={() => setShowPhoto(false)}>
                      Show Photo
                    </Button>
                  )}
                  {!showPhoto && (
                    <Button icon={<SettingOutlined />} type="link" onClick={() => setShowPhoto(true)}>
                      Show Profile
                    </Button>
                  )}
                </Space>
              </Space>
            </div>
          </div>
          <Row gutter={[8, 8]}>
            {sections.map((section) => (
              <Col span={12} key={section.key}>
                <Button
                  type={activeSection === section.key ? "primary" : "default"}
                  onClick={() => setActiveSection(section.key)}
                  style={{ width: "100%" }}
                >
                  {section.label}
                </Button>
              </Col>
            ))}
          </Row>
        </Space>
      </Card>
      <Card>
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          {showPhoto && renderContent()}
          {!showPhoto && <PhotoComponent user={user} />}
          {user?.photos&&<ImageGallery images={user.photos}/>}

        </div>
      </Card>
    </Space>
  );
};

export default ProfileCard;