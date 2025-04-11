import { Button, Divider, Image, List, NavBar, Space, Tag, Toast } from "antd-mobile";
import { HeartOutline, TeamOutline, UserOutline, LeftOutline } from "antd-mobile-icons";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//import { customsingleuser, newConnectionRequest } from "../../services/api";
import { AuthContext } from "../../../context/AuthContext";
import { customsingleuser } from "../../../services/api";

const theme = {
  primary: "#800000",
  secondary: "#A52A2A",
  accent: "#D2691E",
  light: "#F5F5DC",
  text: "#333333",
  textLight: "#666666",
  success: "#006400",
  warning: "#FFA500",
  danger: "#8B0000",
  background: "#FFFFFF",
};

const UserDetails = ({profileid}) => {
  const { jwt } = useContext(AuthContext);
  
  const [user,setUser] = useState({})
  const navigate = useNavigate();
  const [basicData, setbasicData] = useState({});
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [msg,setMsg] = useState("")
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const res = await customsingleuser(profileid, jwt);
        setbasicData(res.mybasicdata);
        setUser(res)
        console.log("RES ",res)
        // Check connection status
        // if (selfUser?.id && profileid && res.connectionRequests) {
        //   const connection = res.connectionRequests.find(request => 
        //     (request.sender.id === selfUser.id && request.receiver.id === parseInt(profileid)) || 
        //     (request.receiver.id === selfUser.id && request.sender.id === parseInt(profileid))
        //   );
        //   if(selfUser.id == connection?.sender?.id&& profileid == connection?.receiver?.id){
        //     setMsg(`Request Status: ${connection?.status}`)
        //   }
        //   if(selfUser.id == connection?.receiver?.id&& profileid == connection?.sender?.id){
        //     if(connection?.status ==="PENDING"){
        //       setMsg(`Action Require: ${connection?.status}`)
        //     }else {
        //       setMsg(`Status: ${connection.status}`)
        //     }
           
        //   }
        //   console.log("contnection status", connection?.status, "Connection ", connection?.sender.id, connection?.receiver.id)
        //   setConnectionStatus(connection?.status || null);
        // }
      } catch (error) {
        console.error("Error fetching profile:", error);
        Toast.show("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfile();
  }, [profileid, jwt]);

  const handleBack = () => navigate(-1);

  // const handleConnectionRequest = async () => {
  //   try {
  //     await newConnectionRequest({
  //       sender: selfUser?.id,
  //       receiver: parseInt(profileid),
  //       status: "PENDING"
  //     });
  //     setConnectionStatus("PENDING");
  //     Toast.show("Connection request sent");
  //   } catch (error) {
  //     Toast.show("Failed to send request");
  //   }
  // };

  // const renderConnectionButton = () => {
  //   if (!selfUser || selfUser.id === parseInt(profileid)) return null;

  //   switch(connectionStatus) {
  //     case 'PENDING':
  //       const isSender = profile?.connectionRequests?.some(req => 
  //         req.sender.id === selfUser.id && req.receiver.id === parseInt(profileid)
  //       );
  //       return (
  //         <>
        
  //         <Button block disabled color={isSender ? 'primary' : 'warning'}>
  //           {isSender ? "Request Sent" :` ${msg}`}
  //         </Button>

  //         </>
          
  //       );
  //     case 'ACCEPTED':
  //       return <Button block disabled color='success'>Connected</Button>;
  //     case 'REJECTED':
  //       return <Button block disabled color='danger'>Request Rejected</Button>;
  //     case 'BLOCKED':
  //       return <Button block disabled color='danger'>Blocked</Button>;
  //     default:
  //       return (
  //         <Button block color="primary" onClick={handleConnectionRequest}>
  //           Connect
  //         </Button>
  //       );
  //   }
  // };

  if (isLoading) return <div style={{ padding: 24, textAlign: 'center' }}>Loading profile...</div>;
  //if (!profile) return <div style={{ padding: 24, textAlign: 'center' }}>Profile not found</div>;
  let userImage = "https://demo.adminkit.io/img/avatars/avatar-4.jpg";
  
  const images=user.Pictures || {};
  if (images.photos?.[0]?.url) {
    userImage = images.photos[0].url;
  } else if (images.profilePicture?.url) {
    userImage = images.profilePicture.url;
  } else if (Array.isArray(images.pictures) && images.pictures[0]) {
    userImage = images.pictures[0];
  }

  const normalizedFamilies = (basicData?.families || []).map((member) => ({
    firstName: member.firstName || member.name || "Unknown",
    lastName: member.lastName || "",
    type: Array.isArray(member.type) ? member.type.join(", ") : member.type || "Unknown",
    relation: Array.isArray(member.relation) ? member.relation.join(", ") : member.relation || "Unknown",
    age: member.age || "Unknown",
    gotra: member.gotra || "Unknown",
    profession: member.profession || "Unknown",
  }));

  console.log({user}, "userObh")
  
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <NavBar onBack={handleBack} style={{ backgroundColor: theme.primary, color: "white" }}>
        Profile Details
      </NavBar>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px" }}>
        {/* Profile Header */}
        <div style={{ display: "flex", alignItems: "center", padding: "20px 0" }}>
          <Image
            src={userImage}
            width={80}
            height={80}
            style={{ borderRadius: "50%", marginRight: 16 }}
          />
          <div>
            <h2 style={{ margin: 0, color: theme.primary }}>
              {user?.FirstName || "First"} {user?.LastName || "Last"}
            </h2>
            <div style={{ color: theme.textLight }}>
              {(user?.age ? `${user.age} yrs` : "Age Unknown")} • {user?.location || "Location Unknown"}
            </div>
          </div>
        </div>

        {/* User Summary */}
        <List>
          {(user?.FirstName || "First")} {(basicData?.families?.[0]?.name || "Father")} {(basicData?.families?.[0]?.gotra || "Gotra")} ({profileid})
        </List>

        {/* About Me Section */}
        <>
          <Divider contentPosition="left" style={{ color: theme.primary }}>
            <Space align="center">
              <UserOutline />
              <span>About</span>
            </Space>
          </Divider>
          <List>
            {basicData?.aboutme?.about ? (
              <List.Item description={basicData.aboutme.about}>About Me</List.Item>
            ) : (
              <List.Item description={"No About Me Given"}>About Me</List.Item>
            )}
            {basicData?.aboutme?.hobby ? (
              <List.Item description={basicData.aboutme.hobby}>Hobby</List.Item>
            ) : (
              <List.Item description={"No Hobby Given"}>Hobby</List.Item>
            )}
            {basicData?.aboutme?.height ? (
              <List.Item description={basicData.aboutme.height}>Height</List.Item>
            ) : (
              <List.Item description={"No Height Given"}>Height</List.Item>
            )}
            {basicData?.aboutme?.color ? (
              <List.Item description={basicData.aboutme.color}>Color</List.Item>
            ) : (
              <List.Item description={"No Color Given"}>Color</List.Item>
            )}
          </List>
        </>

        {/* Family Section */}
        <>
          <Divider contentPosition="left" style={{ color: theme.primary }}>
            <Space align="center">
              <TeamOutline />
              <span>Family</span>
            </Space>
          </Divider>
          <List>
            {normalizedFamilies.length > 0 ? (
              normalizedFamilies.map((member, index) => (
                <List.Item
                  key={index}
                  description={`${member.relation} • ${member.age} • ${member.profession}`}
                >
                  {member.firstName} {member.lastName}
                </List.Item>
              ))
            ) : (
              <List.Item description="No Family Info Available">Family</List.Item>
            )}
          </List>
        </>

        {/* Education Section */}
        <>
          <Divider contentPosition="left" style={{ color: theme.primary }}>
            <Space align="center">
              <UserOutline />
              <span>Education</span>
            </Space>
          </Divider>
          <List>
            {basicData?.educations?.length > 0 ? (
              basicData.educations.map((edu, index) => (
                <List.Item
                  key={index}
                  description={`${edu.institute || "Unknown Institute"}${edu.year ? ` • ${edu.year}` : ""}`}
                >
                  {edu.degreeName || "Degree"}
                </List.Item>
              ))
            ) : (
              <List.Item description="No Education Info Given">Education</List.Item>
            )}
          </List>
        </>

        {/* Profession Section */}
        <>
          <Divider contentPosition="left" style={{ color: theme.primary }}>
            <Space align="center">
              <UserOutline />
              <span>Profession</span>
            </Space>
          </Divider>
          <List>
            {basicData?.professions?.length > 0 ? (
              basicData.professions.map((job, index) => (
                <List.Item
                  key={index}
                  description={`${job.organization || "Unknown Org"}${job.salary ? ` • ${job.salary}` : ""}`}
                >
                  {job.title || "Title Unknown"}
                </List.Item>
              ))
            ) : (
              <List.Item description="No Profession Info Given">Profession</List.Item>
            )}
          </List>
        </>
      </div>

      {/* Footer */}
      <div style={{ padding: 16, borderTop: "1px solid #f0f0f0" }}></div>
    </div>
  );
};

export default UserDetails;