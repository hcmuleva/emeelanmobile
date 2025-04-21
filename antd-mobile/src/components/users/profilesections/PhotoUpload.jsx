import React from "react";
import PicturesImageUploader from "../../common/PicturesImageUploader.jsx";
import ProfilePictureImageUploader from "../../common/ProfilePictureImageUploader";
import { Card, Divider } from "antd-mobile";

export default function PhotoUpload() {
  return (
    <div style={{ padding: "16px", backgroundColor: "#f7f7f7", borderRadius: "12px" }}>
      {/* Profile Picture Section */}
      <Card
        style={{
          marginBottom: "16px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          padding: "16px",
        }}
      >
        <h3 style={{ color: "#8B0000", fontWeight: "bold", fontSize: "18px" }}>
          Profile Picture:
        </h3>
        <ProfilePictureImageUploader />
      </Card>

      <Divider style={{ margin: "16px 0", borderColor: "#8B0000" }} />

      {/* My Pictures Section */}
      <Card
        style={{
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          padding: "16px",
        }}
      >
        <h3 style={{ color: "#8B0000", fontWeight: "bold", fontSize: "18px" }}>
          My Pictures:
        </h3>
        <PicturesImageUploader />
      </Card>
    </div>
  );
}
