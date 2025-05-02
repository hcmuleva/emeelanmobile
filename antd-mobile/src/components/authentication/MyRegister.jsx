import React, { useState, useContext } from 'react';
import { Form, Input, Button, Toast, Radio, NavBar } from "antd-mobile";
import { AuthContext } from '../../context/AuthContext';
import { getPincode, register } from '../../services/api';
import GotraSelector from '../authentication/registration/GotraSelector';
import MaritialStatus from '../authentication/registration/MaritialStatus';
import DateSelector from '../authentication/registration/DateSelector';
import gotra from "../../utils/gotra.json";
import "../../styles/registration.css";
import { useNavigate } from 'react-router-dom';

export default function MyRegister({ setIsLogined }) {
    console.log("My Register");
    
    const [form] = Form.useForm();
    const [emeelanrole, setEmeelanrole] = useState("MEELAN");
    const [customdata, setCustomdata] = useState({});
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
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
                Toast.show({ icon: "fail", content: "Failed to fetch location from pincode." });
            }
        }
    };

    const validateCustomData = () => {
        if (!customdata.gotra) {
            Toast.show({ icon: 'fail', content: 'Please select your gotra' });
            return false;
        }
        if (!customdata.marititalstatus) {
            Toast.show({ icon: 'fail', content: 'Please select your marital status' });
            return false;
        }
        if (!customdata.DOB) {
            Toast.show({ icon: 'fail', content: 'Please select your date of birth' });
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

        const payload = {
            ...values,
            emeelanrole,
            orgsku: "SEERVI0002",
            username: values.MobileNumber,
            userstatus: "PENDING",
            role: 1,
            Gotra: customdata.gotra,
            maritial: customdata.marititalstatus,
            DOB: customdata.DOB
        };

        try {
            const response = await register(payload);
            Toast.show({
                icon: 'success',
                content: "User registration completed successfully",
                duration: 3000,
                afterClose: () => form.resetFields()
            });
            handleReset();
            navigate("/login")
            console.log("Registration success:", response);
        } catch (err) {
            console.error("Registration error:", err.response?.data || err.message);
            Toast.show({
                icon: 'fail',
                content: err.response?.data?.message || "Failed to create user. Please try again.",
                duration: 2000
            });
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errors) => {
        console.warn("Validation Failed:", errors);
        Toast.show({
            icon: 'fail',
            content: 'Please fill all required fields correctly',
            duration: 2000
        });
    };

    return (
        <div className="registration-container">
            <NavBar
                back={null}
                style={{
                    background: '#BC0226',
                    color: 'white',
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                    padding: '10px',
                    paddingTop: 'env(safe-area-inset-top)'
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        marginTop: "10px"
                    }}
                >
                    {/* Left Side: Title */}
                    <div>
                        <div
                            style={{
                                fontWeight: '600',
                                fontSize: '18px',
                                lineHeight: '20px',
                                letterSpacing: '.5px',
                            }}
                        >
                            EMEELAN (गठजोड़)
                        </div>

                    </div>

                    {/* Right Side: Logo */}
                    <img
                        src="logo.png" // Replace with your logo path
                        alt="Logo"
                        style={{
                            height: '36px',
                            width: '36px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                        }}
                    />
                </div>
            </NavBar>

            <div className="registration-content">
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    padding: '20px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    maxWidth: '450px',
                    margin: '0 auto'
                }}>
                    <h2 style={{
                        textAlign: 'center',
                        color: '#ff6b6b',
                        marginBottom: '20px',
                        fontSize: '24px'
                    }}>
                        Register
                    </h2>
                    <p style={{
                        textAlign: 'center',
                        color: '#666',
                        marginBottom: '20px'
                    }}>
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
                                    backgroundColor: '#990000',
                                    borderRadius: '4px',
                                    marginTop: '20px'
                                }}
                            >
                                {loading ? 'Processing...' : 'Register'}
                            </Button>
                        }
                    >
                        <Form.Item
                            name="FirstName"
                            label={<><span style={{ color: 'red' }}>*</span> First Name</>}
                            rules={[{ required: true, message: "Please enter your first name" }]}
                        >
                            <Input placeholder="Enter First Name" clearable />
                        </Form.Item>

                        <Form.Item
                            name="FatherName"
                            label={<><span style={{ color: 'red' }}>*</span> Father's Name</>}
                            rules={[{ required: true, message: "Please enter your father's name" }]}
                        >
                            <Input placeholder="Enter Father's Name" clearable />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label={<><span style={{ color: 'red' }}>*</span> Email</>}
                            rules={[
                                { required: true, message: 'Please enter your email' },
                                { type: 'email', message: 'Please enter a valid email address' },
                            ]}
                        >
                            <Input type="email" placeholder="Enter your email" clearable />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label={<><span style={{ color: 'red' }}>*</span> Password</>}
                            rules={[
                                { required: true, message: "Please enter a password" },
                                { min: 6, message: "Password must be at least 6 characters" },
                            ]}
                        >
                            <Input type="password" placeholder="Enter Password" clearable />
                        </Form.Item>

                        <Form.Item
                            name="confirmPassword"
                            label={<><span style={{ color: 'red' }}>*</span> Confirm Password</>}
                            dependencies={['password']}
                            rules={[
                                { required: true, message: 'Please confirm your password' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('The two passwords do not match');
                                    },
                                }),
                            ]}
                        >
                            <Input type="password" placeholder="Confirm Password" clearable />
                        </Form.Item>

                        <Form.Item
                            name="Sex"
                            label={<><span style={{ color: 'red' }}>*</span> Gender</>}
                            rules={[{ required: true, message: "Please select your gender" }]}
                        >
                            <Radio.Group style={{ display: "flex", gap: "10px" }}>
                                <Radio value="Male">Male</Radio>
                                <Radio value="Female">Female</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {/* <Form.Item
                            name="orgsku"
                            label={<><span style={{ color: 'red' }}>*</span> Cast</>}
                            rules={[{ required: true, message: "Please select your Cast" }]}
                        >
                            <Radio.Group style={{ display: "flex", gap: "10px" }}>
                                <Radio value="SEERVI0002">SEERVI</Radio>
                                <Radio value="TELI0001">TELI</Radio>
                                <Radio value="DEMO0003">DEMO</Radio>
                            </Radio.Group>
                        </Form.Item> */}

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                                <span style={{ color: 'red' }}>*</span> Gotra
                            </label>
                            <GotraSelector
                                gotraData={gotra.Gotra}
                                customdata={customdata}
                                setCustomdata={setCustomdata}
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                                <span style={{ color: 'red' }}>*</span> Marital Status
                            </label>
                            <MaritialStatus
                                customdata={customdata}
                                setCustomdata={setCustomdata}
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                                <span style={{ color: 'red' }}>*</span> Date of Birth
                            </label>
                            <DateSelector
                                customdata={customdata}
                                setCustomdata={setCustomdata}
                            />
                        </div>

                        <Form.Item
                            name="Profession"
                            label={<><span style={{ color: 'red' }}>*</span> Profession</>}
                            rules={[{ required: true, message: "Please select your profession" }]}
                        >
                            <Radio.Group style={{ fontSize: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
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
                                    <Radio value={item} key={item} style={{ fontSize: "30%", marginRight: "15px" }}>
                                        <span style={{ fontSize: "15px", textTransform: "capitalize" }}>{item.toLowerCase()}</span>
                                    </Radio>
                                ))}
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            name="MobileNumber"
                            label={<><span style={{ color: 'red' }}>*</span> Mobile Number</>}
                            rules={[
                                { required: true, message: "Please enter your mobile number" },
                                { pattern: /^[0-9]{10}$/, message: "Please enter a valid 10-digit mobile number" }
                            ]}
                        >
                            <Input placeholder="Enter Mobile Number" maxLength={10} clearable />
                        </Form.Item>

                        <Form.Item
                            name="pincode"
                            label="Pincode"
                            rules={[
                                { pattern: /^[0-9]{6}$/, message: "Please enter a valid 6-digit pincode" }
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
                                <Radio value={true} style={{ marginRight: "15px" }}>Yes</Radio>
                                <Radio value={false}>No</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            name="divyangDescription"
                            label="Disability Details"
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (getFieldValue('isdivyang') === true && !value) {
                                            return Promise.reject('Please provide disability details');
                                        }
                                        return Promise.resolve();
                                    },
                                }),
                            ]}
                        >
                            <Input placeholder="Enter disability details if applicable" />
                        </Form.Item>
                    </Form>

                    <div style={{ textAlign: 'center', marginTop: '15px' }}>
                        <p style={{ color: '#666', margin: '10px 0' }}>OR</p>
                        <p>
                            Already have an account?{' '}
                            <span
                                style={{ color: '#ff6b6b', fontWeight: 'bold', cursor: 'pointer' }}
                                onClick={() => setIsLogined(true)}
                            >
                                Login
                            </span>
                        </p>
                    </div>
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