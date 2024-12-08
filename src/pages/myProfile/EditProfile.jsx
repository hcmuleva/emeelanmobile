import React, { useState } from "react";
import { Card, Avatar, Button, Form, Input, Tabs, Typography, Space, notification, Upload, Row, Col, Divider } from "antd";
import { SettingOutlined, UploadOutlined, UserOutlined, PhoneOutlined, TeamOutlined, HomeOutlined, BookOutlined, HeartOutlined, StarOutlined, FileOutlined } from "@ant-design/icons";
import { useUpdate } from "@refinedev/core";
import ChangePassword from "./ChangePassword";

const { TabPane } = Tabs;
const { Text, Title } = Typography;

export default function EditProfile({ user, setIsEditProfile}) {
  const { mutate: updateUser } = useUpdate();
  const [form] = Form.useForm();
  const [view, setView] = useState("editProfile");
  const [activeTab, setActiveTab] = useState("personalInfo");

  const onFinish = async (values) => {
    try {
      await updateUser(
        {
          resource: "users",
          id: user.id,
          values: values,
        },
        {
          onSuccess: () => {
            notification.success({
              message: "Success",
              description: "Your profile has been successfully updated.",
            });
            form.resetFields();
            setIsEditProfile(false);
          },
        }
      );
    } catch (error) {
      notification.error({
        message: "Error",
        description: "There was an issue updating your profile.",
      });
    }
  };

  const tabs = [
    { key: "personalInfo", tab: "Personal", icon: <UserOutlined /> },
    { key: "contactInfo", tab: "Contact", icon: <PhoneOutlined /> },
    { key: "familyDetails", tab: "Family", icon: <TeamOutlined /> },
    { key: "addressInfo", tab: "Address", icon: <HomeOutlined /> },
    { key: "educationInfo", tab: "Education", icon: <BookOutlined /> },
    {
      key: "professionalInfo",
      tab: "Professional",
      icon: <BookOutlined />,
    },
    { key: "lifestyle", tab: "Lifestyle", icon: <HeartOutlined /> },
    { key: "preference", tab: "Preference", icon: <StarOutlined /> },
    { key: "profileupload", tab: "Upload", icon: <FileOutlined /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "personalInfo":
        return (
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <Form.Item name="FirstName" label="First Name">
              <Input placeholder="Enter First Name" />
            </Form.Item>
            <Form.Item name="LastName" label="Last Name">
              <Input placeholder="Enter Last Name" />
            </Form.Item>
            <Form.Item name="DOB" label="Date of Birth">
              <Input placeholder="Enter Date of Birth" />
            </Form.Item>
            <Form.Item name="Sex" label="Sex">
              <Input placeholder="Enter Sex" />
            </Form.Item>
            <Form.Item name="birth_time" label="Birth Time">
              <Input placeholder="Enter Birth Time" />
            </Form.Item>
            <Form.Item name="birth_place" label="Birth Place">
              <Input placeholder="Enter Birth Place" />
            </Form.Item>
            <Form.Item name="Height" label="Height">
              <Input placeholder="Enter Height" />
            </Form.Item>
            <Form.Item name="have_child" label="Have Children">
              <Input placeholder="Have Children" />
            </Form.Item>
            <Form.Item name="MeritalStatus" label="Marital Status">
              <Input placeholder="Enter Marital Status" />
            </Form.Item>
          </Space>
        );
      case "contactInfo":
        return (
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <Form.Item name="MobileNumber" label="Mobile Number">
              <Input placeholder="Enter Mobile Number" />
            </Form.Item>
            <Form.Item name="FatherMobileNumber" label="Father's Mobile">
              <Input placeholder="Enter Father's Mobile Number" />
            </Form.Item>
            <Form.Item name="MamajiMobileNumber" label="Mamaji's Mobile">
              <Input placeholder="Enter Mamaji's Mobile Number" />
            </Form.Item>
          </Space>
        );
      case "familyDetails":
        return (
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <Form.Item name="FatherName" label="Father's Name">
              <Input placeholder="Enter Father's Name" />
            </Form.Item>
            <Form.Item name="MotherName" label="Mother's Name">
              <Input placeholder="Enter Mother's Name" />
            </Form.Item>
            <Form.Item name="father_occupation" label="Father's Occupation">
              <Input placeholder="Enter Father's Occupation" />
            </Form.Item>
            <Form.Item name="Gotra" label="Gotra">
              <Input placeholder="Enter Gotra" />
            </Form.Item>
            <Form.Item name="MaternalGotra" label="Maternal Gotra">
              <Input placeholder="Enter Maternal Gotra" />
            </Form.Item>
            <Form.Item name="GrandFatherName" label="Grandfather's Name">
              <Input placeholder="Enter Grandfather's Name" />
            </Form.Item>
            <Form.Item name="Siblings" label="Siblings">
              <Input placeholder="Enter Number of Siblings" />
            </Form.Item>
            <Form.Item name="NanajiName" label="Nanaji's Name">
              <Input placeholder="Enter Nanaji's Name" />
            </Form.Item>
            <Form.Item name="NanijiName" label="Naniji's Name">
              <Input placeholder="Enter Naniji's Name" />
            </Form.Item>
            <Form.Item name="MamajiName" label="Mamaji's Name">
              <Input placeholder="Enter Mamaji's Name" />
            </Form.Item>
          </Space>
        );
      case "addressInfo":
        return (
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <Form.Item name="home_address" label="Home Address">
              <Input placeholder="Enter Home Address" />
            </Form.Item>
            <Form.Item name="City" label="City">
              <Input placeholder="Enter City" />
            </Form.Item>
            <Form.Item name="State" label="State">
              <Input placeholder="Enter State" />
            </Form.Item>
            <Form.Item name="Country" label="Country">
              <Input placeholder="Enter Country" />
            </Form.Item>
            <Form.Item name="postalcode" label="Postal Code">
              <Input placeholder="Enter Postal Code" />
            </Form.Item>
          </Space>
        );
      case "educationInfo":
        return (
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <Form.Item name="education_level" label="Education Level">
              <Input placeholder="Enter Education Level" />
            </Form.Item>
            <Form.Item name="HighestDegree" label="Highest Degree">
              <Input placeholder="Enter Highest Degree" />
            </Form.Item>
            <Form.Item
              name="AdditionalQualification"
              label="Additional Qualification"
            >
              <Input placeholder="Enter Additional Qualification" />
            </Form.Item>
            <Form.Item name="LastCollege" label="Last College">
              <Input placeholder="Enter Last College" />
            </Form.Item>
          </Space>
        );
      case "professionalInfo":
        return (
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <Form.Item name="Profession" label="Profession">
              <Input placeholder="Enter Profession" />
            </Form.Item>
            <Form.Item name="CompanyName" label="Company Name">
              <Input placeholder="Enter Company Name" />
            </Form.Item>
            <Form.Item name="Designation" label="Designation">
              <Input placeholder="Enter Designation" />
            </Form.Item>
            <Form.Item name="WorkingCity" label="Working City">
              <Input placeholder="Enter Working City" />
            </Form.Item>
            <Form.Item name="Income" label="Income">
              <Input placeholder="Enter Income" />
            </Form.Item>
            <Form.Item name="PreProfession" label="Previous Profession">
              <Input placeholder="Enter Previous Profession" />
            </Form.Item>
          </Space>
        );
      case "lifestyle":
        return (
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <Form.Item name="LifeStyle" label="Lifestyle">
              <Input placeholder="Enter Lifestyle" />
            </Form.Item>
            <Form.Item name="FoodPreference" label="Food Preference">
              <Input placeholder="Enter Food Preference" />
            </Form.Item>
          </Space>
        );
        case "preference":
          return (
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <Form layout="vertical">
              <Form.Item name="PreMinAge" label="Minimum Age">
                <Input placeholder="Enter Minimum Age" type="number" />
              </Form.Item>
              <Form.Item name="PreMaxAge" label="Maximum Age">
                <Input placeholder="Enter Maximum Age" type="number" />
              </Form.Item>
              <Form.Item name="PreMinHeight" label="Minimum Height (cm)">
                <Input placeholder="Enter Minimum Height" type="number" />
              </Form.Item>
              <Form.Item name="PreMaxHeight" label="Maximum Height (cm)">
                <Input placeholder="Enter Maximum Height" type="number" />
              </Form.Item>
              <Form.Item name="PreProfession" label="Profession">
                <Input placeholder="Enter Profession" />
              </Form.Item>
              <Form.Item name="PreQualification" label="Qualification">
                <Input placeholder="Enter Qualification" />
              </Form.Item>
              <Form.Item name="PreDescription" label="Description">
                <Input.TextArea placeholder="Enter Description" rows={4} />
              </Form.Item>
            </Form>
          </Space>
          );
          case "profileupload":
            return (
              <Space direction="vertical" size="small" style={{ width: "100%" }}>
              <Form layout="vertical">
               {/* File Upload */}
               <Form.Item
                 name="profiledoc"
                 label="Profile Document"
                 valuePropName="fileList"
                 getValueFromEvent={(e) => {
                   // Normalize the uploaded files value
                   if (Array.isArray(e)) return e;
                   return e?.fileList;
                 }}
                 rules={[
                   { required: true, message: "Please upload a profile document!" },
                 ]}
               >
                 <Upload
                   name="file"
                   accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                   listType="text"
                   beforeUpload={(file) => {
                     const isAllowedFile =
                       file.type === "image/jpeg" ||
                       file.type === "image/png" ||
                       file.type === "application/pdf" ||
                       file.type === "application/msword" ||
                       file.type ===
                       "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

                     if (!isAllowedFile) {
                       alert("You can only upload JPG, PNG, PDF, DOC, or DOCX files!");
                       return Upload.LIST_IGNORE;
                     }

                     const isFileSizeValid = file.size / 1024 / 1024 < 5; // 5MB limit
                     if (!isFileSizeValid) {
                       alert("File must be smaller than 5MB!");
                       return Upload.LIST_IGNORE;
                     }

                     return true; // Accept the file
                   }}
                 >
                   <Button icon={<UploadOutlined />}>Click to Upload</Button>
                 </Upload>
               </Form.Item>
             </Form>;

           </Space>

            );
      default:
        return null;
    }
  };

return (
  <div className="edit-profile-container" style={{ padding: "20px" }}>
    <Card
      bordered={false}
      style={{
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {view === "editProfile" ? (
          <>
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
                  <Avatar
                    src={user?.profilePicture?.formats?.thumbnail?.url}
                    size={120}
                    icon={<UserOutlined />}
                    style={{
                      border: "4px solid #fff",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                  />
                  <div style={{ textAlign: "center" }}>
                    <Title level={4} style={{ margin: 0 }}>
                      {user.FirstName} {user.LastName}
                    </Title>
                    <Text type="secondary">{user.age} years old</Text>
                    {user.isdivyang && <Text strong> (Divyang)</Text>}
                  </div>
                  <Button
                    icon={<SettingOutlined />}
                    onClick={() => setView("changePassword")}
                    style={{ borderRadius: "6px" }}
                  >
                    Change Password
                  </Button>
                </div>
              </Col>

              <Col xs={24} md={16}>
                <Row gutter={[8, 8]}>
                  {tabs.map((tab) => (
                    <Col xs={12} sm={8} md={6} key={tab.key}>
                      <Button
                        type={activeTab === tab.key ? "primary" : "default"}
                        onClick={() => setActiveTab(tab.key)}
                        icon={tab.icon}
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
                          {tab.tab}
                        </span>
                      </Button>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>

            <Divider style={{ margin: "24px 0" }} />

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={user}
              style={{
                maxHeight: "500px",
                overflowY: "auto",
                padding: "16px",
                backgroundColor: "#f5f5f5",
                borderRadius: "8px",
              }}
            >
              {renderTabContent()}
              <Form.Item style={{ marginTop: 16 }}>
                <Button type="primary" htmlType="submit" block>
                  Update Profile
                </Button>
              </Form.Item>
              <Button
                type="default"
                block
                onClick={() => {
                  setIsEditProfile(false);
                }}
              >
                Close
              </Button>
            </Form>
          </>
        ) : (
          // Render the ChangePassword component if view === "changePassword"
          <ChangePassword />
        )}
      </Space>
    </Card>

    <style jsx>{`
      .edit-profile-container {
        max-width: 1200px;
        margin: 0 auto;
      }

      @media (max-width: 768px) {
        .edit-profile-container {
          padding: 12px;
        }
      }
    `}</style>
  </div>
);

}
