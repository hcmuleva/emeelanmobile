import {
  Form,
  Input,
  TextArea,
  Button,
  ImageUploader,
  Toast,
  Dialog,
} from "antd-mobile";
import { UploadOutline } from "antd-mobile-icons";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { createBreakingNews, uploadImage } from "../../../services/api";

export default function BreakingNewsCreate() {
  const { jwt } = useContext(AuthContext);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [imageId, setImageId] = useState("");
  const MAX_IMAGES = 1;

  const handleSubmit = async (values) => {
    if (!imageId) {
      Toast.show({ icon: "fail", content: "Please upload an image" });
      return;
    }

    setUploading(true);
    try {
      const payload = { ...values, image: imageId };
      await createBreakingNews(payload, jwt);
      Toast.show({ icon: "success", content: "🚨 Breaking News Published!" });
      setFileList([]);
      setImageId("");
    } catch (error) {
      console.error("Error:", error);
      Toast.show({ icon: "fail", content: "Failed to publish news" });
    } finally {
      setUploading(false);
    }
  };

  const beforeUpload = (file) => {
    if (fileList.length >= MAX_IMAGES) {
      Toast.show({
        icon: "fail",
        content: `You can only upload up to ${MAX_IMAGES} image`,
      });
      return null;
    }
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      Toast.show({ icon: "fail", content: "Only JPG/PNG files are allowed!" });
      return null;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      Toast.show({ icon: "fail", content: "Image must be smaller than 2MB!" });
      return null;
    }
    return file;
  };

  const handleUpload = async (file) => {
    const uploadData = new FormData();
    uploadData.append("files", file);

    try {
      const response = await uploadImage(uploadData, jwt);
      const uploadedFile = response[0];

      setImageId(uploadedFile.id);

      const uploadedImage = {
        url: uploadedFile.url,
        file, // critical for preview
      };

      setFileList([uploadedImage]);
      return uploadedImage; // Important: must return for ImageUploader
    } catch (error) {
      console.error("Upload error:", error);
      Toast.show({ icon: "fail", content: "Upload failed" });
      throw error;
    }
  };

  const onPreview = (file) => {
    Dialog.alert({
      content: (
        <img
          src={file.url}
          style={{ width: "100%", height: "auto", borderRadius: 8 }}
          alt="Preview"
        />
      ),
    });
  };

  return (
    <div style={{ padding: 16, maxWidth: 600, margin: "0 auto" }}>
      <h2
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "#e53935",
          marginBottom: 24,
        }}
      >
        🛑 Create Breaking News
      </h2>

      <Form
        layout="vertical"
        onFinish={handleSubmit}
        footer={
          <Button
            block
            type="submit"
            color="danger"
            size="large"
            loading={uploading}
            disabled={uploading}
          >
            {uploading ? "Publishing..." : "🚨 Publish Now"}
          </Button>
        }
      >
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input placeholder="Enter headline" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <TextArea placeholder="Write a short description..." rows={4} />
        </Form.Item>

        <Form.Item name="image" label="Image (Max 1)" required>
          <ImageUploader
            value={fileList}
            onChange={setFileList}
            upload={handleUpload}
            beforeUpload={beforeUpload}
            onPreview={onPreview}
            maxCount={MAX_IMAGES}
            showUpload={fileList.length < MAX_IMAGES}
            uploadText="Upload Image"
            icon={<UploadOutline />}
            style={{ "--cell-size": "80px", margin: "10px" }}
          />
        </Form.Item>
      </Form>
    </div>
  );
}
