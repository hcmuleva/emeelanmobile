import React, { useContext, useState } from "react";
import { Button, Card, Toast } from "antd-mobile";
import { getCustomMe } from "../../services/api";
import { AuthContext, useAuth } from "../../context/AuthContext";

const PendingApprovalCard = ({ userCurrentState, setUserCurrentState }) => {
  //const {user, setUser} = useContext(AuthContext);
  const { user, updateUserField } = useAuth();

  const handleRefresh = async () => {
    // get authentication information from localstorage.
    // if its false then redirect to login page
    const isAuthenticated = localStorage.getItem("authenticated");

    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }
    const jwt = localStorage.getItem("jwt");
    try {
      const latestUser = await getCustomMe(jwt);

      updateUserField("userstatus", latestUser.userstatus);
      if (latestUser?.userstatus === "APPROVED") {
        localStorage.setItem("user", JSON.stringify(latestUser));
        //  setUserCurrentState(latestUser)
        // setUser(latestUser);

        Toast.show({
          icon: "success",
          content: "User status is now APPROVED ✅",
        });
      } else {
        Toast.show({
          icon: "fail",
          content: "Still not approved ❌",
        });
      }
    } catch (error) {
      Toast.show({
        icon: "fail",
        content: "Error fetching user info",
      });
    }
  };

  if (user?.userstatus === "APPROVED") {
    return null; // hide card if already approved
  }

  return (
    <Card 
    style={{ 
      margin: 16,
      padding: 24,
      borderRadius: 8,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      maxWidth: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }}
  >
    <div style={{ marginBottom: 20 }}>
      {/* Profile Update Section */}
      <div style={{
        backgroundColor: '#f0f7ff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 20,
        borderLeft: '4px solid #1890ff'
      }}>
        <p style={{ 
          margin: 0,
          fontSize: 16,
          color: '#333',
          marginBottom: 8
        }}>
          <strong>Profile Incomplete!</strong>
        </p>
        <p style={{ 
          margin: 0,
          fontSize: 14,
          color: '#666',
          marginBottom: 12
        }}>
          आप अपनी प्रोफाइल का डिटेल डालने के लिए यहाँ क्लिक करे
        </p>
        <a
          href="/userprofile"
          style={{
            color: "#1890ff",
            textDecoration: "none",
            fontWeight: 500,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4
          }}
        >
          <span>Profile Update (प्रोफाइल अपडेट)</span>
          <span>→</span>
        </a>
      </div>
  
      {/* Status Information - English */}
      <div style={{
        backgroundColor: '#fffae6',
        padding: 16,
        borderRadius: 8,
        marginBottom: 20,
        borderLeft: '4px solid #faad14'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <span style={{
            display: 'inline-block',
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: '#faad14',
            marginRight: 8
          }}></span>
          <p style={{ 
            margin: 0,
            fontSize: 16,
            color: '#333',
            fontWeight: 500
          }}>
            Profile Status
          </p>
        </div>
        <p style={{ 
          margin: 0,
          fontSize: 14,
          color: '#666',
          marginBottom: 12
        }}>
          Your profile ID: <strong style={{ color: '#1890ff' }}>{user?.id}</strong> is currently in <strong style={{ color: '#faad14' }}>pending</strong> status. Please contact the admin for further assistance.
        </p>
        <a
          href="/adminlist"
          style={{
            color: "#1890ff",
            textDecoration: "none",
            fontWeight: 500,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            fontSize: 14
          }}
        >
          <span>Click here to view admin list</span>
          <span>→</span>
        </a>
      </div>
  
      {/* Status Information - Hindi */}
      <div style={{
        backgroundColor: '#fffae6',
        padding: 16,
        borderRadius: 8,
        marginBottom: 20,
        borderLeft: '4px solid #faad14'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <span style={{
            display: 'inline-block',
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: '#faad14',
            marginRight: 8
          }}></span>
          <p style={{ 
            margin: 0,
            fontSize: 16,
            color: '#333',
            fontWeight: 500
          }}>
            प्रोफाइल स्थिति
          </p>
        </div>
        <p style={{ 
          margin: 0,
          fontSize: 14,
          color: '#666',
          marginBottom: 12
        }}>
          आपका प्रोफ़ाइल ID: <strong style={{ color: '#1890ff' }}>{user?.id}</strong> फिलहाल <strong style={{ color: '#faad14' }}>Pending</strong> स्थिति में है। कृपया सहायता के लिए एडमिन से संपर्क करें।
        </p>
        <a
          href="/adminlist"
          style={{
            color: "#1890ff",
            textDecoration: "none",
            fontWeight: 500,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            fontSize: 14
          }}
        >
          <span>एडमिन सूची देखने के लिए यहां क्लिक करें</span>
          <span>→</span>
        </a>
      </div>
    </div>
  
    <Button 
      type="primary" 
      onClick={handleRefresh}
      style={{
        backgroundColor: '#1890ff',
        borderColor: '#1890ff',
        fontWeight: 500,
        width: '100%',
        height: 40
      }}
    >
      Refresh Status
    </Button>
  </Card>
  );
};

export default PendingApprovalCard;
