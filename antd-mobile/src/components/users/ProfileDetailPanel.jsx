import { Button, Divider, Image, List, NavBar, Space, Tag, Toast } from "antd-mobile";
import { HeartOutline, TeamOutline, UserOutline, LeftOutline } from "antd-mobile-icons";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { customsingleuser, newConnectionRequest } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

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

const ProfileDetailPanel = () => {
  const { user: selfUser, jwt } = useContext(AuthContext);
  const { profileid } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [msg,setMsg] = useState("")
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const res = await customsingleuser(profileid, jwt);
        setProfile(res.mybasicdata);
        
        // Check connection status
        if (selfUser?.id && profileid && res.connectionRequests) {
          const connection = res.connectionRequests.find(request => 
            (request.sender.id === selfUser.id && request.receiver.id === parseInt(profileid)) || 
            (request.receiver.id === selfUser.id && request.sender.id === parseInt(profileid))
          );
          if(selfUser.id ==connection.sender.id&& profileid == connection.receiver.id){
            setMsg(`Request Status: ${connection.status}`)
          }
          if(selfUser.id ==connection.receiver.id&& profileid == connection.sender.id){
            if(connection.status ==="PENDING"){
              setMsg(`Action Require: ${connection.status}`)
            }else {
              setMsg(`Status: ${connection.status}`)
            }
           
          }
          console.log("contnection status", connection?.status, "Connection ", connection.sender.id, connection.receiver.id)
          setConnectionStatus(connection?.status || null);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        Toast.show("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfile();
  }, [profileid, jwt, selfUser]);

  const handleBack = () => navigate(-1);

  const handleConnectionRequest = async () => {
    try {
      await newConnectionRequest({
        sender: selfUser?.id,
        receiver: parseInt(profileid),
        status: "PENDING"
      });
      setConnectionStatus("PENDING");
      Toast.show("Connection request sent");
    } catch (error) {
      Toast.show("Failed to send request");
    }
  };

  const renderConnectionButton = () => {
    if (!selfUser || selfUser.id === parseInt(profileid)) return null;

    switch(connectionStatus) {
      case 'PENDING':
        const isSender = profile?.connectionRequests?.some(req => 
          req.sender.id === selfUser.id && req.receiver.id === parseInt(profileid)
        );
        return (
          <>
        
          <Button block disabled color={isSender ? 'primary' : 'warning'}>
            {isSender ? "Request Sent" :` ${msg}`}
          </Button>

          </>
          
        );
      case 'ACCEPTED':
        return <Button block disabled color='success'>Connected</Button>;
      case 'REJECTED':
        return <Button block disabled color='danger'>Request Rejected</Button>;
      case 'BLOCKED':
        return <Button block disabled color='danger'>Blocked</Button>;
      default:
        return (
          <Button block color="primary" onClick={handleConnectionRequest}>
            Connect
          </Button>
        );
    }
  };

  if (isLoading) return <div style={{ padding: 24, textAlign: 'center' }}>Loading profile...</div>;
  if (!profile) return <div style={{ padding: 24, textAlign: 'center' }}>Profile not found</div>;

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <NavBar 
        onBack={handleBack} 
        style={{ backgroundColor: theme.primary, color: "white" }}
      >
        Profile Details
      </NavBar>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0 16px" }}>
        {/* Profile Header */}
        <div style={{ display: "flex", alignItems: "center", padding: "20px 0" }}>
          <Image
            src={profile.profileImage || "https://via.placeholder.com/100"}
            width={80}
            height={80}
            style={{ borderRadius: "50%", marginRight: 16 }}
          />
          <div>
            <h2 style={{ margin: 0, color: theme.primary }}>
              {profile.firstName} {profile.lastName}
            </h2>
            <div style={{ color: theme.textLight }}>
              {profile.age && `${profile.age} yrs`} • {profile.location}
            </div>
          </div>
        </div>

        {/* About Me Section */}
        {profile.aboutme && (
          <>
            <Divider contentPosition="left" style={{ color: theme.primary }}>
              <Space align="center">
                <UserOutline />
                <span>About</span>
              </Space>
            </Divider>
            <List>
              {profile.aboutme.about && (
                <List.Item description={profile.aboutme.about}>About Me</List.Item>
              )}
              {profile.aboutme.hobby && (
                <List.Item description={profile.aboutme.hobby}>Hobby</List.Item>
              )}
              {profile.aboutme.height && (
                <List.Item description={profile.aboutme.height}>Height</List.Item>
              )}
            </List>
          </>
        )}

        {/* Family Section */}
        {profile.families?.length > 0 && (
          <>
            <Divider contentPosition="left" style={{ color: theme.primary }}>
              <Space align="center">
                <TeamOutline />
                <span>Family</span>
              </Space>
            </Divider>
            <List>
              {profile.families.map((member, index) => (
                <List.Item
                  key={index}
                  description={`${member.type || ''}${member.age ? ` • ${member.age}` : ''}`}
                >
                  {member.firstName} {member.lastName}
                </List.Item>
              ))}
            </List>
          </>
        )}

        {/* Education Section */}
        {profile.educations?.length > 0 && (
          <>
            <Divider contentPosition="left" style={{ color: theme.primary }}>
              <Space align="center">
                <UserOutline />
                <span>Education</span>
              </Space>
            </Divider>
            <List>
              {profile.educations.map((edu, index) => (
                <List.Item
                  key={index}
                  description={`${edu.institute || ''}${edu.year ? ` • ${edu.year}` : ''}`}
                >
                  {edu.degreeName || 'Education'}
                </List.Item>
              ))}
            </List>
          </>
        )}

        {/* Profession Section */}
        {profile.professions?.length > 0 && (
          <>
            <Divider contentPosition="left" style={{ color: theme.primary }}>
              <Space align="center">
                <UserOutline />
                <span>Profession</span>
              </Space>
            </Divider>
            <List>
              {profile.professions.map((job, index) => (
                <List.Item
                  key={index}
                  description={`${job.organization || ''}${job.salary ? ` • ${job.salary}` : ''}`}
                >
                  {job.title || 'Professional'}
                </List.Item>
              ))}
            </List>
          </>
        )}
      </div>

      {/* Footer Actions */}
      <div style={{ padding: 16, borderTop: "1px solid #f0f0f0" }}>
        {renderConnectionButton()}
      </div>
    </div>
  );
};

export default ProfileDetailPanel;