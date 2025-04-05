import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MailOutline, LockOutline } from 'antd-mobile-icons';
import { Form, Input, Button, Toast, Card, NavBar, AutoCenter, Space, Divider } from "antd-mobile";
import { AuthContext } from "../../context/AuthContext";
import { login } from "../../services/api";
import "../../styles/login.css";

const MyLogin = ({ setIsLogined }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { jwt, user } = await login(values.email, values.password);
      await authContext.login(jwt, user);
      navigate('/home', { replace: true }); 
    } catch (error) {
      Toast.show({
        icon: 'fail',
        content: error.message || 'Login failed. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
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

      <div className="login-content">
        <Card>
          <AutoCenter>
            <div className="login-header">
              <h2 style={{ color: '#ff6b6b', margin: '0 0 8px 0' }}>Welcome</h2>
              <p style={{ color: '#666', margin: 0 }}>Sign in to continue</p>
            </div>
          </AutoCenter>
          
          <Divider />

          <Form
            onFinish={onFinish}
            layout="vertical"
            footer={
              <Button 
                block 
                type='submit' 
                color='primary' 
                size='large' 
                loading={loading}
                style={{ marginTop: '24px' }}
              >
                Sign in
              </Button>
            }
          >
            <Form.Item
              name='email'
              label='Email or Username'
              rules={[
                { required: true, message: 'Please input your email or username' },
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

            {/* <div style={{ textAlign: 'right', marginTop: 8, marginBottom: 16 }}>
              <a style={{ color: '#ff6b6b', fontSize: '14px' }}>Forgot Password?</a>
            </div> */}
          </Form>

          <Divider>OR</Divider>

          <Space direction="vertical" style={{ width: '100%' }}>
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              Don't have an account?{' '}
              <span
                style={{ color: '#ff6b6b', fontWeight: 'bold', cursor: 'pointer' }}
                onClick={() => setIsLogined(false)}
              >
                Register
              </span>
            </div>
          </Space>
        </Card>
      </div>
    </div>
  );
};

export default MyLogin;