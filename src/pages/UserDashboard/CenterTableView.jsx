
import { Avatar, Button, Card, Modal, notification, Select } from 'antd';
import React, { useRef, useState } from 'react';

import { useUpdate } from '@refinedev/core';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import UserPartenerSelector from './Engaggement/UserPartenerSelector';
import { FilterIcon, HeartHandshake } from 'lucide-react';
import ProfileDetails from './ProfileDetails';
import { UserAddOutlined } from '@ant-design/icons';
import { RegisterPage } from '../register/register';
const { Option } = Select;

// Simple Image Component with Fallback
const ImageCellRenderer = ({ value }) => {
  if (!value) {
    return <span>No Image</span>;
  }

  let images = [];
  // Parse the value if it's a string
  if (typeof value === "string") {
    try {
      images = JSON.parse(value.replace(/'/g, '"')); // Replace single quotes and parse
    } catch (error) {
      console.error("Failed to parse Pictures field:", value, error);
      return <span>Invalid Image</span>;
    }
  } else if (Array.isArray(value)) {
    images = value; // Directly use the array if already parsed
  }

  const firstImage = images[0]; // Get the first image
  return firstImage ? (
    <Avatar src={firstImage} size={64} />
  ) : (
    <span>No Image</span>
  );
};

const BooleanCellRenderer = (props) => {
  const { mutate:updateUser } = useUpdate();
  const handleCheckboxChange = (event) => {
    const newValue = event.target.checked;
    console.log("Checkbox toggled:", newValue, " data ",props.data);
   
        updateUser(
          {
            resource: "users", // Adjust the resource name to match your API
            id: props?.data?.id,
            values: {
              profile_checked: newValue,
            },
          },
          {
            onSuccess: () => {
              notification.success({
                message: "Success",
                description: `${props?.data?.FirstName}'s profile status successfully verified to ${newValue}`,
              });
            },
            onError: (error) => {
              notification.error({
                message: "Error",
                description: `Failed to update status for ${props?.data?.FirstName}: ${error.message}`,
              });
            },
          }
        );
  };

  return (
    <input
      type="checkbox"
      checked={props.value}
      onChange={handleCheckboxChange}
      className="cursor-pointer"
    />
  );
};



const CenterTableView = ({rowData,refetch}) => {
  const[view,setView] = useState("LIST")
  const gridRef = useRef(null);
  const [profileData, setProfileData] = useState(null);

    const [pairObject,setPairObject] = useState([])
    const { mutate:updateUser } = useUpdate();
    const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);

  // Open Modal
  const handleButtonClick = (data) => {
    setModalData(data);
    setIsModalVisible(true);
  };
  const handleDetailButtonClick = (data) => {
    console.log("DATA for Gathjod",data)
    setProfileData(data);
    setView("DETAILS")
  };

  // Close Modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setModalData(null);
  };
  const statusOptions = ["APPROVED", "UNAPPROVED", "REJECTED", "BLOCKED", "PENDING"];

      const profile_checked_val = [
        true,
        false
      ]
      const ProfileCheckedEditor = (props) => {
        console.log("Ptppd ")
        // Start with the initial value
        const [checked, setChecked] = React.useState(props.value || false);
      
        const handleChange = (value) => {
          console.log("HAAvalue",value, "props", props, "\n ID ", props?.data?.id)
       };
   
       return (
         <Select
           defaultValue={props.value}
           style={{ width: "100%" }}
           onChange={handleChange}
         >
           <Option key={true} value={true}>
               {TRUE}
             </Option>
             <Option key={false} value={false}>
               {FALSE}
             </Option>
         </Select>
       );
      };
      const UserStatusEditor = (props) => {
        const { mutate: updateUser } = useUpdate();
      
        const handleChange = (value) => {
          if (props?.data?.id) {
            // Update the user's status
            updateUser(
              {
                resource: "users", // Adjust the resource name to match your API
                id: props?.data?.id,
                values: {
                  userstatus: value,
                },
              },
              {
                onSuccess: () => {
                  notification.success({
                    message: "Success",
                    description: `${props?.data?.FirstName}'s profile status successfully updated to ${value}`,
                  });
                },
                onError: (error) => {
                  notification.error({
                    message: "Error",
                    description: `Failed to update status for ${props?.data?.FirstName}: ${error.message}`,
                  });
                },
              }
            );
          }
        };
      
        
        return (
          <Select
            defaultValue={props.value}
            style={{ width: "100%" }}
            onChange={handleChange}
          >
            {["APPROVED", "UNAPPROVED", "REJECTED", "BLOCKED", "PENDING"].map(
              (status) => (
                <Option key={status} value={status}>
                  {status}
                </Option>
              )
            )}
          </Select>
        );
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
            headerName: "Status",
            field: "userstatus",
            editable: true, // Make this column editable
            cellEditor: UserStatusEditor, // Use custom cell editor
            width: 150,
          },
          
          { 
            headerName: "Verification", 
            field: "profile_checked", 
            editable: true, // Make this column editable
            cellRenderer:BooleanCellRenderer,
            width: 120
        },
        { 
            headerName: "First Name", 
            field: "FirstName", 
            width: 125
        },
        { 
            headerName: "Last Name", 
            field: "LastName", 
            width: 125
        },
        { 
            headerName: "State", 
            field: "State", 
            width: 110
        },
        { 
            headerName: "Mobile", 
            field: "mobile", 
            width: 122
        },
        {
          headerName:"Profession",
          field:"Profession",
          width:125
        },
        { 
            headerName: "DOB", 
            field: "DOB", 
            width: 106
        },
        { 
            headerName: "Sex", 
            field: "Sex", 
            width: 90
        },
        {
          headerName: 'Detail',
          field: 'gaathjod',
          cellRenderer: (params) => (
            <Button
              type="primary"
              onClick={() => handleDetailButtonClick(params.data)}
            >
              Details
            </Button>
          ),
          width: 120,
        },
        {
          headerName: 'GAATHJOD',
          field: 'gaathjod',
          cellRenderer: (params) => (
            <Button
              color='danger'
              variant='dashed'
              onClick={() => handleButtonClick(params.data)}
            >
             <HeartHandshake style={{ color: "red" }} /> रिस्ते
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
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
         {view==="REGISTER" &&<RegisterPage userrole={"CENTER"} createdBy={localStorage.getItem("userid")} setView={setView}/>}
         {view==="DETAILS"&&<ProfileDetails setView={setView} profileData={profileData}/>}
         {view==="LIST"&&
        <>
        <Button
      color="danger"
      variant="dashed"
      onClick={() => gridRef.current.api.setFilterModel(null)}
      style={{ whiteSpace: "nowrap" }}
    >
      <FilterIcon size={15} style={{ color: "brown" }} /> Reset
    </Button>
    <Button
      color="danger"
      variant="dashed"
      onClick={()=>setView("REGISTER")}
      style={{ whiteSpace: "nowrap" }}
      disabled={true}
    >
      <UserAddOutlined size={15} style={{ color: "brown" }} /> Register
    </Button>
        <AgGridReact
          rowData={rowData}
          ref={gridRef}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}

          domLayout="autoHeight"
          rowHeight={50}
        /></>}
        
        {/* Modal */}
        <Modal
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

        </Modal>
      </div>
    );
  };
  
  export default CenterTableView;