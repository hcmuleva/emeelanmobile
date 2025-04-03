import React, { useState } from 'react';
import { 
  Form, Input, Button, DatePicker, Picker,
  NavBar, Card, Toast, Steps, AutoCenter, Divider,
  Radio, 
} from 'antd-mobile';
// import dayjs from 'dayjs';
import { City, Country, State } from 'country-state-city';
import { useNavigate } from 'react-router-dom';
import gotra from '../utils/gotra.json';
import '../styles/registration.css';

export const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY || 'default-token';
const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3000';

const now = new Date()

const MyRegister = ({ setIsLogined }) => {
  const [form] = Form.useForm();
  const user = localStorage.getItem('userid');
  const [currentStep, setCurrentStep] = useState(0);
  const [country, setCountry] = useState({});
  const [state, setState] = useState({});
  const navigate = useNavigate();
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
    console.log(key, "key")
    setVisiblePickers({ ...visiblePickers, [key]: false });
  };

  const stepTitles = ['Personal', 'Contact', 'Family', 'Education', 'Profession'];

  const onFinish = async (values) => {
    values.emeelanrole = 'MEELAN';
    values.username = values.MobileNumber;
    values.userrole = 'ADMIN';
    values.profilecreatedby = user;

    console.log(values)

    if (!values.email && values.MobileNumber) {
      values.email = values.MobileNumber + '@hph.com';
    }
    values.role = 1;

    try {
      const registerResponse = await fetch(`${API_URL}/api/auth/local/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (registerResponse.ok) {
        const registrationData = await registerResponse.json();
        Toast.show({
          icon: 'success',
          content: 'Registration successful!',
        });
        console.log(registrationData)
        navigate("/");
      } else {
        const errorData = await registerResponse.json();
        Toast.show({
          icon: 'fail',
          content: errorData?.error?.message || 'Registration failed. Please try again.',
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      Toast.show({ 
        icon: 'fail',
        content: 'Something went wrong, please try again later.',
      });
    }
  };

  const handleCountry = (value) => {
    const selectedCountry = Country.getAllCountries().find((c) => c.name === value[0]);
    setCountry({ code: selectedCountry.isoCode, name: value[0] });
    setState({});
    form.setFieldsValue({ State: null, City: null });
  };

  const handleState = (value) => {
    const selectedState = State.getStatesOfCountry(country.code).find((s) => s.name === value[0]);
    setState({ code: selectedState.isoCode, name: value[0] });
    form.setFieldsValue({ City: null });
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitForm = () => {
    form.submit();
  };

  const formSteps = [
    // Step 1: Personal Info
    <>
      <Form.Item
        name="FirstName"
        label="First Name"
        rules={[{ required: true, message: 'Required' }]}
      >
        <Input placeholder="Enter First Name" />
      </Form.Item>
      <Form.Item
        name="LastName"
        label="Last Name"
        rules={[{ required: true, message: 'Required' }]}
      >
        <Input placeholder="Enter Last Name" />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          { required: true, message: 'Required' },
          { min: 6, message: 'Min 6 characters' },
        ]}
      >
        <Input type="password" placeholder="Enter Password" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="Confirm Password"
        dependencies={['password']}
        rules={[
          { required: true, message: 'Required' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Passwords do not match'));
            },
          }),
        ]}
      >
        <Input type="password" placeholder="Confirm Password" />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email Address"
        rules={[{ type: 'email', message: 'Invalid email' }]}
      >
        <Input placeholder="Enter Email Address" />
      </Form.Item>
      <Form.Item
        name="DOB"
        label="Date of Birth"
        rules={[{ required: true, message: 'Required' }]}
        onClick={() => openPicker('dob')}
      >
        <DatePicker
          visible={visiblePickers.dob}
          onClose={() => closePicker('dob')}
          initialValue={now}
          max={now}
        >
          {value => (value ? value.toLocaleDateString() : 'Select Date')}
        </DatePicker>
      </Form.Item>

      <Form.Item
        name="Sex"
        label="Sex"
        rules={[{ required: true, message: 'Required' }]}
        onClick={() => openPicker('sex')}
      >
        <Radio.Group 
          style={{
            display:"flex",
            '--font-size': '13px',
            gap: '10px',
            '--icon-size': '18px',
            
          }}
        >
            <Radio
              value='radio1'
              
            >
              Male
            </Radio>
            <Radio
              value='radio2'
              
            >
              Female
            </Radio>
        </Radio.Group>
        {/* <Picker
          columns={[[{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }]]}
          visible={visiblePickers.sex}
          onClose={() => closePicker('sex')}
        >
          {(value) => value?.[0] || 'Select Sex'}
        </Picker> */}
      </Form.Item>
      <Form.Item
        name="maternalGotra"
        label="Maternal Gotra"
        onClick={() => openPicker('gotra')}
      >
        <Picker
          columns={[
            gotra.Gotra.map(g => ({ label: `${g.EName} (${g.HName})`, value: g.EName }))
              .concat({ label: 'Other', value: 'Other' }),
          ]}
          visible={visiblePickers.gotra}
          onClose={() => closePicker('gotra')}
        >
          {(value) => value?.[0] || 'Select Maternal Gotra'}
        </Picker>
      </Form.Item>
      <Form.Item
        name="MeritalStatus"
        label="Marital Status"
        rules={[{ required: true, message: 'Required' }]}
        onClick={() => openPicker('maritalStatus')}
      >
        <Picker
          columns={[
            [
              { label: 'विवाहित', value: 'MARRIED' },
              { label: 'अविवाहित', value: 'BACHELOR' },
              { label: 'तलाकशुदा', value: 'DIVORCED' },
            ],
          ]}
          visible={visiblePickers.maritalStatus}
          onClose={() => closePicker('maritalStatus')}
        >
          {(value) => value?.[0] || 'Select Marital Status'}
        </Picker>
      </Form.Item>
      <Form.Item
        name="MobileNumber"
        label="Mobile Number"
        rules={[{ required: true, message: 'Required' }]}
      >
        <Input placeholder="Enter Mobile Number" />
      </Form.Item>
      <Form.Item name="Address" label="Home Address">
        <Input placeholder="Enter Home Address" />
      </Form.Item>
      <Form.Item
        name="Country"
        label="Country"
        onClick={() => openPicker('country')}
      >
        <Picker
          columns={[Country.getAllCountries().map(c => ({ label: c.name, value: c.name }))]}
          visible={visiblePickers.country}
          onClose={() => closePicker('country')}
          onConfirm={handleCountry}
        >
          {(value) => value?.[0] || 'Select Country'}
        </Picker>
      </Form.Item>
      <Form.Item
        name="State"
        label="State"
        onClick={() => openPicker('state')}
      >
        <Picker
          columns={[
            State.getStatesOfCountry(country.code)?.map(s => ({ label: s.name, value: s.name })) || [],
          ]}
          visible={visiblePickers.state}
          onClose={() => closePicker('state')}
          onConfirm={handleState}
          disabled={!country.code}
        >
          {(value) => value?.[0] || 'Select State'}
        </Picker>
      </Form.Item>
      <Form.Item
        name="City"
        label="City"
        onClick={() => openPicker('city')}
      >
        <Picker
          columns={[
            City.getCitiesOfState(country.code, state.code)?.map(c => ({ label: c.name, value: c.name })) || [],
          ]}
          visible={visiblePickers.city}
          onClose={() => closePicker('city')}
          disabled={!state.code}
        >
          {(value) => value?.[0] || 'Select City'}
        </Picker>
      </Form.Item>
      <Form.Item name="postalcode" label="Pin Code">
        <Input placeholder="Enter Pin Code" />
      </Form.Item>
      <Form.Item
        name="userstatus"
        label="Status"
        onClick={() => openPicker('status')}
      >
        <Picker
          columns={[
            ['APPROVED', 'REJECTED', 'PENDING', 'ENGGAGED', 'BLOCKED', 'UNAPPROVED'].map((v) => ({
              label: v,
              value: v,
            })),
          ]}
          visible={visiblePickers.status}
          onClose={() => closePicker('status')}
        >
          {(value) => value?.[0] || 'Select Status'}
        </Picker>
      </Form.Item>
    </>,
    
    // Step 2: Contact Details
    <>
      <Form.Item name="MobileNumber" label="Mobile Number">
        <Input placeholder="Enter Mobile Number" />
      </Form.Item>
      <Form.Item name="FatherMobileNumber" label="Father's Mobile">
        <Input placeholder="Enter Father's Mobile Number" />
      </Form.Item>
      <Form.Item name="MamajiMobileNumber" label="Mamaji's Mobile">
        <Input placeholder="Enter Mamaji's Mobile Number" />
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
      <Form.Item name="maternalGotra" label="Maternal Gotra">
        <Picker
          columns={[
            gotra.Gotra.map(g => ({ label: `${g.EName} (${g.HName})`, value: g.EName }))
              .concat({ label: 'Other', value: 'Other' }),
          ]}
        >
          {value => value?.[0] || 'Select Maternal Gotra'}
        </Picker>
      </Form.Item>
      <Form.Item name="GrandFatherName" label="Grandfather's Name">
        <Input placeholder="Enter Grandfather's Name" />
      </Form.Item>
      <Form.Item name="Siblings" label="Siblings">
        <Input placeholder="Enter Number of Siblings" />
      </Form.Item>
      <Form.Item name="NanajiName" label="Nanaji's Name">
        <Input placeholder="Enter Nanaji's Name" />
      </Form.Item>
      <Form.Item name="NanijiName" label="Naniji's Name">
        <Input placeholder="Enter Naniji's Name" />
      </Form.Item>
      <Form.Item name="MamajiName" label="Mamaji's Name">
        <Input placeholder="Enter Mamaji's Name" />
      </Form.Item>
    </>,
    
    // Step 4: Education
    <>
      <Form.Item name="education_level" label="Education Level">
        <Input placeholder="Enter Education Level" />
      </Form.Item>
      <Form.Item name="HighestDegree" label="Highest Degree">
        <Input placeholder="Enter Highest Degree" />
      </Form.Item>
      <Form.Item name="AdditionalQualification" label="Additional Qualification">
        <Input placeholder="Enter Additional Qualification" />
      </Form.Item>
      <Form.Item name="LastCollege" label="Last College">
        <Input placeholder="Enter Last College" />
      </Form.Item>
    </>,
    
    // Step 5: Profession
    <>
      <Form.Item name="Profession" label="Profession">
        <Input placeholder="Enter Profession" />
      </Form.Item>
      <Form.Item name="CompanyName" label="Company Name">
        <Input placeholder="Enter Company Name" />
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
      <Form.Item name="PreProfession" label="Previous Profession">
        <Input placeholder="Enter Previous Profession" />
      </Form.Item>
    </>,
  ];

  return (
    <div className="registration-container">
      <NavBar
        back={null}
        style={{ 
          background: '#ff6b6b',
          color: 'white',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          padding: "10px",
        }}
      >
        <span style={{
          fontWeight: '600',
          fontSize: '18px',
          lineHeight: '32px',
          letterSpacing: '.5px',
        }}>
          EMEELAN</span>
        <br/>
        <span>गठजोड़</span>
      </NavBar>

      <div className="registration-content">
        <Card>
          <AutoCenter>
            <div className="login-header">
              <h2 style={{ color: '#ff6b6b', margin: '0 0 8px 0' }}>Welcome</h2>
              <p style={{ color: '#666', margin: 0 }}>Register Here</p>
            </div>
          </AutoCenter>
          <AutoCenter>
            <Steps current={currentStep}>
              {stepTitles.map((title, index) => (
                <Steps.Step key={index} title={title} />
              ))}
            </Steps>
            <Divider>{stepTitles[currentStep]} Information</Divider>
          </AutoCenter>

          <Form
            form={form}
            // onFinish={onFinish}
            layout="vertical"
            footer={
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                {currentStep > 0 && (
                  <Button onClick={prevStep} style={{ flex: 1, marginRight: '8px' }}>Previous</Button>
                )}
                {currentStep < 4 ? (
                  <Button 
                    color="primary"
                    onClick={nextStep}
                    style={{ flex: currentStep > 0 ? 1 : undefined, marginLeft: currentStep > 0 ? '8px' : 0 }}
                    block={currentStep === 0}
                  >
                    Next
                  </Button>
                ) : (
                  <Button 
                    color="success" 
                    onClick={submitForm}
                    style={{ flex: 1, marginLeft: '8px' }}
                  >
                    Register
                  </Button>
                )}
              </div>
            }
          >
            {formSteps[currentStep]}
          </Form>

          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            Already have an account?{' '}
            <span
              style={{ color: '#ff6b6b', fontWeight: 'bold' }}
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