import { Avatar, Button, Card, Modal, Select, Space } from 'antd';
import React, { useRef, useState } from 'react';

import { useUpdate } from '@refinedev/core';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import UserPartenerSelector from './Engaggement/UserPartenerSelector';
import ProfileStatusState from './Stats/ProfileStatusState';
import ProfileDetails from './ProfileDetails';
import ProfileActions from '../myProfile/ProfileActions';
const { Option } = Select;

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
  const [profileData, setProfileData] = useState(null);

  // Open Modal
  const handleButtonClick = (data) => {
    console.log("DATA for Gathjod",data)
    setProfileData(data);
    setView("DETAILS")
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
            width: 125
        },
        { 
            headerName: "LastName", 
            field: "LastName", 
            width: 125
        },
        {
          headerName:"Profession",
          field:"Profession",
          width:125
        },
        { 
            headerName: "State", 
            field: "State", 
            width: 110
        },
       
        { 
            headerName: "DOB", 
            field: "DOB", 
            width: 106
        },
        {
          headerName:"WorkingCity",
          field:"WorkingCity",
          width: 124

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

    return (
      <>
      
      {view==="DETAILS"&&<ProfileDetails setView={setView} profileData={profileData}/>}
      {view==="LIST"&&<div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        
       <Card bordered={false} style={{ textAlign: 'center' }}>
         <Space>
          <Button color="danger" variant="dashed"  onClick={() => gridRef.current.api.setFilterModel(null)}>
            Reset Filters
          </Button>
         
         
        
          </Space>
       </Card>
        <AgGridReact rowData={rowData}   rowHeight={50} />
      </div>}
      </>
    );
  };
  
  export default UserTableView;