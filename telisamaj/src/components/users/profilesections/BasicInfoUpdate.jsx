import {
  Button,
  Card,
  Form,
  Image,
  Input,
  Radio,
  Space,
  Toast,
} from "antd-mobile";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { getPincode, updateUser } from "../../../services/api";
import MaritalStatus from "../../authentication/registration/MaritialStatus";

export default function BasicInfoUpdate() {
  const [form] = Form.useForm();
  const { user, setUser, setProfileUpdated } = useContext(AuthContext);
  const [isEditMode, setIsEditMode] = useState(false);

  const initialValues = {
    age: user?.age || user?.mybasicdata?.basicinfo?.age || "",
    username: user?.username || "",
    email: user?.email || "",
    FirstName: user?.FirstName || "",
    LastName: user?.LastName || "",
    Height: user?.Height || user?.mybasicdata?.aboutme?.height || "0",
    MobileNumber: user?.MobileNumber || user?.mobile || null,
    City: user?.City || "",
    district: user?.district || "",
    State: user?.State || "",
    Country: user?.Country || "",
    isdivyang: user?.isdivyang || false,
    divyangDescription: user?.divyangDescription || "",
    postalcode: user?.postalcode || "",
    marital: user?.marital || user?.meritalStatus,
  };

  const [tmpData, setTmpData] = useState({ marital: initialValues.marital });

  useEffect(() => {
    if (isEditMode) {
      form.setFieldsValue(initialValues);
    }
  }, [isEditMode]);

  let imagesrc = "";

  if (user?.Pictures?.profilePicture) {
    imagesrc = user?.Pictures.profilePicture?.url;
  } else if (
    Array.isArray(user?.images?.pictures) &&
    user?.images?.pictures[0]
  ) {
    imagesrc = user?.images?.pictures[0];
  } else if (user?.images?.photos?.[0]?.url) {
    imagesrc = user?.images.photos?.[0]?.url;
  } else if (user?.Pictures?.photos?.[0]?.url) {
    imagesrc = user?.Pictures.photos?.[0]?.url;
  } else if (user?.Sex === "Female") {
    imagesrc = "/assets/woman-user-circle-icon.png";
  } else if (user?.Sex === "Male") {
    imagesrc = "/assets/man-user-circle-icon.png";
  } else {
    imagesrc = "/assets/question-mark-circle-outline-icon.png";
  }

  const handlePincodeChange = async () => {
    const postalcode = form.getFieldValue("postalcode");
    if (/^\d{6}$/.test(postalcode)) {
      try {
        const res = await getPincode(postalcode);
        const attributes = res?.data?.[0]?.attributes;
        if (attributes) {
          form.setFieldsValue({
            City: attributes.taluk || "",
            district: attributes.districtName || "",
            State: attributes.stateName || "",
          });
        }
      } catch (err) {
        Toast.show({
          icon: "fail",
          content: "Failed to fetch location from postalcode.",
        });
      }
    }
  };

  const handleFinish = async (values) => {
    try {
      await updateUser(values, user.id);
      const updatedUser = { ...user, ...values };

      setUser(updatedUser);
      setProfileUpdated(true);

      localStorage.setItem("user", JSON.stringify(updatedUser));

      Toast.show({ icon: "success", content: "Profile updated!" });
      setIsEditMode(false);
    } catch (err) {
      console.log("updateUser Error", err);
      Toast.show({ icon: "fail", content: "Update failed." });
    }
  };
  return (
    <>
      {!isEditMode ? (
        <Card
          style={{
            borderRadius: "8px",
            margin: "10px 0",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            border: "1px solid #eee",
          }}
          headerStyle={{ color: "#8B0000", fontWeight: "bold" }}
          title={
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "18px" }}>👤 Basic Information</span>
            </div>
          }
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "15px",
            }}
          >
            {/* <Image
              src={imagesrc}
              width={60}
              height={60}
              fit="cover"
              style={{
                borderRadius: '50%',
                border: '2px solid #8B0000',
              }}
            /> */}
            <div>
              <h3 style={{ margin: 0, color: "#8B0000" }}>
                {user?.FirstName} {user?.LastName}
              </h3>
              <div style={{ fontSize: "14px", color: "#666" }}>
                Member ID: {user?.id}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <p>
              <strong>Username:</strong> {user?.username}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>First Name:</strong> {user?.FirstName}
            </p>
            <p>
              <strong>Last Name:</strong> {user?.LastName}
            </p>
            <p>
              <strong>Age:</strong>{" "}
              {user?.age || user?.mybasicdata?.basicinfo?.age}
            </p>
            <p>
              <strong>Height:</strong>{" "}
              {user?.Height || user?.mybasicdata?.aboutme?.height}
            </p>
            <p>
              <strong>Mobile:</strong> {user?.mobile || user?.MobileNumber}
            </p>
            <p>
              <strong>Marital:</strong> {user?.marital || user?.meritalStatus}
            </p>
            <p>
              <strong>Postalcode:</strong> {user?.postalcode}
            </p>
            <p>
              <strong>City:</strong> {user?.City}
            </p>
            <p>
              <strong>District:</strong> {user?.district}
            </p>
            <p>
              <strong>State:</strong> {user?.State}
            </p>
            <p>
              <strong>Country:</strong> {user?.Country}
            </p>
            <p>
              <strong>Is Divyang:</strong> {user?.isdivyang ? "Yes" : "No"}
            </p>
            {user?.isdivyang && (
              <p>
                <strong>Disability Description:</strong>{" "}
                {user?.divyangDescription}
              </p>
            )}
          </div>

          <Button
            block
            onClick={() => setIsEditMode(true)}
            style={{
              backgroundColor: "#8B0000",
              color: "white",
              borderRadius: "4px",
              border: "none",
            }}
          >
            Edit Information
          </Button>
        </Card>
      ) : (
        <Card
          bodyStyle={{ padding: "0", margin: "0" }}
          style={{
            borderRadius: "8px",
            margin: "10px 0",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            border: "1px solid #eee",
          }}
          headerStyle={{ color: "#8B0000", fontWeight: "bold" }}
          title={
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "18px" }}>
                ✏️ Edit Basic Information
              </span>
            </div>
          }
        >
          <Form
            form={form}
            initialValues={initialValues}
            onFinish={handleFinish}
            layout="horizontal"
          >
            <Form.Item
              name="username"
              label="UserName:"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Input
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "10px",
                  width: "100%",
                }}
              />
            </Form.Item>

            <Form.Item
              name="FirstName"
              label="First Name:"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Input
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "10px",
                  width: "100%",
                }}
              />
            </Form.Item>

            <Form.Item
              name="LastName"
              label="Last Name:"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Input
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "10px",
                }}
              />
            </Form.Item>

            <Form.Item
              name="age"
              label="Age:"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Input
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "10px",
                }}
              />
            </Form.Item>

            <Form.Item
              name="Height"
              label="Height (cm)"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Input
                placeholder="for eg: 126"
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "10px",
                }}
              />
            </Form.Item>

            <Form.Item
              name="MobileNumber"
              label="Mobile:"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Input
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "10px",
                }}
              />
            </Form.Item>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  fontWeight: "500",
                  marginLeft: "15px",
                  marginRight: "15px",
                }}
              >
                Marital Status
              </p>
              <MaritalStatus
                customdata={tmpData}
                setCustomdata={setTmpData}
                form={form}
              />
            </div>
            <Form.Item
              name="postalcode"
              label="Pincode:"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Input
                onChange={handlePincodeChange}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "10px",
                }}
              />
            </Form.Item>

            <Form.Item
              name="City"
              label="City:"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Input
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "10px",
                }}
              />
            </Form.Item>

            <Form.Item
              name="district"
              label="District:"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Input
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "10px",
                }}
              />
            </Form.Item>

            <Form.Item
              name="State"
              label="State:"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Input
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "10px",
                }}
              />
            </Form.Item>

            <Form.Item
              name="Country"
              label="Country:"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Input
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "10px",
                }}
              />
            </Form.Item>

            <Form.Item
              name="isdivyang"
              label="Is Divyang:"
              initialValue={false}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Radio.Group
                value={form.getFieldValue("isdivyang")}
                onChange={(val) => form.setFieldValue("isdivyang", val)}
                style={{ display: "flex", gap: "10px" }}
              >
                <Radio style={{ marginRight: "15px" }} value={true}>
                  Yes
                </Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="divyangDescription"
              label="Disability Detail:"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Input
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "10px",
                }}
              />
            </Form.Item>

            <Space block style={{ marginTop: 20 }} justify="between">
              <Button
                style={{
                  backgroundColor: "#8B0000",
                  color: "white",
                  borderRadius: "4px",
                  border: "none",
                  flex: 1,
                }}
                type="submit"
              >
                Save Changes
              </Button>

              <Button
                style={{
                  backgroundColor: "#666",
                  color: "white",
                  borderRadius: "4px",
                  border: "none",
                  flex: 1,
                }}
                onClick={() => setIsEditMode(false)}
              >
                Cancel
              </Button>
            </Space>
          </Form>
        </Card>
      )}
    </>
  );
}
