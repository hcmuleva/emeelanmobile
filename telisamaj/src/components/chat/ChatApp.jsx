import React, { useState, useEffect } from "react";
import { List, InfiniteScroll, Avatar } from "antd-mobile";
import { ChatWindow } from "./ChatWindow";
import { useAuth } from "../../context/AuthContext";
import { getPaginatedUsers } from "../../services/api";

export const ChatApp = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const limit = 10;
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async (pageNum = 0) => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const offset = pageNum * limit;
      const data = await getPaginatedUsers(offset, limit, {}); // Filters can be passed here
      const userList = data?.data || [];

      if (userList.length < limit) {
        setHasMore(false);
      }

      setUsers((prev) => (pageNum === 0 ? userList : [...prev, ...userList]));
      setPage(pageNum + 1);
    } catch (error) {
      console.error("Error fetching users:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(0); // Initial load
  }, []);

  const loadMore = async () => {
    await fetchUsers(page);
  };

  return (
    <div style={{ height: "100vh", overflow: "auto" }}>
      {!selectedUser ? (
        <>
          <List header="Available Users" mode="card">
            {users.map((u) => (
              <List.Item
                key={u.id}
                prefix={
                  <Avatar
                    src={`https://ui-avatars.com/api/?name=${u.FirstName}`}
                  />
                }
                onClick={() => {
                  setSelectedUser(u);
                }}
                description={u.online ? "Online" : `'Offline' ${u.id}`}
              >
                {u.FirstName}
              </List.Item>
            ))}
          </List>
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
        </>
      ) : (
        <ChatWindow
          selectedUser={selectedUser}
          onBack={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};
