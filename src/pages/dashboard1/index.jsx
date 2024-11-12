
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
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";
import "./dashboard.css"
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

  const handleResetFilters = () => {
    setFilters(initialFilters);
    setUsers([]);
    refetch();
  };
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
  useEffect(() => {
    refetch();
  }, [filters]);
  const handleSearchString = useCallback(
    debounce((value) => {
      setUsers([]);
      setFilters((prev) => ({ ...prev, search_string: value }));
      refetch();
    }, 1000),
    [refetch]
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
      <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        <LoadingOutlined style={{ fontSize: "4rem" }} />
      </div>
    );
  }

  return (
    <>
        <div>
        <Header setSearch={handleSearchString}></Header>
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <div
            style={{ width: "60%", color: "#36454F", scrollBehavior: "smooth" }}
            className="full-content-on-mobile"
          >
            <div
              style={{
                marginBottom: "1rem",
                fontSize: "1.1rem",
                display: "flex",
                alignItems: "center",
                scrollBehavior: "smooth",
              }}
            >
              <span>Near You</span> <CaretRightOutlined />
            </div>
            <div
              style={{ display: "flex", gap: "1rem", scrollBehavior: "smooth" }}
            >
              <div className="near-me-profiles">
                {users?.slice(0, 4)?.map((user, index) => {
                  const pic = user?.Pictures;
                  let photos = null;
                  if (pic) {
                    photos = pic?.replace(/[\[\]']/g, "").split(", ");
                  }
                  if (!pic) {
                    photos = user?.profilePicture?.url;
                  }
                  return (
                    <div>
                      <div
                        style={{
                          width: "12rem",
                          height: "12rem",
                          position: "relative",
                          borderRadius: "1rem",
                          overflow: "hidden",
                        }}
                        className="dashboard-profiles-icons"
                      >
                        <img
                          width={"100%"}
                          src={photos}
                          alt="profile"
                          style={{ opacity: 1 }}
                        />
                        <div className="profile-info">
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 0,
                            }}
                          >
                            <div>
                              <span>
                                {user?.FirstName} {user?.LastName}
                              </span>{" "}
                              <HeartFilled />
                              <br />
                            </div>
                            <span>Age: {calculateAge(user?.DOB)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "12rem",
                    borderRadius: "1rem",
                    objectFit: "contain",
                    overflow: "hidden",
                  }}
                >
                  <span>See</span>
                  <span>More</span>
                </div>
              </div>
            </div>
            <hr />
            <div className="main-filters">
              <Select
                placeholder="Select State Wise"
                className="filter-dropdown"
                onChange={(option) => {
                  setUsers([]);
              setFilters(prev => ({ ...prev, state: option }));
              refetch();
                }}
                value={filters.state || undefined}
                allowClear
                showSearch
                onClear={() => {
                  setUsers([]);
                  setFilters(prev => ({ ...prev, state: "" }));
                  refetch();
                }}
                
              >
                {State.getStatesOfCountry("IN").map((state) => (
                  <Select.Option label={state.name} value={state.name}>
                    {state.name}
                  </Select.Option>
                ))}
              </Select>
              <div className="ages-from-to-filters">
                <Select
                  placeholder="Ages From"
                  className="ages-from-filter"
                  value={filters.lower !== 10 ? filters.lower : undefined}
                  onChange={(option) => {
                    setUsers([]);
                    setFilters(prev => ({ ...prev, lower: option }));
                    refetch();
                  }}
                  allowClear
                  onClear={() => {
                    setUsers([]);
                    setFilters(prev => ({ ...prev, lower: 10 }));
                    refetch();
                  }}
                >
                  {Array.from(Array(30).keys()).map((_, index) => {
                    return (
                      <Select.Option value={index + 15}>
                        {index + 15}
                      </Select.Option>
                    );
                  })}
                </Select>
                <div style={{ width: "2%" }}>
                  <hr></hr>
                </div>
                <Select
                  placeholder="To"
                  className="ages-to-filter"
                  value={filters.upper !== 50 ? filters.upper : undefined}
                  onChange={(option) => {
                    setUsers([]);
                    setFilters(prev => ({ ...prev, upper: option }));
                    refetch();
                  }}
                  allowClear
                  onClear={() => {
                    setUsers([]);
                    setFilters(prev => ({ ...prev, upper: 50 }));
                    refetch();
                  }}
                >
                  {Array.from(Array(30).keys()).map((_, index) => {
                    return (
                      <Select.Option value={index + 15}>
                        {index + 15}
                      </Select.Option>
                    );
                  })}
                </Select>
              </div>
              <Select
                placeholder="Marital Status"
                className="filter-dropdown"
                value={
                  filters.marital_status !== ""
                    ? filters.marital_status
                    : undefined
                }
                onChange={(option) => {
                  setUsers([]);
                  setFilters(prev => ({ ...prev, marital_status: option }));
                  refetch();
                }}
                allowClear
                onClear={() => {
                  setUsers([]);
                  setFilters(prev => ({ ...prev, marital_status: "" }));
                  refetch();
                }}
              >
                <Select.Option value="Never Married">
                  Never Married
                </Select.Option>
                <Select.Option value="Married">Married</Select.Option>
                <Select.Option value="Divorcee">Divorcee</Select.Option>
              </Select>
              <Button
            type="primary"
            className="filters-button"
            style={{ backgroundColor: "red" }}
            onClick={() => setOpen(true)}
          >
            Filters
          </Button>

          <Button
            className="reset-button"
            onClick={handleResetFilters}
            icon={<ReloadOutlined />}
          >
            Reset
          </Button>
              <div className="table-list-view-icons">
                <UnorderedListOutlined />
                <AppstoreOutlined />
              </div>
            </div>
            <div className="main-content">
              <p>Based On Your Preferences We Found {"67"} People</p>
              <div style={{ scrollBehavior: "smooth" }}>
                <Row gutter={[12, 12]}>
                  {users?.map((user, index) => {
                    const pic = user?.Pictures;
                    let photos = null;
                    if (pic) {
                      photos = pic?.replace(/[\[\]']/g, "").split(", ");
                    }
                    if (!pic) {
                      photos = user?.profilePicture?.url;
                      console.log("photo -> user ",  user?.profilePicture)
                    }
                    return (
                      <Col>
                        <div
                          style={{
                            width: "12rem",
                            height: "12rem",
                            position: "relative",
                            borderRadius: "1rem",
                            objectFit: "contain",
                            overflow: "hidden",
                            cursor: "pointer",
                          }}
                          className="dashboard-profiles-icons"
                          onClick={() => navigate(`/profile/${user?.id}`)}
                        >
                          <img
                            width={"100%"}
                            src={photos}
                            alt="profile"
                            style={{ opacity: 1 }}
                          />
                          <div className="profile-info">
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 0,
                              }}
                            >
                              <div>
                                <span>
                                  {user?.FirstName} {user?.LastName}
                                </span>{" "}
                                <HeartFilled
                                  style={
                                    user?.liked
                                      ? { color: "red" }
                                      : { color: "white" }
                                  }
                                />
                                <br />
                              </div>
                              <span>Age: {calculateAge(user?.DOB)}</span>
                            </div>
                          </div>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </div>
              <div
                style={{
                  marginTop: "1rem",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <LoadingOutlined />
              </div>
            </div>
          </div>
        </div>
      
      </div>
      <Modal
        title={
          <div style={{ display: "flex", justifyContent: "center" }}>
            Filters
          </div>
        }
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >  
       <div>
          <Form onFinish={handleApplyFilters}>
            <Form.Item name="state">
              <Select placeholder="Select State Wise" allowClear showSearch>
                {State.getStatesOfCountry("IN").map((state) => (
                  <Select.Option label={state.name} value={state.name}>
                    {state.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <div style={{ display: "flex", gap: "10%" }}>
              <Form.Item style={{ width: "45%" }} name="lower">
                <Select
                  placeholder="Ages From"
                  allowClear
                  value={filters.lower}
                >
                  {Array.from(Array(30).keys()).map((_, index) => {
                    return (
                      <Select.Option value={index + 15}>
                        {index + 15}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item style={{ width: "45%" }} name="upper">
                <Select placeholder="To" allowClear>
                  {Array.from(Array(30).keys()).map((_, index) => {
                    return (
                      <Select.Option value={index + 15}>
                        {index + 15}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>
            <Form.Item name="marital_status">
              <Select placeholder="Marital Status" allowClear>
                <Select.Option value="Never Married">
                  Never Married
                </Select.Option>
                <Select.Option value="Married">Married</Select.Option>
                <Select.Option value="Divorcee">Divorcee</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="profession">
              <Select placeholder="Profession" allowClear>
                <Select.Option value="Private Job">Private Job</Select.Option>
                <Select.Option value="Government Job">
                  Goverment Job
                </Select.Option>
                <Select.Option value="Divorcee">Divorcee</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="education">
              <Select placeholder="Education" allowClear>
                <Select.Option value="Doctorate">Doctorate</Select.Option>
                <Select.Option value="Post Graduate">
                  Post Graduate
                </Select.Option>
                <Select.Option value="Graduate">Graduate</Select.Option>
                <Select.Option value="High School">High School</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                style={{ backgroundColor: "red", color: "white" }}
                htmlType="submit"
              >
                Apply
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default Dashboard;
