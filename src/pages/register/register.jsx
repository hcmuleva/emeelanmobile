import React, { useState } from 'react';
import { Layout, Card, Form, Input, Button, DatePicker, Select, Tabs, Row, Col, Typography, Progress, notification } from 'antd';
import { UserOutlined, MailOutlined, TeamOutlined, BookOutlined, LockOutlined } from '@ant-design/icons';
import { City, Country, State } from "country-state-city";
import gotra from "../../utils/gotra.json";
import "../../styles/register.css"
import { useCreate } from '@refinedev/core';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

export const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;
const API_URL = import.meta.env.VITE_SERVER_URL;

export const RegisterPage = ({userrole,createdBy,setView}) => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(1);
  const [country, setCountry] = useState({});
  const [state, setState] = useState({});
  const { mutate: createUser } = useCreate();
  const navigate = useNavigate();
  const onFinish = async(values) => {
    values['emeelanrole']="MEELAN"
    values["username"] = values["MobileNumber"];
    values["email"] = values["MobileNumber"] + "@hph.com";
    console.log('Form values:', values);
     values['role']=1
    if(createdBy&&user){values['profilecreatedby'] =createdBy}
    createUser(
      {
        resource: "users",
        values: values,
      },
      {
        onSuccess: async (data) => {
          console.log("Data",data)
          try {
            console.log("Before request")
            console.log("userid",values.email)
            console.log("password", values.password)
            const res = await fetch(`${API_URL}/api/auth/local`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ identifier: values.email, password: values.password }),
            });
            console.log("Res",res)
            if (res.ok&&!userrole||!createdBy) {
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
              navigate("/dashboard");
            } else if(userrole||!createdBy){
             
              navigate("/dashboard")
            }
            else {
              
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
        }
      })
  };

  const handleTabChange = (activeKey) => {
    setCurrentStep(Number(activeKey));
  };

  const handleCountry = (option) => {
    // Get the country code based on selected country name
    const selectedCountry = Country.getAllCountries().find(
      (country) => country.name === option
    );
    setCountry({ code: selectedCountry.isoCode, name: option });
    setState({}); // Clear selected state
    form.setFieldsValue({ State: undefined, City: undefined }); // Clear state and city fields
  };

  const handleState = (option) => {
    const selectedState = State.getStatesOfCountry(country.code).find(
      (state) => state.name === option
    );
    setState({ code: selectedState.isoCode, name: option });
    form.setFieldsValue({ City: undefined }); // Clear city field
  };

  const tabItems = [
    { key: '1', tab: 'Personal Info', icon: <UserOutlined /> },
    { key: '2', tab: 'Contact Details', icon: <MailOutlined /> },
    { key: '3', tab: 'Family Details', icon: <TeamOutlined /> },
    { key: '4', tab: 'Education', icon: <BookOutlined /> },
    { key: '5', tab: 'Profession', icon: <BookOutlined /> },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)' }}>
      <Content style={{ padding: '40px 0' }}>
        <Card style={{ maxWidth: 800, margin: '0 auto', borderRadius: 15, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Title level={2} style={{ color: '#ff6b6b', marginBottom: 0 }}>EMEELAN</Title>
            <Title level={3} style={{ color: '#ff6b6b', marginBottom: 0 }}>गठजोड़</Title>
            <Text style={{ display: 'block', fontSize: '1.2rem', color: '#4a4a4a' }}>We bring People Together</Text>
          </div>

          <Progress percent={(currentStep / 5) * 100} showInfo={false} strokeColor="#ff6b6b" style={{ marginBottom: '1rem' }} />

          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Tabs defaultActiveKey="1" onChange={handleTabChange} style={{ marginBottom: 32 }}>
              <Tabs.TabPane tab={<span><UserOutlined />Personal Info</span>} key="1">
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item name="FirstName" label="First Name" rules={[{ required: true, message: 'Please enter your first name' }]}>
                      <Input prefix={<UserOutlined />} placeholder="Enter First Name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item name="LastName" label="Last Name" rules={[{ required: true, message: 'Please enter your last name' }]}>
                      <Input prefix={<UserOutlined />} placeholder="Enter Last Name" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
      <Col xs={24} sm={12}>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: 'Please enter your password' },
            { min: 6, message: 'Password must be at least 6 characters long' },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Enter Password"
          />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12}>
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match'));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Confirm Password"
          />
        </Form.Item>
      </Col>
    </Row>
                <Form.Item name="email" label="Email Address" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
                  <Input prefix={<MailOutlined />} placeholder="Enter Email Address" />
                </Form.Item>
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item name="DOB" label="Date of Birth" rules={[{ required: true, message: 'Please select your date of birth' }]}>
                      <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" placeholder="Select Date of Birth" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item name="Sex" label="Sex" rules={[{ required: true, message: 'Please select your gender' }]}>
                      <Select placeholder="Select Sex">
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  name="Gotra"
                  label="Gotra"
                  rules={[{ required: true, message: "Please select your gotra." }]}
                >
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Select Your Gotra"
                    showSearch
                    optionFilterProp="label"
                  >
                    {gotra.Gotra.map((g) => (
                      <Option key={g.EName} value={g.EName} label={g.EName}>
                        {g.EName} ({g.HName})
                      </Option>
                    ))}
                    <Option value="Other" label="Other">
                      Other
                    </Option>
                  </Select>
                </Form.Item>
                <Form.Item name="MobileNumber" label="Mobile Number">
                  <Input placeholder="Enter Mobile Number" />
                </Form.Item>
                <Form.Item name="MeritalStatus" label="Marital Status" rules={[{ required: true, message: 'Please enter your marital status' }]}>
                  <Input placeholder="Enter Marital Status" />
                </Form.Item>
                <Form.Item name="Address" label="Home Address">
                  <Input.TextArea placeholder="Enter Home Address" />
                </Form.Item>
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="Country"
                      label="Country"
                      rules={[{ required: true, message: "Please Enter Country" }]}
                    >
                      <Select
                        style={{ width: "100%" }}
                        placeholder="Select Your Country"
                        showSearch
                        onChange={handleCountry}
                      >
                        {Country.getAllCountries().map((country) => (
                          <Option key={country.isoCode} value={country.name}>
                            {country.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="State"
                      label="State"
                      rules={[{ required: true, message: "Please Enter State" }]}
                    >
                      <Select
                        style={{ width: "100%" }}
                        placeholder="Select State"
                        onChange={handleState}
                        showSearch
                        disabled={!country.code}
                      >
                        {State.getStatesOfCountry(country.code).map((state) => (
                          <Option key={state.isoCode} value={state.name}>
                            {state.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      name="City"
                      label="City"
                      rules={[{ required: true, message: "Please Enter City" }]}
                    >
                      <Select
                        style={{ width: "100%" }}
                        placeholder="Select Your City"
                        showSearch
                        disabled={!state.code}
                      >
                        {City.getCitiesOfState(country.code, state.code).map((city) => (
                          <Option key={city.name} value={city.name}>
                            {city.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item name="postalcode" label="Pin Code">
                      <Input placeholder="Enter Pin Code" />
                    </Form.Item>
                  </Col>
                </Row>
              </Tabs.TabPane>
              <Tabs.TabPane tab={<span><MailOutlined />Contact Details</span>} key="2">
                <Form.Item name="MobileNumber" label="Mobile Number">
                  <Input placeholder="Enter Mobile Number" />
                </Form.Item>
                <Form.Item name="FatherMobileNumber" label="Father's Mobile">
                  <Input placeholder="Enter Father's Mobile Number" />
                </Form.Item>
                <Form.Item name="MamajiMobileNumber" label="Mamaji's Mobile">
                  <Input placeholder="Enter Mamaji's Mobile Number" />
                </Form.Item>
              </Tabs.TabPane>
              <Tabs.TabPane tab={<span><TeamOutlined />Family Details</span>} key="3">
                <Form.Item name="FatherName" label="Father's Name">
                  <Input placeholder="Enter Father's Name" />
                </Form.Item>
                <Form.Item name="MotherName" label="Mother's Name">
                  <Input placeholder="Enter Mother's Name" />
                </Form.Item>
                <Form.Item name="father_occupation" label="Father's Occupation">
                  <Input placeholder="Enter Father's Occupation" />
                </Form.Item>
                <Form.Item
                  name="maternalGotra"
                  label="Maternal Gotra"
                  rules={[{ required: true, message: "Please select maternal gotra." }]}
                >
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Select Maternal Gotra"
                    showSearch
                    optionFilterProp="label"
                  >
                    {gotra.Gotra.map((g) => (
                      <Option key={g.EName} value={g.EName} label={g.EName}>
                        {g.EName} ({g.HName})
                      </Option>
                    ))}
                    <Option value="Other" label="Other">
                      Other
                    </Option>
                  </Select>
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
              </Tabs.TabPane>
              <Tabs.TabPane tab={<span><BookOutlined />Education</span>} key="4">
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
              </Tabs.TabPane>
              <Tabs.TabPane tab={<span><BookOutlined />Profession</span>} key="5">
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
                  <Input placeholder="Enter Income" />
                </Form.Item>
                <Form.Item name="PreProfession" label="Previous Profession">
                  <Input placeholder="Enter Previous Profession" />
                </Form.Item>
              </Tabs.TabPane>
            </Tabs>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                Register
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

