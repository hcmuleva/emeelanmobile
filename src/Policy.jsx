import React from 'react';
import { Card, Typography, Space, Divider, Button } from 'antd';

const { Title, Paragraph, Text } = Typography;
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const lastUpdated = "December 13, 2024";
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px' }}>
      <Card>
      <Button  onClick={() => navigate("/login")}>
            Login(लॉगिन पेज ){" "}
            </Button>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {/* Header */}
          <div>
            <Title level={2}>Privacy Policy</Title>
            <Text type="secondary">Last Updated: {lastUpdated}</Text>
          </div>

          {/* Introduction */}
          <section>
            <Title level={3}>Introduction</Title>
            <Paragraph>
              We respect your privacy and are committed to protecting your personal data. 
              This privacy policy explains how we collect, use, and safeguard your information 
              when you use our mobile application.
            </Paragraph>
          </section>

          <Divider />

          {/* Information We Collect */}
          <section>
            <Title level={3}>Information We Collect</Title>
            <Title level={4}>Personal Information</Title>
            <Paragraph>
              We may collect personal information that you provide directly, including:
            </Paragraph>
            <ul>
              <li>Name and contact information</li>
              <li>Account credentials</li>
              <li>User preferences and settings</li>
            </ul>
          </section>

          <Divider />

          {/* How We Use Your Information */}
          <section>
            <Title level={3}>How We Use Your Information</Title>
            <Paragraph>
              We use the collected information for various purposes, including:
            </Paragraph>
            <ul>
              <li>Providing and maintaining our services</li>
              <li>Improving user experience</li>
              <li>Sending important updates and notifications</li>
              <li>Analytics and performance monitoring</li>
            </ul>
          </section>

          <Divider />

          {/* Data Security */}
          <section>
            <Title level={3}>Data Security</Title>
            <Paragraph>
              We implement appropriate security measures to protect your personal information 
              from unauthorized access, alteration, disclosure, or destruction.
            </Paragraph>
          </section>

          <Divider />

          {/* User Rights */}
          <section>
            <Title level={3}>Your Rights</Title>
            <Paragraph>
              You have the right to:
            </Paragraph>
            <ul>
              <li>Access your personal data</li>
              <li>Request correction of your data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <Divider />

          {/* Contact Information */}
          <section>
            <Title level={3}>Contact Us</Title>
            <Paragraph>
           
              If you have questions about this privacy policy, please contact us at:
              <br />
              Email: business@emeelan.com
              <br />
              Address: RH52, Ramky Serene Woods chikkagubbi Bangalore 560077
            
            </Paragraph>
          </section>
          <div>
            <Button  onClick={() => navigate("/login")}>
            Login(लॉगिन पेज ){" "}
            </Button>
          <span style={{ cursor: "pointer", color: "white" }}
                        onClick={() => navigate("/login")}
                      >
                        {" "}
                       Login(लॉगिन पेज ){" "}
                      </span>
                    </div>
        </Space>
      </Card>
    </div>
  );
};
export default PrivacyPolicy;
