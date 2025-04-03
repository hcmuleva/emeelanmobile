import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MailOutline, LockOutline } from 'antd-mobile-icons';

import { Form,Input, Button, Space, Toast } from "antd-mobile";
import { EyeInvisibleOutline, EyeOutline } from "antd-mobile-icons";
import { AuthContext } from "../context/AuthContext";
import { login } from "../services/api";
const LoginPage = ({ onRegister }) => {
  // const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { jwt, user } = await login(values.email, values.password);
      // console.log(jwt, user)
      const loginSuccess = authContext.login(jwt, user);

      if (loginSuccess) {
        navigate('/home', { replace: true }); 
      }
      
      Toast.show({
        icon: 'success',
        content: 'Login successful',
      });
     
      navigate('/home');
       
    } catch (error) {
      Toast.show({
        icon: 'fail',
        content: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>LOGIN</h2>
      <Space direction="vertical" style={{ width: "100%" }}>
      <Form
        onFinish={onFinish}
        footer={
          <Button block type='submit' color='primary' size='large' loading={loading}>
            Sign in
          </Button>
        }
      >
        <Form.Item
          name='email'
          label='Email'
          rules={[
            { required: true, message: 'Please input your email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input placeholder='Enter your email' prefix={<MailOutline />} />
        </Form.Item>
        <Form.Item
          name='password'
          label='Password'
          rules={[{ required: true, message: 'Please input your password' }]}
        >
          <Input placeholder='Enter your password' type='password' prefix={<LockOutline />} />
        </Form.Item>
        {/* <Button block color="primary">LOGIN</Button>
        <Space justify="between" style={{ width: "100%" }}>
          <Button fill="none" color="primary">Login Via OTP</Button>
          <Button fill="none" color="primary">Forgot Password?</Button>
        </Space>
        <Button fill="none" color="default" onClick={onRegister}>
          Not a member? Register Now
        </Button> */}
        </Form>
      </Space>
    </div>
  );
};

const RegisterPage = ({ onLogin }) => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>REGISTER</h2>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Input placeholder="Full Name" clearable />
        <Input placeholder="Mobile No / E-Mail ID" clearable />
        <Input placeholder="Password" type="password" clearable />
        <Button block color="primary">REGISTER</Button>
        <Button fill="none" color="default" onClick={onLogin}>
          Already a member? Login
        </Button>
      </Space>
    </div>
  );
};

export { LoginPage, RegisterPage };