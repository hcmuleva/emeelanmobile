import React, { useState, useEffect } from "react";
import { useList, useUpdate } from "@refinedev/core";
import { Button, Card, Space, Spin } from "antd";
import CenterTableView from "./UserDashboard/CenterTableView";

const CenterDashBoard = () => {
  const [userStatus, setUserStatus] = useState("PENDING");
  const [isUpdating, setIsUpdating] = useState(false);
  
  const { mutate: updateUser } = useUpdate();

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

  const updateUnapprovedToEngaged = async () => {
    try {
      setIsUpdating(true);
      const unapprovedUsers = usersData?.data?.filter(
        (user) => user.userstatus === "UNAPPROVED"
      );
      console.log("UserStatus", unapprovedUsers)

      if (!unapprovedUsers?.length) {
        message.info("No UNAPPROVED users found to update");
        return;
      }

      // Process updates in sequence to avoid overwhelming the server
      for (const user of unapprovedUsers) {
        updateUser({
          resource: "users",
          id: user.id,
          values: {
            userstatus: "ENGAGED"
          },
        });
        // console.log(`Updated user ${user.id} to ENGAGED status`);
      }

      message.success(`Successfully updated ${unapprovedUsers.length} users to ENGAGED status`);
      refetch(); // Refresh the data
    } catch (error) {
      console.error("Error updating users:", error);
      message.error("Failed to update some users. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const statusOptions = ["APPROVED", "PENDING", "BLOCKED", "UNAPPROVED", "REJECTED","ENGAGED"];

  // Debug the current data
  const filteredData = usersData?.data?.filter(
    (user) => user.userstatus === userStatus
  );

  return (
    <>
      <Card bordered={false} style={{ textAlign: "center" }}>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Space wrap>
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
          
          <Button
            type="primary"
            onClick={updateUnapprovedToEngaged}
            loading={isUpdating}
            disabled={!usersData?.data?.some(user => user.userstatus === "UNAPPROVED")}
          >
            Update UNAPPROVED to ENGAGED
          </Button>
        </Space>
      </Card>

      <div style={{ margin: '10px 0', fontSize: '14px', color: '#666' }}>
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