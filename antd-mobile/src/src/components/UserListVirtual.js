import React, { useState, useEffect, useRef } from "react";
import { List, Button, DotLoading, Avatar, Input, Toast } from "antd-mobile";
import { getPaginatedUsers } from "../services/api"; // Ensure this function is correct
import UserList from "./UserList";

const UserListVirtual = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 20;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const usersData = await getPaginatedUsers(page * pageSize, pageSize);
        console.log("Fetched Users:", usersData);
        if (usersData?.data?.length) {
          setUsers((prevUsers) => [...prevUsers, ...usersData.data]); // Append users
        } else {
          setHasMore(false);
        }
      } catch (error) {
        Toast.show({ content: "Failed to load users", position: "top" });
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]); // Re-run when `page` changes

  return (
    <UserList users={users} />
  );
};

export default UserListVirtual;
