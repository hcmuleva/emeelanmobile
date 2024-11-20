import React, { useEffect, useState } from "react";
import { useActiveAuthProvider, useLogin, useTranslate } from "@refinedev/core";
import { Button, Input, Typography } from "antd";
import { notification } from "antd";

import "../../styles/loginpage.css";
import CoverImage from "../../../public/gathjod.png";
import Logo from "../../../public/logo.png";
import Help from "../../../public/help.png";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_SERVER_URL;
export const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;

const LoginPage = ({
  providers,
  registerLink,
  forgotPasswordLink,
  rememberMe,
  contentProps,
  wrapperProps,
  renderContent,
  formProps,
  title,
  hideForm,
}) => {
  const navigate = useNavigate();
  const [userid, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login, isLoading } = useLogin();

  useEffect(() => {
    if (localStorage.getItem("jwt-token")) navigate("/dashboard");
  }, []);

  const handleUserId = (e) => setUserId(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/local`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: userid, password: password }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("data",data)
        localStorage.setItem(TOKEN_KEY, data.jwt);
        localStorage.setItem("userid", String(data?.user?.id));
        localStorage.setItem("userstatus",String(data?.user?.userstatus));
        localStorage.setItem("emeelanrole",String(data?.user?.emeelanrole))
        navigate("/dashboard");
      } else {
        
        const errorData = await res.json(); // Get error response body
            notification.error({
                message: "Login Failed",
                description: errorData?.message || "Envalid Credential.",
            });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Something went wrong, please try again later.",
    });
    }
  };

  return (
    <div>
      <img src={CoverImage} className="root-img"></img>
      <div className="container">
        <div className="left-sider">
          <div style={{ display: "flex", gap: "0.3rem" }}>
            <div>
              <p>EMEELAN</p>
              <p id="gathjod">गठजोड़</p>
            </div>
            <div>
              <img
                src={Logo}
                alt="logo"
                style={{ width: "2.5rem", marginTop: "0.3rem" }}
              ></img>
            </div>
          </div>
          <div className="people">
            <span>We bring</span>
            <br />
            <span>People Together</span>
          </div>
        </div>
        <div className="right-sider">
          <div className="help-center">
            <div className="mobile-logo">
              <div style={{ display: "flex", gap: "0.3rem" }}>
                <div>
                  <p>EMEELAN</p>
                  <p id="gathjod">गठजोड़</p>
                </div>
                <div>
                  <img
                    src={Logo}
                    alt="logo"
                    style={{ width: "2.5rem", marginTop: "0.3rem" }}
                  ></img>
                </div>
              </div>
            </div>
            <div className="help">
              <img src={Help} alt="help" className="help-img" />
            </div>
          </div>
          <div className="login-details">
            <form
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <div className="login">
                <span>Welcome To EMEELAN</span>
                <span style={{ fontSize: "1rem" }}>गठजोड़</span>
                <div
                  style={{ width: "100%", fontSize: "1rem", marginTop: "50px" }}
                >
                  <span>Email or Mobile Number</span>
                </div>
                <Input
                  placeholder="Enter your Email or Mobile Numeber"
                  onChange={(e) => handleUserId(e)}
                ></Input>
                <div
                  style={{ width: "100%", fontSize: "1rem", marginTop: "10px" }}
                >
                  <span>Password</span>
                </div>
                <Input.Password
                  placeholder="Enter your Password"
                  type="password"
                  onChange={(e) => handlePassword(e)}
                ></Input.Password>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    alignItems: "center",
                    marginTop: "20px",
                  }}
                >
                  <Button
                    style={{
                      width: "50%",
                      background: "rgba(250, 250, 250, 0.2)",
                      color: "white",
                    }}
                    htmlType="submit"
                    onClick={handleLogin}
                  >
                    LOGIN
                  </Button>
                  <div style={{ fontSize: "1rem" }}>
                    <span>Don't have an account?</span>
                    <span style={{cursor: "pointer"}} onClick={() => navigate('/register')}> Sign Up </span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
