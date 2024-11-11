import {
  CaretRightOutlined,
  HeartFilled,
  LoadingOutlined
} from "@ant-design/icons";
import { useCustom } from "@refinedev/core";
import { Button, Col, Form, Modal, Row, Select } from "antd";
import { State } from "country-state-city";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";
import calculateAge from "../../utils/age-finder";
import Header from "./header/header";

const API_URL = import.meta.env.VITE_SERVER_URL;
const USER_ROLE = import.meta.env.VITE_USERROLE;

const Dashboard = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    search_string: "",
    state: "",
    upper: 50,
    lower: 10,
    profession: "",
    marital_status: "",
    education: "",
  });

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
        pagination: { page: current, pageSize: pageSize },
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

  const handleApplyFilters = (values) => {
    setFilters({
      search_string: filters.search_string,
      state: values.state || "",
      upper: values.upper || 44,
      lower: values.lower || 15,
      profession: values.profession || "",
      marital_status: values.marital_status || "",
      education: values.education || "",
    });
    setUsers([]);
    setOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (scrollTop + windowHeight >= documentHeight) {
        setCurrent((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchString = useCallback(
    debounce((value) => {
      setUsers([]);
      setFilters((prev) => ({ ...prev, search_string: value }));
      refetch();
    }, 1000),
    []
  );

  function debounce(cb, delay = 1000) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => cb(...args), delay);
    };
  }

  if (isLoading || isFetching) {
    return (
      <div className="loading-screen">
        <LoadingOutlined style={{ fontSize: "4rem" }} />
      </div>
    );
  }

  return (
    <>
      <Header setSearch={handleSearchString} />
      <div className="dashboard-content">
        <div className="main-content">
          <div className="near-you">
            <span>Near You</span>
            <CaretRightOutlined />
          </div>
          <div className="near-me-profiles">
            {users.slice(0, 4).map((user, index) => {
              const photos = user?.Pictures?.replace(/[\[\]']/g, "").split(", ") || user?.profilePicture?.url;
              return (
                <div key={user.id || index} className="profile-card">
                  <img src={photos} alt="profile" />
                  <div className="profile-info">
                    <div>
                      <span>{user?.FirstName} {user?.LastName}</span> <HeartFilled />
                      <br />
                      <span>Age: {calculateAge(user?.DOB)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="see-more">
              <span>See</span>
              <span>More</span>
            </div>
          </div>
          <div className="main-filters">
            <Select
              placeholder="Select State"
              onChange={(value) => setFilters({ ...filters, state: value })}
              value={filters.state || undefined}
              allowClear
              showSearch
            >
              {State.getStatesOfCountry("IN").map((state) => (
                <Select.Option key={state.name} value={state.name}>{state.name}</Select.Option>
              ))}
            </Select>
            {/* Additional filters */}
            <Button type="primary" onClick={() => setOpen(true)}>Filters</Button>
          </div>
          <Row gutter={[12, 12]}>
            {users.map((user, index) => (
              <Col key={user.id || index} onClick={() => navigate(`/profile/${user?.id}`)} className="profile-list">
                <img src={user?.Pictures || user?.profilePicture?.url} alt="profile" />
                <div className="profile-info">
                  <span>{user?.FirstName} {user?.LastName}</span> <HeartFilled />
                  <span>Age: {calculateAge(user?.DOB)}</span>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <Modal title="Filters" open={open} onCancel={() => setOpen(false)} footer={null}>
        <Form onFinish={handleApplyFilters}>
          <Form.Item name="state">
            <Select placeholder="Select State" allowClear showSearch>
              {State.getStatesOfCountry("IN").map((state) => (
                <Select.Option key={state.name} value={state.name}>{state.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Dashboard;
