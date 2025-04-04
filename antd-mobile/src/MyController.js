import React, { useState } from 'react';
import Login from './pages/Login';
import { Button } from 'antd-mobile';
import HCMRegister from './components/authentication/HCMRegister';
import MyRegister from './components/authentication/MyRegister';

export default function MyController() {
    const [isLoginPage, setIsLoginPage] = useState(true);
    
    return (
        <div>
            <h1>MyController</h1>
            
            {isLoginPage ? <Login /> : <MyRegister />}
            
            <div style={{ marginTop: '20px' }}>
                {isLoginPage ? (
                    <>
                        <h3>I am a new User</h3>
                        <Button onClick={() => setIsLoginPage(false)}>Signup</Button>
                    </>
                ) : (
                    <>
                        <h3>I am an Existing User</h3>
                        <Button onClick={() => setIsLoginPage(true)}>Login</Button>
                    </>
                )}
            </div>
        </div>
    );
}