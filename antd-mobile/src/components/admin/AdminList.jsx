import React, { useEffect, useState } from "react";
import { List, InfiniteScroll, SearchBar } from "antd-mobile";
import { getPaginatedAdminUsers, searchAdmins } from "../../services/api";
import AdminCard from "./AdminCard";

const AdminList = ({ adminProp, userrole }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");
  const limit = 10;

  // Function to fetch users based on search and pagination
  const fetchUsers = async (pageNum = 0, searchQuery = "") => {
    try {
      const offset = pageNum * limit;
      const filters = { marital: { $contains: "Admin" } };

      // Get data based on search query or pagination
      const data = searchQuery
        ? await searchAdmins(searchQuery, offset, limit, filters)
        : await getPaginatedAdminUsers(offset, limit, filters);

      const userList = data?.data || [];

      setHasMore(userList.length >= limit); // Check if more users are available
      setUsers((prev) => (pageNum === 0 ? userList : [...prev, ...userList])); // Update the user list
      setPage(pageNum + 1);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Debounce the search input value to prevent multiple fetches during typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(inputValue); // Trigger search when typing stops
    }, 300); // 300ms delay for debounce
    return () => clearTimeout(handler); // Cleanup on unmount or input change
  }, [inputValue]);

  // When search query changes, reset users and page and fetch new users
  useEffect(() => {
    setUsers([]); // Reset the users list
    setPage(0); // Reset page to 0
    setHasMore(true); // Reset hasMore to true
    fetchUsers(0, search); // Fetch the users based on new search
  }, [search]);

  return (
    <div style={{ padding: "16px" }}>
      <SearchBar
        placeholder="Search Admins..."
        value={inputValue}
        onChange={(val) => setInputValue(val)}
        style={{
          marginBottom: 16,

          backgroundColor: "#f0f4f8",
        }}
      />

      <List style={{ "--border-top": "none", "--border-bottom": "none" }}>
        {users.map((user, index) => (
          <div
            key={user.id || index}
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              marginBottom: "12px",
              padding: "12px",
              transition: "all 0.3s",
            }}
          >
            <AdminCard user={user} role="ADMIN" action="NOACTION" />
          </div>
        ))}
      </List>

      <InfiniteScroll
        loadMore={() => fetchUsers(page, search)}
        hasMore={hasMore}
        threshold={0}
      />
    </div>
  );
};

export default AdminList;
