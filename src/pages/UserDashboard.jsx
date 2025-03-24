import { useCustom, useList } from '@refinedev/core';
import React, { useState,useEffect ,useRef} from 'react'
import UserTableView from './UserDashboard/UserTableView';
import Header from './Header';
const API_URL = import.meta.env.VITE_SERVER_URL;

export default function UserDashboard() {
  console.log("Default in userDashboard")
  const [listData, setListData] = useState([]);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [pageSize] = useState(20);
  const isFetchingRef = useRef(false); // Track fetch status via ref

  const { data, isLoading, isFetching, refetch } = useCustom({
    url: `${API_URL}/api/custom-user`,
    method: "get",
    config: {
      headers: {
        "x-custom-header": "foo-bar",
        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
      },
    },
    query: {
      pagination: { offset, limit: pageSize },
      sort: "-ID", // Minus sign indicates descending order

    },
  });

  // Throttled scroll handler
  const handleScroll = useRef(() => {
    const { scrollY, innerHeight } = window;
    const { offsetHeight } = document.body;
    
    if (
      scrollY + innerHeight >= offsetHeight - 200 && // 200px buffer
      hasMore &&
      !isFetchingRef.current
    ) {
      isFetchingRef.current = true;
      setOffset((prev) => prev + pageSize);
    }
  }).current;

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]); // Stable dependency

  useEffect(() => {
    if (!data?.data?.data) return;
    
    setListData((prev) => [...prev, ...data.data.data]);
    setHasMore(data.data.data.length >= pageSize);
    isFetchingRef.current = false; // Reset fetch status
  }, [data]);

  if (isLoading) return <h1>Loading...</h1>;
 

  return (
    <div style={{ minHeight: "100vh" }}>
      <UserTableView  rowData={data?.data?.data} />
      {/* {listData.map((item) => (
        <UserTableView key={item.id} rowData={[item]} />
      ))} */}
      {!hasMore && <p>No more users</p>}
    </div>
  );
}