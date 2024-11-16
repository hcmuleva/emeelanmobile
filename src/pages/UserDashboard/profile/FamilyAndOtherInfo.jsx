import React from "react";
import { Row, Col, Card, Typography } from "antd";
import { UserOutlined, TeamOutlined, EyeOutlined, TrophyOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const FamilyAndOtherInfo = ({profileData}) => {
    const calculateAge = (dob) => {
        if (!dob) return "";
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      };
  return (
    <div style={{ padding: "20px" }}>
   
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        {/* Paternal Section */}
        <Col xs={24} sm={24} md={8}>
          <Card
            title={
              <span>
                <UserOutlined style={{ marginRight: "8px" }} />
                Paternal
              </span>
            }
            bordered={true}
          >
              <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={12} lg={12}>
          <Text strong>First Name:</Text>
          <Text style={{ marginLeft: "8px" }}>{profileData?.FirstName || "N/A"}</Text>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12}>
          <Text strong>Last Name:</Text>
          <Text style={{ marginLeft: "8px" }}>{profileData?.LastName || "N/A"}</Text>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12}>
          <Text strong>Gotra:</Text>
          <Text style={{ marginLeft: "8px" }}>{profileData?.Gotra || "N/A"}</Text>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12}>
          <Text strong>Marital Status:</Text>
          <Text style={{ marginLeft: "8px" }}>{profileData?.marital || "N/A"}</Text>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12}>
          <Text strong>Age:</Text>
         {profileData?.DOB&& <Text style={{ marginLeft: "8px" }}>{calculateAge(profileData?.DOB) || "N/A"}</Text>}
        </Col>
        {/* <Col xs={24} sm={12} md={12} lg={12}>
          <Text strong>Date of Birth:</Text>
          <Text style={{ marginLeft: "8px" }}>{profileData?.DOB || "N/A"}</Text>
        </Col> */}
      </Row>
            {/* <Text>Family Type:</Text>
            <br />
            <Text>Father Name:</Text>
            <br />
            <Text>Mother Name:</Text>
            <br />
            <Text>GrandFather Name:</Text>
            <br />
            <Text>GrandMother Name:</Text>
            <br />
            <Text>Father Mob. No.: +91-92xxx-xxxxx</Text>
            <br />
            <Text>Siblings:</Text>
            <br />
            <TrophyOutlined style={{ fontSize: "18px", marginRight: "8px", marginTop: "10px" }} />
            <Text>Family Business</Text> */}
          </Card>
        </Col>

        {/* Maternal Section */}
        <Col xs={24} sm={24} md={8}>
          <Card
            title={
              <span>
                <TeamOutlined style={{ marginRight: "8px" }} />
                Maternal
              </span>
            }
            bordered={true}
          >
            <Text>MamaJi Name:</Text>
            <br />
            <Text>NanaJi Name:</Text>
            <br />
            <Text>NaniJi Name:</Text>
            <br />
            <Text>Phone Number:</Text>
            <br />
            <Text>Gotra:</Text>
            <br />
            <Text>Hobbies:</Text>
            <br />
            <Text>Other Interests: Private Job</Text>
          </Card>
        </Col>

        {/* Lifestyle Section */}
        <Col xs={24} sm={24} md={8}>
          <Card
            title={
              <span>
                <EyeOutlined style={{ marginRight: "8px" }} />
                Lifestyle
              </span>
            }
            bordered={true}
          >
            <Text>Fitness Freak</Text>
            <br />
            <Text>Other Activities: Private Job</Text>
            <br />
            <EyeOutlined style={{ fontSize: "18px", marginRight: "8px", marginTop: "10px" }} />
            <Text>Horoscope Details</Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default FamilyAndOtherInfo;
