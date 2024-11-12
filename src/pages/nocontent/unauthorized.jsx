import { Button } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
    const navigate = useNavigate();
  return (
    <div style={{width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "black", backgroundColor: "white"}}>
        <p>You are Unauthorized to see content of this website. Try Login with different Credentials</p>
        <div>
         <Button onClick={() => navigate('/login')}>Try Again</Button>
        </div>
    </div>
  )
}

export default UnauthorizedPage;