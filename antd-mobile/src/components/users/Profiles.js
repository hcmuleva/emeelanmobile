import React, { useEffect, useState } from "react";
import { List, InfiniteScroll, SearchBar } from "antd-mobile";
import { getPaginatedUsers } from "../../services/api"; // Import API function
import { 
  Card, 
  Button, 
  Checkbox, 
  Image,
  Radio, 
  Space, 
  Tag, 
  Divider 
} from 'antd-mobile';
import { 
  HeartFill, 
  ClockCircleFill,
  CheckShieldFill
} from 'antd-mobile-icons';

import NewProfileCard from "./NewProfileCard";

const Profiles = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0); // Start index for pagination
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [response, setResponse] = React.useState('accept'); // 'accept' or 'decline'

  const limit = 10; // Number of users per request

  // Function to fetch users from API
  const fetchUsers = async (pageNum = 0, searchQuery = "") => {
    try {
      const data = await getPaginatedUsers(pageNum * limit, limit);
      console.log("data",data , " from api")
      
      if (data?.data.length === 0) {
        setHasMore(false); // No more data available
      } else {
        setUsers((prev) => (pageNum === 0 ? data?.data : [...prev, ...data?.data])); // Append new data
        setPage(pageNum + 1);
      }

    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch users when search changes
  useEffect(() => {
    setUsers([]); // Reset user list
    setPage(0);   // Reset page number
    setHasMore(true); // Enable infinite scroll
    fetchUsers(0, search);
  }, [search]); 

  users.map((user) => {
    console.log(user, "User Obj")
    if(user?.images.length>0) {
      console.log("Pictures", user.images)
    }
  })
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
            // <ProfileCard user={user}/>
            <NewProfileCard user={user}/>
          // <List.Item key={user.id} description={user.email}>
          //   {user.username}  {user.FirstName}  {user.LastName} {user.FatherName}{user.Gotra} {/* Display user name */}
          // </List.Item>
        ))}
      </List>

      {/* Infinite Scroll for Pagination */}
      <InfiniteScroll loadMore={() => fetchUsers(page, search)} hasMore={hasMore} />
    </div>
  );
};

export default Profiles;
