import React, { useState } from "react";
import { Card, Avatar, Button, Form, Space, Upload, Typography, notification, Row, Col, Divider } from "antd";
import { EditOutlined, SettingOutlined, CameraOutlined, UserOutlined, PhoneOutlined, TeamOutlined, HomeOutlined, BookOutlined, HeartOutlined, StarOutlined, LogoutOutlined } from "@ant-design/icons";
import { getValueProps } from "@refinedev/strapi-v4";
import { useUpdate } from "@refinedev/core";
import PhotoComponent from "./PhotoComponent";
import ImageGallery from "./ImageGallery";
import { Navigate, useNavigate } from "react-router-dom";
import EditProfile from "./EditProfile";

const { Text, Title } = Typography;
const API_URL = import.meta.env.VITE_SERVER_URL;

const ProfileCard = ({ user }) => {
  const [activeSection, setActiveSection] = useState("personalInfo");
  const [showPhoto, setShowPhoto] = useState(false);
  const [form] = Form.useForm();
  const { mutate: updateUser } = useUpdate();
  const navigate = useNavigate();
  const [isEditProfile,setIsEditProfile]= useState(false);

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
      notification.error({
        message: "Error",
        description: "There was an issue with the upload process.",
      });
    }
  };

  const renderField = (label, value) => {
    if (label === "Have Children") {
      return (
        <div className="field-item">
          <Text strong>{label}:</Text> {value ? "Yes" : "No"}
        </div>
      );
    }
    return (
      <div className="field-item">
        <Text strong>{label}:</Text> {value || "N/A"}
      </div>
    );
  };

  const sections = [
    { key: "personalInfo", label: "Personal", icon: <UserOutlined /> },
    { key: "contactInfo", label: "Contact", icon: <PhoneOutlined /> },
    { key: "familyDetails", label: "Family", icon: <TeamOutlined /> },
    { key: "addressInfo", label: "Address", icon: <HomeOutlined /> },
    { key: "educationInfo", label: "Educational", icon: <BookOutlined /> },
    { key: "professionalInfo", label: "Professional", icon: <BookOutlined /> },
    { key: "lifestyle", label: "Lifestyle", icon: <HeartOutlined /> },
    { key: "preferences", label: "Preferences", icon: <StarOutlined /> },
  ];

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
            {renderField("Marital Status", user.MeritalStatus)}
            {renderField("Have Children", user.have_child)}
          </Space>
        );
      case "contactInfo":
        return (
          <Space direction="vertical" size="small">
            {renderField("Mobile Number", user.MobileNumber || user.mobile)}
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
            {renderField(
              "Additional Qualification",
              user.AdditionalQualification
            )}
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

  return (
    <>
      <div className="profile-container" style={{ backgroundColor: "" }}>
        <Card
          bordered={false}
          style={{
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              marginBottom: "40px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              {" "}
              <HomeOutlined /> Home
            </Button>
            <Button
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              {" "}
              <LogoutOutlined /> Logout
            </Button>
          </div>
          <Row gutter={[24, 24]} align="middle" justify="center">
            <Col xs={24} sm={24} md={8}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                {user?.profilePicture ? (
                  <Avatar
                    src={user?.profilePicture?.formats?.thumbnail?.url}
                    size={120}
                    style={{
                      border: "4px solid #fff",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                  />
                ) : (
                  <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Form.Item
                      name="profilePicture"
                      valuePropName="fileList"
                      getValueProps={(data) => getValueProps(data, API_URL)}
                    >
                      <Upload.Dragger
                        name="files"
                        action={`${API_URL}/api/upload`}
                        listType="picture-card"
                        headers={{
                          Authorization: `Bearer ${localStorage.getItem(
                            "jwt-token"
                          )}`,
                        }}
                        style={{ width: "120px", height: "120px" }}
                      >
                        <Button
                          type="text"
                          icon={<CameraOutlined style={{ fontSize: "24px" }} />}
                        />
                      </Upload.Dragger>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block>
                      Save Photo
                    </Button>
                  </Form>
                )}
                <div style={{ textAlign: "center" }}>
                  <Title level={4} style={{ margin: 0 }}>
                    {user?.FirstName}{" "}
                    {user?.FatherName && `(${user.FatherName})`}
                  </Title>
                  <Text type="secondary">{user?.age} years old</Text>
                </div>
                <Button
                  
                  onClick={() => {
                    setIsEditProfile(true);
                  }}
                >
                  <EditOutlined
                    style={{ fontSize: "14px", color: "#1890ff" }}
                  />
                  Edit Profile
                </Button>
                <Button
                  type="default"
                  icon={showPhoto ? <EditOutlined /> : <SettingOutlined />}
                  onClick={() => setShowPhoto(!showPhoto)}
                  style={{ borderRadius: "6px" }}
                >
                  {showPhoto ? "Show Profile" : "Show Photo"}
                </Button>
              </div>
            </Col>

            <Col xs={24} md={16}>
              <Row gutter={[8, 8]}>
                {sections.map((section) => (
                  <Col xs={12} sm={8} md={6} key={section.key}>
                    <Button
                      type={
                        activeSection === section.key ? "primary" : "default"
                      }
                      onClick={() => setActiveSection(section.key)}
                      icon={section.icon}
                      block
                      style={{
                        height: "auto",
                        padding: "8px",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "4px",
                      }}
                    >
                      <span
                        style={{
                          display: "block",
                          fontSize: "12px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {section.label}
                      </span>
                    </Button>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>

          <Divider style={{ margin: "24px 0" }} />

          <div
            style={{
              maxHeight: "500px",
              overflowY: "auto",
              padding: "16px",
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
            }}
          >
            {showPhoto ? (
              <PhotoComponent user={user} />
            ) : (
              <div className="content-section" style={{ padding: "16px" }}>
                {renderContent()}
              </div>
            )}
            {user?.photos && <ImageGallery images={user.photos} />}
          </div>
        </Card>

        <style jsx>{`
          .profile-container {
            max-width: 1200px;
            margin: 0 auto;
          }

          .field-item {
            padding: 8px 0;
            border-bottom: 1px solid #f0f0f0;
          }

          .field-item:last-child {
            border-bottom: none;
          }

          @media (max-width: 768px) {
            .profile-container {
              padding: none;
            }
          }
        `}</style>
      </div>
      {isEditProfile&&<EditProfile user={user} setIsEditProfile={setIsEditProfile}/>}
    </>
  );
};

export default ProfileCard;
