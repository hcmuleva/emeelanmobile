import { useOne } from '@refinedev/core';
import { Button } from 'antd';
import React from 'react'

export default function ProfileActions({setView}) {
    console.log("We are here in profileLike")
    const userId= localStorage.getItem("userid")
    const { data, isLoading } = useOne({
        resource: "users",
        id: String(userId),
        meta: {
          populate: ["requeststo"], // Ensure proper population
        },
      });
    console.log("Data",data)
  /**
   *  1. I need to make a query to user and profile and then get fields
   *    1) Profile AcceptedByMe
   *    2) Profile RejectByMe 
   *    3) Profile Accpted
   *    4) Profile Rejected
   *    userobject.accepted,userobject.rejected,userobject.acceptedbyme,userobject.rejectedbyme,
   *    requestbyme, requestedtome.
   *  */  
  
  return (
    <div>
        <Button onClick={()=>setView("LIST")}>SetList</Button>
      <h1>Profile Like to me</h1>
    </div>
  )
}
