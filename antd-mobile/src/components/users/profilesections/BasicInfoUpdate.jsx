import React, { useContext, useState, useEffect } from "react";
import { Form, Input, Selector, Button, Toast } from "antd-mobile";
import { AuthContext } from "../../../context/AuthContext";
import TitleSelector from "../../common/TitleSelector";
import { updateUserData, getPincode } from "../../../services/api";

const maritalOptions = [
  { label: "Single", value: "Never Married" },
  { label: "Married", value: "Married" },
  { label: "Divorced", value: "Divorced" },
  { label: "Widowed", value: "Widowed" },
];

export default function BasicInfoUpdate() {
  const [form] = Form.useForm();
  const { user, jwt, setUser } = useContext(AuthContext);
  const [isEditMode, setIsEditMode] = useState(false);

  const initialValues = {
    title: user?.title || "",
    username: user?.username || "",
    email: user?.email || "",
    FirstName: user?.FirstName || "",
    LastName: user?.LastName || "",
    Height: user?.Height || "1",
    mobile: user?.mobile || "",
    City: user?.City || "",
    District: user?.District || "",
    State: user?.State || "",
    Country: user?.Country || "",
    isdivyang: user?.isdivyang || false,
    divyangDescription: user?.divyangDescription || "",
    pincode: user?.pincode || "",
  };

  useEffect(() => {
    if (isEditMode) {
      form.setFieldsValue(initialValues);
    }
  }, [isEditMode]);

  const handlePincodeChange = async () => {
    const pincode = form.getFieldValue("pincode");
    if (/^\d{6}$/.test(pincode)) {
      try {
        const res = await getPincode(pincode);
        const attributes = res?.data?.[0]?.attributes;
        if (attributes) {
          form.setFieldsValue({
            City: attributes.taluk || "",
            District: attributes.districtName || "",
            State: attributes.stateName || "",
          });
        }
      } catch (err) {
        Toast.show({ icon: "fail", content: "Failed to fetch location from pincode." });
      }
    }
  };

  const handleFinish = async (values) => {
    try {
      await updateUserData(values, jwt, user.id);
      const updatedUser = { ...user, ...values };
      setUser(updatedUser);
      Toast.show({ icon: "success", content: "Profile updated!" });
      setIsEditMode(false);
    } catch (err) {
      console.log("updateUserData Error", err);
      Toast.show({ icon: "fail", content: "Update failed." });
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Basic Info</h2>

      {!isEditMode ? (
        <div>
          <p><strong>Title:</strong> {user?.title}</p>
          <p><strong>UserId:</strong> {user?.username}</p>
          <p><strong>First Name:</strong> {user?.FirstName}</p>
          <p><strong>Last Name:</strong> {user?.LastName}</p>
          <p><strong>Height:</strong> {user?.Height}</p>
          <p><strong>Mobile:</strong> {user?.mobile}</p>
          <p><strong>Pincode:</strong> {user?.pincode}</p>
          <p><strong>City:</strong> {user?.City}</p>
          <p><strong>District:</strong> {user?.District}</p>
          <p><strong>State:</strong> {user?.State}</p>
          <p><strong>Country:</strong> {user?.Country}</p>
          <p><strong>Is Divyang:</strong> {user?.isdivyang ? "Yes" : "No"}</p>
          {user?.isdivyang && (
            <p><strong>Disability Description:</strong> {user?.divyangDescription}</p>
          )}

          <Button
            block
            color="primary"
            onClick={() => setIsEditMode(true)}
            style={{ marginTop: "1rem" }}
          >
            Edit Info
          </Button>
        </div>
      ) : (
        <Form
          form={form}
          initialValues={initialValues}
          onFinish={handleFinish}
          layout="horizontal"
        >
          <Form.Item name="title" label="Title">
            <TitleSelector
              value={form.getFieldValue("title")}
              onChange={(val) => form.setFieldValue("title", val)}
            />
          </Form.Item>

          <Form.Item name="username" label="UserId">
            <Input />
          </Form.Item>

          <Form.Item name="FirstName" label="First Name">
            <Input />
          </Form.Item>

          <Form.Item name="LastName" label="Last Name">
            <Input />
          </Form.Item>

          <Form.Item name="Height" label="Height">
            <Input />
          </Form.Item>

          <Form.Item name="mobile" label="Mobile">
            <Input />
          </Form.Item>

          <Form.Item name="pincode" label="Pincode">
            <Input onChange={handlePincodeChange} />
          </Form.Item>

          <Form.Item name="City" label="City">
            <Input />
          </Form.Item>

          <Form.Item name="District" label="District">
            <Input />
          </Form.Item>

          <Form.Item name="State" label="State">
            <Input />
          </Form.Item>

          <Form.Item name="Country" label="Country">
            <Input />
          </Form.Item>

          <Form.Item name="isdivyang" label="Is Divyang?">
            <Selector
              value={form.getFieldValue("isdivyang")}
              onChange={(val) => form.setFieldValue("isdivyang", val)}
              options={[
                { label: "Yes", value: true },
                { label: "No", value: false },
              ]}
            />
          </Form.Item>

          <Form.Item name="divyangDescription" label="Disability Detail">
            <Input />
          </Form.Item>

          <Button
            block
            type="submit"
            style={{ backgroundColor: "#8B0000", color: "white" }}
          >
            Save Info
          </Button>

          <Button
            block
            color="default"
            style={{ marginTop: "0.5rem" }}
            onClick={() => setIsEditMode(false)}
          >
            Cancel
          </Button>
        </Form>
      )}
    </div>
  );
}
