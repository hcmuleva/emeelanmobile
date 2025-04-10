import React, { useEffect, useState } from "react";
import { List, InfiniteScroll, SearchBar, Selector, Collapse } from "antd-mobile";
import { getPaginatedUsers, searchUsers } from "../../services/api"; // ✅ Import both

import NewProfileCard from "./NewProfileCard";
import { CollapsePanel } from "antd-mobile/es/components/collapse/collapse";
import GotraSelector from "../authentication/registration/GotraSelector";
import gotraData from "../../utils/gotra.json";
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
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");

  const [marital, setMarital] = useState();
  const [profession, setProfession] = useState();
  const [gotra, setGotra] = useState(); // Will store Gotra.Id
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");

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

  const limit = 10;

  const fetchUsers = async (pageNum = 0, searchQuery = "") => {
    try {
      const offset = pageNum * limit;
      let filters = {
        marital: marital || "",
        profession: profession || "",
        gotra: gotra || "",
      };
  
      if (minAge && maxAge) {
        const { from, to } = getDOBRange(minAge, maxAge);
        filters["DOB_gte"] = from;
        filters["DOB_lte"] = to;
      }
  
      let data;
      if (searchQuery) {
        data = await searchUsers(searchQuery, offset, limit);
      } else {
        data = await getPaginatedUsers(offset, limit, filters);
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
  }, [search, marital, profession, gotra, minAge, maxAge]);

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
              <GotraSelector
                gotra_for={false}
                gotraData={gotraData.Gotra}
                customdata={{ gotra }}
                setCustomdata={(val) => setGotra(val.gotra)}
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
      </div>
      <SearchBar
        key="UniqueKey"
        placeholder="Search Users..."
        value={inputValue}
        onChange={val => setInputValue(val)}
        style={{ marginBottom: 10, padding: "16px" }}
      />

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
