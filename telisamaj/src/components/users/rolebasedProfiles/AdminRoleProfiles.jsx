
import { Collapse, InfiniteScroll, Input, List,Button, SearchBar, Selector } from "antd-mobile";
import React, { useEffect, useState } from "react";
import { getPaginatedUsers, searchUsers } from "../../../services/api"; // ✅ Import both

import { CollapsePanel } from "antd-mobile/es/components/collapse/collapse";
import gotraData from "../../../utils/gotra.json";
import GotraSelector from "../../authentication/registration/GotraSelector";
import NewProfileCard from "../NewProfileCard";
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

const AdminRoleProfiles = ({ adminProp, userrole }) => {

  console.log("AdminRoleProfiles", adminProp, userrole, "userRole")
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");
  const [idFilter, setIdFilter] = useState('');

  const [marital, setMarital] = useState();
  const [profession, setProfession] = useState();
  const [userstatus, setUserstatus] = useState();
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
  const userstatusOptiopns = [
    { label: "APPROVED", value: "APPROVED" },
    { label: "UNAPPROVED", value: "UNAPPROVED" },
    { label: "REJECTED", value: "REJECTED" },
    { label: "BLOCKED", value: "BLOCKED" },
    { label: "PENDING", value: "PENDING" },
    { label: "ENGAGED", value: "ENGAGED" },
    {label: "SUSPENDED", value: "SUSPENDED" },
  ];

  const professionOptions = [
    { label: "Engineer", value: "engineer" },
    { label: "Doctor", value: "doctor" },
    { label: "Teacher", value: "teacher" },
    { label: "Business", value: "business" },
    { label: "Housewife", value: "House work" },
    { label: "CA", value: "ca" },
    { label: "Other", value: "other" },
  ];

  const limit = 10;

  const fetchUsers = async (pageNum = 0, searchQuery = "") => {
    try {
      const offset = pageNum * limit;
      let filters = {}

      if (userrole === "ADMIN") {
        filters["userstatus"] = "PENDING"
      }
      if(userrole === "CENTER" || userrole === "SUPERADMIN"){
        if(userstatus) filters["userstatus"] = userstatus
        if(idFilter) filters["id"] = idFilter
        

      }
      if (minAge && maxAge) {
        const { from, to } = getDOBRange(minAge, maxAge);
        filters["DOB_gte"] = from;
        filters["DOB_lte"] = to;
      }

      let data;
      if (searchQuery) {
        console.log("searchQuery", searchQuery)
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
      console.log("Search triggered:", inputValue);
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
  }, [search, marital, profession, gotra, userstatus, minAge, maxAge,idFilter]);

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
        <strong>User ID:</strong>
        <Input
          type="number"
          placeholder="Enter user ID"
          value={idFilter}
          onChange={val => setIdFilter(val)}
          clearable
          style={{ width: '100%', marginTop: 4 }}
        />
        {/* <Button color="primary" size="small" onClick={onSearchById} style={{ marginTop: 8 }}>
          Search by ID
        </Button> */}
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
              <strong>Status:</strong>
              <Selector
                showCheckMark
                columns={3}
                options={userstatusOptiopns}
                value={[userstatus]}
                onChange={(val) => setUserstatus(val[0])}
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
      {/* <SearchBar
        key="UniqueKey"
        placeholder="Search Users..."
        value={inputValue}
        onChange={val => setInputValue(val)}
        style={{ marginBottom: 10, padding: "16px" }}
      /> */}

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

export default AdminRoleProfiles;
