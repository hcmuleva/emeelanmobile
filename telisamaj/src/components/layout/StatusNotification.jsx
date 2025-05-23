import React, { useEffect, useState, useRef } from "react";
import { Toast } from "antd-mobile";
import ably from "../../utils/ablyClient";

const StatusNotification = ({ userId, setNotificationStats }) => {
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef([]);

  useEffect(() => {
    if (!userId) return;

    const channel = ably.channels.get(`user:${userId}`);

    const onConnected = () => console.log("✅ Ably connected");
    const onFailed = (err) => console.error("❌ Ably connection failed:", err);
    const onAttached = () =>
      console.log(`📡 Channel "${channel.name}" attached`);

    ably.connection.on("connected", onConnected);
    ably.connection.on("failed", onFailed);
    channel.once("attached", onAttached);

    const handleMessage = (message) => {
      const { message: text, status, requestId } = message.data;

      const updated = [...messagesRef.current, { status, requestId }];
      messagesRef.current = updated;
      setMessages(updated);

      const grouped = updated.reduce(
        (acc, msg) => {
          acc[msg.status] = (acc[msg.status] || 0) + 1;
          acc.total += 1;
          return acc;
        },
        { PENDING: 0, APPROVED: 0, REJECTED: 0, total: 0, message: text }
      );

      // ✅ Set full stats object
      if (setNotificationStats) {
        setNotificationStats(grouped);
      }

      // Show toast
      Toast.show({
        icon: "info",
        content: `${text} - Status: ${status}`,
      });
    };

    channel.subscribe("connection-request", handleMessage);

    return () => {
      channel.unsubscribe("connection-request", handleMessage);
      ably.connection.off("connected", onConnected);
      ably.connection.off("failed", onFailed);
    };
  }, [userId, setNotificationStats]);

  return null;
};

export default StatusNotification;
