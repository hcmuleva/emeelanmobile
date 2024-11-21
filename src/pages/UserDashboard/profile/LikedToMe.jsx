import { useOne, useUpdate } from "@refinedev/core";
import React, { useEffect, useState } from "react";
import { Card, Avatar, Button, Space, Spin } from "antd";

export default function LikedToMe() {
  const [requestsByState, setRequestsByState] = useState([]);
  const userId = localStorage.getItem("userid");
  const { data, isLoading } = useOne({
    resource: "users",
    id: String(userId),
    meta: {
      populate: [
        "profilePicture",
        "requestsby",
        "requestsby.photos",
        "requestsby.profilePicture",
      ],
    },
  });

  const { mutate: updateUserNotification, isLoading: isUpdating } = useUpdate();
  useEffect(() => {
    if (data?.data?.requestsby) {
      setRequestsByState(data.data.requestsby);
    }
  }, [data]);
  if (isLoading) {
    return <Spin size="large" />;
  }

  const user = data?.data;
  const notifications = user?.Notification ?? {
    PENDING: [],
    ACCEPTED: [],
    REJECTED: [],
    ACCEPTEDTOME: [],
    REJECTEDTOME: [],
  };

  const handleAction = (request, type) => {
    if (!request || !type) return;

    const updateNotifications = (userId, updates) => {
      updateUserNotification({
        resource: "users",
        id: String(userId),
        values: {
          Notification: updates,
        },
      });
    };

    if (type === "ACCEPTED") {
      const currentUserUpdates = {
        ...notifications,
        ACCEPTED: [...(notifications.ACCEPTED ?? []), request.id],
        PENDING: notifications.PENDING.filter((id) => id !== request.id),
      };

      const requestingUser = requestsByState.find((r) => r.id === request.id);
      if (!requestingUser) {
        console.error("Requesting user not found");
        return;
      }

      const requestingUserUpdates = {
        ...requestingUser.Notification,
        ACCEPTEDTOME: [
          ...(requestingUser.Notification?.ACCEPTEDTOME ?? []),
          user.id,
        ],
      };

      updateNotifications(user.id, currentUserUpdates);
      updateNotifications(request.id, requestingUserUpdates);

      // Remove the accepted request from the local state list
      setRequestsByState((prev) =>
        prev.filter((r) => r.id !== request.id)
      );
    } else if (type === "REJECTED") {
      const currentUserUpdates = {
        ...notifications,
        REJECTED: [...(notifications.REJECTED ?? []), request.id],
        PENDING: notifications.PENDING.filter((id) => id !== request.id),
      };

      const requestingUser = requestsByState.find((r) => r.id === request.id);
      if (!requestingUser) {
        console.error("Requesting user not found");
        return;
      }

      const requestingUserUpdates = {
        ...requestingUser.Notification,
        REJECTEDTOME: [
          ...(requestingUser.Notification?.REJECTEDTOME ?? []),
          user.id,
        ],
      };

      updateNotifications(user.id, currentUserUpdates);
      updateNotifications(request.id, requestingUserUpdates);

      // Remove the rejected request from the local state list
      setRequestsByState((prev) =>
        prev.filter((r) => r.id !== request.id)
      );
    }
  };
  const getRequestCard = (request)=>(
    <Card key={request?.id} style={{ marginBottom: "16px" }}>
      <Card.Meta
        avatar={<Avatar src={request?.profilePicture?.url} />}
        title={`${request?.FirstName } ${request?.id}`|| "Anonymous"}
        description={`User: ${request.username} Profession: ${
          request?.profession || "N/A"
        }`}
      />
      <Space style={{ marginTop: "16px" }}>
        <Button
          type="primary"
          onClick={() => handleAction(request, "ACCEPTED")}
          loading={isUpdating}
        >
          Accept
        </Button>
        <Button
          type="default"
          danger
          onClick={() => handleAction(request, "REJECTED")}
          loading={isUpdating}
        >
          Reject
        </Button>
      </Space>
        </Card>
  )
 const renderAcceptedRequestCard = (request)=>{
    console.log("request",request)
    if(notifications?.ACCEPTED&&notifications?.ACCEPTED.includes(request.id)){
        console.log("Request for ACCEPTED ", request)
        return  <Card key={request?.id} style={{ marginBottom: "16px" }}>
        <Card.Meta
          avatar={<Avatar src={request?.profilePicture?.url} />}
          title={`${request?.FirstName } ${request?.id}`|| "Anonymous"}
          description={`User: ${request.username} Profession: ${
            request?.profession || "N/A"
          }`}
        />
       
          </Card>
    } 
 }
  const renderPendingRequestCard = (request) => {
    if(notifications.PENDING&&notifications.PENDING.includes(request.id)){
        console.log("Request for PENDING ", request)
        return  <Card key={request?.id} style={{ marginBottom: "16px" }}>
        <Card.Meta
          avatar={<Avatar src={request?.profilePicture?.url} />}
          title={`${request?.FirstName } ${request?.id}`|| "Anonymous"}
          description={`User: ${request.username} Profession: ${
            request?.profession || "N/A"
          }`}
        />
        <Space style={{ marginTop: "16px" }}>
          <Button
            type="primary"
            onClick={() => handleAction(request, "ACCEPTED")}
            loading={isUpdating}
          >
            Accept
          </Button>
          <Button
            type="default"
            danger
            onClick={() => handleAction(request, "REJECTED")}
            loading={isUpdating}
          >
            Reject
          </Button>
        </Space>
          </Card>
    } 
};

  return (
    <div style={{ padding: "16px" }}>
       
      <h1>Pending</h1>
      {requestsByState.length > 0 &&requestsByState.map((request) => renderPendingRequestCard(request))}
      <h2>Acceped</h2>
      {requestsByState.length > 0 &&requestsByState.map((request) => renderAcceptedRequestCard(request))}
    </div>
  );
}