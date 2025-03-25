import { Avatar, Button, Card, Modal, Select, Space } from 'antd';
import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar,GridToolbarContainer, GridToolbarQuickFilter  } from '@mui/x-data-grid';
import { useUpdate } from '@refinedev/core';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
// import { AgGridReact } from 'ag-grid-react';
import UserPartenerSelector from './Engaggement/UserPartenerSelector';
import ProfileStatusState from './Stats/ProfileStatusState';
// import ProfileDetails from './ProfileDetails';
const { Option } = Select;
import { getTwoToneColor, HeartFilled, HeartTwoTone, setTwoToneColor } from '@ant-design/icons';
import { FilterIcon, HeartHandshake } from 'lucide-react';
import LikedByMe from './profile/LikedByMe';
import LikedToMe from './profile/LikedToMe';
import ProfileDetails from './ProfileDetails';

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



const UserTableView = ({rowData,refetch}) => {
    const gridRef = useRef(null);
    const[view,setView] = useState("LIST")
    const [pairObject,setPairObject] = useState([])
    const { mutate:updateUser } = useUpdate();
    const [isModalVisible, setIsModalVisible] = useState(false);
  const [profileData, setProfileData] = useState(null);
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
        width: 120 
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
    return (
      <>
     {/* <Space.Compact style={{ flexWrap: "wrap", justifyContent: "flex-start", gap: "8px" }}>
  {view === "LIST" && (
    <Button
      color="danger"
      variant="dashed"
      onClick={() => gridRef.current.api.setFilterModel(null)}
      style={{ whiteSpace: "nowrap" }}
    >
      <FilterIcon size={15} style={{ color: "brown" }} /> Reset
    </Button>
  )}

  {view !== "LIST" && (
    <Button color="danger" variant="dashed" onClick={() => setView("LIST")}>
      LIST
    </Button>
  )}

  <Button
    color="danger"
    variant="dashed"
    onClick={() => setView("REQUESTED")}
    style={{ whiteSpace: "nowrap" }}
  >
    <HeartTwoTone style={{ color: getTwoToneColor() }} /> requested
  </Button>

  <Button
    color="danger"
    variant="dashed"
    onClick={() => setView("RECIEVED")}
    style={{ whiteSpace: "nowrap" }}

  >
    <HeartFilled style={{ color: "red" }} /> recieved
  </Button>

  <Button
    color="danger"
    variant="dashed"
    onClick={() => setView("LIKEDTOME")}
    style={{ whiteSpace: "nowrap" }}
  >
    <HeartHandshake style={{ color: "red" }} /> रिस्ते
  </Button>

</Space.Compact> */}
      {view==="REQUESTED" && <LikedByMe />}
      {view==="RECIEVED"&&<LikedToMe/> }

      {view==="DETAILS"&&<ProfileDetails setView={setView} profileData={profileData} calledBy={"USER"}/>}
      {view==="LIST"&&<div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>

       <Modal
        title="Profile Details"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="close" onClick={handleCloseModal}>
            Close
          </Button>,
        ]}
      >
        {profileData && (
         <ProfileDetails setView={setView} profileData={profileData} calledBy={"USER"} setProfileData={setProfileData}/>
        )}
      </Modal>

        {/* <ProfileStatusState rowData={rowData}  refetch={refetch}/> */}
        
       <Card bordered={false} style={{ textAlign: 'center' }}>
        
       </Card>
      
        {/* <AgGridReact
         
          rowData={rowData}
          ref={gridRef}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
          
          domLayout="autoHeight"
          rowHeight={50}
        /> */}
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
        {/* Modal */}
        {/* <Modal
          title="GAATHJOD Details"
          visible={isModalVisible}
          onCancel={handleCloseModal}
          footer={[
            <Button key="close" onClick={handleCloseModal}>
              Close
            </Button>,
          ]}
        >
         
          <UserPartenerSelector firstUser={modalData} rowData={rowData} setPairObject={setPairObject} setIsModalVisible={setIsModalVisible}/>
         

        </Modal> */}
      </div>}
      </>
    );
  };
  
  export default UserTableView;