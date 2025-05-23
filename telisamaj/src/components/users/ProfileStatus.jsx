import React, { useState, useEffect } from "react";
import { Tabs, Card, Toast, DotLoading, Button, Space, Tag } from "antd-mobile";
import {
  CheckOutline,
  ClockCircleOutline,
  CloseOutline,
  UserOutline,
  RightOutline,
} from "antd-mobile-icons";
import { userService } from "../../services";
import {
  updateConnectionRequest,
  updateConnectionStatus,
} from "../../services/api";
import { useNavigate } from "react-router-dom";

const statusLabels = {
  PENDING: "Pending",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
};

const statusColors = {
  PENDING: "#FF9800",
  ACCEPTED: "#4CAF50",
  REJECTED: "#F44336",
};

const ProfileStatus = () => {
  const userId = JSON.parse(localStorage.getItem("user"))?.id;
  const [mainTab, setMainTab] = useState("RECEIVED");
  const [statusTab, setStatusTab] = useState("PENDING");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const data = await userService.myrequestsStatus(userId, statusTab);
      const filtered =
        mainTab === "RECEIVED"
          ? data.filter((r) => r.receiver?.id === userId)
          : data.filter((r) => r.sender?.id === userId);
      setRequests(filtered);
    } catch (error) {
      Toast.show({
        icon: "fail",
        content: "Failed to load requests",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (requestId, action) => {
    try {
      const res = await updateConnectionStatus(requestId, {
        status: action,
        message: `Request ${action.toLowerCase()}`,
      });
      console.log(res, "CONN RES");
      Toast.show({
        icon: action === "ACCEPTED" ? "success" : "fail",
        content: `Request ${action.toLowerCase()}`,
      });
      fetchRequests();
    } catch (error) {
      Toast.show({
        icon: "fail",
        content: `Failed to update request status`,
      });
    }
  };

  const handleViewProfile = (userId) => {
    navigate(`/profile-view/${userId}`);
  };

  useEffect(() => {
    if (userId) fetchRequests();
  }, [mainTab, statusTab, userId]);

  const renderCard = (request) => {
    console.log(request, "REquest");

    const otherUser =
      mainTab === "RECEIVED" ? request.sender : request.receiver;

    if (!otherUser) return null;

    return (
      <Card
        key={request.id}
        style={{
          marginBottom: "12px",
          backgroundColor: "#FFFFFF",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
            borderBottom: "1px solid #FFEBEE",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              paddingBottom: "8px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#8B0000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <UserOutline fontSize={24} color="#FFFFFF" />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "Arial, sans-serif",
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: "#8B0000",
                }}
              >
                {otherUser?.FirstName} {otherUser?.LastName}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "#666",
                }}
              >
                @{otherUser?.username || "unknown"}
              </div>
            </div>
          </div>

          <Button
            size="small"
            color="primary"
            style={{
              backgroundColor: "#8B0000",
              borderRadius: "20px",
              padding: "4px 12px",
              fontSize: "14px",
            }}
            onClick={() => handleViewProfile(otherUser?.id)}
          >
            View Profile <RightOutline />
          </Button>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            fontFamily: "Arial, sans-serif",
            fontSize: "15px",
            paddingBottom: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontWeight: "600", color: "#8B0000" }}>Status:</span>
            <Tag
              color={statusColors[request.status]}
              style={{ borderRadius: "12px" }}
            >
              {statusLabels[request.status]}
            </Tag>
          </div>

          <div
            style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}
          >
            <span style={{ fontWeight: "600", color: "#8B0000" }}>
              Message:
            </span>
            <span>{request.message || "No message provided"}</span>
          </div>
        </div>

        {mainTab === "RECEIVED" && request.status === "PENDING" && (
          <Space
            style={{
              marginTop: "12px",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Button
              color="primary"
              style={{
                backgroundColor: "#4CAF50",
                borderRadius: "20px",
                padding: "5px 16px",
                fontWeight: "bold",
                width: "100px",
                border: "none",
              }}
              onClick={() => handleAction(request.id, "ACCEPTED")}
            >
              Accept
            </Button>
            <Button
              style={{
                backgroundColor: "#F44336",
                borderRadius: "20px",
                padding: "5px 16px",
                fontWeight: "bold",
                color: "#FFFFFF",
                width: "100px",
                border: "none",
              }}
              onClick={() => handleAction(request.id, "REJECTED")}
            >
              Reject
            </Button>
          </Space>
        )}
      </Card>
    );
  };

  const tabActiveStyle = {
    backgroundColor: "#FFEBEE",
    borderBottom: "3px solid #8B0000",
    color: "#8B0000",
    fontWeight: "bold",
  };

  return (
    <>
      <br />
      <div
        style={{
          backgroundColor: "#FCFAFA",
          minHeight: "100vh",
          padding: "8px",
        }}
      >
        <div
          style={{
            backgroundColor: "#8B0000",
            color: "white",
            padding: "12px",
            fontFamily: "Arial, sans-serif",
            fontSize: "18px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "12px",
            borderRadius: "8px 8px 0 0",
          }}
        >
          Connection Requests
        </div>

        <Tabs
          activeKey={mainTab}
          onChange={setMainTab}
          style={{
            fontFamily: "Arial, sans-serif",
            "--title-font-size": "16px",
            "--active-line-color": "#8B0000",
            "--active-title-color": "#8B0000",
            "--fixed-active-line-width": "24px",
          }}
        >
          <Tabs.Tab title="Received" key="RECEIVED" />
          <Tabs.Tab title="Sent" key="SENT" />
        </Tabs>

        <Tabs
          activeKey={statusTab}
          onChange={setStatusTab}
          style={{
            fontFamily: "Arial, sans-serif",
            "--title-font-size": "14px",
            "--active-line-color": "#8B0000",
            "--active-title-color": "#8B0000",
            marginTop: "8px",
            backgroundColor: "#FFFFFF",
            borderRadius: "8px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            padding: "0 4px",
            "--fixed-active-line-width": "20px",
          }}
        >
          <Tabs.Tab title="Pending" key="PENDING" />
          <Tabs.Tab title="Accepted" key="ACCEPTED" />
          <Tabs.Tab title="Rejected" key="REJECTED" />
        </Tabs>

        {loading ? (
          <div
            style={{
              padding: "24px",
              textAlign: "center",
              fontFamily: "Arial, sans-serif",
              color: "#8B0000",
            }}
          >
            <DotLoading color="#8B0000" />
            <div style={{ marginTop: "8px" }}>
              Loading {statusLabels[statusTab].toLowerCase()} requests...
            </div>
          </div>
        ) : (
          <>
            <div style={{ paddingTop: "12px" }}>
              {requests.length > 0 ? (
                requests.map(renderCard)
              ) : (
                <>
                  <div
                    style={{
                      padding: "24px",
                      textAlign: "center",
                      backgroundColor: "#FFEBEE",
                      borderRadius: "8px",
                      fontFamily: "Arial, sans-serif",
                      color: "#8B0000",
                    }}
                  >
                    No {statusLabels[statusTab].toLowerCase()}{" "}
                    {mainTab.toLowerCase()} requests found.
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProfileStatus;
