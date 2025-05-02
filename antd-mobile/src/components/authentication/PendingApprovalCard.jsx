import React, { useContext, useState } from "react";
import { Button, Card, Toast } from "antd-mobile";
import { getCustomMe } from "../../services/api";
import { AuthContext, useAuth } from "../../context/AuthContext";

const PendingApprovalCard = ({ userCurrentState,setUserCurrentState }) => {
  //const {user, setUser} = useContext(AuthContext);
  const { user, updateUserField } = useAuth();


  const handleRefresh = async () => {

    // get authentication information from localstorage.
    // if its false then redirect to login page
    const isAuthenticated = localStorage.getItem("authenticated");
    console.log("isAuthenticated", isAuthenticated);
    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }
    const jwt = localStorage.getItem("jwt");
    try {
      const latestUser = await getCustomMe(jwt);
        console.log("Latest User",latestUser, " Before setting ",latestUser.userstatus)
        updateUserField('userstatus', latestUser.userstatus);
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
    <Card style={{ margin: 16 }}>
      <div style={{ marginBottom: 12 }}>
      <p>
  Your profile ID: <strong>{user?.id}</strong> is currently in <strong>pending</strong> status. Please contact the admin for further assistance. 
  <a href="/adminlist" style={{ color: 'blue', textDecoration: 'underline' }}>Click here</a> to view the admin list.
</p>
<p>
  आपका प्रोफ़ाइल ID:  <strong>{user?.id}</strong> फिलहाल <strong>Pending</strong> स्थिति में है। कृपया सहायता के लिए एडमिन से संपर्क करें। 
  <a href="/adminlist" style={{ color: 'blue', textDecoration: 'underline' }}>एडमिन सूची देखने के लिए यहां क्लिक करें</a>।
</p>

       
      </div>
      <Button color="primary" onClick={handleRefresh}>
        Refresh Status
      </Button>
    </Card>
  );
};

export default PendingApprovalCard;
