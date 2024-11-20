import React, { useState } from "react";
import { Form, Input, Upload, Button, notification } from "antd";
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";
import { useUpdate } from "@refinedev/core";
import { CameraOutlined } from '@ant-design/icons';

const API_URL = import.meta.env.VITE_SERVER_URL;
const styles = {
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
  },
  card: {
    width: 'calc(50% - 16px)',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  image: {
    width: '100%',
    borderRadius: '4px',
  },
  uploadButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  }
}

export default function PhotoComponent({ user }) {
  const MAX_PHOTOS = 6;

  const [form] = Form.useForm();
  const { mutate: updateUser } = useUpdate();

  const onFinish = async (values) => {
    try {
      // Map uploaded media values
      const mappedValues = await mediaUploadMapper(values);
      const updatedPhotos = [...(user?.photos || []), ...mappedValues.photos];

      // Update the user resource
      await updateUser(
        {
          resource: "users",
          id: user.id,
          values: { photos: updatedPhotos }, // Update with merged photos
        },
        {
          onSuccess: () => {
            notification.success({
              message: "Success",
              description: "Your images have been successfully uploaded.",
            });
            form.resetFields();
          },
        }
      );
    } catch (error) {
      notification.error({
        message: "Error",
        description: "There was an issue with the upload process.",
      });
    }
  };

  // Ensure photos is always an array
  const userPhotos = user?.photos || [];

  return (
    <>
      <div style={styles.cardContainer}>
        {userPhotos.map((image, index) => (
          <div key={index} style={styles.card}>
            <img 
              src={image.formats?.thumbnail?.url || image.url} 
              alt={`Image ${index + 1}`} 
              style={styles.image} 
            />
          </div>
        ))}
      </div>
      
      {userPhotos.length < MAX_PHOTOS && (
        <div style={styles.card}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{}}
            style={{ maxWidth: "800px", margin: "0 auto" }}
          >
            {/* Upload Field */}
            <Form.Item
              name="photos"
              valuePropName="fileList"
              getValueProps={(data) => getValueProps(data, API_URL)}
              extra={`You can upload ${MAX_PHOTOS - userPhotos.length} more`}
            >
              <Upload.Dragger
                name="files"
                action={API_URL + `/api/upload`}
                listType="picture-card"
                headers={{
                  Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
                }}
                multiple
                beforeUpload={(file, fileList) => {
                  if (fileList.length + userPhotos.length > MAX_PHOTOS) {
                    notification.warning({
                      message: "Upload Limit Reached",
                      description: `You can only upload a maximum of ${MAX_PHOTOS} photos.`,
                    });
                    return Upload.LIST_IGNORE;
                  }
                  return true;
                }}
                onChange={(info) => {
                  if (info.fileList.length > 4) {
                    notification.warning({
                      message: "Upload Limit Reached",
                      description: "You can only upload up to 4 photos.",
                    });
                    // Keep only the first 6 files
                    info.fileList = info.fileList.slice(0, 4);
                  }
                }}
              >
                <Button><CameraOutlined/></Button>
              </Upload.Dragger>
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
}