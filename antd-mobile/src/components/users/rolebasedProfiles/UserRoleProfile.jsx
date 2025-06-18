import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import {
  List,
  InfiniteScroll,
  SearchBar,
  Selector,
  Collapse,
  Button,
} from "antd-mobile";
import {
  getPaginatedUsers,
  getSamajTitle,
  searchUsers,
} from "../../../services/api";
import NewProfileCard from "../NewProfileCard";
import { CollapsePanel } from "antd-mobile/es/components/collapse/collapse";
import GotraSelector from "../../authentication/registration/GotraSelector";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

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

const UserRoleProfile = ({ adminProp }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const listRef = useRef(null);
  const { user, samajInfo } = useContext(AuthContext);
  const savedScrollPositionRef = useRef(null);
  const isInitialLoad = useRef(true);
  const [loadingRestore, setLoadingRestore] = useState(false);

  const gotraData = samajInfo?.[0]?.attributes?.gotra || {};
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");
  const [marital, setMarital] = useState();
  const [profession, setProfession] = useState();
  const [gotra, setGotra] = useState();
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

  const limit = 10;

  const fetchUsers = async (pageNum = 0, searchQuery = "") => {
    try {
      const offset = pageNum * limit;
      let filters = {
        marital: marital || "",
        profession: profession || "",
        gotra: gotra || "",
        orgsku: user?.orgsku,
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

  useEffect(() => {
    setUsers([]);
    setPage(0);
    setHasMore(true);
    fetchUsers(0, search);
  }, [search, marital, profession, gotra, minAge, maxAge]);

  // 1. Capture saved scroll position when location changes (navigation back)
  useEffect(() => {
    const savedPosition = sessionStorage.getItem("profileListScrollPosition");

    if (savedPosition) {
      savedScrollPositionRef.current = parseInt(savedPosition, 0);
      sessionStorage.removeItem("profileListScrollPosition");
      setLoadingRestore(true);
    }
  }, [location.key]);

  // 2. Restore scroll position after users are loaded
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
        setLoadingRestore(false); // hide loader
      } else if (hasMore) {
        fetchUsers(page, search);
      }
    };

    if (isInitialLoad.current && loadingRestore) {
      requestAnimationFrame(checkScrollReady);
    }
  }, [users, page, search, hasMore, loadingRestore]);

  // 3. Reset initial load flag when filters change
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
      navigate(`/profile-view/${profileid}`);
    },
    [navigate]
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

  return (
    <div
      ref={listRef}
      data-scroll-container
      style={{ height: "100vh", overflowY: "auto", backgroundColor: "#FCFCFC" }}
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

      <div style={{ padding: "16px" }}>
        <Collapse>
          <CollapsePanel key="1" title="Filters">
            <div style={{ marginBottom: 8 }}>
              <strong>Marital Status:</strong>
              <Selector
                showCheckMark
                columns={2}
                options={maritalOptions}
                value={[marital]}
                onChange={(val) => setMarital(val[0])}
                style={{ fontSize: "14px", width: "100%" }}
                itemStyle={{
                  whiteSpace: "normal",
                  textAlign: "center",
                  padding: "8px",
                  fontSize: "13px",
                  wordBreak: "break-word",
                }}
              />
            </div>

            <div style={{ marginBottom: 8, fontSize: "14px" }}>
              <strong>Profession:</strong>
              <Selector
                showCheckMark
                columns={2}
                options={professionOptions}
                value={[profession]}
                onChange={(val) => setProfession(val[0])}
                style={{ fontSize: "14px", width: "100%" }}
                itemStyle={{
                  whiteSpace: "normal",
                  textAlign: "center",
                  padding: "8px",
                  fontSize: "13px",
                  wordBreak: "break-word",
                }}
              />
            </div>

            <div style={{ marginBottom: 8 }}>
              <strong>Gotra:</strong>
              <GotraSelector
                gotra_for={false}
                gotraData={samajInfo?.[0]?.attributes?.gotra || {}}
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
                  style={{
                    width: "50%",
                    padding: "5px",
                    border: "1px solid #ddd",
                  }}
                />
                <input
                  type="number"
                  placeholder="Max Age"
                  value={maxAge}
                  onChange={(e) => setMaxAge(e.target.value)}
                  style={{
                    width: "50%",
                    padding: "5px",
                    border: "1px solid #ddd",
                  }}
                />
              </div>
            </div>
          </CollapsePanel>
        </Collapse>
      </div>
      <SearchBar
        key="UniqueKey"
        placeholder="Search Users by ( Name, Location, Profession )"
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

export default UserRoleProfile;
