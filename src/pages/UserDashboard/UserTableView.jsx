import { Avatar, Button, Card, Modal, Select, Space } from 'antd';
import React, { useRef, useState } from 'react';

import { useUpdate } from '@refinedev/core';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import UserPartenerSelector from './Engaggement/UserPartenerSelector';
import ProfileStatusState from './Stats/ProfileStatusState';
import ProfileDetails from './ProfileDetails';
const { Option } = Select;
import { getTwoToneColor, HeartFilled, HeartTwoTone, setTwoToneColor } from '@ant-design/icons';
import { FilterIcon, HeartHandshake } from 'lucide-react';
import LikedByMe from './profile/LikedByMe';
import LikedToMe from './profile/LikedToMe';

// Simple Image Component with Fallback
const AvatarImage = ({ src }) => {
  return (
    <Avatar src={src} size={64} />

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
  console.log("UserTableView rowData",rowData)
  // Open Modal
  const handleButtonClick = (data) => {
    console.log("DATA for Gathjod",data)
    setProfileData(data);
    // setIsModalVisible(true);
    setView("DETAILS")
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
    const columnDefs = [
        {
            headerName: "Pictures",
            field: "Pictures",
            cellRenderer: ImageCellRenderer,
            width: 90,
            autoHeight: true,
            cellStyle: { 
                display: 'flex', 
                alignItems: 'center', 
                padding: '5px'
            }
        },

        { 
            headerName: "ID", 
            field: "id", 
            width: 120
        },
  
          
        
        { 
            headerName: "FirstName", 
            field: "FirstName", 
            width: 135
        },
        { 
            headerName: "LastName", 
            field: "LastName", 
            width: 135
        },
        { 
          headerName: "Gotra", 
          field: "Gotra", 
          width: 130
      },
        {
          headerName:"Profession",
          field:"Profession",
          width:190
        },
        { 
            headerName: "State", 
            field: "State", 
            width: 150
        },
       
        { 
            headerName: "DOB", 
            field: "DOB", 
            width: 120
        },
        {
          headerName:"WorkingCity",
          field:"WorkingCity",
          width: 150

        },
        {
          headerName: 'Detail',
          field: 'gaathjod',
          cellRenderer: (params) => (
            <Button
              type="primary"
              onClick={() => handleButtonClick(params.data)}
            >
              Details
            </Button>
          ),
          width: 120,
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
     <Space.Compact style={{ flexWrap: "wrap", justifyContent: "flex-start", gap: "8px" }}>
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
</Space.Compact>
      {view==="REQUESTED" && <LikedByMe />}
      {view==="RECIEVED"&&<LikedToMe/> }
      {view==="DETAILS"&&<ProfileDetails setView={setView} profileData={profileData} calledBy={"USER"}/>}
      {view==="LIST"&&<div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        {/* <ProfileStatusState rowData={rowData}  refetch={refetch}/> */}
        
       <Card bordered={false} style={{ textAlign: 'center' }}>
        
       </Card>
      
        <AgGridReact
         
          rowData={rowData}
          ref={gridRef}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
          domLayout="autoHeight"
          rowHeight={50}
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