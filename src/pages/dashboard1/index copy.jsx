import {
  AppstoreOutlined,
  CaretRightOutlined,
  HeartFilled,
  LoadingOutlined,
  ReloadOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useCustom } from "@refinedev/core";
import { Button, Col, Form, Modal, Row, Select } from "antd";
import { State } from "country-state-city";
import React, { useCallback, useEffect, useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";
import "./dashboard.css";
import calculateAge from "../../utils/age-finder";
import Header from "./header/header";

const API_URL = import.meta.env.VITE_SERVER_URL;

// Memoized profile card component to prevent unnecessary re-renders
const ProfileCard = memo(({ user, onClick }) => {
  const pic = user?.Pictures;
  const photos = pic ? pic?.replace(/[\[\]']/g, "").split(", ")[0] : user?.profilePicture?.url;
  
  return (
    <div
      style={{
        width: "42rem",
        height: "22rem",
        position: "relative",
        borderRadius: "1rem",
        overflow: "hidden",
        cursor: "pointer",
      }}
      className="dashboard-profiles-icons"
      onClick={onClick}
    >
      <img
        width="100%"
        height="100%"
        src={photos}
        alt="profile"
        style={{ opacity: 1 }}
        loading="lazy"
      />
      <div className="profile-info">
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <div>
            <span>
              {user?.FirstName} {user?.LastName}
            </span>{" "}
            <HeartFilled style={user?.liked ? { color: "red" } : { color: "white" }} />
            <br />
          </div>
          <span>Age: {calculateAge(user?.DOB)}</span>
        </div>
      </div>
    </div>
  );
});

const Dashboard = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize] = useState(20);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const initialFilters = {
    search_string: "",
    state: "",
    upper: 60,
    lower: 0,
    profession: "",
    marital_status: "",
    education: "",
  };
  const [filters, setFilters] = useState(initialFilters);

  const handleResetFilters = useCallback(() => {
    setFilters(initialFilters);
    setUsers([]);
    refetch();
  }, []);

  const calculateDOB = (yearsBack) => {
    const currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - yearsBack);
    return currentDate.toISOString().split("T")[0];
  };

  const { data, isLoading, isFetching, refetch } = useCustom({
    url: `${API_URL}/api/custom-user`,
    method: "get",
    config: {
      headers: { "x-custom-header": "foo-bar" },
      query: {
        pagination: { page: current, pageSize },
        filters: {
          id: localStorage.getItem("userid"),
          state: filters.state,
          search_string: filters.search_string,
          dob_gte: calculateDOB(filters.upper),
          dob_lte: calculateDOB(filters.lower),
          profession: filters.profession,
          marital_status: filters.marital_status,
          education: filters.education,
        },
      },
    },
  });

  useEffect(() => {
    if (data?.data?.data) {
      const newList = [...users, ...data.data.data];
      const uniqueList = Array.from(new Set(newList.map((item) => item.id)))
        .map((id) => newList.find((item) => item.id === id));
      setUsers(uniqueList);
    }
  }, [data?.data?.data]);

  const handleApplyFilters = useCallback((values) => {
    setFilters({
      ...initialFilters,
      search_string: filters.search_string,
      state: values.state || "",
      upper: values.upper || 50,
      lower: values.lower || 10,
      profession: values.profession || "",
      marital_status: values.marital_status || "",
      education: values.education || "",
    });
    setUsers([]);
    setOpen(false);
    refetch();
  }, [filters.search_string, refetch]);

  // Optimized scroll handler with throttling
  useEffect(() => {
    let isScrolling = false;
    const handleScroll = () => {
      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          if (scrollTop + windowHeight >= documentHeight - 100) {
            setCurrent((prev) => prev + 1);
          }
          isScrolling = false;
        });
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    refetch();
  }, [filters]);

  const handleSearchString = useCallback(
    debounce((value) => {
      setUsers([]);
      setFilters((prev) => ({ ...prev, search_string: value }));
      refetch();
    }, 300),
    [refetch]
  );

  function debounce(cb, delay = 300) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => cb(...args), delay);
    };
  }

  if (isLoading) {
    return (
      <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <LoadingOutlined style={{ fontSize: "4rem" }} />
      </div>
    );
  }

  return (
    <>
      <div>
        <Header setSearch={handleSearchString} />
        <div className="dashboard-content" style={{ marginTop: "1rem", display: "flex", justifyContent: "center", overflow: "hidden" }}>
          <div style={{ width: "60%", color: "#36454F" }} className="full-content-on-mobile">
            {/* Near You Section */}
            <div style={{ marginBottom: "1rem", fontSize: "1.1rem", display: "flex", alignItems: "center" }}>
              <span>Near You</span> <CaretRightOutlined />
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <div className="near-me-profiles">
                {users?.slice(0, 4)?.map((user) => (
                  <ProfileCard 
                    key={user.id} 
                    user={user}
                    onClick={() => navigate(`/profile/${user?.id}`)}
                  />
                ))}
              </div>
            </div>

            <hr />

            {/* Filters Section */}
            <div className="main-filters">
              {/* Your existing filters code */}
            </div>

            {/* Main Content */}
            <div className="main-content">
              <p>Based On Your Preferences We Found {users.length} People</p>
              <Row gutter={[12, 12]} justify="center">
                {users?.map((user) => (
                  <Col key={user.id}>
                    <ProfileCard 
                      user={user}
                      onClick={() => navigate(`/profile/${user?.id}`)}
                    />
                  </Col>
                ))}
              </Row>
              {isFetching && (
                <div style={{ marginTop: "1rem", width: "100%", display: "flex", justifyContent: "center" }}>
                  <LoadingOutlined />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal remains unchanged */}
      <Modal
        title={<div style={{ display: "flex", justifyContent: "center" }}>Filters</div>}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        {/* Your existing Modal content */}
      </Modal>
    </>
  );
};

export default Dashboard;