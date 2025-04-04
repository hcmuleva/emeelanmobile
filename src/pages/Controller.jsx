import React from "react";

import Header from "./Header";
import { Avatar, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Clock } from 'lucide-react'
import { ShieldAlert } from 'lucide-react'
import { Ban } from 'lucide-react'
import { CheckCircle } from 'lucide-react'
import { AlertCircle } from 'lucide-react'
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import CenterDashBoard from "./Center/CenterDashboard";

export const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;

const MessagePage = ({userState,navigate,userid}) => {
    const clearLocalStorageAndRedirect=()=>{
        localStorage.clear()
        navigate('/login')
    }
    switch(userState){
        case "BLOCKED":
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                  <div className="text-center">
                    <Ban className="mx-auto h-12 w-12 text-red-500 mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Blocked</h1>
                    <p className="text-gray-600 mb-4">Your account has been blocked. Please contact support for assistance.For more support, please contact Admin: +91 9019905115</p>
                    <Button onClick={clearLocalStorageAndRedirect}>Try Again</Button>
                  </div>
                </div>
              )
        case "PENDING":
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center">
                  <Clock className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Pending Approval</h1>
                  <p className="text-gray-600 mb-4">Your account is currently pending approvalfor you id {userid}. Please check back later. For more support, please contact Admin: +91 9019905115</p>
                  <Button onClick={clearLocalStorageAndRedirect}>Try Again</Button>
                </div>
              </div>
               
              )
        case "UNAUTHORIZED":
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                  <div className="text-center">
                    <ShieldAlert className="mx-auto h-12 w-12 text-red-500 mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Unauthorized Access</h1>
                    <p className="text-gray-600 mb-4">You do not have permission to access this page. For more support, please contact Admin: +91 9019905115</p>
                      <Button onClick={clearLocalStorageAndRedirect}>Try Again</Button>
                  </div>
                </div>
              )
        case "ENGGAGED":
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                  <div className="text-center">
                    <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Engaged</h1>
                    <p className="text-gray-600 mb-4">Your account is active and in good standing. Welcome back! .For more support, please contact Admin: +91 9019905115</p>
                    <Button onClick={clearLocalStorageAndRedirect}>Try Again</Button>
                  </div>
                </div>
              )
        default:
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                  <div className="text-center">
                    <AlertCircle className="mx-auto h-12 w-12 text-orange-500 mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Inactive</h1>
                    <p className="text-gray-600 mb-4">Your account is currently inactive. Please reactivate to regain access. For more support, please contact Admin: +91 9019905115 </p>
                    <div className="space-y-2">
                      <Button onClick={clearLocalStorageAndRedirect}>Try Again</Button>

                    </div>
                  </div>
                </div>
              )
      
      }
      
}
 
 const RoleComponent = ({userRole})=>{
    switch (userRole) {
        case "MEELAN":
            return  <UserDashboard />
        case "CENTER":
          return   <CenterDashBoard />
        case "ADMIN":
          return <AdminDashboard />
          return (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
                backgroundColor: "white",
              }}
            >
              <p>Invalid role. Please contact Admin.</p>
              <Button onClick={() => navigate("/login")}>Try Again</Button>
            </div>
          );
      }
 }
export default function Controller() {
    const [isLandingPage, setIsLandingPage] = React.useState(true);
    const navigate = useNavigate();
    const userState = localStorage.getItem("userstatus");
    const userRole = localStorage.getItem("emeelanrole");
    const token = localStorage.getItem(TOKEN_KEY);
    const userid = localStorage.getItem('userid')
    if (!userState || userState === "undefined"|| userState !=="APPROVED") {
       console.log("Not approved");
       
       return <>
         <Header />
        <MessagePage navigate={navigate} userState={userState} userid={userid}/>
        </>  
    }else {
        console.log("USER STATE ",userState, " USER ROLE",userRole)
     return <>
      <Header/>
      <RoleComponent userRole={userRole}/>
     
     
      
      </>
    }
    
  
}
