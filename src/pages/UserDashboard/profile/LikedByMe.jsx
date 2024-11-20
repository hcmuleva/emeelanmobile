import React,{useEffect, useState} from "react";
import { Card, Avatar, Button, Space, Spin } from "antd";
import { useOne, useUpdate } from "@refinedev/core";

export default function LikedByMe() {
  const [status,setStatus] = useState("PENDING")
  const userId = localStorage.getItem("userid");
  const [requestsByState,setRequestsByState]=useState()
  const { data, isLoading } = useOne({
    resource: "users",
    id: String(userId),
    meta: {
      populate: [
        "profilePicture",
        "requeststo",
        "requeststo.photos",
        "requeststo.profilePicture",
      ],
    },
  });

  const { mutate: updateRequestStatus, isLoading: isUpdating } = useUpdate();
  const user = data?.data;
  const notifications = user?.Notification ?? {
    PENDING: [],
    ACCEPTED: [],
    REJECTED: [],
    ACCEPTEDTOME: [],
    REJECTEDTOME: [],
  };
 
  console.log("USER ", user);
  useEffect(() => {
    if (data?.data?.requeststo) {
      setRequestsByState(data.data.requeststo);
    }
  }, [data]);
  const notificationObj = user?.Notification ?? {};
  const acceptedRequests = notificationObj.ACCEPTEDTOME ?? [];
  const pendingRequests = notificationObj.PENDING ?? [];
  
  

  if (isLoading) return <Spin size="large" />;

  const getRequestCard = (request)=>(
    <Card key={request?.id} style={{ marginBottom: "16px" }}>
      <Card.Meta
        avatar={<Avatar src={request?.profilePicture?.url} />}
        title={`${request.FirstName}() ${request?.id})`|| "Anonymous"}
        description={`User: ${request.username} Profession: ${
          request?.profession || "N/A"
        }`}
      />
    
        </Card>
  )
  const renderAcceptedRequestCard = (request)=>{
    if(notifications.ACCEPTEDTOME.includes(request.id)){
        return getRequestCard(request)
    } 
 }
  const renderPendingRequestCard = (request) => {
    return getRequestCard(request)
    // if(notifications.PENDING.includes(request.id)){
       
    // } 
};
console.log("Request by status", requestsByState)

  return (


    <div style={{ padding: "16px" }}>
       
        <Space>
            
            <Button color="danger"variant="dashed"  onClick={()=>{setStatus("PENDING")}}> Pending</Button>
            <Button color="danger" variant="dashed" onClick={()=>{setStatus("ACCEPTED")}}> Accpted</Button>
            {/* <Button color="danger" variant="dashed" onClick={()=>{setStatus("REJECTED")}}> Rejected</Button> */}
            </Space>

        {status==="PENDING"&& requestsByState?.length > 0 &&requestsByState.map((request) => renderPendingRequestCard(request))}
        {status==="ACCEPTED"&&  requestsByState?.length > 0 &&requestsByState.map((request) => renderAcceptedRequestCard(request))}
      
    </div>
  );
}
