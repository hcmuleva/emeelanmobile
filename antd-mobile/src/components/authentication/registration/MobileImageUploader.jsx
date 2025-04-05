import React, { useState, useContext, useEffect } from 'react';
import { ImageUploader, Toast, Dialog } from 'antd-mobile';
import { getUserById, updateUserData, uploadImage } from '../../../services/api';
import { AuthContext } from '../../../context/AuthContext';

const MobileImageUploader = () => {
  const {user} = useContext(AuthContext)
  const jwt = localStorage.getItem("jwt");
  // console.log(user)
  const [fileList, setFileList] = useState([]);
  const MAX_IMAGES = 2; // Set your maximum limit here
  
  useEffect(() => {
    const loadImages = async () => {
      const jwt = localStorage.getItem("jwt");
      try {
        const response = await getUserById(user.id, jwt); // created new user api ro get all populated items it was not there before
        const photos = response?.photos || [];
        console.log(photos)
        const initialImages = photos.map(photo => ({
          url: photo.url,
          name: photo.name,
          id: photo.id,
        }));

        setFileList(initialImages);

      } catch (err) {
        console.error('Failed to fetch user photos:', err);
      }
    };

    loadImages();
  }, [user.id]);
  

  const beforeUpload = (file) => {
    if (fileList.length >= MAX_IMAGES) {
        Toast.show(`You can only upload up to ${MAX_IMAGES} images`);
        return null;
      }
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      Toast.show('You can only upload JPG/PNG files!');
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
      // console.log(formData.get("files"), "Form data")

      const response = await uploadImage(formData, jwt);
      // console.log(response)
      const uploadedFile = response[0];
      await updateUserData({ photos: uploadedFile.id }, jwt, user.id);
  
      // Return file for ImageUploader control
      return {
        url: uploadedFile.url,
        name: uploadedFile.name,
        id: uploadedFile.id
      };
    } catch (error) {
      Toast.show('Upload failed');
      console.error('Upload error:', error);
      throw error;
    }
  };  

  const onChange = async (newList) => {
    setFileList(newList);
    const photoIds = newList.map(file => file.id).filter(Boolean);
    await updateUserData({ photos: photoIds }, jwt, user.id);
  };  
  
  // console.log(user)
  
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
      style={{ '--cell-size': '80px' }}
    />
  );
};

export default MobileImageUploader;