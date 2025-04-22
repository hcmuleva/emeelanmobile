import React, { useState } from 'react';
import { Dialog, Toast } from 'antd-mobile';
import CustomImageUploader from './CustomImageUploader';

export const UploadImagesDialog = ({ visible, onClose }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleSubmit = async () => {
    if (uploadedFiles.length === 0) {
      Toast.show('Please select at least one image');
      return;
    }

    Toast.show('Uploading images...');
    try {
      // Replace with actual upload logic
      await Promise.all(uploadedFiles.map(file => {
        return new Promise(resolve => {
          setTimeout(() => {
            console.log('Uploaded:', file.name);
            resolve();
          }, 1000);
        });
      }));
      Toast.show('Upload completed!');
      onClose();
    } catch (error) {
      Toast.show('Upload failed');
      console.error(error);
    }
  };
  const handleCancel = ()=>{
    onClose()
  }
  return (
    <Dialog
      visible={visible}
      title="Upload Images"
      actions={[
        { key: 'cancel', text: 'Cancel' ,onClick: handleCancel},
        { key: 'submit', text: 'Upload', onClick: handleSubmit }
      ]}
      onClose={onClose}
    >
      <CustomImageUploader 
        multiple={true}
        onChange={setUploadedFiles}
      />
    </Dialog>
  );
};