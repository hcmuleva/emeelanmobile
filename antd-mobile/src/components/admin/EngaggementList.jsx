import React, { useContext, useEffect, useState } from "react";
import { Card, Avatar, Space, Tag, DotLoading } from "antd-mobile";
import { getEngagedRequests } from "../../services/api";
import { HeartFill } from "antd-mobile-icons";
import { AuthContext } from "../../context/AuthContext";

const EnggagedCard = ({ male, female, message, date }) => {
  return (
    <Card
      style={{
        borderRadius: "1rem",
        background: "linear-gradient(145deg, #fff0f0, #ffe6e6)",
        padding: "0.75rem",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.06)",
        width: "100%",
      }}
      bodyStyle={{ padding: "0" }}
    >
      {/* Engagement header with date */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "0.5rem"
      }}>
        <Tag
          color="danger"
          fill="outline"
          style={{ fontSize: "11px" }}
        >
          {message || "Engaged"}
        </Tag>
        <div style={{ fontSize: "10px", color: "#888" }}>
          {new Date(date).toLocaleDateString()}
        </div>
      </div>

      {/* Male Profile */}
      <div style={{
        display: "flex",
        marginBottom: "0.75rem",
        padding: "0.5rem",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: "0.5rem"
      }}>
        <Avatar
          src={male?.avatar || "/placeholder.svg"}
          style={{ "--size": "50px", "--border-radius": "50%" }}
        />
        <div style={{ marginLeft: "0.75rem", flex: 1 }}>
          <div style={{ fontWeight: "bold", fontSize: "14px" }}>{male?.name}</div>
          <div style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>
            {male?.age} years • ID: {male?.id}
          </div>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "4px"
          }}>
            <Tag color="primary" style={{ fontSize: "10px", padding: "0 6px" }}>
              {male?.gotra || "Gotra"}
            </Tag>
            <Tag color="success" style={{ fontSize: "10px", padding: "0 6px" }}>
              {male?.gender || "Male"}
            </Tag>
          </div>
        </div>
      </div>

      {/* Heart Divider */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        margin: "0.5rem 0",
        position: "relative"
      }}>
        <div style={{
          height: "1px",
          backgroundColor: "#ffcdd2",
          width: "80%",
          position: "absolute",
          top: "50%"
        }}></div>
        <HeartFill
          style={{
            fontSize: "24px",
            color: "#ff4d4f",
            backgroundColor: "#ffe6e6",
            borderRadius: "50%",
            padding: "4px",
            position: "relative",
            zIndex: 1
          }}
        />
      </div>

      {/* Female Profile */}
      <div style={{
        display: "flex",
        padding: "0.5rem",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: "0.5rem"
      }}>
        <Avatar
          src={female?.avatar || "/placeholder.svg"}
          style={{ "--size": "50px", "--border-radius": "50%" }}
        />
        <div style={{ marginLeft: "0.75rem", flex: 1 }}>
          <div style={{ fontWeight: "bold", fontSize: "14px" }}>{female?.name}</div>
          <div style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>
            {female?.age} years • ID: {female?.id}
          </div>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "4px"
          }}>
            <Tag color="primary" style={{ fontSize: "10px", padding: "0 6px" }}>
              {female?.gotra || "Gotra"}
            </Tag>
            <Tag color="success" style={{ fontSize: "10px", padding: "0 6px" }}>
              {female?.gender || "Female"}
            </Tag>
          </div>
        </div>
      </div>
    </Card>
  );
};

const mapEngageData = (engagedData) => {
  if (!engagedData?.results) return [];
  return engagedData.results.map((item) => {
    const { sender, receiver, createdAt } = item;
    const isMaleSender = sender.Sex === "Male";
    return {
      male: {
        name: (isMaleSender ? sender.FirstName : receiver.FirstName) + " " + (isMaleSender ? sender.LastName : receiver.LastName),
        age: (isMaleSender ? sender.age : receiver.age),
        avatar: (isMaleSender ? "/public/assets/man-user-circle-icon.png" : "/public/assets/woman-user-circle-icon.png"),
        id: (isMaleSender ? sender.id : receiver.id),
        gotra: (isMaleSender ? sender.Gotra : receiver.Gotra),
        gender: (isMaleSender ? sender.Sex : receiver.Sex)
      },
      female: {
        name: (isMaleSender ? receiver.FirstName : sender.FirstName) + " " + (isMaleSender ? receiver.LastName : sender.LastName),
        age: (isMaleSender ? receiver.age : sender.age),
        avatar: (isMaleSender ? "/public/assets/woman-user-circle-icon.png" : "/public/assets/man-user-circle-icon.png"),
        id: (isMaleSender ? receiver.id : sender.id),
        gotra: (isMaleSender ? receiver.Gotra : sender.Gotra),
        gender: (isMaleSender ? receiver.Sex : sender.Sex)
      },
      date: createdAt,
    };
  });
};

export default function EngagementList() {
  const { jwt } = useContext(AuthContext);
  const [engagedData, setEngagedData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getEngagedRequests(jwt);
        const mapped = mapEngageData(res);
        setEngagedData(mapped);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [jwt]);

  return (
    <div style={{ padding: "0.75rem", width: "100%", boxSizing: "border-box" }}>
      <h1 style={{
        fontSize: "1.25rem",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: "1rem",
      }}>
        Recent Engagements
      </h1>

      <Space direction="vertical" block style={{ gap: "0.75rem" }}>
        {engagedData ? (
          engagedData.length > 0 ? (
            engagedData.map((engagement, index) => (
              <EnggagedCard
                key={index}
                male={engagement.male}
                female={engagement.female}
                message="Engaged"
                date={engagement.date}
              />
            ))
          ) : (
            <div style={{ textAlign: "center", color: "#aaa", marginTop: "1rem" }}>
              No Engagements Yet
            </div>
          )
        ) : (
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <DotLoading />
          </div>
        )}
      </Space>
    </div>
  );
}