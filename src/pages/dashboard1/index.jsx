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
import AgGridComponent from "./Ag-GridComp";
import UserGridComp from "./UserAgGrid";

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
  if(isLoading){
    return <h1>Page Loading</h1>
  }

  //const gridata=data?.data?.data

  //gridata['dateOfBirthVisible']=false
 //return <UserGridComp rowData={gridata}/>
 return <AgGridComponent rowData={data?.data?.data}/>

};

export default Dashboard;