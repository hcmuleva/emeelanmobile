import React, { useEffect } from "react";
import { Toast } from "antd-mobile";
import ably from "../ablyClient";

const StatusNotification = ({ userId }) => {
    const [mymessage,setMessage] = React.useState([]);
    console.log(mymessage, "Message loist")
    console.log("StatusNotification component rendered", userId);
  useEffect(() => {
    const channel = ably.channels.get(`user:${userId}`);
    ably.connection.on('connected', () => {
        console.log('Ably connected');
      });
      
      ably.connection.on('failed', (err) => {
        console.error('Ably connection failed:', err);
      });
    channel.once('attached', () => {
        console.log(`Channel ${channel.name} is attached`);
      });
      
      channel.subscribe("connection-request", (message) => {
        console.log("Connection request message received:", message);
        const { message: text, status } = message.data;
        setMessage([...mymessage,message.data])

        Toast.show({
          icon: "info",
          content: `${text} - Status: ${status}`,
        });
      });

    

    return () => channel.unsubscribe(); // Clean up
  }, [userId]);

  return null;
};

export default StatusNotification;
