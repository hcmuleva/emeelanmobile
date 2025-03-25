import { useCustom } from '@refinedev/core';
import React, { useState, useEffect, useRef } from 'react';
import UserTableView from './UserDashboard/UserTableView';
import { User, Info, Home } from "lucide-react";
import MyInfo from './UserDashboard/MyInfo';

const API_URL = import.meta.env.VITE_SERVER_URL;

export default function UserDashboard() {
  console.log("Default in userDashboard");
  const [listData, setListData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [pageSize] = useState(20);
  const isFetchingRef = useRef(false); // Track fetch status via ref
  const [activeTab, setActiveTab] = useState("home");

  const { data, isLoading } = useCustom({
    url: `${API_URL}/api/custom-user`,
    method: "get",
    config: {
      headers: {
        "x-custom-header": "foo-bar",
        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
      },
    },
    query: {
      pagination: { offset, limit: pageSize },
      sort: "-ID", // Minus sign indicates descending order
    },
  });

  const tabs = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      color: "#e6f0ff",
      iconColor: "#3182ce",
    },
    {
      id: "profiles",
      label: "Profiles",
      icon: User,
      color: "#f3e8ff",
      iconColor: "#805ad5",
    },
    {
      id: "myinfo",
      label: "MyInfo",
      icon: Info,
      color: "#e6ffee",
      iconColor: "#38a169",
    },
  ];

  // Throttled scroll handler
  const handleScroll = useRef(() => {
    const { scrollY, innerHeight } = window;
    const { offsetHeight } = document.body;
    if (
      scrollY + innerHeight >= offsetHeight - 200 && // 200px buffer
      hasMore &&
      !isFetchingRef.current
    ) {
      isFetchingRef.current = true;
      setOffset((prev) => prev + pageSize);
    }
  }).current;

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!data?.data?.data) return;
    setListData((prev) => [...prev, ...data.data.data]);
    setHasMore(data.data.data.length >= pageSize);
    isFetchingRef.current = false; // Reset fetch status
  }, [data, pageSize]);

  const RenderComponent = (activeTab) => {
    switch (activeTab) {
      case "home":
        return (
          <div
            style={{
              textAlign: "center",
              padding: "20px",
              fontSize: "18px",
              lineHeight: "1.6",
              backgroundColor: "#f9f9f9",
              borderRadius: "10px",
            }}
          >
            <h3>✨ ई-मीलन(E-Meelan) ✨</h3>
            <p>अब रिश्ता ढूंढ़ना हुआ और आसान! 💍💖</p>
            <p>
              अब आप <strong>आयु, कार्य, स्थान और वैवाहिक स्थिति</strong> के आधार पर अपने लिए उपयुक्त रिश्ता आसानी से ढूंढ सकते हैं।
              <strong> अपना सही जीवनसाथी खोजें, आज ही शुरू करें!</strong>
            </p>
            <p>Finding a match is now easier than ever! 💍💖</p>
            <p>
              Now, you can search for relationships based on <strong>age, profession, location, and marital status</strong> effortlessly.
              <strong> Find your perfect match today!</strong>
            </p>
          </div>
        );
      case "profiles":
        return <UserTableView rowData={data?.data?.data} />;
      case "myinfo":
        return <MyInfo />;
      default:
        return null;
    }
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div style={{ minHeight: "100vh" }}>
      {activeTab !== "myinfo" && (
        <div className="tabs-container">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: tab.color,
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow:
                  activeTab === tab.id
                    ? "0 0 0 2px #4299e1, 0 0 0 4px rgba(66, 153, 225, 0.3)"
                    : "none",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "8px",
                }}
              >
                {React.createElement(tab.icon, {
                  style: { color: tab.iconColor, width: "24px", height: "24px" },
                })}
              </div>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "500",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      )}
      {RenderComponent(activeTab)}
      {!hasMore && <p style={{ textAlign: "center" }}>No more users</p>}
      <style>{`
        .tabs-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 12px;
          padding: 16px;
          max-width: 1200px;
          margin: 0 auto;
        }
        @media (max-width: 600px) {
          .tabs-container {
            grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
            padding: 8px;
          }
          .tabs-container button {
            padding: 0px;
          }
          .tabs-container button span {
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  );
}
