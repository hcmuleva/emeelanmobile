import { Button, Space, Toast, Divider } from "antd-mobile";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {
  customsingleuser,
  newConnectionRequest,
  updateConnectionRequest,
  updateUserData
} from "../../services/api";
import UserDetails from "./useractions/UserDetails";

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

const baseButtonStyle = {
  color: "white",
  borderRadius: "24px",
  padding: "8px 20px",
  border: "none",
  fontWeight: "bold",
  fontSize: "14px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  transition: "all 0.3s ease-in-out"
};

const gradientBtn = (color1, color2) => ({
  ...baseButtonStyle,
  background: `linear-gradient(135deg, ${color1}, ${color2})`,
});

const statusBadgeStyle = (status) => {
  const statusColors = {
    ACCEPTED: {
      backgroundColor: "rgba(0, 100, 0, 0.1)",
      borderColor: "#006400",
      textColor: "#006400"
    },
    DECLINED: {
      backgroundColor: "rgba(139, 0, 0, 0.1)",
      borderColor: "#8B0000",
      textColor: "#8B0000"
    },
    PENDING: {
      backgroundColor: "rgba(255, 165, 0, 0.1)",
      borderColor: "#FFA500",
      textColor: "#FFA500"
    }
  };

  const colors = statusColors[status] || {
    backgroundColor: "rgba(102, 102, 102, 0.1)",
    borderColor: "#666666",
    textColor: "#666666"
  };

  return {
    display: "inline-flex",
    alignItems: "center",
    padding: "8px 16px",
    borderRadius: "20px",
    backgroundColor: colors.backgroundColor,
    border: `1px solid ${colors.borderColor}`,
    color: colors.textColor,
    fontWeight: "600",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    fontSize: "14px"
  };
};

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
      console.log("\n\ngetProfileDataProfileData", data.connectionRequests);

      setProfileData(data);
      setConnRequests(data?.connectionRequests || null);
    } catch (error) {
      console.error("Failed to fetch profile data", error);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  const handleRequest = async () => {
    setLoading(true);
    try {
      await newConnectionRequest({
        sender: user.id,
        receiver: profileid,
        status: "PENDING",
        message: `User Status is pending from id ${profileid}`
      });
      Toast.show({
        icon: "success",
        content: "Connection request sent",
        position: 'center'
      });

      getProfileData();
    } catch (error) {
      Toast.show({
        icon: "fail",
        content: "Failed to send request",
        position: 'center'
      });
    }
    setLoading(false);
  };

  const handleConnectionUpdate = async (status) => {
    const connectionToUpdate = connRequests.find(
      (req) => req.sender?.id == profileid && req.receiver?.id === user.id
    );

    if (!connectionToUpdate) {
      Toast.show({
        icon: "fail",
        content: "Connection request not found",
        position: 'center'
      });
      return;
    }

    setLoading(true);
    try {
      const updateresp = await updateConnectionRequest(connectionToUpdate.id, {
        status,
      });
      Toast.show({
        icon: "success",
        content: `Request ${status.toLowerCase()} successfully`,
        position: 'center'
      });
      getProfileData();
    } catch (error) {
      Toast.show({
        icon: "fail",
        content: "Failed to update request status",
        position: 'center'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUserStatus = async (actionname) => {
    setLoading(true);
    try {
      console.log(profileid)
      const response = await updateUserData(
        { userstatus: actionname },
        profileid,
        jwt
      );
      Toast.show({
        icon: "success",
        content: `Status updated to ${actionname}`,
        position: 'center'
      });
      getProfileData();
    } catch (error) {
      Toast.show({
        icon: "fail",
        content: "Failed to update user status",
        position: 'center'
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStatusIcon = (status) => {
    if (status === "ACCEPTED") {
      return "✓ ";
    } else if (status === "DECLINED") {
      return "✕ ";
    } else if (status === "PENDING") {
      return "⟳ ";
    }
    return "";
  };

  const renderActionButtons = () => {
    if (!profileData || !user || !connRequests) return null;

    const role = user.emeelanrole;

    const connRequest = connRequests.find(
      (req) =>
        (req.sender?.id === user.id && req.receiver?.id === profileData.id) ||
        (req.receiver?.id === user.id && req.sender?.id === profileData.id)
    );

    const isSender = connRequest?.sender?.id === user.id;
    const isReceiver = connRequest?.receiver?.id === user.id;
    const status = connRequest?.status;

    // MEELAN role logic
    if (role === "MEELAN") {
      if (!connRequest) {
        return (
          <Button
            style={gradientBtn("#7F0000", "#BC0000")}
            loading={loading}
            onClick={handleRequest}
          >
            Send Connection Request
          </Button>
        );
      } else if (isSender) {
        return (
          <div style={statusBadgeStyle(status)}>
            {renderStatusIcon(status)}
            Your request: {status}
          </div>
        );
      } else if (isReceiver && status === "PENDING") {
        return (
          <div className="action-container" style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
            maxWidth: "400px",
            margin: "0 auto"
          }}>
            <div style={{
              backgroundColor: "rgba(128, 0, 0, 0.05)",
              padding: "10px",
              borderRadius: "8px",
              textAlign: "center",
              marginBottom: "5px",
              fontWeight: "500",
              color: theme.primary
            }}>
              Connection Request Received
            </div>
            <div style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center"
            }}>
              <Button
                style={gradientBtn("#006400", "#008000")}
                loading={loading}
                onClick={() => handleConnectionUpdate("ACCEPTED")}
              >
                Accept
              </Button>
              <Button
                style={gradientBtn("#8B0000", "#A52A2A")}
                loading={loading}
                onClick={() => handleConnectionUpdate("DECLINED")}
              >
                Decline
              </Button>
            </div>
          </div>
        );
      } else if (isReceiver && status !== "PENDING") {
        return (
          <div style={{
            ...statusBadgeStyle(status),
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "12px 24px",
            margin: "0 auto"
          }}>
            {renderStatusIcon(status)}
            You responded: {status}
          </div>
        );
      }
    }

    // ADMIN/CENTER/SUPERADMIN logic
    if (["ADMIN", "CENTER", "SUPERADMIN"].includes(role)) {
      return (
        <div className="admin-actions" style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
        }}>
          <div style={{
            backgroundColor: "rgba(128, 0, 0, 0.05)",
            padding: "10px",
            borderRadius: "8px",
            textAlign: "center",
            marginBottom: "5px",
            fontWeight: "500",
            color: theme.primary
          }}>
            Admin Actions
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "10px"
          }}>
            <Button
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                borderRadius: "24px",
                border: "none",
                fontWeight: "600"
              }}
              loading={loading === "APPROVED"}
              onClick={() => handleUserStatus("APPROVED")}
            >
              Approve
            </Button>
            <Button
              style={{
                backgroundColor: "#8B0000",
                color: "white",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                borderRadius: "24px",
                border: "none",
                fontWeight: "600"
              }}
              loading={loading === "REJECTED"}
              onClick={() => handleUserStatus("REJECTED")}
            >
              Reject
            </Button>
            <Button
              style={{
                backgroundColor: "#5A0000",
                color: "white",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                borderRadius: "24px",
                border: "none",
                fontWeight: "600"
              }}
              loading={loading === "BLOCKED"}
              onClick={() => handleUserStatus("BLOCKED")}
            >
              Block
            </Button>
            <Button
              style={{
                backgroundColor: "#FFCC00",
                color: "#000000",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                borderRadius: "24px",
                border: "none",
                fontWeight: "600"
              }}
              loading={loading === "SUSPENDED"}
              onClick={() => handleUserStatus("SUSPENDED")}
            >
              Suspend
            </Button>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top part (NavBar + content) */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {profileData ? (
          <UserDetails profileData={profileData} profileid={profileid} />
        ) : (
          <div style={{
            padding: "40px 20px",
            textAlign: "center",
            color: theme.textLight
          }}>
            Loading profile data...
          </div>
        )}
      </div>

      {/* Divider between content and footer */}
      <Divider style={{
        margin: 0,
        // borderColor: "rgba(139, 0, 0, 0.15)",
        borderStyle: "solid"
      }} />

      {/* Sticky Footer */}
      <div style={{
        position: 'sticky',
        bottom: 25,
        backgroundColor: '#fff',
        textAlign: 'center',
        padding: '16px',

      }}>
        {renderActionButtons()}
      </div>
    </div>
  );
};

export default ProfileDetailPanel;