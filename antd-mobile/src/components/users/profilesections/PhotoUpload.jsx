import React from "react";
import PicturesImageUploader from "../../common/PicturesImageUploader.jsx";
import ProfilePictureImageUploader from "../../common/ProfilePictureImageUploader";

export default function PhotoUpload({setCompletionBar, setUserUpdated}) {
  return (
    <div>
      <div>
        <h3 style={{ color: "#8B0000", padding: "0px 10px" }}>
          Profile Pictures: 
        </h3>
        <ProfilePictureImageUploader />
      </div>
      <hr />
      <div>
        <h3 style={{ color: "#8B0000", padding: "0px 10px" }}>
          My Pictures: 
        </h3>
        <PicturesImageUploader />
      </div>
      <hr />
    </div>
    
  );
}
