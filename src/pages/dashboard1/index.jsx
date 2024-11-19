import React from "react";
import UserDashboard from "../UserDashboard";
import CenterDashboard from "./CenterDashboard";
import AdminDashboard from "../AdminDashboard";
import Header from "../Header";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import PendingPage from "../nocontent/pending";
import BlockedPage from "../nocontent/blocked";

export const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;

export default function Dashboard() {
  const navigate = useNavigate();

  const userState = localStorage.getItem("userstatus");
  const userRole = localStorage.getItem("emeelanrole");
  const token = localStorage.getItem(TOKEN_KEY);

  console.log("User Status:", userState, "Role:", userRole);

  // Handle cases where status is not APPROVED
  if (userState === "PENDING") {
    return <PendingPage />;
  }

  if (userState === "BLOCKED") {
    return <BlockedPage />;
  }
  if (userState !== "APPROVED") {
    return <BlockedPage />;
  }

  if (!userState || userState === "undefined") {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "black",
          backgroundColor: "white",
        }}
      >
        <p>Your profile has an issue. Please contact Admin: +91 9019905115.</p>
        <Button onClick={() => navigate("/login")}>Try Again</Button>
      </div>
    );
  }

  // Handle APPROVED status with role-based dashboards
  if (userState === "APPROVED") {
    switch (userRole) {
      case "MEELAN":
        return (
          <>
            <Header />
            <UserDashboard />
          </>
        );
      case "CENTER":
        return (
          <>
            <Header />
            <CenterDashboard />
          </>
        );
      case "ADMIN":
        return (
          <>
            <Header />
            <AdminDashboard />
          </>
        );
      default:
        return (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "black",
              backgroundColor: "white",
            }}
          >
            <p>Invalid role. Please contact Admin.</p>
            <Button onClick={() => navigate("/login")}>Try Again</Button>
          </div>
        );
    }
  }

  // Fallback for unexpected states
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "black",
        backgroundColor: "white",
      }}
    >
      <p>Unexpected error. Please contact Admin.</p>
      <Button onClick={() => navigate("/login")}>Go to Login</Button>
    </div>
  );
}
