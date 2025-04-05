import React, { useState } from 'react';
import { ImageUploader, Toast, Dialog } from 'antd-mobile';
import { uploadImage } from '../../../services/api';

const MobileImageUploader = () => {
  const [fileList, setFileList] = useState([]);
  const MAX_IMAGES = 2; // Set your maximum limit here

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
      const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzE5MywiaWF0IjoxNzQzNzUyOTc1LCJleHAiOjE3NDYzNDQ5NzV9.ddvQK7qIXpQqrFBUM441Pg6lBLYTaBDLaLAMNXceZQw";

      // Call your API
      const response = await uploadImage(formData,jwt);
      
      // Return the correct structure for ImageUploader
      // Using the original image URL from the response
      return {
        url: response[0].url, // Access the first item in array and its url
        name: response[0].name,
        // Add any other fields you want to store
      };
    } catch (error) {
      Toast.show('Upload failed');
      console.error('Upload error:', error);
      throw error;
    }
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
      onChange={setFileList}
      upload={handleUpload}
      beforeUpload={beforeUpload}
      onPreview={onPreview} // Add this prop
      maxCount={MAX_IMAGES} // Set the maxCount prop
      showUpload={fileList.length < MAX_IMAGES} // Hide upload button when limit reached
      style={{ '--cell-size': '80px' }}
    />
  );
};

export default MobileImageUploader;