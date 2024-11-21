import {
  ArrowLeftOutlined,
  ArrowRightOutlined
} from "@ant-design/icons";
import { useCreate, useLogin, useOnError, useRegister } from "@refinedev/core";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Steps,
  notification,
  theme
} from "antd";
import { City, Country, State } from "country-state-city";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CoverImage from "../../../public/gathjod.png";
import Help from "../../../public/help.png";
import Logo from "../../../public/logo.png";
import "../../styles/register.css";
import countryCode from "../../utils/countryCode";
import gotra from "../../utils/gotra.json";
const KEY = import.meta.env.VITE_CAPTCHA_KEY;
const API_URL = import.meta.env.VITE_SERVER_URL;
export const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;

dayjs.extend(utc);
dayjs.extend(timezone);
const { useToken } = theme;

export const RegisterPage = () => {
  const { mutate: register } = useRegister();
  const { mutate: login } = useLogin();
  const { mutate: createUser } = useCreate();
  const [selfImage, setSelfImage] = useState([]);
  const [fatherImage, setFatherImage] = useState([]);
  const [motherImage, setMotherImage] = useState([]);
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
    password: "",
    dial_code: "",
    Sex: "",
    Height: "",
    Country: "",
    Gotra: "",
  });
  const [step, setStep] = useState(0);
  const { mutate: onError } = useOnError();

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const formItemProps = {
    rules: [{ max: 20 }],
    style: { marginBottom: "1rem" },
  };

  const onSubmit = (values) => {
    values["username"] = values["MobileNumber"];
    values["email"] = values["MobileNumber"] + "@hph.com";

    register({ ...values });
  };

  const handleRedirectToLogin = () => {
    navigate("/login");
  };

  const selfImageProps = {
    onRemove: (file) => {
      const index = selfImage.indexOf(file);
      const newSelfImage = selfImage.slice();
      selfImage.splice(index, 1);
      setSelfImage(newSelfImage);
    },
    beforeUpload: (file) => {
      setSelfImage([...selfImage, file]);
      return false;
    },
    maxCount: 1,
  };

  const fatherImageprops = {
    onRemove: (file) => {
      const index = fatherImage.indexOf(file);
      const newfatherImage = fatherImage.slice();
      newfatherImage.splice(index, 1);
      setFatherImage(newfatherImage);
    },
    beforeUpload: (file) => {
      setFatherImage([...fatherImage, file]);

      return false;
    },
    maxCount: 1,
  };

  const motherImageprops = {
    onRemove: (file) => {
      const index = motherImage.indexOf(file);
      const newmotherImage = motherImage.slice();
      newmotherImage.splice(index, 1);
      setMotherImage(newmotherImage);
    },
    beforeUpload: (file) => {
      setMotherImage([...motherImage, file]);
      return false;
    },
    maxCount: 1,
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleSubmit = async (val) => {
    const formattedDate = dayjs(val["DOB"])
      .startOf("day")
      .tz("Asia/Kolkata")
      .format();
    val = {
      ...values,
      role: 1,
      email: values.email.replace(/\s+/g, ''),
      username: String(values.mobile),
      ...val,
      DOB: formattedDate,
      Country: country.name,
      State: state.name,
      City: city.name,
    };
    const namePattern = /^[A-Za-z]+$/;
    if (val.password !== val.re_password) {
      notification.error({
        message: "Error",
        description: "Password did not match",
        placement: "topRight",
      });
      return;
    }
    if (!val.FirstName || val.FirstName === "") {
      notification.error({
        message: "Error",
        description: "FirstName is mandatory",
        placement: "topRight",
      });
      return;
    } else if (!namePattern.test(val.FirstName)) {
      notification.error({
        message: "Error",
        description: "FirstName should contain only alphabets",
        placement: "topRight",
      });
      return;
    } else if (val.FirstName.length <= 2 || val.FirstName.length > 30) {
      notification.error({
        message: "Error",
        description: "FirstName must be between 2 to 30 characters",
        placement: "topRight",
      });
      return;
    }
    val['emeelanrole']="MEELAN"
    createUser(
      {
        resource: "users",
        values: val,
      },
      {
        onSuccess: async (data) => {
          console.log("Data",data)
          try {
            console.log("Before request")
            console.log("userid",val.email)
            console.log("password", val.password)
            const res = await fetch(`${API_URL}/api/auth/local`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ identifier: val.email, password: val.password }),
            });
            console.log("Res",res)
            if (res.ok) {
              const logindata = await res.json();
              console.log("Login data",logindata)
              console.log("TOKEN_KEY", logindata.jwt);
              console.log("userid", String(logindata?.user?.id));
              console.log("userstatus",String(logindata?.user?.userstatus));
              console.log("emeelanrole",String(logindata?.user?.emeelanrole))
              localStorage.setItem(TOKEN_KEY, logindata.jwt);
              localStorage.setItem("userid", String(logindata?.user?.id));
              localStorage.setItem("userstatus",String(logindata?.user?.userstatus));
              localStorage.setItem("emeelanrole",String(logindata?.user?.emeelanrole))
              navigate("/pending");
            } else {
              
              const errorData = await res.json(); // Get error response body
                  notification.error({
                      message: "Login Failed",
                      description: errorData?.message || "Envalid Credential.",
                  });
            }
            console.log("OUTSIDE IF")
          } catch (error) {
            notification.error({
              message: "Error",
              description: "Something went wrong, please try again later.",
          });
          }
        },
      }
    );
  };
  const mobileCodePreFix = countryCode?.map((code) => {
    return {
      label: code.dial_code,
      key: code.code,
    };
  });
  const handleGenderChange = (option) => {
    setValues({ ...values, Sex: option });
  };

  const handleHeightChange = (option) => {
    setValues({ ...values, Height: option });
  };

  const handleStepChange = (value) => {
    const values = form.getFieldsValue();
    setValues({
      ...values,
      FirstName: values?.FirstName,
      LastName: values?.LastName,
      dial_code: values?.dial_code,
      mobile: values?.mobile,
      email: values?.email,
      password: values?.password,
    });
    if (value == "back") {
      setStep(step - 1);
    } else {
      const namePattern = /^[A-Za-z]+$/;
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
      } else if (values.FirstName.length <= 2 || values.FirstName.length > 30) {
        notification.error({
          message: "Error",
          description: "FirstName must be between 2 to 30 characters",
          placement: "topRight",
        });
        return;
      }
      setStep(step + 1);
    }
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
  return (
    <>
      <div>
        <img src={CoverImage} className="root-img"></img>
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
                ></img>
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
                    ></img>
                  </div>
                </div>
              </div>
              <div className="help">
                <img src={Help} alt="help" className="help-img" />
              </div>
            </div>
            <div className="register-details">
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
                <div className="register">
                  <span style={{ fontSize: "1.2rem" }}>Welcome To EMEELAN</span>
                  <span style={{ fontSize: "1rem" }}>गठजोड़</span>
                  <div style={{ marginTop: "30px" }} className="steps">
                    <Steps
                      size="small"
                      progressDot
                      className="stepsa"
                      current={step}
                      items={[
                        {
                          title: <p style={{ color: "white" }}>Step 1</p>,
                        },
                        {
                          title: <p style={{ color: "white" }}>Final</p>,
                        },
                      ]}
                    />
                  </div>
                  {step == 0 && (
                    <>
                      <div
                        style={{
                          display: "flex",
                          marginTop: "10px",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            width: "47%",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.1rem",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "1rem",
                            }}
                          >
                            <span>First Name</span>
                          </div>
                          <Form.Item
                            name="FirstName"
                            rules={[
                              {
                                required: true,
                              },
                            ]}
                          >
                            <Input
                              width={"50%"}
                              placeholder="FirstName"
                              required
                            ></Input>
                          </Form.Item>
                        </div>
                        <div
                          style={{
                            width: "47%",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.1rem",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "1rem",
                            }}
                          >
                            <span>Last Name</span>
                          </div>
                          <Form.Item name="LastName">
                            <Input placeholder="LastName"></Input>
                          </Form.Item>
                        </div>
                      </div>
                      <div
                        style={{
                          width: "100%",
                          fontSize: "1rem",
                          marginTop: "-10px",
                        }}
                      >
                        <span>Email</span>
                      </div>
                      <Form.Item name="email" style={{ width: "100%" }}>
                        <Input
                          style={{ width: "100%" }}
                          placeholder="Enter your Email"
                          required
                        ></Input>
                      </Form.Item>
                      <div
                        style={{
                          width: "100%",
                          fontSize: "1rem",
                          marginTop: "-10px",
                        }}
                      >
                        <span>Mobile Number</span>
                      </div>
                      <Form.Item
                        name="mobile"
                        style={{ width: "100%" }}
                        rules={[
                          {
                            validator: (_, value) => {
                              const mobileString = String(value).length;
                              if (mobileString !== 10) {
                                return Promise.reject(
                                  "Please enter a valid number with 10 digits"
                                );
                              }
                              return Promise.resolve();
                            },
                          },
                          {
                            required: true,
                            message: "Please Enter mobile number!",
                          },
                        ]}
                      >
                        <InputNumber
                          style={{ width: "100%" }}
                          addonBefore={
                            <Form.Item
                              noStyle
                              name={"dial_code"}
                              initialValue={"+91"}
                            >
                              <Select
                                style={{ width: "80px" }}
                                defaultValue={"+91"}
                              >
                                {mobileCodePreFix?.map((code, index) => (
                                  <Select.Option key={index} value={code.label}>
                                    <span>{code.label}</span>
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                          }
                          type="number"
                          placeholder="Enter your Mobile Number"
                          required
                        ></InputNumber>
                      </Form.Item>

                      <div
                        style={{
                          width: "100%",
                          fontSize: "1rem",
                          marginTop: "-10px",
                        }}
                      >
                        <span>Password</span>
                      </div>
                      <Form.Item name={"password"} style={{ width: "100%" }}>
                        <Input.Password
                          placeholder="Enter your Password"
                          required
                          type="password"
                          name="password"
                        ></Input.Password>
                      </Form.Item>
                      <div
                        style={{
                          width: "100%",
                          fontSize: "1rem",
                          marginTop: "-10px",
                        }}
                      >
                        <span>Confirm Password</span>
                      </div>
                      <Form.Item name={"re_password"} style={{ width: "100%" }}>
                        <Input.Password
                          placeholder="Enter Your Password Again"
                          type="password"
                          required
                        ></Input.Password>
                      </Form.Item>
                    </>
                  )}
                  {step == 1 && (
                    <>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          marginTop: "10px",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            width: "47%",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.1rem",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "1rem",
                            }}
                          >
                            <span>DOB</span>
                          </div>
                          <Form.Item
                            name={"DOB"}
                            rules={[
                              {
                                required: true,
                                message: "Please Enter DOB",
                              },
                            ]}
                          >
                            <DatePicker />
                          </Form.Item>
                        </div>
                        <div
                          style={{
                            width: "47%",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.1rem",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "1rem",
                            }}
                          >
                            <span>Gender</span>
                          </div>
                          <Form.Item
                            name={"Sex"}
                            rules={[
                              {
                                required: true,
                                message: "Please Enter Gender",
                              },
                            ]}
                          >
                            <Select
                              placeholder="Select gender"
                              onChange={handleGenderChange}
                            >
                              <Select.Option
                                key={"Male"}
                                value={"Male"}
                                children={"Male"}
                              ></Select.Option>
                              <Select.Option
                                key={"Female"}
                                value={"Female"}
                                children={"Female"}
                              ></Select.Option>
                              
                            </Select>
                          </Form.Item>
                        </div>
                      </div>
                      <div
                        style={{
                          width: "100%",
                          fontSize: "1rem",
                          marginTop: "-10px",
                        }}
                      >
                        <span>Height</span>
                      </div>
                      <Form.Item
                        name="Height"
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Select
                          placeholder="Select Your Height"
                          showSearch
                          style={{ width: "100%" }}
                          onChange={handleHeightChange}
                          //onChange={(e) => handleUserId(e)}
                        >
                          {Array.from({ length: 100 }, (_, i) => 100 + i).map(
                            (height) => (
                              <Select.Option
                                key={height}
                                value={String(height)}
                              >
                                {height} cm
                              </Select.Option>
                            )
                          )}
                        </Select>
                      </Form.Item>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            width: "47%",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.1rem",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "1rem",
                            }}
                          >
                            <span>Country</span>
                          </div>
                          <Form.Item
                            name={"Country"}
                            rules={[
                              {
                                required: true,
                                message: "Please Enter Country",
                              },
                            ]}
                          >
                            <Select
                              style={{ width: "100%" }}
                              placeholder="Enter Your Country"
                              showSearch
                              onChange={(option) => handleCountry(option)}
                            >
                              {Country.getAllCountries().map((country) => {
                                return (
                                  <Select.Option
                                    value={country.name}
                                    label={country.name}
                                    children={country.name}
                                  ></Select.Option>
                                );
                              })}
                            </Select>
                          </Form.Item>
                        </div>
                        <div
                          style={{
                            width: "47%",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.1rem",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "1rem",
                            }}
                          >
                            <span>State</span>
                          </div>
                          <Form.Item
                            name={"State"}
                            rules={[
                              {
                                required: true,
                                message: "Please Enter State",
                              },
                            ]}
                          >
                            <Select
                              placeholder="Select state"
                              onChange={handleState}
                              showSearch
                            >
                              {State.getStatesOfCountry(country.code).map(
                                (state) => (
                                  <Select.Option
                                    label={state.name}
                                    value={state.name}
                                  >
                                    {state.name}
                                  </Select.Option>
                                )
                              )}
                            </Select>
                          </Form.Item>
                        </div>
                      </div>
                      <div
                        style={{
                          width: "100%",
                          fontSize: "1rem",
                          marginTop: "-10px",
                        }}
                      >
                        <span>City</span>
                      </div>
                      <Form.Item
                        name={"City"}
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Select
                          style={{ width: "100%" }}
                          placeholder="Select Your City"
                          showSearch
                        >
                          {City.getCitiesOfState(country.code, state.code).map(
                            (city) => (
                              <Select.Option
                                label={city.name}
                                value={city.name}
                              >
                                {city.name}
                              </Select.Option>
                            )
                          )}
                        </Select>
                      </Form.Item>

                      <div
                        style={{
                          width: "100%",
                          fontSize: "1rem",
                          marginTop: "-10px",
                        }}
                      >
                        <span>Gotra</span>
                      </div>
                      <Form.Item
                        name="Gotra"
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Please Select Gotra",
                          },
                        ]}
                      >
                        <Select
                          style={{ width: "100%" }}
                          placeholder="Enter Your Gotra"
                          showSearch
                        >
                          {gotra?.Gotra?.map((gotra) => {
                            return (
                              <Select.Option
                                value={gotra.EName}
                                label={gotra.EName}
                              >
                                {gotra.EName} {`(${gotra.HName})`}
                              </Select.Option>
                            );
                          })}
                          <Select.Option value="Other" label="Other">
                            Other
                          </Select.Option>
                        </Select>
                      </Form.Item>
                    </>
                  )}
                  {step == 2 && (
                    <>
                      <div
                        style={{
                          display: "flex",
                          marginTop: "10px",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            width: "47%",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.1rem",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "1rem",
                            }}
                          >
                            <span>DOB</span>
                          </div>
                          <Input
                            width={"50%"}
                            placeholder="FirstName"
                            //onChange={(e) => handleUserId(e)}
                          ></Input>
                        </div>
                        <div
                          style={{
                            width: "47%",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.1rem",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "1rem",
                            }}
                          >
                            <span>Last Name</span>
                          </div>
                          <Input
                            placeholder="LastName"
                            //onChange={(e) => handleUserId(e)}
                          ></Input>
                        </div>
                      </div>
                      <div
                        style={{
                          width: "100%",
                          fontSize: "1rem",
                          marginTop: "10px",
                        }}
                      >
                        <span>Email</span>
                      </div>
                      <Input
                        placeholder="Enter your Email"
                        name="email"
                        //onChange={(e) => handleUserId(e)}
                      ></Input>
                      <div
                        style={{
                          width: "100%",
                          fontSize: "1rem",
                          marginTop: "10px",
                        }}
                      >
                        <span>Mobile Number</span>
                      </div>
                      <Input
                        prefix={<span style={{ color: "darkgray" }}>+91 </span>}
                        name="mobile_number"
                        placeholder="Enter your Mobile Number"
                        //onChange={(e) => handleUserId(e)}
                      ></Input>
                      <div
                        style={{
                          width: "100%",
                          fontSize: "1rem",
                          marginTop: "10px",
                        }}
                      >
                        <span>Password</span>
                      </div>
                      <Input.Password
                        placeholder="Enter your Password"
                        type="password"
                        name="password"
                        //onChange={(e) => handlePassword(e)}
                      ></Input.Password>
                      <div
                        style={{
                          width: "100%",
                          fontSize: "1rem",
                          marginTop: "10px",
                        }}
                      >
                        <span>Confirm Password</span>
                      </div>
                      <Input.Password
                        placeholder="Enter your Password again"
                        type="password"
                        //onChange={(e) => handlePassword(e)}
                      ></Input.Password>
                    </>
                  )}
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      alignItems: "center",
                    }}
                  >
                    {step < 1 && (
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent:
                            step == 0 ? "flex-end" : "space-between",
                        }}
                      >
                        {step !== 0 && (
                          <Button
                            style={{
                              width: "20%",
                              background: "rgba(250, 250, 250, 0.2)",
                              color: "white",
                            }}
                            onClick={() => handleStepChange("back")}
                          >
                            <ArrowLeftOutlined></ArrowLeftOutlined>
                          </Button>
                        )}
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
                    )}
                    {step == 1 && (
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          style={{
                            width: "20%",
                            background: "rgba(250, 250, 250, 0.2)",
                            color: "white",
                          }}
                          onClick={() => setStep(step - 1)}
                        >
                          <ArrowLeftOutlined />
                        </Button>
                        <Button
                          style={{
                            width: "30%",
                            background: "rgba(250, 250, 250, 0.2)",
                            color: "white",
                          }}
                          htmlType="submit"
                        >
                          Sign Up
                        </Button>
                      </div>
                    )}
                    <div style={{ fontSize: "1rem" }}>
                      <span>Already have an account?</span>
                      <span style={{cursor: "pointer"}} onClick={() => navigate('/login')}> Log In </span>
                    </div>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
