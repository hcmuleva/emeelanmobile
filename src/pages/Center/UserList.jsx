import React, { useState, useEffect } from "react";
import { useTable, useUpdate } from "@refinedev/core";
import { Table, Button, Space, Modal, Form, Input, message,  Tag, Typography,Spin,Descriptions } from "antd";
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import UserCard from "./UserCard";
import { RegisterUser } from "./RegisterUser";


const { Text } = Typography;

export const UserList = () => {
    const { tableQueryResult: { data: usersData, isLoading }, current, setCurrent, pageSize, setPageSize, total } = useTable({
        resource: "users",
        meta: { populate: ["Pictures"] },
        sort: [{ field: "id", order: "desc" }],
        pagination: { pageSize: 10, current: 1 },
    });



    const { mutate } = useUpdate();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isRegisterUser, setIsRegisterUser] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [form] = Form.useForm();
    const [searchTerm, setSearchTerm] = useState(""); // ✅ Search filter
    const [filteredData, setFilteredData] = useState([]); // ✅ Filtered users
   
    useEffect(() => {
        if (usersData?.data) {
            const keywords = searchTerm.toLowerCase().split(" "); // ✅ Split input by space
            
            const filtered = usersData.data.filter(user =>
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
            );
            setFilteredData(filtered);
        }
    }, [searchTerm, usersData]);
    if(isLoading) return <Spin />;
    const handleEdit = (record) => {
        setSelectedUser(record);
        form.setFieldsValue(record);
        setIsEditModalOpen(true);
    };

    const handleUpdate = async () => {
        try {
            const values = await form.validateFields();
            mutate({
                resource: "users",
                id: selectedUser.id,
                values,
                successNotification: () => message.success("User updated successfully!"),
                errorNotification: () => message.error("Failed to update user"),
            });
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Validation failed:", error);
        }
    };

        
    const handleViewDetails = (record) => {
        console.log("Viewing user:", record);
        setSelectedUser(record);
        setIsViewModalOpen(true);
    };

    const columns = [
        {  title: "ID", dataIndex: "id", key:"id", width: 120,render: (id, record) => (
            <a onClick={() => handleViewDetails(record)}>{id}</a>
          ) },
        { title: "First Name", dataIndex: "FirstName", key: "FirstName", width: 135 },
        {
            title: "Mobile",
            dataIndex: "mobile",
            key: "mobile",
            width: 122,
            render: (value, record) => record.mobile ? record.mobile : record.MobileNumber
          },
      
        { title: "State", dataIndex: "State", key: "State", width: 130 },
        { title: "Address", dataIndex: "Address", key: "Address", width: 180 },
        {
            title: "Actions",
            key: "actions",
            width: 200,
            render: (record) => (
                <Space>
                    <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
            
                </Space>
            ),
        },
          {
            "title": "Status",
            "dataIndex": "userstatus",
            "key": "userstatus",
            "width": 150
          },
          {
            title: "Verification",
            dataIndex: "profile_checked",
            key: "profile_checked",
            width: 120,
            render: (value) => (
              value ? <CheckCircleFilled style={{ color: 'green' }} /> : <CloseCircleFilled style={{ color: 'red' }} />
            )
          },
       
          {
            "title": "First Name",
            "dataIndex": "FirstName",
            "key": "FirstName",
            "width": 125
          },
          {
            "title": "Last Name",
            "dataIndex": "LastName",
            "key": "LastName",
            "width": 125
          },
          {
            "title": "Gotra",
            "dataIndex": "Gotra",
            "key": "Gotra",
            "width": 125
          },
          {
            "title": "State",
            "dataIndex": "State",
            "key": "State",
            "width": 110
          },
           
          {
            "title": "Profession",
            "dataIndex": "Profession",
            "key": "Profession",
            "width": 125
          },
          {
            "title": "DOB",
            "dataIndex": "DOB",
            "key": "DOB",
            "width": 106
          },
          {
            "title": "Sex",
            "dataIndex": "Sex",
            "key": "Sex",
            "width": 90
          },
        //   {
        //     "title": "Actions",
        //     "key": "actions",
        //     "width": 200,
        //     "render": "CustomActionsRenderer"
        //   }
    ]

    return (
        <div>
            <Button onClick={()=>setIsRegisterUser(true)}>Register User</Button>    
            {/* ✅ Input-based search filter */}
            <Input
                placeholder="Search Mobile, Status, Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: 16, width: "50%" }}
            />
            
         
      <RegisterUser open={isRegisterUser} onClose={()=>setIsRegisterUser(false)} />
            <Table
                columns={columns}
                dataSource={filteredData}
                rowKey="id"
                pagination={{
                    current,
                    pageSize,
                    total,
                    onChange: (page, pageSize) => {
                        setCurrent(page);
                        setPageSize(pageSize);
                    },
                }}
                scroll={{ y: 500 }}
            />

            {/* ✅ Edit Modal */}
            <Modal
                title="Edit User"
                open={isEditModalOpen}
                onCancel={() => setIsEditModalOpen(false)}
                onOk={handleUpdate}
                okText="Update"
                cancelText="Cancel"
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="FirstName" label="First Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="MobileNumber" label="Mobile" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="State" label="State">
                        <Input />
                    </Form.Item>
                    <Form.Item name="Address" label="Address">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>

            {/* ✅ View Details Modal */}
            <Modal
                title="User Details"
                open={isViewModalOpen}
                onCancel={() => setIsViewModalOpen(false)}
                footer={[
                    <Button key="close" onClick={() => setIsViewModalOpen(false)}>Close</Button>
                ]}
            >
                {selectedUser && (
                    <UserCard selectedUser={selectedUser} />
                //      <Descriptions bordered column={{ xs: 1, sm: 2, md: 2, lg: 3 }}>
                //      <Descriptions.Item label="First Name">{selectedUser.FirstName}</Descriptions.Item>
                //      <Descriptions.Item label="Last Name">{selectedUser.LastName}</Descriptions.Item>
                //      <Descriptions.Item label="Mobile">{selectedUser.mobile || selectedUser.MobileNumber}</Descriptions.Item>
                //      <Descriptions.Item label="State">{selectedUser.State}</Descriptions.Item>
                //      <Descriptions.Item label="Address">{selectedUser.Address}</Descriptions.Item>
                //      <Descriptions.Item label="Gotra">{selectedUser.Gotra}</Descriptions.Item>
                //      <Descriptions.Item label="Profession">{selectedUser.Profession}</Descriptions.Item>
                //      <Descriptions.Item label="DOB">{selectedUser.DOB}</Descriptions.Item>
                //      <Descriptions.Item label="Sex">{selectedUser.Sex}</Descriptions.Item>
                //      <Descriptions.Item label="Status">
                //          <Tag color={selectedUser.userstatus === "Active" ? "green" : "red"}>
                //              {selectedUser.userstatus}
                //          </Tag>
                //      </Descriptions.Item>
                //      <Descriptions.Item label="Verification">
                //          {selectedUser.profile_checked ? 
                //              <CheckCircleOutlined style={{ color: "green", fontSize: 16 }} /> : 
                //              <CloseCircleOutlined style={{ color: "red", fontSize: 16 }} />}
                //      </Descriptions.Item>
                //  </Descriptions>
                )}
            </Modal>
        </div>
    );
};
