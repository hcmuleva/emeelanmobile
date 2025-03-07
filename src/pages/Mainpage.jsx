import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { 
  Button, 
  Card, 
  Statistic, 
  Row, 
  Col, 
  Typography, 
  Spin, 
  Divider,
  Space 
} from 'antd';
import { 
  DashboardOutlined, 
  TeamOutlined, 
  TrophyOutlined, 
  UserOutlined, 
  SafetyCertificateOutlined, 
  HomeOutlined,
  SettingOutlined,
  ManOutlined,
  WomanOutlined,
  HeartOutlined,
  MessageOutlined,
  BellOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { useApiUrl, useCustom } from "@refinedev/core";

const { Title, Paragraph } = Typography;

function MainPage() {
  const navigate = useNavigate();
  const apiUrl = useApiUrl();
  const [loading, setLoading] = useState(true);
  
  // State for user counts
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [totalMeelan, setTotalMeelan] = useState(0);
  const [totalCenters, setTotalCenters] = useState(0);
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [marriedCount, setMarriedCount] = useState(0);
  const [engagedCount, setEngagedCount] = useState(0);
  
  // Fetch users data from Strapi
  const { data: usersData, isLoading: isUsersLoading } = useCustom({
    url: `${apiUrl}/users`,
    method: "get",
  });

  // Fetch gender data
  const { data: genderData, isLoading: isGenderLoading } = useCustom({
    url: `${apiUrl}/gender-count`,
    method: "get",
  });
  
  const { data: maritalData, isLoading: isMaritalLoading } = useCustom({
    url: `${apiUrl}//marital-status-count`,
    method: "get",
  })
  // Process API data when it's available
  useEffect(() => {
    if (usersData && !isUsersLoading) {
      // Set total users
      if (usersData.meta && usersData.meta.pagination) {
        setTotalUsers(usersData.meta.pagination.total);
      } else if (Array.isArray(usersData.data)) {
        setTotalUsers(usersData.data.length);
        
        // Count users by role
        let admins = 0;
        let meelans = 0;
        let centers = 0;
        let married = 0;
        let engaged = 0;
        
        usersData.data.forEach(user => {
          const role = user.emeelanrole;
          if (role === "ADMIN") admins++;
          else if (role === "MEELAN") meelans++;
          else if (role === "CENTER") centers++;
        });
        
        setTotalAdmins(admins);
        setTotalMeelan(meelans);
        setTotalCenters(centers);
      }
    }
    
    // Set gender counts when data is loaded
    // In your useEffect
if (genderData && !isGenderLoading) {
  console.log("Processing gender data:", genderData);
  
  // Check both possible structures
  if (genderData.data && genderData.data.data) {
    // Double nested structure
    setMaleCount(genderData.data.data.Male || 0);
    setFemaleCount(genderData.data.data.Female || 0);
  } else if (genderData.data) {
    // Single nested structure
    setMaleCount(genderData.data.Male || 0);
    setFemaleCount(genderData.data.Female || 0);
  }
}

// if (maritalData && !isMaritalLoading) {
//   console.log("Processing marital data:", maritalData);
  
//   // Check both possible structures
//   if (maritalData.data && maritalData.data.data) {
//     // Double nested structure
//     setMarriedCount(maritalData.data.data.Married || 0);
//     setEngagedCount(maritalData.data.data.Engaged || 0);
//   } else if (maritalData.data) {
//     // Single nested structure
//     setMarriedCount(maritalData.data.Married || 0);
//     setEngagedCount(maritalData.data.Engaged || 0);
//   }
// }
    
    // Set loading to false when all data is loaded
    if (!isUsersLoading && !isGenderLoading) {
      setLoading(false);
    }
  }, [usersData, isUsersLoading, genderData, isGenderLoading]);
  
  return (
    <>
      <Header />
      <div className="main-page" style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        {/* Introductory Sections - Hindi and English */}
        <Row gutter={[24, 24]}>
          <Col xs={24}>
            <Card>
              {/* Hindi Introduction */}
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <Title level={2} style={{ fontWeight: "bold", color: "#1890ff" }}>
                  मीलन वेबसाइट में आपका स्वागत है
                </Title>
                <Paragraph style={{ fontSize: 16 }}>
                  मीलन एक जीवनसाथी खोजने का एक सुरक्षित और विश्वसनीय प्लेटफॉर्म है। 
                  अपने प्रोफाइल को अपडेट करें, संभावित जीवनसाथी देखें, और अपने लिए सही मैच खोजें।
                </Paragraph>
              </div>
              
              <Divider />
              
              {/* English Introduction */}
              <div style={{ textAlign: "center" }}>
                <Title level={2} style={{ fontWeight: "bold", color: "#722ed1" }}>
                  Welcome to Meelan Platform
                </Title>
                <Paragraph style={{ fontSize: 16 }}>
                  Meelan is a secure and reliable platform for finding your life partner.
                  Update your profile, browse potential matches, and connect with suitable candidates.
                </Paragraph>
              </div>
            </Card>
          </Col>
        </Row>
        
        {/* Quick Links Grid Section */}
        <div style={{ marginTop: 24 }}>
          <Title level={4} style={{ marginBottom: 16 }}>Quick Links</Title>
          <Row gutter={[16, 16]}>
            <Col xs={8} sm={6} md={4}>
              <Card 
                hoverable
                style={{ textAlign: "center" }}
                onClick={() => navigate("/dashboard")}
              >
                <DashboardOutlined style={{ fontSize: 24, color: "#1890ff", marginBottom: 8 }} />
                <div>View Dashboard</div>
              </Card>
            </Col>
            
            <Col xs={8} sm={6} md={4}>
              <Card 
                hoverable
                style={{ textAlign: "center" }}
                onClick={() => navigate("/matches")}
              >
                <TeamOutlined style={{ fontSize: 24, color: "#52c41a", marginBottom: 8 }} />
                <div>Find Matches</div>
              </Card>
            </Col>
            
            <Col xs={8} sm={6} md={4}>
              <Card 
                hoverable
                style={{ textAlign: "center" }}
                onClick={() => navigate("/myprofile/" + localStorage.getItem("userid"))}
              >
                <UserOutlined style={{ fontSize: 24, color: "#722ed1", marginBottom: 8 }} />
                <div>My Profile</div>
              </Card>
            </Col>
            
          </Row>
        </div>
        
        {/* User Stats Section */}
        <div style={{ marginTop: 32 }}>
          <Title level={4} style={{ marginBottom: 16 }}>Platform Statistics</Title>
          <Row gutter={[16, 16]}>
            {/* Gender Stats */}
            <Col xs={12} md={6}>
              <Card>
                <Statistic 
                  title="Male Users"
                  value={loading ? "-" : maleCount}
                  prefix={<ManOutlined />}
                  valueStyle={{ color: "#1890ff", fontSize: 24 }}
                />
                {loading && <Spin size="small" style={{ marginLeft: 10 }} />}
              </Card>
            </Col>
            
            <Col xs={12} md={6}>
              <Card>
                <Statistic 
                  title="Female Users"
                  value={loading ? "-" : femaleCount}
                  prefix={<WomanOutlined />}
                  valueStyle={{ color: "#eb2f96", fontSize: 24 }}
                />
                {loading && <Spin size="small" style={{ marginLeft: 10 }} />}
              </Card>
            </Col>
            
            {/* Marital Status Stats */}
            {/* <Col xs={12} md={6}>
              <Card>
                <Statistic 
                  title="Married"
                  value={loading ? "-" : marriedCount}
                  prefix={<HeartOutlined />}
                  valueStyle={{ color: "#f5222d", fontSize: 24 }}
                />
                {loading && <Spin size="small" style={{ marginLeft: 10 }} />}
              </Card>
            </Col>
            
            <Col xs={12} md={6}>
              <Card>
                <Statistic 
                  title="Engaged"
                  value={loading ? "-" : engagedCount}
                  prefix={<HeartOutlined />}
                  valueStyle={{ color: "#fa8c16", fontSize: 24 }}
                />
                {loading && <Spin size="small" style={{ marginLeft: 10 }} />}
              </Card>
            </Col> */}
            
            {/* Role Stats */}
            <Col xs={12} md={6}>
              <Card>
                <Statistic 
                  title="Total Users"
                  value={loading ? "-" : totalUsers}
                  prefix={<UserOutlined />}
                  valueStyle={{ color: "#1890ff", fontSize: 24 }}
                />
                {loading && <Spin size="small" style={{ marginLeft: 10 }} />}
              </Card>
            </Col>
            
            <Col xs={12} md={6}>
              <Card>
                <Statistic 
                  title="Total Admins"
                  value={loading ? "-" : totalAdmins}
                  prefix={<SafetyCertificateOutlined />}
                  valueStyle={{ color: "#faad14", fontSize: 24 }}
                />
                {loading && <Spin size="small" style={{ marginLeft: 10 }} />}
              </Card>
            </Col>
            
            <Col xs={12} md={6}>
              <Card>
                <Statistic 
                  title="Total Meelans"
                  value={loading ? "-" : totalMeelan}
                  prefix={<TeamOutlined />}
                  valueStyle={{ color: "#52c41a", fontSize: 24 }}
                />
                {loading && <Spin size="small" style={{ marginLeft: 10 }} />}
              </Card>
            </Col>
            
            <Col xs={12} md={6}>
              <Card>
                <Statistic 
                  title="Total Centers"
                  value={loading ? "-" : totalCenters}
                  prefix={<HomeOutlined />}
                  valueStyle={{ color: "#722ed1", fontSize: 24 }}
                />
                {loading && <Spin size="small" style={{ marginLeft: 10 }} />}
              </Card>
            </Col>
          </Row>
        </div>
        
        {/* Dashboard Card - Call to action */}
        <Row gutter={[24, 24]} style={{ marginTop: 32, marginBottom: 24 }}>
          <Col xs={24}>
            <Card 
              style={{ background: "linear-gradient(135deg, #1890ff 0%, #722ed1 100%)", color: "white" }}
              bodyStyle={{ padding: "40px" }}
            >
              <div style={{ textAlign: "center" }}>
                <Title level={2} style={{ color: "white", marginBottom: 20 }}>
                  Ready to find your perfect match?
                </Title>
                <Paragraph style={{ color: "white", fontSize: 16, marginBottom: 30 }}>
                  Access your personalized dashboard to view your matches, analytics, and connect with potential life partners.
                </Paragraph>
                <Button 
                  type="primary" 
                  size="large"
                  icon={<DashboardOutlined />}
                  onClick={() => navigate("/dashboard")}
                  style={{ 
                    height: 50, 
                    padding: "0 35px", 
                    fontSize: 16, 
                    fontWeight: "bold",
                    background: "white", 
                    color: "#1890ff",
                    border: "none" 
                  }}
                >
                  Go to Dashboard
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default MainPage;