import React from "react";
import { Tabs, Badge, List, Avatar } from "antd-mobile";
import { MessageOutline, StarOutline } from "antd-mobile-icons";

const chats = [
  {
    id: 1,
    name: "Radhika",
    message: "Hello, We went through your profile...",
    time: "Today",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    badge: 22,
  },
  {
    id: 2,
    name: "Divya",
    message: "I am interested in your profile. Would...",
    time: "Today",
    avatar: "https://randomuser.me/api/portraits/women/20.jpg",
    badge: 2,
  },
  {
    id: 3,
    name: "Sreya",
    message: "Missed video call",
    time: "Yesterday",
    avatar: "https://randomuser.me/api/portraits/women/30.jpg",
  },
  {
    id: 4,
    name: "Anjali",
    message: "Educational Details Requested",
    time: "Yesterday",
    avatar: "https://randomuser.me/api/portraits/women/40.jpg",
    badge: 2,
  },
  {
    id: 5,
    name: "Deepika",
    message: "I am doing very well !! blahh blahh...",
    time: "Yesterday",
    avatar: "https://randomuser.me/api/portraits/women/50.jpg",
  },
  {
    id: 6,
    name: "Kavya",
    message: "She liked you !! Take the next step...",
    time: "23 Nov 2023",
    avatar: "https://randomuser.me/api/portraits/women/60.jpg",
    badge: 2,
  },
];

const Mail = () => {
  return (
    <div>
      {/* Tabs */}
      <Tabs>
        <Tabs.Tab title="Received" key="received" > <List>
        {chats.map((chat) => (
          <List.Item
            key={chat.id}
            prefix={<Avatar src={chat.avatar} />}
            description={chat.message}
            extra={chat.badge ? <Badge content={chat.badge} /> : null}
          >
            {chat.name}
          </List.Item>
        ))}
      </List></Tabs.Tab>
        <Tabs.Tab title="Awaiting Response" key="awaiting" >Awaiting</Tabs.Tab>
        <Tabs.Tab title="Calls" key="calls" >Completed
        <div style={{ display: "flex", gap: "10px", padding: "10px" }}>
        <Badge content={4}>
          <button style={{ padding: "8px 16px", borderRadius: "20px", border: "1px solid #ddd" }}>Messages</button>
        </Badge>
        <Badge content={123}>
          <button style={{ padding: "8px 16px", borderRadius: "20px", border: "1px solid #ddd" }}>Interests</button>
        </Badge>
      </div>
        </Tabs.Tab>
      </Tabs>

      {/* Filter Buttons */}
      

      {/* Chat List */}
     
    </div>
  );
};

export default Mail;
