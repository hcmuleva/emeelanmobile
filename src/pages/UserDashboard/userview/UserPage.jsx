import { Button } from "antd";
import React, { useState, useEffect } from "react";
import FilterUserDialog from "./FilterUserDialog";
import UserTable from "./UserTable";
import FilterTableData from "./FilterTableData";

const API_URL = import.meta.env.VITE_SERVER_URL;
const pageSize = 10;

const UserPage = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [onApplyFilters, setOnApplyFilters] = useState(false)
  const [pageview,setPageview] = useState("DEFAULT")
  const [filters,setFilters] = useState({})
  console.log("Filters from userpage onApplyFilters",onApplyFilters)
  console.log("Filters from userpage isFilterModalOpen",isFilterModalOpen)
  return (
    <>
      <Button onClick={()=>setIsFilterModalOpen(true)}>Filter</Button>
       <FilterUserDialog isFilterModalOpen={isFilterModalOpen} setIsFilterModalOpen={setIsFilterModalOpen} setOnApplyFilters={setOnApplyFilters} setPageview={setPageview}/>
      {pageview === "DEFAULT" && <UserTable  />}
      {pageview === "FILTERED" && <FilterTableData setPageview={setPageview} onApplyFilters={onApplyFilters}/>}
    </>
  )
  
};

export default UserPage;
