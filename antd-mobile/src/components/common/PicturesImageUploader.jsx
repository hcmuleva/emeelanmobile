import { Dialog, ImageUploader, Toast } from "antd-mobile";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getUserById, updateUser, uploadImage } from "../../services/api";

const PicturesImageUploader = () => {
  const { user } = useContext(AuthContext);
  const jwt = localStorage.getItem("jwt");
  const [fileList, setFileList] = useState([]);
  const MAX_IMAGES = 5; // Set your maximum limit here

  useEffect(() => {
    const loadImages = async () => {
      const jwt = localStorage.getItem("jwt");
      try {
        const response = await getUserById(user.id, jwt); // created new user api ro get all populated items it was not there before
        const photos = response?.photos || [];

        const initialImages = photos.map((photo) => ({
          url: photo.url,
          name: photo.name,
          id: photo.id,
        }));

        setFileList(initialImages);
      } catch (err) {
        console.error("Failed to fetch user photos:", err);
      }
    };

    loadImages();
  }, [user.id]);

  const beforeUpload = (file) => {
    if (fileList.length >= MAX_IMAGES) {
      Toast.show(`You can only upload up to ${MAX_IMAGES} images`);
      return null;
    }
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      Toast.show("You can only upload JPG/PNG files!");
      return null;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      Toast.show("Image must be smaller than 2MB!");
      return null;
    }
    return file;
  };

  const handleUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("files", file);

      const response = await uploadImage(formData, jwt);
      const uploadedFile = response[0];
      const updatedUser = await updateUser(
        { photos: uploadedFile.id },
        user.id
      );
      localStorage.setItem("user", JSON.stringify(updatedUser)); // ✅ Sync localStorage
      // Return file for ImageUploader control
      return {
        url: uploadedFile.url,
        name: uploadedFile.name,
        id: uploadedFile.id,
      };
    } catch (error) {
      Toast.show("Upload failed");
      console.error("Upload error:", error);
      throw error;
    }
  };

  const onChange = async (newList) => {
    setFileList(newList);
    const photoIds = newList.map((file) => file.id).filter(Boolean);
    const updatedUser = await updateUser({ photos: photoIds }, user.id);
    localStorage.setItem("user", JSON.stringify(updatedUser)); // ✅ Sync localStorage
  };

  const onPreview = (file) => {
    if (file.url) {
      Dialog.show({
        image: file.url,
        title: file.name || "Preview",
        content: (
          <>
            <img
              src={file.url}
              style={{ width: "100%", height: "auto" }}
              alt="Preview"
            />
            <button>Set As Profile Picture</button>
          </>
        ),
      });
    }
  };

  return (
    <ImageUploader
      value={fileList}
      onChange={onChange}
      upload={handleUpload}
      beforeUpload={beforeUpload}
      onPreview={onPreview}
      maxCount={MAX_IMAGES}
      showUpload={fileList.length < MAX_IMAGES}
      style={{ "--cell-size": "80px", margin: "10px" }}
    />
  );
};

export default PicturesImageUploader;
