import React from "react";
import { Row, Col, Card, Typography } from "antd";
import { UserOutlined, TeamOutlined, BookOutlined } from "@ant-design/icons";

const { Text } = Typography;

const PreferencesInfo = ({ profileData }) => {
  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
        {/* Basic Preferences Section */}
        <Col xs={24} sm={24} md={8}>
          <Card
            title={
              <span>
                <UserOutlined style={{ marginRight: "10px" }} />
                Basic Preferences
              </span>
            }
            bordered={true}
          >
              <Text strong>Marital Status:</Text> {profileData?.PrefMaritial}
              <br />
              <Text strong>Pef Gotra:</Text> {profileData?.PrefGotra}
              <br />
              <Text strong>Min Height:</Text> {profileData?.minHeight}
              <br />
              <Text strong>Max Height:</Text> {profileData?.maxHeight}
          </Card>
        </Col>

        {/* Age Preferences Section */}
        <Col xs={24} sm={24} md={8}>
          <Card
            title={
              <span>
                <TeamOutlined style={{ marginRight: "8px" }} />
                Age Preferences
              </span>
            }
            bordered={true}
          >
            <Text strong>Min. Age:</Text>
            <Text style={{ marginLeft: "8px" }}>{profileData?.PreMinAge || "N/A"}</Text>
            <br />
            <Text strong>Max. Age:</Text>
            <Text style={{ marginLeft: "8px" }}>{profileData?.PreMaxAge || "N/A"}</Text>
          </Card>
        </Col>

        {/* Professional Preferences Section */}
        <Col xs={24} sm={24} md={8}>
          <Card
            title={
              <span>
                <BookOutlined style={{ marginRight: "8px" }} />
                Professional Preferences
              </span>
            }
            bordered={true}
          >
            <Text strong>Preferred Qualification:</Text>
            <Text style={{ marginLeft: "8px" }}>{profileData?.PreQualification || "N/A"}</Text>
            <br />
            <Text strong>Preferred Profession:</Text>
            <Text style={{ marginLeft: "8px" }}>{profileData?.PreProfession || "N/A"}</Text>
            <br />
            <Text strong>Preference Description:</Text>
            <Text style={{ marginLeft: "8px" }}>{profileData?.PreDescription || "N/A"}</Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PreferencesInfo;
