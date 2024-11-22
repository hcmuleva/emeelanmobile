import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useCreate, useLogin, useOnError, useRegister } from "@refinedev/core";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Steps,
  notification,
} from "antd";
import { City, Country, State } from "country-state-city";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import CoverImage from "../../../public/gathjod.png";
import Help from "../../../public/help.png";
import Logo from "../../../public/logo.png";
import "../../styles/register.css";
import countryCode from "../../utils/countryCode";
import gotra from "../../utils/gotra.json";

dayjs.extend(utc);
dayjs.extend(timezone);

const KEY = import.meta.env.VITE_CAPTCHA_KEY;
const API_URL = import.meta.env.VITE_SERVER_URL;
export const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;

export const RegisterPage = () => {
  const [hcm,setHcm] = useState({})
  const { mutate: register } = useRegister();
  const { mutate: login } = useLogin();
  const { mutate: createUser } = useCreate();
  const [country, setCountry] = useState({
    code: "IN",
    name: "India",
  });
  const [state, setState] = useState({
    code: "",
    name: "",
  });
  const [city, setCity] = useState({
    code: "",
    name: "",
  });
  const [values, setValues] = useState({
    FirstName: "",
    LastName: "",
    email: "",
    mobile: "",
    DOB: "",
    Sex: "",
    Gotra: "",
    password: "",
    dial_code: "",
    FatherName: "",
    MotherName: "",
    FatherMobileNumber: "",
    Father_occupation: "",
    NanajiName: "",
    MamajiName: "",
    MamajiMobileNumber: "",
    Address: "",
    Country: "",
    State: "",
    City: "",
    postalcode: "",
  });
  const [step, setStep] = useState(0);
  const { mutate: onError } = useOnError();

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (val) => {
    console.log("Values", val);
    
  
    
    // const formattedDate = dayjs(val["DOB"])
    //   .startOf("day")
    //   .tz("Asia/Kolkata")
    //   .format();
    // val = {
    //   ...values,
    //   role: 1,
    //   email: values.email.replace(/\s+/g, ""),
    //   username: String(values.mobile),
    //   ...val,
    //   DOB: formattedDate,
    //   Country: country.name,
    //   State: state.name,
    //   City: city.name,
    // };
    // const namePattern = /^[A-Za-z]+$/;
    // if (val.password !== val.re_password) {
    //   notification.error({
    //     message: "Error",
    //     description: "Password did not match",
    //     placement: "topRight",
    //   });
    //   return;
    // }
    // if (!val.FirstName || val.FirstName === "") {
    //   notification.error({
    //     message: "Error",
    //     description: "FirstName is mandatory",
    //     placement: "topRight",
    //   });
    //   return;
    // } else if (!namePattern.test(val.FirstName)) {
    //   notification.error({
    //     message: "Error",
    //     description: "FirstName should contain only alphabets",
    //     placement: "topRight",
    //   });
    //   return;
    // } else if (val.FirstName.length <= 2 || val.FirstName.length > 30) {
    //   notification.error({
    //     message: "Error",
    //     description: "FirstName must be between 2 to 30 characters",
    //     placement: "topRight",
    //   });
    //   return;
    // }
    val["emeelanrole"] = "MEELAN";
    // createUser(
    //   {
    //     resource: "users",
    //     values: val,
    //   },
    //   {
    //     onSuccess: async (data) => {
    //       try {
    //         const res = await fetch(`${API_URL}/api/auth/local`, {
    //           method: "POST",
    //           headers: { "Content-Type": "application/json" },
    //           body: JSON.stringify({
    //             identifier: val.email,
    //             password: val.password,
    //           }),
    //         });
    //         if (res.ok) {
    //           const logindata = await res.json();
    //           localStorage.setItem(TOKEN_KEY, logindata.jwt);
    //           localStorage.setItem("userid", String(logindata?.user?.id));
    //           localStorage.setItem(
    //             "userstatus",
    //             String(logindata?.user?.userstatus)
    //           );
    //           localStorage.setItem(
    //             "emeelanrole",
    //             String(logindata?.user?.emeelanrole)
    //           );
    //           navigate("/pending");
    //         } else {
    //           const errorData = await res.json();
    //           notification.error({
    //             message: "Login Failed",
    //             description: errorData?.message || "Invalid Credential.",
    //           });
    //         }
    //       } catch (error) {
    //         notification.error({
    //           message: "Error",
    //           description: "Something went wrong, please try again later.",
    //         });
    //       }
    //     },
    //   }
    // );
  };

  const handleCountry = (option) => {
    Country.getAllCountries().forEach((country) => {
      if (country.name === option) {
        setCountry({ code: country.isoCode, name: option });
      }
    });
  };

  const handleState = (option) => {
    State.getStatesOfCountry(country.code).forEach((state) => {
      if (state.name === option) {
        setState({ code: state.isoCode, name: option });
      }
    });
  };

  const handleStepChange = (value) => {
      
    const values = form.getFieldsValue();
   
    // setValues({
    //   ...values,
    //   FirstName: values?.FirstName,
    //   LastName: values?.LastName,
    //   email: values?.email,
    //   mobile: values?.mobile,
    //   DOB: values?.DOB,
    //   Sex: values?.Sex,
    //   Gotra: values?.Gotra,
    //   password: values?.password,
    //   dial_code: values?.dial_code,
    //   FatherName: values?.FatherName,
    //   MotherName: values?.MotherName,
    //   FatherMobileNumber: values?.FatherMobileNumber,
    //   Father_occupation: values?.Father_occupation,
    //   NanajiName: values?.NanajiName,
    //   MamajiName: values?.MamajiName,
    //   MamajiMobileNumber: values?.MamajiMobileNumber,
    //   Address: values?.Address,
    //   Country: values?.Country,
    //   State: values?.State,
    //   City: values?.City,
    //   postalcode: values?.postalcode,
    // });

    if (value === "back") {
     
      setStep(step - 1);
    } else {
      const namePattern = /^[A-Za-z]+$/;

      // Only perform password check when moving from step 0 to step 1
      if (step === 0) {
       
        if (!values.password || values.password !== values.re_password) {
          notification.error({
            message: "Error",
            description: "Password did not match",
            placement: "topRight",
          });
          return;
        }
        if (!values.FirstName || values.FirstName === "") {
          
          notification.error({
            message: "Error",
            description: "FirstName is mandatory",
            placement: "topRight",
          });
          return;
        } else if (!namePattern.test(values.FirstName)) {
          notification.error({
            message: "Error",
            description: "FirstName should contain only alphabets",
            placement: "topRight",
          });
          return;
        } else if (
          values.FirstName.length <= 2 ||
          values.FirstName.length > 30
        ) {
          notification.error({
            message: "Error",
            description: "FirstName must be between 2 to 30 characters",
            placement: "topRight",
          });
          return;
        }
      }
      setHcm({...hcm,values})
      setStep(step + 1);
    }
  };

  const mobileCodePreFix = countryCode?.map((code) => ({
    label: code.dial_code,
    key: code.code,
  }));

  return (
    <div>
      <img src={CoverImage} className="root-img" alt="Cover" />
      <div className="container">
        <div className="left-sider">
          <div style={{ display: "flex", gap: "0.3rem" }}>
            <div>
              <p>EMEELAN</p>
              <p id="gathjod">गठजोड़</p>
            </div>
            <div>
              <img
                src={Logo}
                alt="logo"
                style={{ width: "2.5rem", marginTop: "0.3rem" }}
              />
            </div>
          </div>
          <div className="people">
            <span>We bring</span>
            <br />
            <span>People Together</span>
          </div>
        </div>
        <div className="right-sider">
          <div className="help-center">
            <div className="mobile-logo">
              <div style={{ display: "flex", gap: "0.3rem" }}>
                <div>
                  <p>EMEELAN</p>
                  <p id="gathjod">गठजोड़</p>
                </div>
                <div>
                  <img
                    src={Logo}
                    alt="logo"
                    style={{ width: "2.5rem", marginTop: "0.3rem" }}
                  />
                </div>
              </div>
            </div>
            <div className="help">
              <img src={Help} alt="help" className="help-img" />
            </div>
          </div>
       
          <div className="register-details">
             {/* <Space>
           <Button>Info</Button>
           <Button>Info</Button>
           <Button>Info</Button> <Button>Info</Button>

        </Space> */}
            <Form
              style={{
                display: "flex",
                gap: "0.5rem",
                color: "white",
                width: "100%",
                justifyContent: "center",
              }}
              form={form}
              onFinish={handleSubmit}
            >
              <div className="register" style={{ gap: "0.75rem" }}>
                <span style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  Welcome To EMEELAN
                </span>
                <span style={{ fontSize: "1rem", marginBottom: "1rem" }}>
                  गठजोड़
                </span>

                {step === 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem",
                    }}
                  >
                    {/* First Name and Last Name row */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "20px",
                      }}
                    >
                      <div style={{ width: "50%" }}>
                        <div
                          style={{ fontSize: "1rem", marginBottom: "0.25rem" }}
                        >
                          <span>First Name</span>
                        </div>
                        <Form.Item
                          name="FirstName"
                          rules={[{ required: true }]}
                          style={{ marginBottom: "0" }}
                        >
                          <Input placeholder="First Name" />
                        </Form.Item>
                      </div>
                      <div style={{ width: "50%" }}>
                        <div
                          style={{ fontSize: "1rem", marginBottom: "0.25rem" }}
                        >
                          <span>Last Name</span>
                        </div>
                        <Form.Item
                          name="LastName"
                          rules={[{ required: true }]}
                          style={{ marginBottom: "0" }}
                        >
                          <Input placeholder="Last Name" />
                        </Form.Item>
                      </div>
                    </div>

                    {/* Email field */}
                    <div>
                      <div
                        style={{ fontSize: "1rem", marginBottom: "0.25rem" }}
                      >
                        <span>Email</span>
                      </div>
                      <Form.Item
                        name="email"
                        rules={[{ required: true, type: "email" }]}
                        style={{ marginBottom: "0" }}
                      >
                        <Input placeholder="Enter your Email" />
                      </Form.Item>
                    </div>

                    {/* Mobile Number field */}
                    <div>
                      <div
                        style={{ fontSize: "1rem", marginBottom: "0.25rem" }}
                      >
                        <span>Mobile Number</span>
                      </div>
                      <Form.Item
                        name="mobile"
                        rules={[{ required: true }]}
                        style={{ marginBottom: "0" }}
                      >
                        <InputNumber
                          style={{ width: "100%" }}
                          addonBefore={
                            <Form.Item
                              noStyle
                              name="dial_code"
                              initialValue="+91"
                            >
                              <Select
                                style={{ width: "80px" }}
                                defaultValue="+91"
                              >
                                {mobileCodePreFix?.map((code, index) => (
                                  <Select.Option key={index} value={code.label}>
                                    {code.label}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                          }
                          placeholder="Enter your Mobile Number"
                        />
                      </Form.Item>
                    </div>

                    {/* DOB and Sex row */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "20px",
                      }}
                    >
                      <div style={{ width: "50%" }}>
                        <div
                          style={{ fontSize: "1rem", marginBottom: "0.25rem" }}
                        >
                          <span>Date of Birth</span>
                        </div>
                        <Form.Item
                          name="DOB"
                          rules={[{ required: true }]}
                          style={{ marginBottom: "0" }}
                        >
                          <DatePicker style={{ width: "100%" }} />
                        </Form.Item>
                      </div>
                      <div style={{ width: "50%" }}>
                        <div
                          style={{ fontSize: "1rem", marginBottom: "0.25rem" }}
                        >
                          <span>Sex</span>
                        </div>
                        <Form.Item
                          name="Sex"
                          rules={[{ required: true }]}
                          style={{ marginBottom: "0" }}
                        >
                          <Select placeholder="Select gender">
                            <Select.Option value="Male">Male</Select.Option>
                            <Select.Option value="Female">Female</Select.Option>
                          </Select>
                        </Form.Item>
                      </div>
                    </div>

                    {/* Gotra field */}
                    <div>
                      <div
                        style={{ fontSize: "1rem", marginBottom: "0.25rem" }}
                      >
                        <span>Gotra</span>
                      </div>
                      <Form.Item
                        name="Gotra"
                        rules={[{ required: true }]}
                        style={{ marginBottom: "0" }}
                      >
                        <Select placeholder="Select Gotra" showSearch>
                          {gotra?.Gotra?.map((g) => (
                            <Select.Option key={g.EName} value={g.EName}>
                              {g.EName} ({g.HName})
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>

                    {/* Password fields */}
                    <div>
                      <div
                        style={{ fontSize: "1rem", marginBottom: "0.25rem" }}
                      >
                        <span>Password</span>
                      </div>
                      <Form.Item
                        name="password"
                        rules={[{ required: true }]}
                        style={{ marginBottom: "0.75rem" }}
                      >
                        <Input.Password placeholder="Enter your Password" />
                      </Form.Item>
                    </div>

                    <div>
                      <div
                        style={{ fontSize: "1rem", marginBottom: "0.25rem" }}
                      >
                        <span>Confirm Password</span>
                      </div>
                      <Form.Item
                        name="re_password"
                        dependencies={["password"]}
                        rules={[
                          { required: true },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue("password") === value
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error("Passwords do not match!")
                              );
                            },
                          }),
                        ]}
                        style={{ marginBottom: "0" }}
                      >
                        <Input.Password placeholder="Confirm your Password" />
                      </Form.Item>
                    </div>

                    {/* Navigation Buttons */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "1rem",
                      }}
                    >
                      <Button
                        style={{
                          width: "20%",
                          background: "rgba(250, 250, 250, 0.2)",
                          color: "white",
                        }}
                        onClick={() => handleStepChange("forth")}
                      >
                        <ArrowRightOutlined />
                      </Button>
                    </div>

                    {/* Login Link */}
                    <div
                      style={{
                        fontSize: "1rem",
                        textAlign: "center",
                        marginTop: "1rem",
                      }}
                    >
                      <span>Already have an account? </span>
                      <span
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                        onClick={() => navigate("/login")}
                      >
                        Log In
                      </span>
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem",
                    }}
                  >
                    {/* Father's Name and Mother's Name row */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "20px",
                      }}
                    >
                      <div style={{ width: "50%" }}>
                        <div
                          style={{ fontSize: "1rem", marginBottom: "0.25rem" }}
                        >
                          <span>Father's Name</span>
                        </div>
                        <Form.Item
                          name="FatherName"
                          rules={[
                            {
                              required: true,
                              message: "Please enter Father's Name!",
                            },
                          ]}
                          style={{ marginBottom: "0" }}
                        >
                          <Input placeholder="Enter Father's Name" />
                        </Form.Item>
                      </div>
                      <div style={{ width: "50%" }}>
                        <div
                          style={{ fontSize: "1rem", marginBottom: "0.25rem" }}
                        >
                          <span>Mother's Name</span>
                        </div>
                        <Form.Item
                          name="MotherName"
                          rules={[
                            {
                              required: true,
                              message: "Please enter Mother's Name!",
                            },
                          ]}
                          style={{ marginBottom: "0" }}
                        >
                          <Input placeholder="Enter Mother's Name" />
                        </Form.Item>
                      </div>
                    </div>

                    {/* Father's Mobile Number */}
                    <div>
                      <div
                        style={{ fontSize: "1rem", marginBottom: "0.25rem" }}
                      >
                        <span>Father's Mobile Number</span>
                      </div>
                      <Form.Item
                        name="FatherMobileNumber"
                        rules={[
                          {
                            required: true,
                            message: "Please enter Father's Mobile Number!",
                          },
                        ]}
                        style={{ marginBottom: "0" }}
                      >
                        <InputNumber
                          style={{ width: "100%" }}
                          addonBefore={
                            <Form.Item
                              noStyle
                              name="father_dial_code"
                              initialValue="+91"
                            >
                              <Select
                                style={{ width: "80px" }}
                                defaultValue="+91"
                              >
                                {mobileCodePreFix?.map((code, index) => (
                                  <Select.Option key={index} value={code.label}>
                                    {code.label}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                          }
                          placeholder="Enter Father's Mobile Number"
                        />
                      </Form.Item>
                    </div>

                    {/* Father's Occupation */}
                    <div>
                      <div
                        style={{ fontSize: "1rem", marginBottom: "0.25rem" }}
                      >
                        <span>Father's Occupation</span>
                      </div>
                      <Form.Item
                        name="Father_occupation"
                        rules={[
                          {
                            required: true,
                            message: "Please enter Father's Occupation!",
                          },
                        ]}
                        style={{ marginBottom: "0" }}
                      >
                        <Input placeholder="Enter Father's Occupation" />
                      </Form.Item>
                    </div>

                    {/* Nanaji's Name and Mamaji's Name row */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "20px",
                      }}
                    >
                      <div style={{ width: "50%" }}>
                        <div
                          style={{ fontSize: "1rem", marginBottom: "0.25rem" }}
                        >
                          <span>Nanaji's Name</span>
                        </div>
                        <Form.Item
                          name="NanajiName"
                          rules={[
                            {
                              required: true,
                              message: "Please enter Nanaji's Name!",
                            },
                          ]}
                          style={{ marginBottom: "0" }}
                        >
                          <Input placeholder="Enter Nanaji's Name" />
                        </Form.Item>
                      </div>
                      <div style={{ width: "50%" }}>
                        <div
                          style={{ fontSize: "1rem", marginBottom: "0.25rem" }}
                        >
                          <span>Mamaji's Name</span>
                        </div>
                        <Form.Item
                          name="MamajiName"
                          rules={[
                            {
                              required: true,
                              message: "Please enter Mamaji's Name!",
                            },
                          ]}
                          style={{ marginBottom: "0" }}
                        >
                          <Input placeholder="Enter Mamaji's Name" />
                        </Form.Item>
                      </div>
                    </div>

                    {/* Mamaji's Number */}
                    <div>
                      <div
                        style={{ fontSize: "1rem", marginBottom: "0.25rem" }}
                      >
                        <span>Mamaji's Number</span>
                      </div>
                      <Form.Item
                        name="MamajiMobileNumber"
                        rules={[
                          {
                            required: true,
                            message: "Please enter Mamaji's Number!",
                          },
                        ]}
                        style={{ marginBottom: "0" }}
                      >
                        <InputNumber
                          style={{ width: "100%" }}
                          addonBefore={
                            <Form.Item
                              noStyle
                              name="mamaji_dial_code"
                              initialValue="+91"
                            >
                              <Select
                                style={{ width: "80px" }}
                                defaultValue="+91"
                              >
                                {mobileCodePreFix?.map((code, index) => (
                                  <Select.Option key={index} value={code.label}>
                                    {code.label}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                          }
                          placeholder="Enter Mamaji's Number"
                        />
                      </Form.Item>
                    </div>
                  </div>
                )}
                {step === 2 && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.75rem",
                    }}
                  >
                    {/* Address field */}
                    <div>
                      <div
                        style={{ fontSize: "1rem", marginBottom: "0.25rem" }}
                      >
                        <span>Address</span>
                      </div>
                      <Form.Item
                        name="Address"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your address!",
                          },
                        ]}
                        style={{ marginBottom: "0" }}
                      >
                        <Input.TextArea
                          placeholder="Enter your Address"
                          rows={3}
                        />
                      </Form.Item>
                    </div>

                    {/* Country field */}
                    <div>
                      <div
                        style={{ fontSize: "1rem", marginBottom: "0.25rem" }}
                      >
                        <span>Country</span>
                      </div>
                      <Form.Item
                        name="Country"
                        rules={[
                          {
                            required: true,
                            message: "Please select your country!",
                          },
                        ]}
                        style={{ marginBottom: "0" }}
                      >
                        <Select
                          placeholder="Select Country"
                          showSearch
                          onChange={handleCountry}
                        >
                          {Country.getAllCountries().map((country) => (
                            <Select.Option
                              key={country.isoCode}
                              value={country.name}
                            >
                              {country.name}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>

                    {/* State and City row */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "20px",
                      }}
                    >
                      {/* State field */}
                      <div style={{ width: "50%" }}>
                        <div
                          style={{ fontSize: "1rem", marginBottom: "0.25rem" }}
                        >
                          <span>State</span>
                        </div>
                        <Form.Item
                          name="State"
                          rules={[
                            {
                              required: true,
                              message: "Please select your state!",
                            },
                          ]}
                          style={{ marginBottom: "0" }}
                        >
                          <Select
                            placeholder="Select State"
                            showSearch
                            onChange={handleState}
                          >
                            {State.getStatesOfCountry(country.code).map(
                              (state) => (
                                <Select.Option
                                  key={state.isoCode}
                                  value={state.name}
                                >
                                  {state.name}
                                </Select.Option>
                              )
                            )}
                          </Select>
                        </Form.Item>
                      </div>

                      {/* City field */}
                      <div style={{ width: "50%" }}>
                        <div
                          style={{ fontSize: "1rem", marginBottom: "0.25rem" }}
                        >
                          <span>City</span>
                        </div>
                        <Form.Item
                          name="City"
                          rules={[
                            {
                              required: true,
                              message: "Please select your city!",
                            },
                          ]}
                          style={{ marginBottom: "0" }}
                        >
                          <Select placeholder="Select City" showSearch>
                            {City.getCitiesOfState(
                              country.code,
                              state.code
                            ).map((city) => (
                              <Select.Option key={city.name} value={city.name}>
                                {city.name}
                              </Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </div>
                    </div>

                    {/* Pincode field */}
                    <div>
                      <div
                        style={{ fontSize: "1rem", marginBottom: "0.25rem" }}
                      >
                        <span>Pincode</span>
                      </div>
                      <Form.Item
                        name="postalcode"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your pincode!",
                          },
                        ]}
                        style={{ marginBottom: "0" }}
                      >
                        <InputNumber
                          style={{ width: "100%" }}
                          placeholder="Enter Pincode"
                        />
                      </Form.Item>
                    </div>
                  </div>
                )}

                {/* Global Navigation Buttons - Keep only these */}
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px",
                  }}
                >
                  {step > 0 && (
                    <Button
                      style={{
                        width: "20%",
                        background: "rgba(250, 250, 250, 0.2)",
                        color: "white",
                      }}
                      onClick={() => handleStepChange("back")}
                    >
                      <ArrowLeftOutlined />
                    </Button>
                  )}

                  {step < 2 ? (
                    <Button
                      style={{
                        width: "20%",
                        background: "rgba(250, 250, 250, 0.2)",
                        color: "white",
                        marginLeft: step === 0 ? "auto" : "0",
                      }}
                      onClick={() => handleStepChange("forth")}
                    >
                      <ArrowRightOutlined />
                    </Button>
                  ) : (
                    <Button
                      style={{
                        width: "30%",
                        background: "rgba(250, 250, 250, 0.2)",
                        color: "white",
                        marginLeft: "auto",
                      }}
                      htmlType="submit"
                    >
                      Sign Up
                    </Button>
                  )}
                </div>

                <div
                  style={{
                    fontSize: "1rem",
                    textAlign: "center",
                    marginTop: "20px",
                  }}
                >
                  <span>Already have an account? </span>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/login")}
                  >
                    Log In
                  </span>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
