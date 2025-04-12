
import React, { useEffect, useState } from "react";
import { List, InfiniteScroll, SearchBar, Selector, Collapse } from "antd-mobile";
import { getPaginatedAdminUsers, searchAdmins } from "../../services/api"; 
import AdminCard from "./AdminCard";


const AdminList = ({ adminProp, userrole }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");

  const limit = 10;

  const fetchUsers = async (pageNum = 0, searchQuery = "") => {
    try {
      const offset = pageNum * limit;
    
      let filters = {
        marital: { $contains: "Admin" } 
        
      };
     
      let data;
      if (searchQuery) {
        data = await searchAdmins(searchQuery, offset, limit,filters);
      } else {
        data = await getPaginatedAdminUsers(offset, limit,filters);
      }
  
      const userList = data?.data || [];
  
      if (userList.length === 0) {
        setHasMore(false);
      } else {
        setUsers((prev) => (pageNum === 0 ? userList : [...prev, ...userList]));
        setPage(pageNum + 1);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(inputValue);
    }, 300);

    return () => clearTimeout(handler);
  }, [inputValue]);

  // ✅ Fetch when search changes
  useEffect(() => {
    setUsers([]);
    setPage(0);
    setHasMore(true);
    fetchUsers(0, search);
  }, [search]);

  return (
    <div style={{ padding: "16px" }}>

      <SearchBar
        key="UniqueKey"
        placeholder="Search Users..."
        value={inputValue}
        onChange={val => setInputValue(val)}
        style={{ marginBottom: 10, padding: "16px" }}
      />

      <List>
        {users.map((user) => (
            <>
              <AdminCard user={user} role="ADMIN" action="NOACTION" />
              <hr style={{backgroundColor:"light-grey"}}/>
            </>
          ))}
      </List>

      {/* Infinite Scroll */}
      <InfiniteScroll loadMore={() => fetchUsers(page, search)} hasMore={hasMore} />
    </div>
  );
};

export default AdminList;
