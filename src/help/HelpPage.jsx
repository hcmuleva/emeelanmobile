import React from "react";
import Header from "../pages/Header";
import FAQComponent from "./FAQComponent";
import { Typography } from "antd";

const HelpPage = () => {
    const { Text, Paragraph } = Typography;

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
             <Header />
             
            <h1>ई-मीलन (EMeelan) Help Center</h1>
            <p>ई-मीलन में आपका सवागत है (Welcome to the Help Center)</p>
           
            <FAQComponent/>
            <Typography.Title level={4}>हेल्प लाइन नंबर (+91-9019905115) ( संपर्क करने के लिए नंबर और टाइम  सुबह १० बजे से शाम के ५ बजे तक ) </Typography.Title> 
            <Typography.Title level={4}>Helpline number (+91-9019905115) </Typography.Title> 
        </div>
    );
};

export default HelpPage;
