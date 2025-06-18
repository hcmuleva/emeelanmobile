import React, { useState } from "react";
import MyLogin from "../../components/authentication/MyLogin";
import MyRegister from "../../components/authentication/MyRegister";
import ReferralRegistration from "../../components/authentication/RefferalRegistration";

export default function LoginPage() {
  const [isLogined, setIsLogined] = useState(true);
  return (
    <>
      {
        isLogined ? (
          <MyLogin isLogined={isLogined} setIsLogined={setIsLogined} />
        ) : (
          <MyRegister isLogined={isLogined} setIsLogined={setIsLogined} />
        )
        // <ReferralRegistration isLogined={isLogined} setIsLogined={setIsLogined}/>
      }
    </>
  );
}
