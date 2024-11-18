import { Button } from 'antd';
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import LoginPage from '../login/LoginPage';

const PendingPage = () => {
  const navigate = useNavigate();
  const [pageView,setPageView] = useState("DEFAULT")
  return (
    <div style={{width: "100%", height: "100%", display: "flex",flexDirection: "column", justifyContent: "center", alignItems: "center", color: "black", backgroundColor: "white"}}>
        <p>Your profile is under review till now. Please Contact Admin: +91 9019905115..</p>
        <div>
         <Button onClick={() => setPageView("LOGIN")}>Try Again</Button>
          {pageView==="LOGIN"&&<LoginPage/>}
        </div>
    </div>
  )
}

export default PendingPage;
