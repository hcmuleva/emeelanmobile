import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { useList } from "@refinedev/core";
import { Avatar, Input, Modal, Spin, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";

export default function UsersStatusQuery() {
    const userStatuses = ["PENDING", "APPROVED", "BLOCKED", "REJECTED", "ENGAGED", "UNAPPROVED"];
    const [userStatus, setUserStatus] = useState("PENDING");
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState(""); // ✅ Search filter
    const [filteredData, setFilteredData] = useState([]); // ✅ Filtered users
    const [isRegisterUser, setIsRegisterUser] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);
    // Fetch users based on userStatus
    const { data: usersData, isLoading } = useList({
        resource: "users",
        meta: { populate: ["Pictures"] ,
            pagination: { pageSize: 10,page: 1,withCount: true },


        },
        filters: [{ field: "userstatus", operator: "eq", value: userStatus }],
        sort: [{ field: "updatedAt", order: "desc" }],
        pagination: { pageSize: 10,page: 1 },
    });

    // Update filtered data whenever usersData or searchTerm changes
    useEffect(() => {
        if (usersData?.data) {
            const keywords = searchTerm.toLowerCase().split(" ");
    
            const filtered = usersData.data
                .filter(user =>
                    keywords.every(keyword =>
                        (user.id ? String(user.id).includes(keyword) : false) ||
                        user.MobileNumber?.toLowerCase().includes(keyword) ||
                        user.mobile?.toLowerCase().includes(keyword) ||
                        user.Status?.toLowerCase().includes(keyword) ||
                        user.Gotra?.toLowerCase().includes(keyword) ||
                        user.userstatus?.toLowerCase().includes(keyword) ||
                        user.FirstName?.toLowerCase().includes(keyword) ||
                        user.State?.toLowerCase().includes(keyword) ||
                        user.Address?.toLowerCase().includes(keyword)
                    )
                )
                // Add sorting to maintain descending order by updatedAt
                .sort((a, b) => {
                    const dateA = new Date(a.updatedAt);
                    const dateB = new Date(b.updatedAt);
                    return dateB - dateA; // Descending order
                });
    
            setFilteredData(filtered);
        }
    }, [searchTerm, usersData]);

    // Ensure search is reset when status changes
    useEffect(() => {
        setSearchTerm(""); // Reset search term when status changes
    }, [userStatus]);

    const handleViewDetails = (record) => {
        setSelectedUser(record);
        setIsViewModalOpen(true);
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 120,
            render: (id, record) => <a onClick={() => handleViewDetails(record)}>{id}</a>,
        },
        {
            title: "Status",
            dataIndex: "userstatus",
            key: "userstatus",
            width: 150,
        },
        {
            title: "UpdatedAt",
            dataIndex: "updatedAt",
            key: "updatedAt",
            width: 150,
        },
        {
            title: "Pictures",
            dataIndex: "Pictures",
            key: "Pictures",
            width: 150,
            render: (pictures) => {
                if (typeof pictures === "string") {
                    try {
                        pictures = JSON.parse(pictures.replace(/'/g, '"'));
                    } catch (error) {
                        console.error("Error parsing pictures:", error);
                        pictures = [];
                    }
                }
                return Array.isArray(pictures) && pictures.length > 0 ? (
                    <Avatar.Group max={{ count: 3 }} size="small">
                        {pictures.map((pic, index) => (
                            <Tooltip key={index} title={`Image ${index + 1}`}>
                                <Avatar src={pic} />
                            </Tooltip>
                        ))}
                    </Avatar.Group>
                ) : (
                    "No Image"
                );
            },
        },
        { title: "First Name", dataIndex: "FirstName", key: "FirstName", width: 135 },
        {
            title: "Mobile",
            dataIndex: "mobile",
            key: "mobile",
            width: 122,
            render: (value, record) => record.mobile || record.MobileNumber,
        },
        { title: "State", dataIndex: "State", key: "State", width: 130 },
        { title: "Address", dataIndex: "Address", key: "Address", width: 180 },
        {
            title: "Verification",
            dataIndex: "profile_checked",
            key: "profile_checked",
            width: 120,
            render: (value) => (value ? <CheckCircleFilled style={{ color: "green" }} /> : <CloseCircleFilled style={{ color: "red" }} />),
        },
        { title: "Last Name", dataIndex: "LastName", key: "LastName", width: 125 },
        { title: "Gotra", dataIndex: "Gotra", key: "Gotra", width: 125 },
        { title: "Profession", dataIndex: "Profession", key: "Profession", width: 125 },
        { title: "DOB", dataIndex: "DOB", key: "DOB", width: 106 },
        { title: "Sex", dataIndex: "Sex", key: "Sex", width: 90 },
    ];

    return (
        <div>
            <h3>Select User Status</h3>
            {userStatuses.map((status) => (
                <button
                    key={status}
                    onClick={() => setUserStatus(status)}
                    style={{
                        fontSize: "10px",
                        margin: "5px",
                        padding: "5px 10px",
                        border: "1px solid #1890ff",
                        borderRadius: "5px",
                        backgroundColor: userStatus === status ? "#1890ff" : "white",
                        color: userStatus === status ? "white" : "black",
                        cursor: "pointer",
                    }}
                >
                    {status}
                </button>
            ))}

            {isLoading ? (
                <div style={{ textAlign: "center", padding: "20px" }}>
                    <Spin size="large" />
                    <p>Loading...</p>
                </div>
            ) : (
                <>
                   
                    {/* ✅ Input-based search filter */}
                    <Input
                        placeholder="Search Mobile, Status, Name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ marginBottom: 16, width: "50%" }}
                    />


                    <Table
                        columns={columns}
                        dataSource={filteredData}
                        rowKey="id"
                        pagination={{
                            pageSize: pageSize,
                            current: page,
                            
                            onChange: (newPage, newPageSize) => {
                                setPage(newPage);
                                setPageSize(newPageSize);
                            },
                            showSizeChanger: true,
                            showTotal: (total,range) => `${range[0]}- ${range[1]} of Total ${total} items`,
                        }}

                        scroll={{ y: 500 }}
                    />
                </>
            )}

            <Modal
                title="User Details"
                visible={isViewModalOpen}
                onCancel={() => setIsViewModalOpen(false)}
                footer={null}
            >
                {selectedUser && <UserCard selectedUser={selectedUser} />}
            </Modal>
        </div>
    );
}
