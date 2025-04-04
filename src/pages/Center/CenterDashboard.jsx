import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import React from "react";
import AdminTab from "./AdminTab";
import { RegisterUser } from "./RegisterUser";
import UsersStatusQuery from "./Users_Status_Querty";
import ProfileDetailCard from "./ProfileDetailCard";
import ProfileComponent from "./userregistration/ProfileComponent";
import MultiStepForm from "./userregistration/basicinfo/MultiStepForm";

const CenterDashBoard = () => {

  return (
    <>

     <Tabs defaultActiveKey="home" centered>
     <TabPane tab="Home" key="home">
     <div style={{ 
          textAlign: "center", 
          padding: "20px", 
          fontSize: "18px", 
          lineHeight: "1.6",
          backgroundColor: "#f9f9f9",
          borderRadius: "10px"
        }}>
          <h3>✨ ई-मीलन(E-Meelan) ✨</h3>

          <p>अब रिश्ता ढूंढ़ना हुआ और आसान! 💍💖</p>
          <p>अब आप <strong>आयु, कार्य, स्थान और वैवाहिक स्थिति</strong> के आधार पर अपने लिए उपयुक्त रिश्ता आसानी से ढूंढ सकते हैं।
           <strong>अपना सही जीवनसाथी खोजें, आज ही शुरू करें!</strong></p>     
          {/* <h2>✨ Emeelan’s New Avatar! ✨</h2> */}
          <p>Finding a match is now easier than ever! 💍💖</p>
          <p>Now, you can search for relationships based on <strong>age, profession, location, and marital status</strong> effortlessly.
          <strong>Find your perfect match today!</strong></p>
        </div>
     </TabPane>
        <TabPane tab="UserStatus" key="userstatus">
        <UsersStatusQuery />
        </TabPane>
        <TabPane tab="CreateUser" key="register">
          <MultiStepForm />
      {/* <ProfileComponent /> */}
        </TabPane>
        <TabPane tab="AdminList" key="adminlist">
            <AdminTab />
          </TabPane>
     </Tabs>
    
    </>
  );
};

export default React.memo(CenterDashBoard);
