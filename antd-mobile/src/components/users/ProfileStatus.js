import React, { useState, useEffect } from "react";
import {
  Tabs,
  Card,
  Toast,
  DotLoading
} from "antd-mobile";
import {
  CheckOutline,
  CloseOutline,
  ClockCircleOutline
} from "antd-mobile-icons";
import { userService } from "../../services";

const statusLabels = {
  PENDING: "Pending",
  APPROVED: "Accepted",
  REJECTED: "Rejected",
};

const statusIcons = {
  PENDING: <ClockCircleOutline color="orange" />,
  APPROVED: <CheckOutline color="green" />,
  REJECTED: <CloseOutline color="red" />,
};

const ProfileStatus = () => {
  const [activeTab, setActiveTab] = useState("PENDING");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  const fetchRequests = async (status) => {
    setLoading(true);
    try {
      const data = await userService.myrequestsStatus(userId, status);
      setRequests(data || []);
    } catch (error) {
      Toast.show({ icon: "fail", content: "Failed to load requests" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchRequests(activeTab);
  }, [activeTab, userId]);

  return (
    <div>
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
      >
        <Tabs.Tab title="Pending" key="PENDING" />
        <Tabs.Tab title="Accepted" key="APPROVED" />
        <Tabs.Tab title="Rejected" key="REJECTED" />
      </Tabs>

      {loading ? (
        <div style={{ padding: 16 }}>
          <DotLoading color="primary" /> Loading {statusLabels[activeTab]}...
        </div>
      ) : (
        <div style={{ padding: 16 }}>
          {requests.length > 0 ? (
            requests.map((request, index) => {
              const user = request?.sender?.id === userId ? request.receiver : request.sender;
              return (
                <Card key={index} title={user?.username || "Unknown User"}>
                  <div>
                    <strong>Status:</strong> {statusLabels[request.status]} {statusIcons[request.status]}
                  </div>
                  <div><strong>Message:</strong> {request.message}</div>
                </Card>
              );
            })
          ) : (
            <p>No {statusLabels[activeTab]} requests found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileStatus;
