import React, { useState, useEffect } from "react";
import {
  Tabs,
  Card,
  Toast,
  DotLoading,
  Button,
  Space,
} from "antd-mobile";
import {
  CheckOutline,
  CloseOutline,
  ClockCircleOutline,
} from "antd-mobile-icons";
import { userService } from "../../services";

const statusLabels = {
  PENDING: "Pending",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
};

const statusIcons = {
  PENDING: <ClockCircleOutline color="orange" />,
  ACCEPTED: <CheckOutline color="green" />,
  REJECTED: <CloseOutline color="red" />,
};

const ProfileStatus = () => {
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  const [mainTab, setMainTab] = useState("RECEIVED");
  const [statusTab, setStatusTab] = useState("PENDING");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

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
      Toast.show({ icon: "fail", content: "Failed to load requests" });
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (requestId, action) => {
    try {
      await userService.updateRequestStatus(requestId, action);
      Toast.show({ icon: "success", content: `Request ${action.toLowerCase()}ed` });
      fetchRequests();
    } catch (err) {
      Toast.show({ icon: "fail", content: `Failed to ${action.toLowerCase()} request` });
    }
  };

  useEffect(() => {
    if (userId) fetchRequests();
  }, [mainTab, statusTab, userId]);

  const renderCard = (request) => {
    const otherUser =
      mainTab === "RECEIVED" ? request.sender : request.receiver;

    return (
      <Card key={request.id} title={otherUser?.username || "Unknown"}>
        <div>
          <strong>Status:</strong> {statusLabels[request.status]}{" "}
          RequestId:{request.id}{statusIcons[request.status]}
        </div>
        <div>
          <strong>Message:</strong> {request.message}
        </div>
        {mainTab === "RECEIVED" && request.status === "PENDING" && (
          <Space style={{ marginTop: 8 }}>
            <Button
              color="primary"
              size="small"
              onClick={() => handleAction(request.id, "ACCEPTED")}
            >
              Accept
            </Button>
            <Button
              color="danger"
              size="small"
              onClick={() => handleAction(request.id, "REJECTED")}
            >
              Reject
            </Button>
          </Space>
        )}
      </Card>
    );
  };

  return (
    <div>
      <Tabs activeKey={mainTab} onChange={setMainTab}>
        <Tabs.Tab title="Received" key="RECEIVED" />
        <Tabs.Tab title="Sent" key="SENT" />
      </Tabs>

      <Tabs activeKey={statusTab} onChange={setStatusTab}>
        <Tabs.Tab title="Pending" key="PENDING" />
        <Tabs.Tab title="Accepted" key="ACCEPTED" />
        <Tabs.Tab title="Rejected" key="REJECTED" />
      </Tabs>

      {loading ? (
        <div style={{ padding: 16 }}>
          <DotLoading color="primary" /> Loading {statusLabels[statusTab]}...
        </div>
      ) : (
        <div style={{ padding: 16 }}>
          {requests.length > 0 ? (
            requests.map(renderCard)
          ) : (
            <p>No {statusLabels[statusTab]} {mainTab.toLowerCase()} requests found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileStatus;
