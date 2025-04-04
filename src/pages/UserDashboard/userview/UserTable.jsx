import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { useCustom, useUpdate } from '@refinedev/core';
import { Avatar, Button, Modal, Select, Spin } from 'antd';
import React, { useRef, useState } from 'react';

import { setTwoToneColor } from '@ant-design/icons';
import ProfileDetailCard from './ProfileDetailCard';

//import ProfileDetails from './ProfileDetails';

const { Option } = Select;
const API_URL = import.meta.env.VITE_SERVER_URL;

// Simple Image Component with Fallback
const AvatarImage = ({ src }) => {
  return (
    <Avatar src={src} size={64} />

  );
};
const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      {/* Only keeping the Filter button */}
      <GridToolbarQuickFilter />

    </GridToolbarContainer>
  );
};
// Image Cell Renderer Component
const ImageCellRenderer = (props) => {
  const images = props.value;
  
  if (!images || !Array.isArray(images) || images.length === 0) {
    return <span className="text-gray-500 text-sm">No Images</span>;
  }
   // Access and display only the first image
   const firstImageUrl = images[0];

   return (
     <div className="flex items-center gap-2">
       <AvatarImage key="image" src={firstImageUrl} />
     </div>
   );
   
};



const UserTableView = ({refetch}) => {

    const gridRef = useRef(null);
    const[view,setView] = useState("LIST")
    const [offset, setOffset] = useState(0);
    const [pageSize] = useState(20);

    const [isModalVisible, setIsModalVisible] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  
  const { data, isLoading } = useCustom({
    url: `${API_URL}/api/custom-user`,
    method: "get",
    config: {
      headers: {
        "x-custom-header": "foo-bar",
        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
      },
    },
    query: {
      pagination: { offset, limit: pageSize },
      sort: "-ID", // Minus sign indicates descending order
    },
  });


  

  if (isLoading) return <>
  <Spin size="large" />
  <h1>Loading...</h1>;
  </>
const rowData = data?.data?.data;
  // Open Modal
  const handleButtonClick = (data) => {
    setProfileData(data);
    setIsModalVisible(true);
    //setView("DETAILS")
  };
  

  // Close Modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setProfileData(null);
  };
  const handleViewDetails = (record) => {

    console.log("Viewing user:", record);
     //setSelectedUser(record);
     setProfileData(record);
     setIsModalVisible(true);
};
    
  const resetFilters = () => {
    gridRef.current.api.setFilterModel(null);
  };
    rowData.forEach((profile) => {
        if (typeof profile.Pictures === 'string') {
            try {
                // Convert string representation to an array
                profile.Pictures = JSON.parse(profile.Pictures.replace(/'/g, '"'));
            } catch (error) {
                console.error("Failed to parse Pictures field for profile ID:", profile.id);
            }
        }
    });
    const columns = [
      { 
        field: 'id', 
        headerName: 'ID', 
        width: 120 ,
        renderCell: (params) => (
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault(); // Prevent default anchor behavior
              handleViewDetails(params.row); // Pass the entire row data
            }}
            style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
          >
            {params.value}
          </a>
        ),
      },
      {
        field: 'Pictures',
        headerName: 'Pictures',
        width: 90,
        renderCell: (params) => {
          return <ImageCellRenderer {...params} />;
        },
        flex: 0,
        sortable: false,
        // MUI doesn't use autoHeight at column level
        // Styling is different in MUI
        sx: {
          display: 'flex',
          alignItems: 'center',
          padding: '5px'
        }
      },
     
      { 
        field: 'FirstName', 
        headerName: 'FirstName', 
        width: 135 
      },
      { 
        field: 'LastName', 
        headerName: 'LastName', 
        width: 135 
      },
      { 
        field: 'Gotra', 
        headerName: 'Gotra', 
        width: 130 
      },
      {
        field: 'Profession',
        headerName: 'Profession',
        width: 190
      },
      { 
        field: 'State', 
        headerName: 'State', 
        width: 150 
      },
      { 
        field: 'DOB', 
        headerName: 'DOB', 
        width: 120 
      },
      {
        field: 'WorkingCity',
        headerName: 'WorkingCity',
        width: 150
      },
      {
        field: 'gaathjod',
        headerName: 'Detail',
        width: 120,
        renderCell: (params) => (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleButtonClick(params.row)}
          >
            Details
          </Button>
        ),
      },
    ];

    const defaultColDef = {
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
    };
    setTwoToneColor('#eb2f96')
    return (<>
    {/* <Button onClick={() => setIsModalVisible(true)}>Filter Users</Button> */}
        {/* Modal */}
        <Modal
           title={
            <div style={{ textAlign: "center", width: "100%" }}>
              {`${profileData?.FirstName} ${profileData?.FatherName} ${profileData?.LastName}`}
            </div>
          }
          visible={isModalVisible}
          onCancel={handleCloseModal}
          footer={[
            <Button key="close" onClick={handleCloseModal}>
              Close
            </Button>,
          ]}
        >
           <ProfileDetailCard  profileData={profileData} calledBy={"USER"} setProfileData={setProfileData}/>
        </Modal>
        <DataGrid
  rows={rowData}
  columns={columns}
  pageSizeOptions={[10, 25, 50]}
  initialState={{
    pagination: {
      paginationModel: { pageSize: 10, page: 0 },
    },
  }}
  slots={{ toolbar: CustomToolbar }} // Use custom toolbar
  disableRowSelectionOnClick
/>
      
      </>
    );
  };
  
  export default UserTableView;