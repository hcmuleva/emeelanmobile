import React, { useState } from "react";
import { Input, Button, Toast } from "antd-mobile";
import { findConnectionRequest, updateConnectionRequest } from "../../services/api";

const UpdateStatusToEnggaged = () => {
  const [senderId, setSenderId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!senderId || !receiverId) {
      Toast.show({ content: "Please enter both IDs" });
      return;
    }

    setLoading(true);

    try {
      console.log("sender", senderId, "receiver", receiverId)


      const result = await updateConnectionRequest({ sender: senderId, receiver: receiverId, status: "ENGGAGED", message: `Congratulation for engaggement of ${receiverId} with ${senderId}` });

      if (result) {
        Toast.show({ content: "Status updated to ENGGAGED ✅" });
        setSenderId("");
        setReceiverId("");
      }
    } catch (error) {
      Toast.show({ content: "Something went wrong ❌" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h3>Mark Connection as ENGGAGED</h3>

      <Input
        value={senderId}
        onChange={setSenderId}
        placeholder="Enter Sender User ID"
        clearable
        style={{ marginBottom: "0.5rem" }}
      />

      <Input
        value={receiverId}
        onChange={setReceiverId}
        placeholder="Enter Receiver User ID"
        clearable
        style={{ marginBottom: "1rem" }}
      />

      <Button color="primary" loading={loading} onClick={handleUpdate} block>
        Update Status
      </Button>
    </div>
  );
};

export default UpdateStatusToEnggaged;
