import React, { useEffect, useState } from "react";
import { List, InfiniteScroll, SearchBar } from "antd-mobile";
import { getPaginatedUsers } from "../../services/api"; // Import API function

import NewProfileCard from "./NewProfileCard";

const Profiles = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  // const [response, setResponse] = React.useState('accept');

  const limit = 10;

  const fetchUsers = async (pageNum = 0, searchQuery = "") => {
    try {
      const data = await getPaginatedUsers(pageNum * limit, limit);
      console.log("data", data , " from api")
      
      if (data?.data.length === 0) {
        setHasMore(false);
      } else {
        setUsers((prev) => (pageNum === 0 ? data?.data : [...prev, ...data?.data])); // Append new data
        setPage(pageNum + 1);
      }

    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    setUsers([]);
    setPage(0);
    setHasMore(true);
    fetchUsers(0, search);
  }, [search]); 

  return (
    <div>
      {/* Search Bar */}
      <SearchBar
        placeholder="Search Users..."
        onChange={(value) => setSearch(value)}
        style={{ marginBottom: 10 }}
      />

      {/* User List */}
      <List>
        {users.map((user) => (
          <NewProfileCard user={user}/>
        ))}
      </List>

      {/* Infinite Scroll for Pagination */}
      <InfiniteScroll loadMore={() => fetchUsers(page, search)} hasMore={hasMore} />
    </div>
  );
};

export default Profiles;
