import React, { useContext, useState } from "react";
import { Button, Card, Toast } from "antd-mobile";
import { getCustomMe } from "../../services/api";
import { AuthContext, useAuth } from "../../context/AuthContext";

const PendingApprovalCard = ({ userCurrentState,setUserCurrentState }) => {
  //const {user, setUser} = useContext(AuthContext);
  const { user, updateUserField } = useAuth();


  const handleRefresh = async () => {
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
        Your status is <strong>{user.userstatus || "UNKNOWN"}</strong>. Please wait for approval.
      </div>
      <Button color="primary" onClick={handleRefresh}>
        Refresh Status
      </Button>
    </Card>
  );
};

export default PendingApprovalCard;
