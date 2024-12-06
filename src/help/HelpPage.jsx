import React from "react";
import Header from "../pages/Header";
import FAQComponent from "./FAQComponent";
import { Typography } from "antd";

const HelpPage = () => {
    const { Text, Paragraph } = Typography;

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
             <Header />
             
            <h1>Help Center</h1>
            <p>Welcome to the Help Center</p>
            <Typography.Title level={4}>Pending Status or approval</Typography.Title>
            <Typography.Title level={4}>Contact for addtional support</Typography.Title>
            <Typography.Title level={4}>Form Filling Help</Typography.Title>
            <FAQComponent/>
            <Typography.Title level={4}>Best Practices</Typography.Title> 
            <Typography.Title level={4}>My Preference </Typography.Title> 
        </div>
    );
};

export default HelpPage;
