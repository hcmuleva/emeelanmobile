import { useList } from '@refinedev/core';
import { Avatar, Button, Modal, Spin } from 'antd';
import React,{useState} from 'react'
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import ProfileDetailCard from './ProfileDetailCard';


export default function FilterTableData({setPageview,onApplyFilters}) {
  const [profileData, setProfileData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

const { data: usersData, isLoading:userLodding } = useList ({
  resource: "users",
  meta: { populate: ["Pictures"] },
  filters:onApplyFilters,
  sort: [{ field: "id", order: "desc" }],
  pagination: { pageSize: 10, current: 1 },
});
if(userLodding) return <Spin size="large" />
const users = usersData?.data;

const AvatarImage = ({ src }) => {
  return (
    <Avatar src={src} size={64} />

  );
};

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

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      {/* Only keeping the Filter button */}
      <GridToolbarQuickFilter />

    </GridToolbarContainer>
  );
};
const handleButtonClick = (data) => {
  setProfileData(data);
  setIsModalVisible(true);
  //setView("DETAILS")
};
const handleCloseModal = () => {
  setIsModalVisible(false);
  setProfileData(null);
};
const handleViewDetails = (record) => {
   setProfileData(record);
   setIsModalVisible(true);
};
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
return (
    <div>
      <Button onClick={()=>setPageview("DEFAULT")}>Back</Button>  
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
  rows={users}
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
    </div>
  )
}
