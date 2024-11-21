
import { Avatar, Button, Card, Modal, Select } from 'antd';
import React,{useRef,useState} from 'react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import { useUpdate } from '@refinedev/core';
//import ProfileStatusState from './Stats/ProfileStatusState';
import EngagementCard from './Engaggement/EngagementCard';
import UserProfileCards from './Engaggement/UserPartenerSelector';
import UserPartenerSelector from './Engaggement/UserPartenerSelector';
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

// Boolean Cell Renderer Component
const BooleanCellRenderer = (props) => {
  return (
    <span className={`text-sm ${props.value ? 'text-green-600' : 'text-red-600'}`}>
      {props.value ? "Yes" : "No"}
    </span>
  );
};

const CenterTableView = ({rowData,refetch}) => {
    const gridRef = useRef(null);
    const [pairObject,setPairObject] = useState([])
    const { mutate:updateUser } = useUpdate();
    const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);

  // Open Modal
  const handleButtonClick = (data) => {
    console.log("DATA for Gathjod",data)
    setModalData(data);
    setIsModalVisible(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setModalData(null);
  };
    const statusOptions = [
        "APPROVED",
        "UNAPPROVED",
        "REJECTED",
        "BLOCKED",
        "PENDING",
      ];

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
        console.log("UserStatusEditor Props ",props)
        const handleChange = (value) => {
          if (props?.data?.id) {
            updateUser({
              resource: "users",
              id: props?.data?.id,
              values: {
                userstatus: value,
                profile_checked: true,
              },
             
            });
          }
        };
      
        return (
          <Select
            defaultValue={props.value}
            style={{ width: "100%" }}
            onChange={handleChange}
          >
            {statusOptions.map((status) => (
              <Option key={status} value={status}>
                {status}
              </Option>
            ))}
          </Select>
        );
      };
      
      
      // const handleCellValueChanged = (params) => {
      //   console.log("Params",params)
      //   if (params.colDef.field === "userstatus") {
      //     const { id } = params.data;
      //     const newValue = params.newValue;
      //     console.log("Row ID:", id, "New Status:", newValue);
            
      //     // Call the handler passed as a prop
      //     if (onStatusChange) {
      //       onStatusChange(id, newValue);
      //     }
      //   }
      // };
    
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
            headerName: "profile_checked", 
            field: "profile_checked", 
            editable: true, // Make this column editable
           
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
          headerName: 'GAATHJOD',
          field: 'gaathjod',
          cellRenderer: (params) => (
            <Button
              type="primary"
              onClick={() => handleButtonClick(params.data)}
            >
              GAATHJOD
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
        {/* <ProfileStatusState rowData={rowData}  refetch={refetch}/> */}
        <Card bordered={false} style={{ textAlign: 'center' }}>
          <Button onClick={() => gridRef.current.api.setFilterModel(null)}>
            Reset Filters  need to change HHCCMM
          </Button>
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
         
        {/* <EngagementCard rowData={rowData} modalData={modalData}/> */}

        </Modal>
      </div>
    );
  };
  
  export default CenterTableView;
