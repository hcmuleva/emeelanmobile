import React, { useContext, useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Toast,
  Radio,
  Divider,
  NavBar,
  AutoCenter,
  Card,
  Space,
} from "antd-mobile";
import { AuthContext } from "../../context/AuthContext";
import { getPincode, register } from "../../services/api";
import GotraSelector from "../authentication/registration/GotraSelector";
import gotra from "../../utils/gotra.json";
import MaritialStatus from "../authentication/registration/MaritialStatus";
import DateSelector from "../authentication/registration/DateSelector";
import "../../styles/registration.css";

export default function MyRegister({ setIsLogined }) {
  const [form] = Form.useForm();
  const [emeelanrole, setEmeelanrole] = useState("MEELAN");
  const [customdata, setCustomdata] = useState({});
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

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

  const validateCustomData = () => {
    if (!customdata.gotra) {
      Toast.show({ icon: "fail", content: "Please select your gotra" });
      return false;
    }
    if (!customdata.marititalstatus) {
      Toast.show({
        icon: "fail",
        content: "Please select your marital status",
      });
      return false;
    }
    if (!customdata.DOB) {
      Toast.show({ icon: "fail", content: "Please select your date of birth" });
      return false;
    }
    return true;
  };

  const onFinish = async (values) => {
    if (!validateCustomData()) return;

    setLoading(true);

    const payload = {
      ...values,
      emeelanrole,
      username: values.MobileNumber,
      userstatus: "PENDING",
      role: 1,
      Gotra: customdata.gotra,
      maritial: customdata.marititalstatus,
      DOB: customdata.DOB,
    };

    try {
      const response = await register(payload);
      Toast.show({
        icon: "success",
        content: "User registration completed successfully",
        duration: 2000,
        afterClose: () => form.resetFields(),
      });
      console.log("Registration success:", response);
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      Toast.show({
        icon: "fail",
        content:
          err.response?.data?.message ||
          "Failed to create user. Please try again.",
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errors) => {
    console.warn("Validation Failed:", errors);
    Toast.show({
      icon: "fail",
      content: "Please fill all required fields correctly",
      duration: 2000,
    });
  };

  return (
    <div className="registration-container">
      <NavBar
        back={null}
        style={{
          background: "#ff6b6b",
          color: "white",
          position: "sticky",
          top: 0,
          zIndex: 100,
          padding: "10px",
        }}
      >
        <span
          style={{
            fontWeight: "600",
            fontSize: "18px",
            lineHeight: "32px",
            letterSpacing: ".5px",
          }}
        >
          EMEELAN
        </span>
        <br />
        <span>गठजोड़</span>
      </NavBar>
      <div className="registration-content">
        <Card>
          <AutoCenter>
            <div className="registration-header">
              <h2 style={{ color: "#ff6b6b", margin: "0 0 8px 0" }}>Welcome</h2>
              <p style={{ color: "#666", margin: 0 }}>Sign in to continue</p>
            </div>
          </AutoCenter>

          <Divider />
          <div style={{ padding: "16px" }}>
            
            <Form
              form={form}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              initialValues={{
                Sex: "Male",
                isdivyang: false,
                Country: "India",
              }}
              footer={
                <Button
                  block
                  type="submit"
                  color="primary"
                  loading={loading}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Create Account"}
                </Button>
              }
            >
              <Form.Item
                name="FirstName"
                label="First Name"
                rules={[
                  { required: true, message: "Please enter your first name" },
                ]}
              >
                <Input placeholder="Enter First Name" clearable />
              </Form.Item>

              <Form.Item
                name="FatherName"
                label="Father's Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter your father's name",
                  },
                ]}
              >
                <Input placeholder="Enter Father's Name" clearable />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  {
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                ]}
              >
                <Input type="email" placeholder="Enter your email" clearable />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please enter a password" },
                  { min: 6, message: "Password must be at least 6 characters" },
                ]}
              >
                <Input type="password" placeholder="Enter Password" clearable />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Please confirm your password" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject("The two passwords do not match");
                    },
                  }),
                ]}
              >
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  clearable
                />
              </Form.Item>

              <Form.Item
                name="Sex"
                label="Gender"
                rules={[
                  { required: true, message: "Please select your gender" },
                ]}
              >
                <Radio.Group style={{ display: "flex", gap: "10px" }}>
                  <Radio value="Male">Male</Radio>
                  <Radio value="Female">Female</Radio>
                  <Radio value="Other">Other</Radio>
                </Radio.Group>
              </Form.Item>

              <GotraSelector
                gotraData={gotra.Gotra}
                customdata={customdata}
                setCustomdata={setCustomdata}
              />

              <MaritialStatus
                customdata={customdata}
                setCustomdata={setCustomdata}
              />

              <DateSelector
                customdata={customdata}
                setCustomdata={setCustomdata}
              />

              <Form.Item
                name="MobileNumber"
                label="Mobile Number"
                rules={[
                  {
                    required: true,
                    message: "Please enter your mobile number",
                  },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit mobile number",
                  },
                ]}
              >
                <Input
                  placeholder="Enter Mobile Number"
                  maxLength={10}
                  clearable
                />
              </Form.Item>

              <Form.Item
                name="pincode"
                label="Pincode"
                rules={[
                  {
                    pattern: /^[0-9]{6}$/,
                    message: "Please enter a valid 6-digit pincode",
                  },
                ]}
              >
                <Input
                  placeholder="Enter 6-digit pincode"
                  maxLength={6}
                  onChange={handlePincodeChange}
                  clearable
                />
              </Form.Item>

              <Form.Item name="City" label="City">
                <Input readOnly />
              </Form.Item>

              <Form.Item name="District" label="District">
                <Input readOnly />
              </Form.Item>

              <Form.Item name="State" label="State">
                <Input readOnly />
              </Form.Item>

              <Form.Item name="Country" label="Country">
                <Input readOnly />
              </Form.Item>

              <Form.Item name="isdivyang" label="Is Divyang?">
                <Radio.Group style={{ display: "flex", gap: "10px" }}>
                  <Radio style={{marginRight:"15px"}} value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                name="divyangDescription"
                label="Disability Details"
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (getFieldValue("isdivyang") === true && !value) {
                        return Promise.reject(
                          "Please provide disability details"
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input placeholder="Enter disability details if applicable" />
              </Form.Item>
            </Form>

            <Divider>OR</Divider>

            <Space direction="vertical" style={{ width: "100%" }}>
              <div style={{ textAlign: "center", marginTop: 16 }}>
                Already have an account?{" "}
                <span
                  style={{
                    color: "#ff6b6b",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => setIsLogined(true)}
                >
                  Login
                </span>
              </div>
            </Space>
          </div>
        </Card>
      </div>
    </div>
  );
}
