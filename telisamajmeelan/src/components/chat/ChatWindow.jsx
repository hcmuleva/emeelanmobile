import React, { useEffect, useState, useRef } from 'react';
import { List, Input, Button, Avatar, Toast } from 'antd-mobile';
import { SendOutline } from 'antd-mobile-icons';
import { useAuth } from '../../context/AuthContext';
import ably from '../../utils/ablyClient';


export const ChatWindow = ({ selectedUser }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const channelRef = useRef(null);
  const messageEndRef = useRef(null);

  // Helper: Scroll to bottom
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!selectedUser) return;

    // Load message history from API
    const fetchMessages = async () => {
      const res = await fetch(`/api/chat?sender=${user.id}&receiver=${selectedUser.id}`);
      const data = await res.json();
      setMessages(data);
    };

    fetchMessages();

    // Subscribe to Ably Channel
    const channelName = `chat:${[user.id, selectedUser.id].sort().join('_')}`;
    channelRef.current = ably.channels.get(channelName);

    channelRef.current.subscribe((msg) => {
      setMessages((prev) => [...prev, msg.data]);
      scrollToBottom();
    });

    return () => {
      channelRef.current?.unsubscribe();
    };
  }, [selectedUser?.id]);

  const sendMessage = async () => {
    if (!messageInput.trim()) return;

    const newMsg = {
      sender: user.id,
      receiver: selectedUser.id,
      message: messageInput,
      createdAt: new Date().toISOString(),
    };

    // Save to backend
    await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMsg),
    });

    // Publish via Ably
    const channelName = `chat:${[user.id, selectedUser.id].sort().join('_')}`;
    await ably.channels.get(channelName).publish('message', newMsg);

    setMessageInput('');
    setMessages((prev) => [...prev, newMsg]);
    scrollToBottom();
  };
  const getUserDisplayName = (user) => {
    return user?.name || user?.FirstName || user?.first_name || `User #${user?.id}`;
  };
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
        <List>
          {messages.map((msg, index) => (
            <List.Item
              key={index}
              description={msg.createdAt}
              style={{ textAlign: msg.sender === user.id ? 'right' : 'left' }}
              prefix={
                msg.sender !== user.id && (
<strong>{msg.sender === user.id ? getUserDisplayName(user) : getUserDisplayName(selectedUser)}</strong>
                )
              }
              extra={
                msg.sender === user.id && (
<strong>{msg.sender === user.id ? getUserDisplayName(user) : getUserDisplayName(selectedUser)}</strong>
                )
              }
            >
              {msg.message}
            </List.Item>
          ))}
          <div ref={messageEndRef} />
        </List>
      </div>

      <div style={{ display: 'flex', padding: '0.5rem', borderTop: '1px solid #eee' }}>
        <Input
          value={messageInput}
          onChange={setMessageInput}
          placeholder="Type a message..."
          clearable
        />
        <Button onClick={sendMessage} color="primary" style={{ marginLeft: '0.5rem' }}>
          <SendOutline />
        </Button>
      </div>
    </div>
  );
};
