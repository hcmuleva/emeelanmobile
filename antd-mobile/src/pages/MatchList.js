import React, { useState } from "react";
import { Tabs, Card, Button, Tag } from "antd-mobile";
import { CheckOutline, CloseOutline, PhoneFill, MessageFill } from "antd-mobile-icons";

const profiles = [
  {
    name: "Divya",
    age: 25,
    height: "5'4\"",
    community: "Brahmin",
    education: "MBA",
    profession: "Human Resource Professional",
    location: "Mysuru",
    verified: true,
    premium: true,
    interest: "She liked your profile",
    expires: "Expires in 12 days",
    new: false,
  },
  {
    name: "Deepika",
    age: 25,
    height: "5'4\"",
    community: "Lingayat",
    education: "MBA",
    profession: "Administrative Professional",
    location: "Bantwal",
    verified: true,
    premium: true,
    interest: "You both like each other",
    expires: "",
    new: true,
  },
];

const MatchList = () => {
  const [activeTab, setActiveTab] = useState("received");

  return (
    <div>
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <Tabs.Tab title="Received" key="received" />
        <Tabs.Tab title="Sent" key="sent" />
        <Tabs.Tab title="Requests" key="requests" />
        <Tabs.Tab title="Calls" key="calls" />
      </Tabs>
      
      <div style={{ padding: "10px" }}>
        {profiles.map((profile, index) => (
          <Card key={index} style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <strong>{profile.name}, {profile.age} yrs</strong>
              <small>{profile.height} • {profile.community} • {profile.education}</small>
              <small>{profile.profession} • {profile.location}</small>
              <Tag color="primary">{profile.verified ? "ID Verified" : "Not Verified"}</Tag>
              {profile.premium && <Tag color="warning">Premium Member</Tag>}
              <p style={{ marginTop: "5px", fontSize: "14px", color: "#666" }}>{profile.interest}</p>
              {profile.expires && <small style={{ color: "red" }}>{profile.expires}</small>}
              
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                {profile.new ? (
                  <>
                    <Button shape="rounded" color="primary" icon={<PhoneFill />}>Call Now</Button>
                    <Button shape="rounded" color="primary" icon={<MessageFill />}>Message</Button>
                  </>
                ) : (
                  <>
                    <Button shape="rounded" color="success" icon={<CheckOutline />}>Accept</Button>
                    <Button shape="rounded" color="danger" icon={<CloseOutline />}>Decline</Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MatchList;
