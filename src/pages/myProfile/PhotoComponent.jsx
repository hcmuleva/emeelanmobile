import React, { useState } from "react";
import { Form, Input, Upload, Button, notification } from "antd";
import { getValueProps, mediaUploadMapper } from "@refinedev/strapi-v4";
import { useUpdate } from "@refinedev/core";
import ImgCrop from "antd-img-crop";

const API_URL = import.meta.env.VITE_SERVER_URL;

export default function PhotoComponent({ user }) {
  console.log("USER OBJECT", user);
  const [form] = Form.useForm();
  const { mutate: updateUser } = useUpdate();

  const onFinish = async (values) => {
    try {
      // Safely get old image IDs, handling potential undefined case
      const oldImageIds = user?.photos?.map((photo) => photo?.id) || [];
      console.log("oldImageIds", oldImageIds);
      // Map uploaded media values
      const mappedValues = await mediaUploadMapper(values);
      console.log(
        "mappedValues",
        mappedValues,
        "mappedValues?.photos",
        mappedValues?.photos
      );
      // Extract new image IDs   from mapped values
      const newImageIds = mappedValues?.photos?.map((photo) => photo) || [];
      console.log("newImageIds", newImageIds);
      // Combine old and new image IDs
      const combinedPhotoIds = [...oldImageIds, ...newImageIds];

      // Update the user resource
      console.log("Combined photo IDs:", combinedPhotoIds);
      await updateUser(
        {
          resource: "users",
          id: user.id,
          values: { photos: combinedPhotoIds }, // Wrap in photos object
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
      console.error("Upload error:", error);
      notification.error({
        message: "Error",
        description: "There was an issue with the upload process.",
      });
    }
  };

  return (
    <div>
      {/* <h3>Upload Photos for {user?.FirstName || "User"}</h3> */}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{}}
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        {/* Upload Field */}
        <Form.Item
          name="photos"
          valuePropName="fileList"
          getValueProps={(data) => getValueProps(data, API_URL)}
          label={
            <span style={{ fontWeight: "bold", fontSize: "18px" }}>
              Upload Photos
            </span>
          }
          extra="You Can Upload a Maximum of 4 Photos."
        >
          <ImgCrop rotationSlider>
            <Upload.Dragger
              style={{}}
              name="files"
              action={API_URL + `/api/upload`}
              listType="picture-card"
              headers={{
                Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
              }}
              multiple
              beforeUpload={(file, fileList) => {
                if (fileList.length > 4) {
                  notification.warning({
                    message: "Upload Limit Reached",
                    description: "You can only upload a maximum of 4 photos.",
                  });
                  return Upload.LIST_IGNORE; // Prevent additional uploads
                }
                return true; // Allow upload if within limit
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
              <Button>Click to Upload</Button>
            </Upload.Dragger>
          </ImgCrop>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
