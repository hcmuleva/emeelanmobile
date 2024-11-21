import {
    HeartFilled
} from "@ant-design/icons";
import { useCustom, useList } from "@refinedev/core";
import React, { memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import calculateAge from "../utils/age-finder";
import "../styles/dashboard.css";
import CenterTableView from "./UserDashboard/CenterTableView";
import "./UserDashboard/dashboard.css";
import { Button, Card, Space } from "antd";
  
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
  
  const CenterDashBoard = () => {
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
    const { data: usersdata, isLoading } = useList({
        resource: "users",
        filters: [
          {
            field: "userstatus",
            operator: "eq", // 'eq' is the operator for equality
            value: "BLOCKED",
          },
        ],
      });
    
      if (isLoading) {
        return <h1>Page Loading...</h1>;
      }
    
      console.log("Filtered User", usersdata)
    console.log("userdata",usersdata)
    // const { data, isLoading, isFetching, refetch } = useCustom({
    //   url: `${API_URL}/api/custom-user`,
    //   method: "get",
    //   config: {
    //     headers: { "x-custom-header": "foo-bar" },
    //     query: {
    //       pagination: { page: current, pageSize },
    //       filters: {
    //         id: localStorage.getItem("userid"),
    //         state: filters.state,
    //         search_string: filters.search_string,
    //         dob_gte: calculateDOB(filters.upper),
    //         dob_lte: calculateDOB(filters.lower),
    //         profession: filters.profession,
    //         marital_status: filters.marital_status,
    //         education: filters.education,
    //       },
    //     },
    //   },
    // });
    // if(isLoading){
    //   return <h1>Page Loading</h1>
    // }

   return  ( <> <Card bordered={false} style={{ textAlign: 'center' }}>
    <Space>
    <Button color='danger' variant='dashed' onClick={() => gridRef.current.api.setFilterModel(null)}>
      APPROVED
    </Button>
    <Button color='danger' variant='dashed' onClick={() => gridRef.current.api.setFilterModel(null)}>
     PENDING
    </Button>
    <Button color='danger' variant='dashed' onClick={() => gridRef.current.api.setFilterModel(null)}>
      BLOCKED
    </Button>
    </Space>
    <Space>
    <Button color='danger' variant='dashed' onClick={() => gridRef.current.api.setFilterModel(null)}>
      VERIFIED
    </Button>
    </Space>
  
  </Card>
   <h1>Heello</h1>
   {/* <CenterTableView rowData={data?.data?.data}/>
    <ProfileStatusState rowData={rowData}  refetch={refetch}/> */}
   </>)
  };
  
  export default CenterDashBoard;