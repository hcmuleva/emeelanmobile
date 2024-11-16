import React,{useState} from "react";
import { Form,Input,Row,Col, Typography } from "antd";

const { Text, Title } = Typography;

const PreferencesDisplay = ({profileData}) => {
  const preferences = {
    genderPref: "Female",
    maritalStatus: "Married (Only for Admin)",
    preferredLanguage: "English",
    minHeight: null,
    maxHeight: null,
    preferredGotra: "Pawar",
  };
  const [componentDisabled, setComponentDisabled] = useState(true);
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
    
      <div style={{ padding: "16px" }}>
      <Title level={4}>Profile Information</Title>
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
          <Text style={{ marginLeft: "8px" }}>{calculateAge(profileData?.DOB) || "N/A"}</Text>
        </Col>
        {/* <Col xs={24} sm={12} md={12} lg={12}>
          <Text strong>Date of Birth:</Text>
          <Text style={{ marginLeft: "8px" }}>{profileData?.DOB || "N/A"}</Text>
        </Col> */}
      </Row>
    </div>
     
    
  );
};

export default PreferencesDisplay;
