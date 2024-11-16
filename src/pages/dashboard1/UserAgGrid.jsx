import React, { useRef, useState } from "react";
import { Tabs, Button, Avatar } from "antd";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";

const AvatarImage = ({ src }) => <Avatar src={src} size={64} />;

const ImageCellRenderer = (props) => {
  const images = props.value;
  if (!images || !Array.isArray(images) || images.length === 0) {
    return <span className="text-gray-500 text-sm">No Images</span>;
  }
  return (
    <div className="flex items-center gap-2">
      <AvatarImage key="image" src={images[0]} />
    </div>
  );
};

const SexButtonRenderer = (props) => {
  const { value } = props;
  const isMale = value === "Male";
  return (
    <Button
      type="primary"
      style={{
        backgroundColor: isMale ? "#007BFF" : "#FFC0CB",
        borderColor: isMale ? "#0056b3" : "#FF69B4",
      }}
    >
      {value}
    </Button>
  );
};

const UserGridComp = ({ rowData }) => {
  const gridRef = useRef(null);
  const [activeTab, setActiveTab] = useState("all");

  const resetFilters = () => {
    gridRef.current.api.setFilterModel(null);
  };

  rowData.forEach((profile) => {
    if (typeof profile.Pictures === "string") {
      try {
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
      width: 130,
      autoHeight: true,
      cellStyle: { display: "flex", alignItems: "center", padding: "5px" },
    },
    { headerName: "ID", field: "id", width: 80 },
    { headerName: "First Name", field: "FirstName", width: 120 },
    { headerName: "Last Name", field: "LastName", width: 120 },
    { headerName: "State", field: "State", width: 110 },
    {
      headerName: "Sex",
      field: "Sex",
      cellRenderer: SexButtonRenderer,
      width: 120,
    },
    {
      headerName: "DOB",
      field: "DOB",
      width: 100,
    },
  ];

  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    suppressSizeToFit: true,
  };

  const filteredRowData = rowData.filter((row) => {
    if (activeTab === "all") return true;
    return row.Sex === activeTab;
  });

  return (
    <div>
      <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
        <Tabs.TabPane tab="All" key="all">
          <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
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
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Male" key="Male">
          <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
            <AgGridReact
              rowData={filteredRowData}
              ref={gridRef}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              pagination={true}
              paginationPageSize={10}
              domLayout="autoHeight"
              rowHeight={50}
            />
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Female" key="Female">
          <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
            <AgGridReact
              rowData={filteredRowData}
              ref={gridRef}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              pagination={true}
              paginationPageSize={10}
              domLayout="autoHeight"
              rowHeight={50}
            />
          </div>
        </Tabs.TabPane>
      </Tabs>
      <button onClick={resetFilters}>Reset Filters</button>
    </div>
  );
};

export default UserGridComp;
