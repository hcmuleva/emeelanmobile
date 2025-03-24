import React, { useState, useEffect } from "react";
import { useList, useUpdate } from "@refinedev/core";
import { Tabs,Button, Card, Space, Spin, message, Table } from "antd";
import CenterTableView from "../UserDashboard/CenterTableView";
import TabPane from "antd/es/tabs/TabPane";
import AdminTab from "./AdminTab";
import { UserList } from "./UserList";
import { RegisterUser } from "./RegisterUser";

const CenterDashBoard = () => {
  const [userStatus, setUserStatus] = useState("PENDING");
  const [isUpdating, setIsUpdating] = useState(false);
  const [fetchedStatuses, setFetchedStatuses] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
  const [isRegisterUser, setIsRegisterUser] = useState(false);

  // Open modal and set status
  const openModal = (status) => {
    setCurrentStatus(status);
    setIsModalOpen(true);
  };
  const { mutate: updateUser } = useUpdate();

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

  useEffect(() => {
    console.log("Current filters:", listParams.filters);
    console.log("Response data:", usersData);
  }, [usersData, userStatus]);

  const handleFilterChange = (status) => {
    console.log("Changing status to:", status);
    setUserStatus(status);
    if (!fetchedStatuses[status]) {
      setFetchedStatuses((prevStatuses) => ({ ...prevStatuses, [status]: true }));
    }
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

  const statusOptions = ["APPROVED", "PENDING", "BLOCKED", "REJECTED","ENGAGED"];

  const filteredData = usersData?.data?.filter(
    (user) => user.userstatus === userStatus
  );
  const tableData = statusOptions.map((status, index) => ({
    key: index,
    status,
    count: usersData?.data?.filter((user) => user.userstatus === status).length || 0,
  }));
  const columns = [
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (record) => (
    //     <Button type="primary" onClick={() => openModal(record.status)}>
    //       Modify_Status
    //     </Button>
    //   ),
    // },
  ];
  return (
    <>

     <Tabs defaultActiveKey="home" centered>
     <TabPane tab="Home" key="home">
     <div style={{ 
          textAlign: "center", 
          padding: "20px", 
          fontSize: "18px", 
          lineHeight: "1.6",
          backgroundColor: "#f9f9f9",
          borderRadius: "10px"
        }}>
          <h3>✨ ई-मीलन(E-Meelan) ✨</h3>

          <p>अब रिश्ता ढूंढ़ना हुआ और आसान! 💍💖</p>
          <p>अब आप <strong>आयु, कार्य, स्थान और वैवाहिक स्थिति</strong> के आधार पर अपने लिए उपयुक्त रिश्ता आसानी से ढूंढ सकते हैं।
          
           <strong>अपना सही जीवनसाथी खोजें, आज ही शुरू करें!</strong></p>
          
          {/* <h2>✨ Emeelan’s New Avatar! ✨</h2> */}
          <p>Finding a match is now easier than ever! 💍💖</p>
          <p>Now, you can search for relationships based on <strong>age, profession, location, and marital status</strong> effortlessly.
          
          <strong>Find your perfect match today!</strong></p>
          
       
        </div>
     </TabPane>
        <TabPane tab="UserStatus" key="userstatus">

        <Table dataSource={tableData} columns={columns} pagination={false} />
        {/* {statusOptions.map((status) => (
          <Button
            key={status}
            type={userStatus === status ? "primary" : "default"}
            onClick={() => handleFilterChange(status)}
          >
            {status} ({usersData?.data?.filter(user => user.userstatus === status).length || 0})
          </Button>
        ))}
         */}
        </TabPane>
        <TabPane tab="User" key="user">
        {/* <Card bordered={false} style={{ textAlign: "center" }}>
    
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Space wrap>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
    Reset User Password
  </Button>
        
      </Space>
  
    </Space>
    <Space>
      
    </Space>
  </Card>
  {isLoading || isFetching ? (
        <Spin tip="Loading..." />
      ) : (
        <CenterTableView 
          rowData={filteredData} 
          refetch={refetch} 
        />
      )} */}
      <UserList />
        </TabPane>
        <TabPane tab="AdminList" key="adminlist">
            <AdminTab />
          </TabPane>
     </Tabs>

         
     
      <div style={{ margin: '10px 0', fontSize: '14px', color: '#666' }}>
        Current Filter: {userStatus} | Total Results: {filteredData?.length || 0}
      </div>
    </>
  );
};

export default React.memo(CenterDashBoard);
