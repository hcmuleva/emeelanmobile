import React, { useState, useCallback } from 'react';
import { Button, Image, Space, ProgressBar } from 'antd-mobile';
import { PictureOutline } from 'antd-mobile-icons';

const CustomImageUploader = ({ multiple = true, onChange }) => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length === 0) return;

    const newFiles = multiple ? [...files, ...selectedFiles] : [selectedFiles[0]];
    setFiles(newFiles);
    onChange?.(newFiles);
    
    // Simulate upload progress
    selectedFiles.forEach(file => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(prev => ({ ...prev, [file.name]: progress }));
        if (progress >= 100) clearInterval(interval);
      }, 200);
    });
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onChange?.(newFiles);
  };

  return (
    <div style={{ padding: '12px 0' }}>
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        multiple={multiple}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      
      <label htmlFor="image-upload">
        <Button block color="primary" fill="outline">
          <Space>
            <PictureOutline />
            Select Images harish
          </Space>
        </Button>
      </label>

      <div style={{ marginTop: 16 }}>
        {files.map((file, index) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 0',
            borderBottom: '1px solid #eee'
          }}>
            <Image
              src={URL.createObjectURL(file)}
              width={64}
              height={64}
              fit="cover"
              style={{ borderRadius: 4 }}
            />
            <div style={{ flex: 1, marginLeft: 12 }}>
              <div style={{ fontSize: 14 }}>{file.name}</div>
              <div style={{ fontSize: 12, color: '#999' }}>
                {(file.size / 1024).toFixed(1)} KB
              </div>
              {uploadProgress[file.name] < 100 && (
                <ProgressBar
                  percent={uploadProgress[file.name] || 0}
                  style={{ '--track-width': '2px', marginTop: 4 }}
                />
              )}
            </div>
            <Button
              size="small"
              onClick={() => removeFile(index)}
              style={{ marginLeft: 8 }}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomImageUploader;