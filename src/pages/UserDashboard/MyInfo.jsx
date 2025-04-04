import React, { useState, useEffect } from "react";
import { Home, ClipboardList, Heart, Bell, Settings } from "lucide-react";
import { Space, Button } from "antd";
import { FilterIcon, HeartHandshake } from "lucide-react";
import { getTwoToneColor, HeartFilled, HeartTwoTone } from "@ant-design/icons";
import LikedToMe from "./profile/LikedToMe";
import LikedByMe from "./profile/LikedByMe";
import ProfileDetails from "./ProfileDetails";

// Custom hook to get the current window width
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
}

const MyInfo = () => {
  const [activeTab, setActiveTab] = useState("requested");
  const [view, setView] = useState("LIST");
  const width = useWindowWidth();
  const isMobile = width < 768;

  // Note: profileData is assumed to be provided or coming from props/context for "details" view.
  // If not, you'll need to pass it accordingly.
  const profileData = {}; // placeholder; update as needed

  const RenderMyinfoDetails = (view) => {
    switch (view) {
      case "requested":
        return <LikedByMe />;
      case "favorites":
        return <LikedToMe />;
      case "details":
        return <ProfileDetails setView={setView} profileData={profileData} calledBy={"USER"} />;
      default:
        return null;
    }
  };

  const tabs = [
    {
      id: "requested",
      label: "Requested",
      icon: ClipboardList,
      color: "#ffe6f0",
      iconColor: "#d53f8c",
    },
    {
      id: "favorites",
      label: "Favorites",
      icon: Heart,
      color: "#fff3e6",
      iconColor: "#dd6b20",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      color: "#ffe6e6",
      iconColor: "#e53e3e",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      color: "#e6fff7",
      iconColor: "#319795",
    },
  ];

  return (
    <>
      {isMobile ? (
        // Mobile: Horizontal scrollable container with smaller buttons
        <div className="myinfo-tabs-mobile">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px",
                borderRadius: "8px",
                backgroundColor: tab.color,
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow:
                  activeTab === tab.id
                    ? "0 0 0 2px #4299e1, 0 0 0 4px rgba(66, 153, 225, 0.3)"
                    : "none",
                minWidth: "60px",
                marginRight: "8px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "4px",
                }}
              >
                {React.createElement(tab.icon, {
                  style: { color: tab.iconColor, width: "20px", height: "20px" },
                })}
              </div>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: "500",
                  textTransform: "uppercase",
                }}
              >
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      ) : (
        // Desktop: Grid layout with larger buttons
        <div className="myinfo-tabs">
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

      {RenderMyinfoDetails(view)}

      <Space.Compact style={{ flexWrap: "wrap", justifyContent: "flex-start", gap: "8px", marginTop: "16px" }}>
        {view === "LIST" && (
          <Button
            color="danger"
            variant="dashed"
            onClick={() => {
              // Assuming gridRef is defined elsewhere
              // gridRef.current.api.setFilterModel(null);
            }}
            style={{ whiteSpace: "nowrap" }}
          >
            <FilterIcon size={15} style={{ color: "brown" }} /> Reset
          </Button>
        )}

        {view !== "LIST" && (
          <Button color="danger" variant="dashed" onClick={() => setView("LIST")}>
            LIST
          </Button>
        )}

        <Button
          color="danger"
          variant="dashed"
          onClick={() => setView("REQUESTED")}
          style={{ whiteSpace: "nowrap" }}
        >
          <HeartTwoTone style={{ color: getTwoToneColor() }} /> requested
        </Button>

        <Button
          color="danger"
          variant="dashed"
          onClick={() => setView("RECIEVED")}
          style={{ whiteSpace: "nowrap" }}
        >
          <HeartFilled style={{ color: "red" }} /> recieved
        </Button>

        <Button
          color="danger"
          variant="dashed"
          onClick={() => setView("LIKEDTOME")}
          style={{ whiteSpace: "nowrap" }}
        >
          <HeartHandshake style={{ color: "red" }} /> रिस्ते
        </Button>
      </Space.Compact>

      <style>{`
        .myinfo-tabs {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 12px;
          padding: 16px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .myinfo-tabs-mobile {
          display: flex;
          overflow-x: auto;
          padding: 8px 16px;
          margin: 0 auto;
        }
        .myinfo-tabs-mobile button {
          flex: 0 0 auto;
        }
      `}</style>
    </>
  );
};

export default MyInfo;
