import { Button } from 'antd';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const BlockedPage = () => {
    const navigate = useNavigate();
    return (
      <div style={{width: "100%", height: "100%", display: "flex",flexDirection: "column", justifyContent: "center", alignItems: "center", color: "black", backgroundColor: "white"}}>
          <p>Your profile is blocked.Please Contact Admin: +91 9019905115..</p>
          <div>
           <Button onClick={() => navigate('/login')}>Try Again</Button>
          </div>
      </div>
    )
}

export default BlockedPage;