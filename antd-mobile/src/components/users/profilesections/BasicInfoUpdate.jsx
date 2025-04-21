import React, { useContext, useState, useEffect } from "react";
import { Form, Input, Selector, Button, Toast, Radio, Divider, Card, Space, Tag, Image } from "antd-mobile";
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
  const { user, setUser } = useContext(AuthContext);
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

  console.log(initialValues, "initial")

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
        Toast.show({
          icon: "fail",
          content: "Failed to fetch location from pincode.",
        });
      }
    }
  };

  const handleFinish = async (values) => {
    try {
      await updateUserData(values, user.id);
      const updatedUser = { ...user, ...values };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser)); // ✅ Sync localStorage

      Toast.show({ icon: "success", content: "Profile updated!" });
      setIsEditMode(false);
    } catch (err) {
      console.log("updateUserData Error", err);
      Toast.show({ icon: "fail", content: "Update failed." });
    }
  };

  return (
    <div style={{
      fontSize: "16px",
    }}>
      {/* <h2>Basic Info</h2> */}

      {!isEditMode ? (
        <div
          style={{
            background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)',
            padding: '20px',
            height: "100%",
            borderRadius: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Card
            style={{
              width: '90%',
              borderRadius: '18px',
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: 'none',
              padding: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Image
                src="/your-avatar.png" // Replace with user avatar if available
                width={80}
                height={80}
                fit="cover"
                style={{
                  borderRadius: '50%',
                  objectFit: 'cover',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
              />
              <div>
                <h3 style={{ margin: 0 }}>{user?.FirstName} {user?.LastName}</h3>
                <div style={{ fontSize: '14px', color: '#555' }}>
                  <a> Basic Info </a>
                </div>
              </div>
            </div>

            <hr style={{ margin: "20px 0" }} />

            <div style={{ marginTop: '16px', fontSize: '14px', lineHeight: 1.5 }}>
              <p><strong>User ID:</strong> {user?.username}</p>
              <p><strong>Height:</strong> {user?.Height}</p>
              <p><strong>Mobile:</strong> {user?.mobile}</p>
              <p><strong>Pincode:</strong> {user?.pincode}</p>
              <p><strong>City:</strong> {user?.City}</p>
              <p><strong>District:</strong> {user?.District}</p>
              <p><strong>State:</strong> {user?.State}</p>
              <p><strong>Country:</strong> {user?.Country}</p>
              <p><strong>Is Divyang:</strong> {user?.isdivyang ? 'Yes' : 'No'}</p>
              {user?.isdivyang && (
                <p><strong>Disability Description:</strong> {user?.divyangDescription}</p>
              )}
            </div>

            <Space block style={{ marginTop: 20 }} justify="between">
              <Button color="primary" fill="solid" onClick={() => setIsEditMode(true)}>
                Edit Info
              </Button>
            </Space>
          </Card>
        </div >
      ) : (
        <div
          style={{
            background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)',
            padding: '20px',
            height: "100%",
            borderRadius: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Card
            style={{
              width: '90%',
              borderRadius: '18px',
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: 'none',
              padding: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Image
                src="/your-avatar.png" // Replace with user avatar if available
                width={80}
                height={80}
                fit="cover"
                style={{
                  borderRadius: '50%',
                  objectFit: 'cover',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',

                }}
              />
              <div>
                <h3 style={{ margin: 0 }}>{user?.FirstName} {user?.LastName}</h3>
                <div style={{ fontSize: '14px', color: '#555' }}>
                  <a> Basic Info </a>
                </div>
              </div>
            </div>
            <hr style={{ margin: "20px 0" }} />
            <div style={{ background: "red", marginTop: '16px', fontSize: '14px', lineHeight: 1.5, }}>
              <Form
                form={form}
                initialValues={initialValues}
                onFinish={handleFinish}
                layout="horizontal"

              >
                <Form.Item name="title" label="Title:" style={{ background: "rgba(255, 255, 255, 0.85)" }}>
                  <TitleSelector
                    value={form.getFieldValue("title")}
                    onChange={(val) => form.setFieldValue("title", val)}
                  />
                </Form.Item>

                <Form.Item name="username" label="UserId:">
                  <Input style={{ border: "1px solid rgb(53, 119, 166)", padding: "10px", borderRadius: "5px", width: "90%" }} />
                </Form.Item>

                <Form.Item name="FirstName" label="First Name:">
                  <Input style={{ border: "1px solid rgb(53, 119, 166)", padding: "10px", borderRadius: "5px", width: "90%" }} />
                </Form.Item>

                <Form.Item name="LastName" label="Last Name:">
                  <Input style={{ border: "1px solid rgb(53, 119, 166)", padding: "10px", borderRadius: "5px", width: "90%" }} />
                </Form.Item>

                <Form.Item name="Height" label="Height:">
                  <Input style={{ border: "1px solid rgb(53, 119, 166)", padding: "10px", borderRadius: "5px", width: "90%" }} />
                </Form.Item>

                <Form.Item name="mobile" label="Mobile:">
                  <Input style={{ border: "1px solid rgb(53, 119, 166)", padding: "10px", borderRadius: "5px", width: "90%" }} />
                </Form.Item>

                <Form.Item name="pincode" label="Pincode:">
                  <Input onChange={handlePincodeChange} style={{ border: "1px solid rgb(53, 119, 166)", padding: "10px", borderRadius: "5px", width: "90%" }} />
                </Form.Item>

                <Form.Item name="City" label="City:">
                  <Input style={{ border: "1px solid rgb(53, 119, 166)", padding: "10px", borderRadius: "5px", width: "90%" }} />
                </Form.Item>

                <Form.Item name="District" label="District:">
                  <Input style={{ border: "1px solid rgb(53, 119, 166)", padding: "10px", borderRadius: "5px", width: "90%" }} />
                </Form.Item>

                <Form.Item name="State" label="State;">
                  <Input style={{ border: "1px solid rgb(53, 119, 166)", padding: "10px", borderRadius: "5px", width: "90%" }} />
                </Form.Item>

                <Form.Item name="Country" label="Country;">
                  <Input style={{ border: "1px solid rgb(53, 119, 166)", padding: "10px", borderRadius: "5px", width: "90%" }} />
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
                  <Input style={{ border: "1px solid rgb(53, 119, 166)", padding: "10px", borderRadius: "5px", width: "90%" }} />
                </Form.Item>


                <Space block style={{ marginTop: 20, padding: "0 10px 20px" }} justify="between">
                  <Button
                    color="primary"
                    fill="solid"
                    block
                    type="submit"
                    style={{ backgroundColor: "#004080", color: "white", marginTop: 16 }}
                  >
                    Save Info
                  </Button>

                  <Button
                    color="primary"
                    fill="solid"
                    block
                    onClick={() => setIsEditMode(false)}
                    style={{ backgroundColor: "red", color: "white", marginTop: 16 }}
                  >
                    Cancel
                  </Button>
                </Space>
              </Form>
            </div>
          </Card>
        </div >
      )
      }
    </div >
  );
}
