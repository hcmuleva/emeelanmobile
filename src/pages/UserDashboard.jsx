import { useCustom } from '@refinedev/core';
import React, { useState } from 'react';
import UserTableView from './UserDashboard/UserTableView';

const API_URL = import.meta.env.VITE_SERVER_URL;

export default function UserDashboard() {
    const [current, setCurrent] = useState(1);
    const [pageSize] = useState(20);

    const { data, isLoading, isFetching, refetch } = useCustom({
        url: `${API_URL}/api/custom-user`,
        method: "get",
        config: {
            headers: {
                "x-custom-header": "foo-bar",
                Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
            },
        },
        query: {
            pagination: { page: current, pageSize },
        }
    });

    if (isLoading) {
        return <h1>Page Loading...</h1>;
    }

    // Filter for users with 'APPROVED' status
    const approvedUsers = data?.data?.data?.filter(user => user.userstatus === "APPROVED");

    return (
        <>
            <UserTableView rowData={approvedUsers} refetch={refetch} />
        </>
    );
}
