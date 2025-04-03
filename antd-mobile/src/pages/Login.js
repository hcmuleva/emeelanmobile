import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Toast } from 'antd-mobile';
import { MailOutline, LockOutline } from 'antd-mobile-icons';
import { login } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { jwt, user } = await login(values.email, values.password);
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
    <div style={{ padding: '16px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>Welcome Back</h2>
      <Form
      initialValues={{
        email: "aa@aa.com", // Default email value
        password: "welcome"
      }}
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
      </Form>
    </div>
  );
};

export default Login;