import { Button, Card, Form, Image, Input, Radio, Space, Toast } from "antd-mobile";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { getPincode, updateUser } from "../../../services/api";
import TitleSelector from "../../common/TitleSelector";

export default function BasicInfoUpdate() {
  const [form] = Form.useForm();
  const { user, setUser } = useContext(AuthContext);
  const [isEditMode, setIsEditMode] = useState(false);

  const initialValues = {
    age: user?.age || "",
    title: user?.title || "",
    username: user?.username || "",
    email: user?.email || "",
    FirstName: user?.FirstName || "",
    LastName: user?.LastName || "",
    Height: user?.Height || "1",
    mobile: user?.mobile || null,
    City: user?.City || "",
    district: user?.district || "",
    State: user?.State || "",
    Country: user?.Country || "",
    isdivyang: user?.isdivyang || false,
    divyangDescription: user?.divyangDescription || "",
    postalcode: user?.postalcode || "",
  };

  useEffect(() => {
    if (isEditMode) {
      form.setFieldsValue(initialValues);
    }
  }, [isEditMode]);

  let imagesrc = ""

  if (user?.Pictures?.profilePicture) {
    imagesrc = user?.Pictures.profilePicture?.url
  } else if (Array.isArray(user?.images?.pictures) && user?.images?.pictures[0]) {
    imagesrc = user?.images?.pictures[0]
  }
  else if (user?.images?.photos?.[0]?.url) {
    imagesrc = user?.images.photos?.[0]?.url
  }
  else if (user?.Pictures?.photos?.[0]?.url) {
    imagesrc = user?.Pictures.photos?.[0]?.url
  } else if (user?.Sex === "Female") {
    imagesrc = "/assets/woman-user-circle-icon.png"
  } else if (user?.Sex === "Male") {
    imagesrc = "/assets/man-user-circle-icon.png"
  } else {
    imagesrc = "/assets/question-mark-circle-outline-icon.png"
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
      // Make sure Country is included in the values being sent
      const updatedValues = {
        ...values,
        Country: values.Country || user?.Country || "",
      };

      await updateUser(updatedValues, user.id);

      // Update local user state with ALL the form values
      const updatedUser = { ...user, ...updatedValues };
      setUser(updatedUser);

      // Update local storage with the complete user data
      localStorage.setItem("user", JSON.stringify(updatedUser));

      Toast.show({ icon: "success", content: "Profile updated!" });
      setIsEditMode(false);
    } catch (err) {
      console.error("updateUser Error", err);
      Toast.show({ icon: "fail", content: "Update failed." });
    }
  };

  return (
    <div>
      {!isEditMode ? (
        <Card
          style={{
            borderRadius: '8px',
            margin: '10px 0',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            border: '1px solid #eee',
          }}
          headerStyle={{ color: '#8B0000', fontWeight: 'bold' }}
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '18px' }}>👤 Basic Information</span>
            </div>
          }
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
            <Image
              src={imagesrc}
              width={60}
              height={60}
              fit="cover"
              style={{
                borderRadius: '50%',
                border: '2px solid #8B0000',
              }}
            />
            <div>
              <h3 style={{ margin: 0, color: '#8B0000' }}>{user?.FirstName} {user?.LastName}</h3>
              <div style={{ fontSize: '14px', color: '#666' }}>
                Member ID: {user?.id}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <p><strong>Title:</strong> {user?.title}</p>
            <p><strong>Username:</strong> {user?.username}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>First Name:</strong> {user?.FirstName}</p>
            <p><strong>Last Name:</strong> {user?.LastName}</p>
            <p><strong>Age:</strong> {user?.age || user?.mybasicdata?.basicinfo?.age}</p>
            <p><strong>Height:</strong> {user?.Height}</p>
            <p><strong>Mobile:</strong> {user?.mobile}</p>
            <p><strong>Pincode:</strong> {user?.postalcode}</p>
            <p><strong>City:</strong> {user?.City}</p>
            <p><strong>District:</strong> {user?.district}</p>
            <p><strong>State:</strong> {user?.State}</p>
            <p><strong>Country:</strong> {user?.Country || ""}</p>
            <p><strong>Is Divyang:</strong> {user?.isdivyang ? 'Yes' : 'No'}</p>
            {user?.isdivyang && (
              <p><strong>Disability Description:</strong> {user?.divyangDescription}</p>
            )}
          </div>

          <Button
            block
            onClick={() => setIsEditMode(true)}
            style={{
              backgroundColor: '#8B0000',
              color: 'white',
              borderRadius: '4px',
              border: 'none'
            }}
          >
            Edit Information
          </Button>
        </Card>
      ) : (
        <Card
          style={{
            borderRadius: '8px',
            margin: '10px 0',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            border: '1px solid #eee',
          }}
          headerStyle={{ color: '#8B0000', fontWeight: 'bold' }}
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '18px' }}>✏️ Edit Basic Information</span>
            </div>
          }
        >
          <Form
            form={form}
            initialValues={initialValues}
            onFinish={handleFinish}
            layout="horizontal"
            requiredMarkStyle="none"
          >
            <Form.Item name="title" label="Title:">
              <TitleSelector
                value={form.getFieldValue("title")}
                onChange={(val) => form.setFieldValue("title", val)}
              />
            </Form.Item>

            <Form.Item name="username" label="UserName:">
              <Input style={{ border: "1px solid #ddd", borderRadius: "4px" }} />
            </Form.Item>

            <Form.Item name="FirstName" label="First Name:">
              <Input style={{ border: "1px solid #ddd", borderRadius: "4px" }} />
            </Form.Item>

            <Form.Item name="LastName" label="Last Name:">
              <Input style={{ border: "1px solid #ddd", borderRadius: "4px" }} />
            </Form.Item>

            <Form.Item name="age" label="Age:">
              <Input style={{ border: "1px solid #ddd", borderRadius: "4px" }} />
            </Form.Item>

            <Form.Item name="Height" label="Height:">
              <Input style={{ border: "1px solid #ddd", borderRadius: "4px" }} />
            </Form.Item>

            <Form.Item name="mobile" label="Mobile:">
              <Input style={{ border: "1px solid #ddd", borderRadius: "4px" }} />
            </Form.Item>

            <Form.Item name="postalcode" label="Pincode:">
              <Input onChange={handlePincodeChange} style={{ border: "1px solid #ddd", borderRadius: "4px" }} />
            </Form.Item>

            <Form.Item name="City" label="City:">
              <Input style={{ border: "1px solid #ddd", borderRadius: "4px" }} />
            </Form.Item>

            <Form.Item name="district" label="District:">
              <Input style={{ border: "1px solid #ddd", borderRadius: "4px" }} />
            </Form.Item>

            <Form.Item name="State" label="State:">
              <Input style={{ border: "1px solid #ddd", borderRadius: "4px" }} />
            </Form.Item>

            <Form.Item name="Country" label="Country:">
              <Input
                style={{ border: "1px solid #ddd", borderRadius: "4px" }}
                placeholder="Enter your country"
              />
            </Form.Item>

            <Form.Item name="isdivyang" label="Is Divyang:" initialValue={false}>
              <Radio.Group
                value={form.getFieldValue("isdivyang")}
                onChange={(val) => form.setFieldValue("isdivyang", val)}
                style={{ display: "flex", gap: "10px" }}
              >
                <Radio style={{ marginRight: "15px" }} value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="divyangDescription" label="Disability Detail:">
              <Input style={{ border: "1px solid #ddd", borderRadius: "4px" }} />
            </Form.Item>

            <Space block style={{ marginTop: 20 }} justify="between">
              <Button
                style={{
                  backgroundColor: "#8B0000",
                  color: "white",
                  borderRadius: "4px",
                  border: "none",
                  flex: 1
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
                  flex: 1
                }}
                onClick={() => setIsEditMode(false)}
              >
                Cancel
              </Button>
            </Space>
          </Form>
        </Card>
      )}
    </div>
  );
}