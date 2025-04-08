import React, { useEffect, useState } from "react";
import { List, InfiniteScroll, SearchBar, Selector, Collapse } from "antd-mobile";
import { getPaginatedUsers } from "../../services/api";
import NewProfileCard from "./NewProfileCard";
import { CollapsePanel } from "antd-mobile/es/components/collapse/collapse";

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

const Profiles = ({ adminProp }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");

  const [marital, setMarital] = useState();
  const [profession, setProfession] = useState();
  const [gotra, setGotra] = useState();
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");

  const limit = 10;

  const fetchUsers = async (pageNum = 0, searchQuery = "") => {
    try {
      const filters = {
        marital: marital || "",
        profession: profession || "",
        gotra: gotra || "",
      };

      // Add DOB range if both minAge and maxAge are provided
      if (minAge && maxAge) {
        const { from, to } = getDOBRange(minAge, maxAge);
        filters["DOB_gte"] = from;
        filters["DOB_lte"] = to;
      }

      const PAGENUMBER = pageNum * limit;
      const data = await getPaginatedUsers(PAGENUMBER, limit, filters);

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
    { label: "Separated", value: "Separated" },
  ];

  const professionOptions = [
    { label: "Engineer", value: "engineer" },
    { label: "Doctor", value: "doctor" },
    { label: "Teacher", value: "teacher" },
    { label: "Other", value: "other" },
  ];

  const gotraOptions = [
    { label: "Vasishtha", value: "vasishtha" },
    { label: "Gautam", value: "gautam" },
    { label: "Bharadwaj", value: "bharadwaj" },
    { label: "Other", value: "other" },
  ];

  return (
    <div>
      <div style={{ padding: "16px" }}>
        {/* Collapsible Filters */}
        <Collapse>
          <CollapsePanel key="1" title="Filters">
            <div style={{ marginBottom: 8 }}>
              <strong>Marital Status:</strong>
              <Selector
                showCheckMark
                columns={3}
                options={maritalOptions}
                value={[marital]}
                onChange={(val) => setMarital(val[0])}
              />
            </div>

            <div style={{ marginBottom: 8 }}>
              <strong>Profession:</strong>
              <Selector
                showCheckMark
                columns={3}
                options={professionOptions}
                value={[profession]}
                onChange={(val) => setProfession(val[0])}
              />
            </div>

            <div style={{ marginBottom: 8 }}>
              <strong>Gotra:</strong>
              <Selector
                showCheckMark
                columns={3}
                options={gotraOptions}
                value={[gotra]}
                onChange={(val) => setGotra(val[0])}
              />
            </div>

            <div style={{ marginBottom: 8 }}>
              <strong>Age Range:</strong>
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  type="number"
                  placeholder="Min Age"
                  value={minAge}
                  onChange={(e) => setMinAge(e.target.value)}
                  style={{ width: "50%" }}
                />
                <input
                  type="number"
                  placeholder="Max Age"
                  value={maxAge}
                  onChange={(e) => setMaxAge(e.target.value)}
                  style={{ width: "50%" }}
                />
              </div>
            </div>
          </CollapsePanel>
        </Collapse>

        {/* Search Bar */}
        <SearchBar
          placeholder="Search Users..."
          onChange={(value) => setSearch(value)}
          style={{ marginTop: 10, marginBottom: 10 }}
        />
      </div>

      {/* User List */}
      <List>
        {users.map((user) => (
          <NewProfileCard key={user.id} user={user} adminProp={adminProp} />
        ))}
      </List>

      {/* Infinite Scroll */}
      <InfiniteScroll loadMore={() => fetchUsers(page, search)} hasMore={hasMore} />
    </div>
  );
};

export default Profiles;
