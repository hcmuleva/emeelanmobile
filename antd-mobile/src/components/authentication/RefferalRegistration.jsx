import { Button } from "antd-mobile";
import React from "react";
import { useLocation } from "react-router-dom";

const useQuery = () => new URLSearchParams(useLocation().search);

export default function ReferralRegistration({ isLogined, setIsLogined }) {
  const query = useQuery();
  const referralId = query.get("referral_id");
  const orgId = query.get("orgid");
  const payload = {
    username: "ddddd",
    email: "ddddd@dd.com",
    password: "ssddd",
    orgid: orgId,
    referralId: referralId,
  };

  const handleSubmit = async () => {
    await fetch("https://hphtechnology.in/exp/api/customregister", {
      method: "POST",
      body: JSON.stringify({
        ...payload,
        // ... other user inputs
      }),
      headers: { "Content-Type": "application/json" },
    });
  };
  return (
    <div>
      <h1>Refferenal registration</h1>
      <Button
        onClick={() => {
          handleSubmit();
        }}
      >
        Submit
      </Button>
      <Button onClick={() => setIsLogined(true)}>Login</Button>
    </div>
  );
}
