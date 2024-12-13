import React, { useState, useEffect } from "react";
import { useList } from "@refinedev/core";
import { Button, Card, Space, Spin } from "antd";
import CenterTableView from "./UserDashboard/CenterTableView";

const CenterDashBoard = () => {
  const [userStatus, setUserStatus] = useState("PENDING");

  // Add more specific filters and logging
  const listParams = {
    resource: "custom-user",
    meta: {
      populate: ["Pictures"],
    },
    filters: [
      {
        field: "userstatus",
        operator: "eq",
        value: userStatus,
      },
      {
        field: "marital",
        operator: "ne",
        value: "Married(Only for Admin)",
      },
    ],
    sort: [
      {
        field: "id",
        order: "desc",
      },
    ],
    pagination: {
      pageSize: 10,
      current: 1,
    },
  };

  const { data: usersData, isLoading, isFetching, refetch } = useList(listParams);

  // Add debug logging
  useEffect(() => {
    console.log("Current filters:", listParams.filters);
    console.log("Response data:", usersData);
  }, [usersData, userStatus]);

  const handleFilterChange = (status) => {
    console.log("Changing status to:", status);
    setUserStatus(status);
  };

  const statusOptions = ["APPROVED", "PENDING", "BLOCKED", "UNAPPROVED", "REJECTED"];

  // Debug the current data
  const filteredData = usersData?.data?.filter(
    (user) => user.userstatus === userStatus
  );

  return (
    <>
      <Card bordered={false} style={{ textAlign: "center" }}>
        <Space>
          {statusOptions.map((status) => (
            <Button
              key={status}
              type={userStatus === status ? "primary" : "default"}
              onClick={() => handleFilterChange(status)}
            >
              {status} ({filteredData?.filter(user => user.userstatus === status).length || 0})
            </Button>
          ))}
        </Space>
      </Card>

      <div style={{ margin: '10px 0', fontSize: '12px', color: '#666' }}>
        Current Filter: {userStatus} | Total Results: {filteredData?.length || 0}
      </div>

      {isLoading || isFetching ? (
        <Spin tip="Loading..." />
      ) : (
        <CenterTableView 
          rowData={filteredData} 
          refetch={refetch} 
        />
      )}
    </>
  );
};

export default React.memo(CenterDashBoard);