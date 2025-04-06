import {
  AutoCenter,
  Button,
  Card,
  Divider,
  Form,
  Input,
  NavBar,
  Radio,
  Steps,
  Toast,
} from "antd-mobile";
import React, { useState } from "react";
import { State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import "../../styles/registration.css";
import gotra from "../../utils/gotra.json";
import AddressSelector from "./registration/AddressSelector";
import DateSelector from "./registration/DateSelector";
import GotraSelector from "./registration/GotraSelector";
import MaritialStatus from "./registration/MaritialStatus";
import EducationSelector from "./registration/EducationSelector";
import { register } from "../../services/api";


const now = new Date();
const eighteenYearsAgo = new Date(
  now.getFullYear() - 18,
  now.getMonth(),
  now.getDate()
);

const MyRegister = ({ setIsLogined }) => {
  const [form] = Form.useForm();
  const user = localStorage.getItem("userid");
  const [currentStep, setCurrentStep] = useState(0);
  const [country, setCountry] = useState({});
  const [state, setState] = useState({});
  const navigate = useNavigate();
  const [customdata, setCustomdata] = useState({});
  const [visiblePickers, setVisiblePickers] = useState({
    dob: false,
    sex: false,
    gotra: false,
    maritalStatus: false,
    country: false,
    state: false,
    city: false,
    status: false,
  });

  const openPicker = (key) => {
    setVisiblePickers({ ...visiblePickers, [key]: true });
  };

  const closePicker = (key) => {
    // console.log(key, "key")
    setVisiblePickers({ ...visiblePickers, [key]: false });
  };

  const stepTitles = ["Personal", "Family", "Profession"];

  const onFinish = async (values) => {
    customdata["emeelanrole"] = "MEELAN";
    customdata["username"] = customdata["MobileNumber"];
    customdata["userstatus"] = "PENDING";
    customdata["role"] = 1;

    // console.log(values, "Value")

    if (!customdata.email && customdata.MobileNumber) {
      customdata.email = customdata.MobileNumber + "@hph.com";
    }

    try{
      const response = await register(customdata)
      console.log(response)
    } catch (err){
      console.error("error", err)
    }
    
    console.log("Form values:", customdata);

    // console.log(customdata, "FINAL VALUE");
    // navigate("/login")
  };

  const handleCountryChange = (value) => {
    setCountry(value);
    // Add any additional country change logic here
  };

  const handleState = (value) => {
    const selectedState = State.getStatesOfCountry(country.code).find(
      (s) => s.name === value[0]
    );
    setState({ code: selectedState.isoCode, name: value[0] });
    form.setFieldsValue({ City: null });
  };

  const nextStep = async () => {
    window.scrollTo({
      top:0,
      behavior: "smooth"
    })
    try{ 
      if (currentStep < 4) {
        await form.validateFields()
        setCustomdata((prevVal) => ({ ...prevVal, ...form.getFieldsValue() }));
        // console.log(customdata, "NEW NEXT")
        setCurrentStep(currentStep + 1); 
      }
    } catch (err){
      Toast.show({ icon: "fail", content: "Please fill all required fields" });
    }
  };

  const prevStep = () => {
    window.scrollTo({
      top:0,
      behavior: "smooth"
    })
    if (currentStep > 0) {
      form.setFieldsValue(customdata);
      // console.log(customdata, "NEW PREV")
      setCurrentStep(currentStep - 1);
    }
  };

  const submitForm = () => {
    setCustomdata((prevVal) => ({ ...prevVal, ...form.getFieldsValue() }));
    // console.log("SUBMIT", customdata)
    form.submit();
  };

  const formSteps = [
    // Step 1: Personal Info
    <>
      <Form.Item
        name="FirstName"
        label="First Name"
        rules={[{ required: true, message: "Required" }]}
      >
        <Input placeholder="Enter First Name" />
      </Form.Item>
      <Form.Item
        name="LastName"
        label="Last Name"
        rules={[{ required: true, message: "Required" }]}
      >
        <Input placeholder="Enter Last Name" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          { required: true, message: "Required" },
          { min: 6, message: "Min 6 characters" },
        ]}
      >
        <Input type="password" placeholder="Enter Password" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="Confirm Password"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Required" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords do not match"));
            },
          }),
        ]}
      >
        <Input type="password" placeholder="Confirm Password" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email Address"
        rules={[{ type: "email", message: "Invalid email" }]}
      >
        <Input placeholder="Enter Email Address" />
      </Form.Item>
      <DateSelector customdata={customdata} setCustomdata={setCustomdata} />

      <Form.Item
        name="Sex"
        label="Sex"
        rules={[{ required: true, message: "Required" }]}
        onClick={() => openPicker("sex")}
      >
        <Radio.Group
          style={{
            display: "flex",
            "--font-size": "13px",
            gap: "10px",
            "--icon-size": "18px",
          }}
        >
          <Radio value="radio1">Male</Radio>
          <Radio value="radio2">Female</Radio>
        </Radio.Group>
        {/* <Picker
          columns={[[{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }]]}
          visible={visiblePickers.sex}
          onClose={() => closePicker('sex')}
        >
          {(value) => value?.[0] || 'Select Sex'}
        </Picker> */}
      </Form.Item>
      <GotraSelector
        gotraData={gotra.Gotra}
        customdata={customdata}
        setCustomdata={setCustomdata}
      />
      <MaritialStatus customdata={customdata} setCustomdata={setCustomdata} />
      <Form.Item
        name="MobileNumber"
        label="Mobile Number"
        rules={[{ required: true, message: "Required" }]}
      >
        <Input placeholder="Enter Mobile Number" />
      </Form.Item>
      <AddressSelector customdata={customdata} setCustomdata={setCustomdata} />

      <Form.Item name="City" label="City">
        <Input placeholder="Enter City" />
      </Form.Item>

      <Form.Item name="postalcode" label="Pin Code">
        <Input placeholder="Enter Pin Code" />
      </Form.Item>
    </>,

    // Step 3: Family Details
    <>
      <Form.Item name="FatherName" label="Father's Name">
        <Input placeholder="Enter Father's Name" />
      </Form.Item>
      <Form.Item name="MotherName" label="Mother's Name">
        <Input placeholder="Enter Mother's Name" />
      </Form.Item>
      <Form.Item name="father_occupation" label="Father's Occupation">
        <Input placeholder="Enter Father's Occupation" />
      </Form.Item>
      <GotraSelector
        gotra_for={"MATERNAL_GOTRA"}
        gotraData={gotra.Gotra}
        customdata={customdata}
        setCustomdata={setCustomdata}
      />

      <Form.Item name="Siblings" label="Siblings">
        <Input placeholder="Enter Number of Siblings" />
      </Form.Item>
      <Form.Item name="NanajiName" label="Nanaji's Name">
        <Input placeholder="Enter Nanaji's Name" />
      </Form.Item>
      <Form.Item name="NanijiName" label="Naniji's Name">
        <Input placeholder="Enter Naniji's Name" />
      </Form.Item>
    </>,

    // Step 4: Education
    <>
      <EducationSelector
        customdata={customdata}
        setCustomdata={setCustomdata}
      />
      <Form.Item
        name="AdditionalQualification"
        label="Additional Qualification"
      >
        <Input placeholder="Enter Additional Qualification" />
      </Form.Item>
      <Form.Item name="Profession" label="Profession">
        <Input placeholder="Enter Profession" />
      </Form.Item>
      <Form.Item name="CompanyName" label="CompanyName">
        <Input placeholder="Enter CompanyName" />
      </Form.Item>
      <Form.Item name="Designation" label="Designation">
        <Input placeholder="Enter Designation" />
      </Form.Item>
      <Form.Item name="WorkingCity" label="Working City">
        <Input placeholder="Enter Working City" />
      </Form.Item>
      <Form.Item name="Income" label="Income">
        <Input type="number" placeholder="Enter Income" />
      </Form.Item>
    </>,
  ];

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
            <div className="login-header">
              <h2 style={{ color: "#ff6b6b", margin: "0 0 8px 0" }}>Welcome</h2>
              <p style={{ color: "#666", margin: 0 }}>Register Here</p>
            </div>
          </AutoCenter>
          <AutoCenter>
            <Steps current={currentStep}>
              {stepTitles.map((title, index) => (
                <Steps.Step key={index} title={title} />
              ))}
            </Steps>
            <Divider>{stepTitles[currentStep]} Entry </Divider>
          </AutoCenter>

          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            footer={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                {currentStep > 0 && (
                  <Button
                    onClick={prevStep}
                    style={{ flex: 1, marginRight: "8px" }}
                  >
                    Previous
                  </Button>
                )}
                {currentStep < 2 ? (
                  <Button
                    color="primary"
                    onClick={nextStep}
                    style={{
                      flex: currentStep > 0 ? 1 : undefined,
                      marginLeft: currentStep > 0 ? "8px" : 0,
                    }}
                    block={currentStep === 0}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    color="success"
                    onClick={submitForm}
                    // type='submit'
                    style={{ flex: 1, marginLeft: "8px" }}
                  >
                    Register
                  </Button>
                )}
              </div>
            }
          >
            {formSteps[currentStep]}
          </Form>

          <div style={{ marginTop: "16px", textAlign: "center" }}>
            Already have an account?{" "}
            <span
              style={{ color: "#ff6b6b", fontWeight: "bold" }}
              onClick={() => setIsLogined(true)}
            >
              Login
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MyRegister;
