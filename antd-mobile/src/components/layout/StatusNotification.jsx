import React, { useEffect, useState, useRef } from "react";
import { Toast } from "antd-mobile";
import ably from "../../utils/ablyClient";

const StatusNotification = ({ userId, setNotificationStats }) => {
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef([]);

  useEffect(() => {
    if (!userId) return;

    const channel = ably.channels.get(`user:${userId}`);
    console.log("USER Channele", `user:${userId}`)
    const onConnected = () => console.log("✅ Ably connected");
    const onFailed = (err) => console.error("❌ Ably connection failed:", err);
    const onAttached = () => console.log(`📡 Channel "${channel.name}" attached`);

    ably.connection.on("connected", onConnected);
    ably.connection.on("failed", onFailed);
    channel.once("attached", onAttached);

    const handleMessage = (message) => {
      console.log("📥 Incoming message:", message);

      const { message: text, status, requestId } = message.data;

      // Update message list
      const updated = [...messagesRef.current, { status, requestId }];
      messagesRef.current = updated;
      setMessages(updated);

      // Count messages by status
      const grouped = updated.reduce(
        (acc, msg) => {
          acc[msg.status] = (acc[msg.status] || 0) + 1;
          acc.total += 1;
          return acc;
        },
        { PENDING: 0, APPROVED: 0, REJECTED: 0, total: 0, message: text }
      );

      console.log("🔢 Grouped Stats:", grouped); // For debugging

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

// import React, { useState } from 'react';
// import useAblySubscription from '../../utils/useAblySubscription';

// const StatusNotification = ({ userId, setNotificationStats }) => {
//   const [messages, setMessages] = useState([]);

//   useAblySubscription({
//     channelName: `user:${userId}`,
//     event: 'status-updated',
//     onMessage: (data) => {
//       console.log('[StatusUpdate]', data);
//       setMessages((prev) => {
//         const all = [...prev, data];
//         const stats = all.reduce((acc, { status }) => {
//           acc[status] = (acc[status] || 0) + 1;
//           acc.total++;
//           return acc;
//         }, { PENDING: 0, APPROVED: 0, REJECTED: 0, total: 0 });
//         setNotificationStats({ ...stats, lastMessage: data.text });
//         return all;
//       });
//     },
//     toastFormatter: ({ text, status }) => ({
//       icon: 'success',
//       content: `${text} – ${status}`,
//     }),
//   });

//   return null;
// };

// export default StatusNotification;
