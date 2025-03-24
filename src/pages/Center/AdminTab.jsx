import React, { useState, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, Button, Box } from "@mui/material";
import { useList } from "@refinedev/core";

const AdminTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Fetch data first
  const { data: usersData, isLoading } = useList({
    resource: "users",
    meta: { populate: ["Pictures"] },
    filters: [{ field: "marital", operator: "eq", value: "Married(Only for Admin)" }],
    sort: [{ field: "id", order: "desc" }],
    pagination: { pageSize: 10, current: 1 },
  });

  // Move useMemo BEFORE conditional returns
  const filteredData = useMemo(() => {
    if (!usersData?.data) return [];
    const keywords = searchQuery.toLowerCase().split(" ");
    return usersData.data.filter((user) =>
      keywords.every(
        (keyword) =>
          user.id.toString().includes(keyword) ||
          user.name?.toLowerCase().includes(keyword) || // Add optional chaining
          user.MobileNumber?.toLowerCase().includes(keyword) ||
          user.State?.toLowerCase().includes(keyword) ||
          user.Address?.toLowerCase().includes(keyword)
      )
    );
  }, [searchQuery, usersData?.data]);

  // Conditional returns AFTER hooks
  if (isLoading) return <div>Loading...</div>;
  if (!usersData) return <div>No data found</div>;

  // Rest of your component
  // ... (columns, handleEdit, return JSX)


  const columns = [
    
      
     
      { 
        field: 'FirstName', 
        headerName: 'FirstName', 
        width: 135 
      },
    { field: "MobileNumber", headerName: "Mobile", width: 130 },
    { field: "State", headerName: "State", width: 130 },
    { field: "Address", headerName: "Address", width: 180 },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: 120,
    //   renderCell: (params) => (
    //     <Button variant="contained" size="small" onClick={() => handleEdit(params.row)}>
    //       Edit
    //     </Button>
    //   ),
    // },
  ];

  const handleEdit = (user) => {
    console.log("Editing user:", user);
    // Open edit modal or navigate to edit page
  };

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      {/* Search Box */}
      <TextField
        label="Search Users"
        variant="outlined"
        size="small"
        fullWidth
        sx={{ mb: 2 }}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by ID, Name, Mobile, State, Address..."
      />

      {/* MUI DataGrid Table */}
      <DataGrid
        rows={filteredData}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        disableSelectionOnClick
      />
    </Box>
  );
};

export default AdminTab;
