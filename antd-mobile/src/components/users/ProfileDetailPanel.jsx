import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { customsingleuser, newConnectionRequest, updateConnectionRequest, updateConnectionStatus, updateUserData } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import UserDetails from "./useractions/UserDetails";
import { Button, Card, Space, Tag, Toast } from "antd-mobile";

const ProfileDetailPanel = () => {
  const { user, jwt } = useContext(AuthContext);
  const { profileid } = useParams();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);
  const [connRequests, setConnRequests] = useState(null);
  const [loading, setLoading] = useState(false);

  const getProfileData = async () => {
    try {
      const data = await customsingleuser(profileid, jwt);
      console.log("\n\ngetProfileDataProfileData",data.connectionRequests);
      
      setProfileData(data);
      setConnRequests(data?.connectionRequests || null);
    } catch (error) {
      console.error("Failed to fetch profile data", error);
    }
  };
  console.log("connectionRequest",connRequests)
  useEffect(() => {
    getProfileData();
  }, []);

  const handleRequest = async () => {
    setLoading(true);
    try {
      await newConnectionRequest({sender:user.id, receiver:profileid, status:"PENDING"});
      Toast.show({ icon: 'success', content: "Connection request sent" });

      getProfileData();
    } catch (error) {
      Toast.show({ icon: 'fail', content: "Failed to send request" });

    }
    setLoading(false);
  };

  const handleConnectionUpdate = async (status) => {
    /**
     * 1. I need to accept or declient the connection request. 
     * 2. I need to filter connRequests list to get single row where sender is profileid and reciver is user.id
     */
    const connectionToUpdate = connRequests.find(
      (req) => req.sender?.id == profileid && req.receiver?.id === user.id
    );
    console.log("connectionToUpdate", connectionToUpdate)
    console.log("status", status, "")
  
    const updateresp=await updateConnectionRequest(connectionToUpdate.id, {status})
    Toast.show({ icon: 'success', content: `You accepted Request for profile id ${profileid}` });
    console.log("updated ",updateresp)
    if (!connRequests?.id) return;
    setLoading(true);
    // try {
    //   await updateConnectionStatus(connectionRequest.id, status, jwt);
    //   message.success(`Request ${status.toLowerCase()}`);
    //   getProfileData();
    // } catch (error) {
    //   message.error("Failed to update status");
    // }
    setLoading(false);
  };
 const handleUserStatus = async (actionname) =>{
  const response = await updateUserData({userstatus:actionname}, profileid)
   console.log(`For Profile id ${profileid} USERSTATUS:",${actionname} changed and response ${response}`)
 }
  const renderActionButtons = () => {
    if (!profileData || !user) return null;

    const role = user.emeelanrole;
   
  const connRequest = connRequests.find(
    (req) =>
      (req.sender?.id === user.id && req.receiver?.id === profileData.id) ||
      (req.receiver?.id === user.id && req.sender?.id === profileData.id)
  );

  const isSender = connRequest?.sender?.id === user.id;
  const isReceiver = connRequest?.receiver?.id === user.id;
  const status = connRequest?.status;

  console.log("isSender:", isSender, "isReceiver:", isReceiver, "status:", status);

  // MEELAN role logic
  if (role === "MEELAN") {
    if (!connRequest) {
      return <Button type="primary" loading={loading} onClick={handleRequest}>Request</Button>;
    } else if (isSender) {
      return (
        <Tag color={status === "ACCEPTED" ? "green" : "red"}>
          Your request status: {status}
        </Tag>
      );
    } else if (isReceiver && status === "PENDING") {
      return (
        <Space>
          <Button onClick={() => handleConnectionUpdate("ACCEPTED")} loading={loading}>Accept</Button>
          <Button danger onClick={() => handleConnectionUpdate("DECLINED")} loading={loading}>Decline</Button>
        </Space>
      );
    } else if (isReceiver && status !== "PENDING") {
      return (
        <Tag color={status === "ACCEPTED" ? "green" : "red"}>
          You responded: {status}
        </Tag>
      );
    }
  }

  // ADMIN/CENTER/SUPERADMIN logic
  if (["ADMIN", "CENTER", "SUPERADMIN"].includes(role)) {
    return (
      <Space>
       <Button color='success' onClick={() => handleUserStatus("APPROVED")}>Approve</Button>
<Button color='warning' onClick={() => handleUserStatus("REJECTED")}>Reject</Button>
<Button color='danger' onClick={() => handleUserStatus("BLOCKED")}>Block</Button>
<Button color='warning' type="dashed" onClick={() => handleUserStatus("SUSPENDED")}>Suspend</Button> </Space>
    );
  }

  return null;
};

  return (
    <Card title="" extra={renderActionButtons()}>
      {profileData ? <UserDetails profileData={profileData} profileid={profileid}/> : "Loading..."}
      {renderActionButtons()}
    </Card>
  );
};

export default ProfileDetailPanel;
