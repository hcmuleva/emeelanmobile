import { useState } from "react"
import { Tabs, Card, Button, Avatar, Typography, Row, Col, Form, Input, Progress, Divider, Space, Image } from "antd"
import {
  EditOutlined,
  SaveOutlined,
  UserOutlined,
  TeamOutlined,
  BookOutlined,
  GlobalOutlined,
  GithubOutlined,
  TwitterOutlined,
  InstagramOutlined,
  FacebookOutlined,
} from "@ant-design/icons"
import ImageGallery from "../../myProfile/ImageGallery"

const { Title, Text, Paragraph } = Typography
const { TabPane } = Tabs

export default function ProfilePage({ user }) {
  console.log("user", user)
  const [editingTabs, setEditingTabs] = useState({
    personal: false,
    contact: false,
    family: false,
    address: false,
    education: false,
    professional: false,
    lifestyle: false,
    preferences: false,
  })
  const [activeTab, setActiveTab] = useState("personal")
  const [form] = Form.useForm();

  const [profileData, setProfileData] = useState({
    personal: {
      "First Name": `${user.FirstName }`,
      "Last Name": `${user.LastName }`,
      "Date of Birth": `${user?.DOB }`,
      Sex: `${user?.Sex || "Male"}`,
      "Birth Time": `${user?.birth_time }`,
      "Birth Place": `${user?.birth_place }`,
      Height: `${user?.Height || "5'10\""}`,
      "Marital Status": `${user?.MeritalStatus }`,
      "Have Children": `${user?.have_child }`,
    },
    contact: {
      "Full Name": `${user.FirstName }`,
      Email: `${user.email }`,
      Mobile: `${user.Mobile }`,
    
      Address: "Bay Area, San Francisco, CA",
    },
    social: {
      website: "https://bootdey.com",
      github: "bootdey",
      twitter: "@bootdey",
      instagram: "bootdey",
      facebook: "bootdey",
    },
    family: {
      "Marital Status": "Married",
      Spouse: "Jane Doe",
      Children: "2",
      Parents: "Robert & Mary Doe",
    },
    address: {
      Street: "123 Main St",
      City: "San Francisco",
      State: "CA",
      "Zip Code": "94105",
      Country: "USA",
    },
    education: {
      Degree: "Master of Computer Science",
      University: "Stanford University",
      "Graduation Year": "2018",
      GPA: "3.8",
    },
    professional: {
      "Current Company": "Tech Innovations Inc.",
      Position: `${user.Profession || "No Profession"}`,
      Experience: "8 years",
      "Previous Companies": "Google, Facebook",
    },
    lifestyle: {
      Diet: "Vegetarian",
      Exercise: "Regular",
      Smoking: "No",
      Drinking: "Occasional",
    },
    preferences: {
      Hobbies: "Reading, Hiking, Photography",
      Music: "Jazz, Classical",
      Movies: "Sci-Fi, Drama",
      Travel: "International",
    },
    projects: [
      {
        name: "Web Design",
        progress: 90,
      },
      {
        name: "Website Markup",
        progress: 75,
      },
      {
        name: "One Page",
        progress: 85,
      },
      {
        name: "Mobile Template",
        progress: 60,
      },
      {
        name: "Backend API",
        progress: 70,
      },
    ],
  })

  const handleEdit = (tabKey) => {
    const isCurrentlyEditing = editingTabs[tabKey]

    if (isCurrentlyEditing) {
      // Save form values
      const values = form.getFieldsValue()
      setProfileData({
        ...profileData,
        [tabKey]: {
          ...values,
        },
      })
    } else {
      // Set form values for editing
      form.setFieldsValue(profileData[tabKey])
    }

    setEditingTabs({
      ...editingTabs,
      [tabKey]: !isCurrentlyEditing,
    })
  }

  const onTabChange = (key) => {
    setActiveTab(key)
    // Reset form when changing tabs
    form.resetFields()
  }

  const renderSocialItem = (icon, label, value) => (
    <>
      <div style={{ padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Space>
          {icon}
          <Text>{label}</Text>
        </Space>
        <Text type="secondary">{value}</Text>
      </div>
      <Divider style={{ margin: 0 }} />
    </>
  )

  const renderInfoTable = (data, tabKey) => {
    const isEditing = editingTabs[tabKey]

    return (
      <div className="info-table">
        {Object.entries(data).map(([key, value]) => (
          <div
            key={key}
            className="info-row"
            style={{ display: "flex", borderBottom: "1px solid #f0f0f0", padding: "12px 0" }}
          >
            <div className="info-label" style={{ width: "30%", fontWeight: "500", color: "#666" }}>
              {key}
            </div>
            <div className="info-value" style={{ width: "70%" }}>
              {isEditing ? (
                <Form.Item name={key} style={{ margin: 0 }}>
                  <Input defaultValue={value} />
                </Form.Item>
              ) : (
                value
              )}
            </div>
          </div>
        ))}
        <div style={{ marginTop: "20px" }}>
          <Button
            type={isEditing ? "primary" : "default"}
            icon={isEditing ? <SaveOutlined /> : <EditOutlined />}
            onClick={() => handleEdit(tabKey)}
          >
            {isEditing ? "Save" : "Edit"}
          </Button>
        </div>
      </div>
    )
  }

  const renderProjectStatus = () => (
    <Row gutter={16}>
      <Col span={12}>
        <Card title="Project Status" bordered={false}>
          <Space direction="vertical" style={{ width: "100%" }}>
            {profileData.projects.map((project, index) => (
              <div key={index}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Text>{project.name}</Text>
                  <Text>{project.progress}%</Text>
                </div>
                <Progress percent={project.progress} size="small" />
              </div>
            ))}
          </Space>
        </Card>
      </Col>
      <Col span={12}>
        <Card title="Project Status" bordered={false}>
          <Space direction="vertical" style={{ width: "100%" }}>
            {profileData.projects.map((project, index) => (
              <div key={index}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Text>{project.name}</Text>
                  <Text>{project.progress}%</Text>
                </div>
                <Progress percent={project.progress} size="small" />
              </div>
            ))}
          </Space>
        </Card>
      </Col>
    </Row>
  )

  return (
    <div style={{ padding: "24px", background: "#f0f2f5", minHeight: "100vh" }}>
      <Row gutter={24}>
        {/* Left Column - Profile Summary */}
        <Col xs={24} md={8}>
          <Card bordered={false} style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "24px" }}>
            {user?.photos && <ImageGallery images={user.photos} />}


              <Title level={3} style={{ marginTop: "16px", marginBottom: "4px" }}>
                {`${profileData.personal["First Name"]} ${profileData.personal["Last Name"]}`}
              </Title>
              <Text type="secondary">{profileData.professional?.Position || "Professional"}</Text>
              <Text type="secondary" style={{ fontSize: "12px", marginBottom: "16px" }}>
                {profileData.address?.City || "Location"}
              </Text>
              <Space>
                <Button type="primary">Follow</Button>
                <Button>Message</Button>
              </Space>
            </div>

            {/* Social Links */}
            <div>
              {renderSocialItem(<GlobalOutlined />, "Website", profileData.social.website)}
              {renderSocialItem(<GithubOutlined />, "Github", profileData.social.github)}
              {renderSocialItem(<TwitterOutlined />, "Twitter", profileData.social.twitter)}
              {renderSocialItem(<InstagramOutlined />, "Instagram", profileData.social.instagram)}
              {renderSocialItem(<FacebookOutlined />, "Facebook", profileData.social.facebook)}
            </div>
          </Card>
        </Col>

        {/* Right Column - Tabs and Content */}
        <Col xs={24} md={16}>
          <Tabs defaultActiveKey="personal" activeKey={activeTab} onChange={onTabChange}>
            <TabPane
              tab={
                <span>
                  <UserOutlined /> Personal
                </span>
              }
              key="personal"
            >
              <Card bordered={false}>
                <Form form={form} layout="vertical">
                  {renderInfoTable(profileData.personal, "personal")}
                </Form>
              </Card>

              <div style={{ marginTop: "24px" }}>{renderProjectStatus()}</div>
            </TabPane>

            <TabPane
              tab={
                <span>
                  <TeamOutlined /> Contact
                </span>
              }
              key="contact"
            >
              <Card bordered={false}>
                <Form form={form} layout="vertical">
                  {renderInfoTable(profileData.contact, "contact")}
                </Form>
              </Card>
            </TabPane>

            <TabPane
              tab={
                <span>
                  <TeamOutlined /> Family
                </span>
              }
              key="family"
            >
              <Card bordered={false}>
                <Form form={form} layout="vertical">
                  {renderInfoTable(profileData.family, "family")}
                </Form>
              </Card>
            </TabPane>

            <TabPane
              tab={
                <span>
                  <BookOutlined /> Address
                </span>
              }
              key="address"
            >
              <Card bordered={false}>
                <Form form={form} layout="vertical">
                  {renderInfoTable(profileData.address, "address")}
                </Form>
              </Card>
            </TabPane>

            <TabPane
              tab={
                <span>
                  <BookOutlined /> Educational
                </span>
              }
              key="education"
            >
              <Card bordered={false}>
                <Form form={form} layout="vertical">
                  {renderInfoTable(profileData.education, "education")}
                </Form>
              </Card>
            </TabPane>

            <TabPane
              tab={
                <span>
                  <BookOutlined /> Professional
                </span>
              }
              key="professional"
            >
              <Card bordered={false}>
                <Form form={form} layout="vertical">
                  {renderInfoTable(profileData.professional, "professional")}
                </Form>
              </Card>
            </TabPane>

            <TabPane
              tab={
                <span>
                  <BookOutlined /> LifeStyle
                </span>
              }
              key="lifestyle"
            >
              <Card bordered={false}>
                <Form form={form} layout="vertical">
                  {renderInfoTable(profileData.lifestyle, "lifestyle")}
                </Form>
              </Card>
            </TabPane>

            <TabPane
              tab={
                <span>
                  <BookOutlined /> Preferences
                </span>
              }
              key="preferences"
            >
              <Card bordered={false}>
                <Form form={form} layout="vertical">
                  {renderInfoTable(profileData.preferences, "preferences")}
                </Form>
              </Card>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  )
}

