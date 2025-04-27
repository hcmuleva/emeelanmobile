import { Dialog, ImageUploader, Toast } from 'antd-mobile';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { getUserById, updateUser, uploadImage } from '../../services/api';

const ProfilePictureImageUploader = () => {
  const { user, setProfileUpdated } = useContext(AuthContext);
  const jwt = localStorage.getItem("jwt");

  const [fileList, setFileList] = useState([]);
  const MAX_IMAGES = 1;

  useEffect(() => {
    const loadImages = async () => {
      try {
        const response = await getUserById(user.id, jwt);
        const profilePicture = response?.profilePicture;

        if (profilePicture && profilePicture.url) {
          setFileList([
            {
              url: profilePicture.url,
              name: profilePicture.name,
              id: profilePicture.id,
            },
          ]);
        } else {
          setFileList([]); // in case no image is found
        }
      } catch (err) {
        console.error('Failed to fetch user photo:', err);
      }
    };

    loadImages();
  }, [user.id, jwt]);

  const beforeUpload = (file) => {
    if (fileList.length >= MAX_IMAGES) {
      Toast.show(`You can only upload up to ${MAX_IMAGES} image`);
      return null;
    }

    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      Toast.show('Only JPG/PNG files are allowed!');
      return null;
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      Toast.show('Image must be smaller than 2MB!');
      return null;
    }

    return file;
  };

  const handleUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('files', file);

      const response = await uploadImage(formData, jwt);
      const uploadedFile = response[0];

      const updatedUser = await updateUser(
        { profilePicture: uploadedFile.id },
        user.id
      );
      localStorage.setItem('user', JSON.stringify(updatedUser));

      const uploadedImage = {
        url: uploadedFile.url,
        name: uploadedFile.name,
        id: uploadedFile.id,
      };

      setFileList([uploadedImage]); // replace any existing image
      return uploadedImage;
    } catch (error) {
      Toast.show('Upload failed');
      console.error('Upload error:', error);
      throw error;
    }
  };

  const onChange = async (newList) => {
    setFileList(newList);

    if (newList.length === 0) {
      // Image removed
      await updateUser({ profilePicture: null }, user.id);
      localStorage.setItem("user", JSON.stringify({ ...user, profilePicture: null }));
      setProfileUpdated(true);
      return;
    }

    const latestImage = newList[0];
    await updateUser({ profilePicture: latestImage.id }, user.id);
    localStorage.setItem("user", JSON.stringify({ ...user, profilePicture: latestImage }));
    setProfileUpdated(true);
  };

  const onPreview = (file) => {
    if (file.url) {
      Dialog.show({
        image: file.url,
        title: file.name || 'Preview',
        content: (
          <img
            src={file.url}
            style={{ width: '100%', height: 'auto' }}
            alt="Preview"
          />
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
      style={{ '--cell-size': '80px', margin: '10px' }}
    />
  );
};

export default ProfilePictureImageUploader;