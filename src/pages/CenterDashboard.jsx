import React, { useState } from "react";
import { useList } from "@refinedev/core";
import { Button, Card, Space, Spin } from "antd";
import CenterTableView from "./UserDashboard/CenterTableView";

const CenterDashBoard = () => {
  const [userStatus, setUserStatus] = useState("PENDING");
  const { data: usersData, isLoading, isFetching,refetch } = useList({
    resource: "users",
    meta: {
      populate: ["Pictures"],
    },
    filters: [
      ...(userStatus
        ? [{ field: "userstatus", operator: "eq", value: userStatus }]
        : []),
      {
        field: "marital",
        operator: "ne", // 'not equal' operator
        value: "Married(Only for Admin)",
      },
    ],
    sort: {
      field: "id", // Replace with the field you want to sort by
      order: "desc", // or "asc" for ascending order
    },
  });
  if(isLoading){
    <h1>Loading</h1>
  }
  if(isFetching){
    <h1>Fething</h1>
  }
  const handleFilterChange = (status) => setUserStatus(status);

  return (
    <>
      <Card bordered={false} style={{ textAlign: "center" }}>
        <Space>
          {[ "APPROVED", "PENDING", "BLOCKED"].map((status) => (
            <Button key={status} onClick={() => handleFilterChange(status)}>
              {status}
            </Button>
          ))}
        </Space>
      </Card>
      {!isLoading && <CenterTableView rowData={usersData?.data} refetch={refetch} />}
    </>
  );
};

export default React.memo(CenterDashBoard);
