import {
  Button,
  Dropdown,
  Form,
  Input,
  NavBar,
  Radio,
  Space,
  Toast,
} from "antd-mobile";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getPincode, getSamaj, register } from "../../services/api";
import DateSelector from "../authentication/registration/DateSelector";
import GotraSelector from "../authentication/registration/GotraSelector";
import MaritialStatus from "../authentication/registration/MaritialStatus";
// import gotra from "../../utils/gotra.json";
import { useNavigate } from "react-router-dom";
import "../../styles/registration.css";
import GotraController from "../../utils/GotraController";

export default function MyRegister({ setIsLogined }) {
  const [selectedSamaj, setSelectedSamaj] = useState(null);
  const gotra = selectedSamaj ? GotraController(selectedSamaj) : { Gotra: [] };
  const [allSamaj, setAllSamaj] = useState([]);

  console.log("My Register");

  const [form] = Form.useForm();
  const [emeelanrole, setEmeelanrole] = useState("MEELAN");
  const [customdata, setCustomdata] = useState({});
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profession, setProfession] = useState("");
  const [customProfession, setCustomProfession] = useState("");
  const authenticated = localStorage.getItem("authenticated");

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

  useEffect(() => {
    const fetchSamaj = async () => {
      const res = await getSamaj();
      setAllSamaj(res?.data);
    };
    fetchSamaj();
  }, []);

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

  const handleReset = () => {
    form.resetFields();
    setCustomdata({});
  };

  const onFinish = async (values) => {
    if (!validateCustomData()) return;
    setLoading(true);

    console.log(customdata, "CUSTOM DATA");

    const payload = {
      ...values,
      Profession: profession === "OTHER" ? customProfession : profession,
      emeelanrole,
      username: values.MobileNumber,
      userstatus: "PENDING",
      role: 1,
      Gotra: customdata.gotra,
      maritial: customdata.marititalstatus,
      DOB: customdata.DOB,
      orgsku: values.Samaj,
    };

    console.log(payload, "NEW PALOAD");

    try {
      const response = await register(payload);
      Toast.show({
        icon: "success",
        content: "User registration completed successfully",
        duration: 3000,
        afterClose: () => form.resetFields(),
      });
      handleReset();
      navigate("/login");
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
      {(user?.userrole === "MEELAN" || authenticated === "false") && (
        <NavBar
          back={null}
          style={{
            background: "#BC0226",
            color: "white",
            position: "sticky",
            top: 0,
            zIndex: 100,
            height: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "35px 12px 25px 12px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginTop: "auto",
            }}
          >
            {/* Left Side: Title */}
            <div>
              <div
                style={{
                  fontWeight: "600",
                  fontSize: "18px",
                  lineHeight: "20px",
                  letterSpacing: ".8px",
                  textAlign: "left",
                }}
              >
                Emeelan
                <br />
                <span
                  style={{
                    fontSize: "16px",
                    lineHeight: "20px",
                    letterSpacing: ".8px",
                    fontWeight: "600",
                  }}
                >
                  गथजोड़
                  {/* आल इंडिया क्षत्रिय राठौड़ समाज */}
                </span>
              </div>
            </div>

            {/* Right Side: Logo */}
            <img
              src="logo.png"
              alt="Logo"
              style={{
                height: "36px",
                width: "36px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>
        </NavBar>
      )}
      <div className="registration-content">
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            maxWidth: "450px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#ff6b6b",
              marginBottom: "20px",
              fontSize: "24px",
            }}
          >
            Register
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "#666",
              marginBottom: "20px",
            }}
          >
            Create a new account to continue
          </p>

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
                style={{
                  backgroundColor: "#990000",
                  borderRadius: "4px",
                  marginTop: "20px",
                }}
              >
                {loading ? "Processing..." : "Register"}
              </Button>
            }
          >
            <Form.Item
              name="FirstName"
              label={
                <>
                  <span style={{ marginLeft: "5px" }}>First Name</span>
                </>
              }
              rules={[
                { required: true, message: "Please enter your first name" },
              ]}
            >
              <Input placeholder="Enter First Name" clearable />
            </Form.Item>

            <Form.Item
              name="LastName"
              label={
                <>
                  <span style={{ marginLeft: "5px" }}>Last Name</span>
                </>
              }
              rules={[
                { required: true, message: "Please enter your last name" },
              ]}
            >
              <Input placeholder="Enter Last Name" clearable />
            </Form.Item>

            <Form.Item
              name="FatherName"
              label={
                <>
                  <span style={{ marginLeft: "5px" }}>Father's Name</span>
                </>
              }
              rules={[
                { required: true, message: "Please enter your father's name" },
              ]}
            >
              <Input placeholder="Enter Father's Name" clearable />
            </Form.Item>

            <Form.Item
              name="email"
              label={
                <>
                  <span style={{ marginLeft: "5px" }}>Email</span>
                </>
              }
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
              label={
                <>
                  <span style={{ marginLeft: "5px" }}>Password</span>
                </>
              }
              rules={[
                { required: true, message: "Please enter a password" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
            >
              <Input type="password" placeholder="Enter Password" clearable />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label={
                <>
                  <span style={{ marginLeft: "5px" }}>Confirm Password</span>
                </>
              }
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
              <Input type="password" placeholder="Confirm Password" clearable />
            </Form.Item>

            <Form.Item
              name="Sex"
              label={
                <>
                  <span style={{ marginLeft: "5px" }}>Gender</span>
                </>
              }
              rules={[{ required: true, message: "Please select your gender" }]}
            >
              <Radio.Group style={{ display: "flex", gap: "10px" }}>
                <Radio value="Male" style={{ marginRight: "15px" }}>
                  Male
                </Radio>
                <Radio value="Female">Female</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="Samaj"
              label={<span style={{ marginLeft: "5px" }}>Samaj</span>}
              rules={[{ required: true, message: "Please select your Samaj" }]}
            >
              <div style={{ width: "50%", maxHeight: "40px" }}>
                <select
                  value={selectedSamaj || ""}
                  onChange={async (e) => {
                    const val = e.target.value;
                    if (val) {
                      console.log(val);
                      console.log("BEFORE SAMAJ CALLED");
                      const res = await getSamaj({ samaj_type: val });
                      console.log(res, "SAMAJ CALLED");
                      setSelectedSamaj(val);
                    }
                  }}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                    backgroundColor: "white",
                    height: "36px",
                    fontSize: "14px",
                    WebkitAppearance: "menulist",
                    appearance: "menulist",
                    backgroundPosition: "right 8px center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "12px",
                    paddingRight: "24px",
                  }}
                  size="1"
                >
                  <option value="">Select Samaj</option>
                  {allSamaj.map((samaj) => (
                    <option
                      key={samaj?.id}
                      value={samaj?.attributes?.samaj_type}
                    >
                      {samaj?.attributes?.title}
                    </option>
                  ))}
                </select>
              </div>
            </Form.Item>

            {selectedSamaj && (
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "500",
                  }}
                >
                  <span style={{ color: "red" }}>*</span> Gotra
                </label>
                <GotraSelector
                  gotraData={gotra.Gotra}
                  customdata={customdata}
                  setCustomdata={setCustomdata}
                />
              </div>
            )}

            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "500",
                }}
              >
                <span style={{ color: "red" }}>*</span> Marital Status
              </label>
              <MaritialStatus
                customdata={customdata}
                setCustomdata={setCustomdata}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "500",
                }}
              >
                <span style={{ color: "red" }}>*</span> Date of Birth
              </label>
              <DateSelector
                customdata={customdata}
                setCustomdata={setCustomdata}
              />
            </div>

            <Form.Item
              name="profession"
              label={
                <>
                  <span style={{ marginLeft: "5px" }}>Profession</span>
                </>
              }
              rules={[
                { required: true, message: "Please select your profession" },
              ]}
            >
              <div style={{ width: "50%", maxHeight: "40px" }}>
                <select
                  value={profession}
                  onChange={(e) => {
                    const val = e.target.value;
                    setProfession(val);
                    if (val !== "OTHER") {
                      setCustomProfession("");
                    }
                  }}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                    backgroundColor: "white",
                    height: "36px",
                    fontSize: "14px",
                    WebkitAppearance: "menulist",
                    appearance: "menulist",
                    backgroundPosition: "right 8px center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "12px",
                    paddingRight: "24px",
                  }}
                  size="1"
                >
                  <option value="">Select Profession</option>
                  {[
                    "BUSINESS",
                    "ENGINEER",
                    "DOCTOR",
                    "TEACHER",
                    "CA",
                    "SERVICE",
                    "HOUSEWORK",
                    "GOVTJOB",
                    "PRIVATEJOB",
                    "STUDENT",
                    "OTHER",
                  ].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {profession === "OTHER" && (
                <Input
                  style={{ marginTop: "10px" }}
                  placeholder="Enter your profession"
                  value={customProfession}
                  onChange={(val) => setCustomProfession(val)}
                  clearable
                />
              )}
            </Form.Item>
            <Form.Item
              name="MobileNumber"
              label={
                <>
                  <span style={{ marginLeft: "5px" }}>Mobile Number</span>
                </>
              }
              rules={[
                { required: true, message: "Please enter your mobile number" },
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
              <Radio.Group style={{ display: "flex", gap: "10px" }}>
                <Radio value={true} style={{ marginRight: "15px" }}>
                  Yes
                </Radio>
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
          {(user?.userrole === "MEELAN" || authenticated === "false") && (
            <div style={{ textAlign: "center", marginTop: "15px" }}>
              <p style={{ color: "#666", margin: "10px 0" }}>OR</p>
              <p>
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
              </p>
            </div>
          )}
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <a href="/terms" style={{ fontSize: "0.875rem", color: "#888" }}>
              Terms and Conditions
            </a>
          </div>
          <br />
          <br />
        </div>
      </div>
    </div>
  );
}
