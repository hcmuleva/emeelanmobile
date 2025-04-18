import { Avatar } from "antd-mobile";
import { PhoneFill, UserOutline } from "antd-mobile-icons";
import React from "react";

export default function AdminCard({ user }) {
  const images = user.images || {};
  let userProfile = "https://demo.adminkit.io/img/avatars/avatar-4.jpg";
  if (images.photos?.[0]?.url) {
    userProfile = images.photos[0].url;
  } else if (images.profilePicture?.url) {
    userProfile = images.profilePicture.url;
  } else if (Array.isArray(images.pictures) && images.pictures[0]) {
    userProfile = images.pictures[0];
  }
  const name = user?.FirstName + " " + user?.LastName;
  console.log("user", user, " end");
  return (
      <div key={user.id} className="scroll-item" 
      style={{
        display:"flex",
        flexDirection:"row", 
        alignItems:"center", 
        justifyContent:"start", 
        minWidth: "100px", 
        gap:"10px", 
        borderRadius:"5px",
      }}>
        <Avatar
          src={userProfile}
          style={{
            "--size": "80px",
            borderRadius: "8px",
            marginBottom: "4px",
          }}
        />
        <div
          style={{
            textAlign: "left",
            whiteSpace: "nowrap",
          }}
        >
          <div style={{ fontSize: "12px", color: "#555", display:'flex', flexDirection:"column" }}>
            <>
              <span><strong>Name: </strong>{name} </span>
              <span><strong>Age: </strong> {user.age}</span>
            </>
          </div>
          <div style={{ fontSize: "12px", color: "#555" }}>
            <PhoneFill /> {user?.MobileNumber}
          </div>
          <div style={{ fontSize: "12px", color: "#777" }}>
            {user?.City} - {user?.State}
          </div>
        </div>
      </div>
  );
}
