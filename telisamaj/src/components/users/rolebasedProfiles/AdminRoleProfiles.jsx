// Updated AdminRoleProfiles component with collapsible filter categories

import {
  Collapse,
  InfiniteScroll,
  Input,
  List,
  Button,
  SearchBar,
  Selector,
} from "antd-mobile";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { getPaginatedUsers, searchUsers } from "../../../services/api";

import { CollapsePanel } from "antd-mobile/es/components/collapse/collapse";
import GotraSelector from "../../authentication/registration/GotraSelector";
import NewProfileCard from "../NewProfileCard";
import GotraController from "../../../utils/GotraController";
import { AuthContext } from "../../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const gotraData = GotraController();

// Helper to calculate DOB range from age range
const getDOBRange = (minAge, maxAge) => {
  const today = new Date();
  const fromDate = new Date(
    today.getFullYear() - maxAge,
    today.getMonth(),
    today.getDate()
  );
  const toDate = new Date(
    today.getFullYear() - minAge,
    today.getMonth(),
    today.getDate()
  );

  return {
    from: fromDate.toISOString().split("T")[0],
    to: toDate.toISOString().split("T")[0],
  };
};

const AdminRoleProfiles = ({ adminProp, userrole }) => {
  const savedScrollPositionRef = useRef(null);
  const isInitialLoad = useRef(true);
  const [loadingRestore, setLoadingRestore] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const listRef = useRef(null);

  const { user, samajInfo } = useContext(AuthContext);
  const gotraData = samajInfo?.[0]?.attributes?.gotra || {};

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");
  const [idFilter, setIdFilter] = useState("");
  const [marital, setMarital] = useState();
  const [profession, setProfession] = useState();
  const [userstatus, setUserstatus] = useState();
  const [gotra, setGotra] = useState();
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");

  // Collapsible states for each filter category
  const [expandedFilters, setExpandedFilters] = useState({
    marital: false,
    userStatus: false,
    profession: false,
    gotra: false,
    age: false,
    userId: false,
  });

  const maritalOptions = [
    { label: "Single", value: "BACHELOR" },
    { label: "Divorced", value: "DIVORCED" },
    { label: "Married", value: "MARRIED" },
    { label: "WIDOW", value: "WIDOW" },
    { label: "VIDUR", value: "VIDUR" },
  ];

  const userstatusOptions = [
    { label: "APPROVED", value: "APPROVED" },
    { label: "UNAPPROVED", value: "UNAPPROVED" },
    { label: "REJECTED", value: "REJECTED" },
    { label: "BLOCKED", value: "BLOCKED" },
    { label: "PENDING", value: "PENDING" },
    { label: "ENGAGED", value: "ENGAGED" },
    { label: "SUSPENDED", value: "SUSPENDED" },
  ];

  const professionOptions = [
    { label: "ENGINEER", value: "ENGINEER" },
    { label: "DOCTOR", value: "DOCTOR" },
    { label: "TEACHER", value: "TEACHER" },
    { label: "BUSINESS", value: "BUSINESS" },
    { label: "HOUSEWORK", value: "HOUSEWORK" },
    { label: "CA", value: "CA" },
    { label: "SERVICE", value: "SERVICE" },
    { label: "GOVTJOB", value: "GOVTJOB" },
    { label: "PRIVATEJOB", value: "PRIVATEJOB" },
    { label: "STUDENT", value: "STUDENT" },
  ];

  const fetchUsers = async (pageNum = 0, searchQuery = "") => {
    try {
      const offset = pageNum * limit;
      let filters = {};

      if (userrole === "ADMIN") {
        filters["userstatus"] = "PENDING";
      }
      if (userrole === "CENTER" || userrole === "SUPERADMIN") {
        if (userstatus) filters["userstatus"] = userstatus;
        if (idFilter) filters["id"] = idFilter;
      }
      if (marital) filters["marital"] = marital;
      if (profession) filters["profession"] = profession;
      if (gotra) filters["gotra"] = gotra;
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

  useEffect(() => {
    setUsers([]);
    setPage(0);
    setHasMore(true);
    fetchUsers(0, search);
  }, [
    search,
    marital,
    profession,
    gotra,
    userstatus,
    minAge,
    maxAge,
    idFilter,
    userrole,
  ]);

  useEffect(() => {
    const saved = sessionStorage.getItem("filters");
    if (saved) {
      try {
        const f = JSON.parse(saved);
        if (f.search !== undefined) {
          setSearch(f.search);
          setInputValue(f.search);
        }
        if (f.marital !== undefined) setMarital(f.marital);
        if (f.profession !== undefined) setProfession(f.profession);
        if (f.gotra !== undefined) setGotra(f.gotra);
        if (f.minAge !== undefined) setMinAge(f.minAge);
        if (f.maxAge !== undefined) setMaxAge(f.maxAge);
        if (f.userstatus !== undefined) setUserstatus(f.userstatus);
        if (f.idFilter !== undefined) setIdFilter(f.idFilter);
      } catch (err) {
        console.warn("Failed to restore filters:", err);
      }
    }
  }, []);

  // Scroll position restoration logic
  useEffect(() => {
    const savedPosition = sessionStorage.getItem("profileListScrollPosition");
    if (savedPosition) {
      savedScrollPositionRef.current = parseInt(savedPosition, 0);
      sessionStorage.removeItem("profileListScrollPosition");
      setLoadingRestore(true);
    }
  }, [location.key]);

  useEffect(() => {
    const checkScrollReady = () => {
      const scrollTarget = savedScrollPositionRef.current;
      if (
        scrollTarget !== null &&
        listRef.current &&
        listRef.current.scrollHeight >= scrollTarget
      ) {
        listRef.current.scrollTop = scrollTarget;
        savedScrollPositionRef.current = null;
        isInitialLoad.current = false;
        setLoadingRestore(false);
      } else if (hasMore) {
        fetchUsers(page, search);
      }
    };

    if (isInitialLoad.current && loadingRestore) {
      requestAnimationFrame(checkScrollReady);
    }
  }, [users, page, search, hasMore, loadingRestore]);

  useEffect(() => {
    isInitialLoad.current = true;
  }, [search, marital, profession, gotra, minAge, maxAge]);

  const handleDetailsClick = useCallback(
    (profileid) => {
      if (listRef.current) {
        sessionStorage.setItem(
          "profileListScrollPosition",
          listRef.current.scrollTop
        );
      }

      sessionStorage.setItem(
        "filters",
        JSON.stringify({
          search,
          marital,
          profession,
          gotra,
          minAge,
          maxAge,
          userstatus,
          idFilter,
        })
      );

      navigate(`/profile-view/${profileid}`);
    },
    [
      navigate,
      search,
      marital,
      profession,
      gotra,
      minAge,
      maxAge,
      userstatus,
      idFilter,
    ]
  );

  const handleScrollToTop = useCallback(() => {
    if (listRef.current) {
      listRef.current.scrollTop = 0;
      sessionStorage.setItem(
        "profileListScrollPosition",
        listRef.current.scrollTop
      );
    }
  }, []);

  const clearAllFilters = () => {
    setMarital(undefined);
    setProfession(undefined);
    setGotra(undefined);
    setUserstatus(undefined);
    setIdFilter("");
    setMinAge("");
    setMaxAge("");
    setInputValue("");
    setSearch("");
    sessionStorage.removeItem("filters");
  };

  const toggleFilterExpansion = (filterKey) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [filterKey]: !prev[filterKey],
    }));
  };

  // Helper function to get active filter count
  const getActiveFilterCount = () => {
    let count = 0;
    if (marital) count++;
    if (profession) count++;
    if (gotra) count++;
    if (userstatus) count++;
    if (idFilter) count++;
    if (minAge && maxAge) count++;
    return count;
  };

  return (
    <div
      ref={listRef}
      data-scroll-container
      style={{
        height: "100vh",
        overflowY: "auto",
        backgroundColor: "#FCFCFC",
      }}
    >
      {loadingRestore && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(255,255,255,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2000,
          }}
        >
          <div
            style={{
              padding: "16px 24px",
              borderRadius: "8px",
              backgroundColor: "#8B0000",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            Loading...
          </div>
        </div>
      )}

      {/* Main Filters Collapse */}
      <Collapse>
        <CollapsePanel
          key="1"
          title={`Filters ${
            getActiveFilterCount() > 0
              ? `(${getActiveFilterCount()} active)`
              : ""
          }`}
        >
          <div style={{ padding: "8px" }}>
            {/* Clear All Filters Button */}
            <Button
              onClick={clearAllFilters}
              style={{
                width: "100%",
                marginBottom: "12px",
                backgroundColor: "#f0f0f0",
                color: "#333",
                border: "1px solid #ddd",
                fontSize: "14px",
              }}
            >
              Clear All Filters
            </Button>

            {/* User ID Filter */}
            {(userrole === "CENTER" || userrole === "SUPERADMIN") && (
              <div style={{ marginBottom: 12 }}>
                <div
                  onClick={() => toggleFilterExpansion("userId")}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 12px",
                    backgroundColor: idFilter ? "#e6f7ff" : "#f5f5f5",
                    borderRadius: "6px",
                    cursor: "pointer",
                    border: idFilter
                      ? "1px solid #1890ff"
                      : "1px solid #d9d9d9",
                  }}
                >
                  <strong style={{ fontSize: "14px" }}>
                    User ID {idFilter && `(${idFilter})`}
                  </strong>
                  <span style={{ fontSize: "18px" }}>
                    {expandedFilters.userId ? "−" : "+"}
                  </span>
                </div>
                {expandedFilters.userId && (
                  <div style={{ marginTop: "8px", padding: "0 12px" }}>
                    <Input
                      type="number"
                      placeholder="Enter user ID"
                      value={idFilter}
                      onChange={(val) => setIdFilter(val)}
                      clearable
                      style={{ width: "100%" }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Marital Status Filter */}
            <div style={{ marginBottom: 12 }}>
              <div
                onClick={() => toggleFilterExpansion("marital")}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 12px",
                  backgroundColor: marital ? "#e6f7ff" : "#f5f5f5",
                  borderRadius: "6px",
                  cursor: "pointer",
                  border: marital ? "1px solid #1890ff" : "1px solid #d9d9d9",
                }}
              >
                <strong style={{ fontSize: "14px" }}>
                  Marital Status{" "}
                  {marital &&
                    `(${
                      maritalOptions.find((opt) => opt.value === marital)?.label
                    })`}
                </strong>
                <span style={{ fontSize: "18px" }}>
                  {expandedFilters.marital ? "−" : "+"}
                </span>
              </div>
              {expandedFilters.marital && (
                <div style={{ marginTop: "8px", padding: "0 12px" }}>
                  <Selector
                    showCheckMark
                    columns={2}
                    options={maritalOptions}
                    value={[marital]}
                    onChange={(val) => setMarital(val[0])}
                    style={{ wordBreak: "break-word", whiteSpace: "normal" }}
                  />
                </div>
              )}
            </div>

            {/* User Status Filter */}
            {(userrole === "CENTER" || userrole === "SUPERADMIN") && (
              <div style={{ marginBottom: 12 }}>
                <div
                  onClick={() => toggleFilterExpansion("userStatus")}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 12px",
                    backgroundColor: userstatus ? "#e6f7ff" : "#f5f5f5",
                    borderRadius: "6px",
                    cursor: "pointer",
                    border: userstatus
                      ? "1px solid #1890ff"
                      : "1px solid #d9d9d9",
                  }}
                >
                  <strong style={{ fontSize: "14px" }}>
                    Status {userstatus && `(${userstatus})`}
                  </strong>
                  <span style={{ fontSize: "18px" }}>
                    {expandedFilters.userStatus ? "−" : "+"}
                  </span>
                </div>
                {expandedFilters.userStatus && (
                  <div style={{ marginTop: "8px", padding: "0 12px" }}>
                    <Selector
                      showCheckMark
                      columns={2}
                      options={userstatusOptions}
                      value={[userstatus]}
                      onChange={(val) => setUserstatus(val[0])}
                      style={{ wordBreak: "break-word", whiteSpace: "normal" }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Profession Filter */}
            <div style={{ marginBottom: 12 }}>
              <div
                onClick={() => toggleFilterExpansion("profession")}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 12px",
                  backgroundColor: profession ? "#e6f7ff" : "#f5f5f5",
                  borderRadius: "6px",
                  cursor: "pointer",
                  border: profession
                    ? "1px solid #1890ff"
                    : "1px solid #d9d9d9",
                }}
              >
                <strong style={{ fontSize: "14px" }}>
                  Profession {profession && `(${profession})`}
                </strong>
                <span style={{ fontSize: "18px" }}>
                  {expandedFilters.profession ? "−" : "+"}
                </span>
              </div>
              {expandedFilters.profession && (
                <div style={{ marginTop: "8px", padding: "0 12px" }}>
                  <Selector
                    showCheckMark
                    columns={2}
                    options={professionOptions}
                    value={[profession]}
                    onChange={(val) => setProfession(val[0])}
                    style={{ wordBreak: "break-word", whiteSpace: "normal" }}
                  />
                </div>
              )}
            </div>

            {/* Gotra Filter */}
            <div style={{ marginBottom: 12 }}>
              <div
                onClick={() => toggleFilterExpansion("gotra")}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 12px",
                  backgroundColor: gotra ? "#e6f7ff" : "#f5f5f5",
                  borderRadius: "6px",
                  cursor: "pointer",
                  border: gotra ? "1px solid #1890ff" : "1px solid #d9d9d9",
                }}
              >
                <strong style={{ fontSize: "14px" }}>
                  Gotra {gotra && "(Selected)"}
                </strong>
                <span style={{ fontSize: "18px" }}>
                  {expandedFilters.gotra ? "−" : "+"}
                </span>
              </div>
              {expandedFilters.gotra && (
                <div style={{ marginTop: "8px", padding: "0 12px" }}>
                  <GotraSelector
                    gotra_for={false}
                    gotraData={gotraData}
                    customdata={{ gotra }}
                    setCustomdata={(val) => setGotra(val.gotra)}
                  />
                </div>
              )}
            </div>

            {/* Age Range Filter */}
            <div style={{ marginBottom: 12 }}>
              <div
                onClick={() => toggleFilterExpansion("age")}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 12px",
                  backgroundColor: minAge && maxAge ? "#e6f7ff" : "#f5f5f5",
                  borderRadius: "6px",
                  cursor: "pointer",
                  border:
                    minAge && maxAge
                      ? "1px solid #1890ff"
                      : "1px solid #d9d9d9",
                }}
              >
                <strong style={{ fontSize: "14px" }}>
                  Age Range {minAge && maxAge && `(${minAge}-${maxAge})`}
                </strong>
                <span style={{ fontSize: "18px" }}>
                  {expandedFilters.age ? "−" : "+"}
                </span>
              </div>
              {expandedFilters.age && (
                <div style={{ marginTop: "8px", padding: "0 12px" }}>
                  <div style={{ display: "flex", gap: 10 }}>
                    <input
                      type="number"
                      placeholder="Min Age"
                      value={minAge}
                      onChange={(e) => setMinAge(e.target.value)}
                      style={{
                        width: "50%",
                        padding: "8px",
                        border: "1px solid #d9d9d9",
                        borderRadius: "4px",
                      }}
                    />
                    <input
                      type="number"
                      placeholder="Max Age"
                      value={maxAge}
                      onChange={(e) => setMaxAge(e.target.value)}
                      style={{
                        width: "50%",
                        padding: "8px",
                        border: "1px solid #d9d9d9",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </CollapsePanel>
      </Collapse>

      <SearchBar
        key="UniqueKey"
        placeholder="Search Users by ( Name, Location, Profession, Status )"
        value={inputValue}
        onChange={(val) => setInputValue(val)}
        style={{ marginBottom: 10, padding: "16px" }}
      />

      <List>
        {users.map((user, idx) => (
          <List.Item key={`${user.id}-${idx}`}>
            <NewProfileCard
              user={user}
              adminProp={adminProp}
              onDetailsClick={() => handleDetailsClick(user.id)}
            />
          </List.Item>
        ))}
      </List>

      <InfiniteScroll
        loadMore={() => fetchUsers(page, search)}
        hasMore={hasMore}
      />

      <Button
        onClick={handleScrollToTop}
        style={{
          position: "fixed",
          bottom: "150px",
          right: "20px",
          backgroundColor: "#8B0000",
          color: "#FFFFFF",
          borderRadius: "50%",
          width: "48px",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(139, 0, 0, 0.25)",
          border: "none",
          fontSize: "14px",
          fontWeight: "600",
          zIndex: 1000,
        }}
      >
        Top
      </Button>
    </div>
  );
};

export default AdminRoleProfiles;
