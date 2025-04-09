


import { InfiniteScroll, List, SearchBar } from "antd-mobile";
import React, { useEffect, useState } from "react";
import { getPaginatedAdminUsers } from "../../services/api";
import NewProfileCard from "../users/NewProfileCard";
import AdminCard from "./AdminCard";
// Helper to calculate DOB range from age range
const getDOBRange = (minAge, maxAge) => {
  const today = new Date();
  const fromDate = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());
  const toDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());

  return {
    from: fromDate.toISOString().split("T")[0],
    to: toDate.toISOString().split("T")[0],
  };
};

const AdminList = ({ adminProp }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");

  const [marital, setMarital] = useState();
  const [profession, setProfession] = useState();
  const [gotra, setGotra] = useState(); // Will store Gotra.Id
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");

  const limit = 10;

  const fetchUsers = async (pageNum = 0, searchQuery = "") => {
    try {
      const filters = {
        marital: marital || "Married(Only for Admin)",
        profession: profession || "",
        gotra: gotra || "",
      };

      if (minAge && maxAge) {
        const { from, to } = getDOBRange(minAge, maxAge);
        filters["DOB_gte"] = from;
        filters["DOB_lte"] = to;
      }

      const PAGENUMBER = pageNum * limit;
      const data = await getPaginatedAdminUsers(PAGENUMBER, limit, filters);

      if (data?.data.length === 0) {
        setHasMore(false);
      } else {
        setUsers((prev) => (pageNum === 0 ? data?.data : [...prev, ...data?.data]));
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
  }, [search, marital, profession, gotra, minAge, maxAge]);

  const maritalOptions = [
    { label: "Single", value: "Never Married" },
    { label: "Divorced", value: "Divorcee" },
    { label: "Married", value: "MARRIED" },
    { label: "Widow", value: "Widow" },
    { label: "Vidur", value: "VIDUR" },
    { label: "Separated", value: "Separated" },
  ];

  const professionOptions = [
    { label: "Engineer", value: "engineer" },
    { label: "Doctor", value: "doctor" },
    { label: "Teacher", value: "teacher" },
    { label: "Business", value: "business" },
    { label: "Housewife", value: "housewife" },
    { label: "CA", value: "ca" },
    { label: "Other", value: "other" },
  ];

  return (
    <div>
      <div style={{ padding: "16px" }}>
        {/* Collapsible Filters */}
        {/* <Collapse>
          <CollapsePanel key="1" title="Filters">
    
          </CollapsePanel>
        </Collapse> */}

        {/* Search Bar */}
        <SearchBar
          placeholder="Search Users..."
          onChange={(value) => setSearch(value)}
          style={{ marginTop: 10, marginBottom: 10 }}
        />
      </div>

      {/* User List */}
    
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
  {users.map((user) => (
    <div key={user.id} style={{ flex: '0 0 calc(50% - 8px)' }}>
      <AdminCard user={user} role="ADMIN" action="NOACTION" />
    </div>
  ))}
</div>
      {/* Infinite Scroll */}
      <InfiniteScroll loadMore={() => fetchUsers(page, search)} hasMore={hasMore} />
    </div>
  );
};
export default AdminList;
