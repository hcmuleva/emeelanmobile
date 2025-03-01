import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { Button, Card, Statistic, Row, Col, Typography, Spin } from 'antd';
import { 
  DashboardOutlined, 
  TeamOutlined, 
  TrophyOutlined, 
  UserOutlined, 
  SafetyCertificateOutlined, 
  HomeOutlined 
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
  
  // Fetch users data from Strapi
  const { data: usersData, isLoading: isUsersLoading } = useCustom({
    url: `${apiUrl}/users`,
    method: "get",
  });
  
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
    
    // Set loading to false when data is loaded
    if (!isUsersLoading) {
      setLoading(false);
    }
  }, [usersData, isUsersLoading]);
  
  return (
    <>
      <Header />
      <div className="main-page" style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        <Row gutter={[24, 24]} align="middle" justify="center" style={{ marginBottom: 24 }}>
          <Col xs={24}>
            <Title level={1} style={{ textAlign: "center", marginBottom: 0 }}>
              Welcome to Your Dashboard
            </Title>
            <Paragraph style={{ textAlign: "center", fontSize: 18, marginBottom: 24 }}>
              Track your progress, find matches, and connect with others
            </Paragraph>
          </Col>
        </Row>
        
        {/* User Stats Section */}
        <Row gutter={[24, 24]}>
          <Col xs={24} md={6}>
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
          
          <Col xs={24} md={6}>
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
          
          <Col xs={24} md={6}>
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
          
          <Col xs={24} md={6}>
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
        
        {/* Dashboard Card Section */}
        <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
          <Col xs={24} md={16}>
            <Card 
              style={{ background: "linear-gradient(135deg, #1890ff 0%, #722ed1 100%)", color: "white" }}
              bodyStyle={{ padding: "40px" }}
            >
              <div style={{ textAlign: "center", marginBottom: 30 }}>
                <Title level={2} style={{ color: "white", marginBottom: 20 }}>
                  Ready to jump in?
                </Title>
                <Paragraph style={{ color: "white", fontSize: 16, marginBottom: 30 }}>
                  Access your personalized dashboard to view your matches, analytics, and more.
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
          
          <Col xs={24} md={8}>
            <Card style={{ height: "100%" }}>
              <Title level={5}>Quick Links</Title>
              <Button 
                type="default" 
                block 
                style={{ marginBottom: 10 }}
                onClick={() => navigate("/matches")}
                icon={<TeamOutlined />}
              >
                Find Matches
              </Button>
              <Button 
                type="default" 
                block
                onClick={() => navigate("/myprofile/" + localStorage.getItem("userid"))}
                icon={<TrophyOutlined />}
              >
                My Profile
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default MainPage;