import React, { useEffect, useState } from "react";
import { useLogin } from "@refinedev/core";
import { Button, Card, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";

import "../../styles/loginpage.css";

const API_URL = import.meta.env.VITE_SERVER_URL;
export const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;
const Base_Url = import.meta.env.VITE_BASE_URL;

const LoginPage = () => {
  const navigate = useNavigate();
  const [userid, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login, isLoading } = useLogin();

  // Redirect to dashboard if the user is already logged in
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
        console.log("Login Success >>", data);
        localStorage.setItem(TOKEN_KEY, data.jwt);
        localStorage.setItem("userid", String(data?.user?.id));
        localStorage.setItem("userstatus", String(data?.user?.userstatus));
        localStorage.setItem("emeelanrole", String(data?.user?.emeelanrole));
        navigate("/dashboard");
      } else {
        const errorData = await res.json();
        notification.error({
          message: "Login Failed",
          description: errorData?.message || "Invalid Credentials.",
        });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Something went wrong, please try again later.",
      });
    }
  };

  // Redirect to the Help page
  const handleHelpClick = () => {
    navigate("/help");
  };

  return (
    <div>
      <img src={`gathjod.png`} className="root-img" alt="Background" />
      <div className="container">
        <Card className="card-container">
          <div className="right-sider">
            <div className="top">
              <div className="emeelan-gath">
                <div>
                  <img
                    src={`logo.png`}
                    alt="logo"
                    style={{ width: "2.5rem", marginTop: "0.3rem" }}
                  />
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: "bold", fontSize: "1rem" }}>EMEELAN</p>
                  <p id="gathjod" style={{ margin: 0, fontSize: "0.9rem", color: "#555", lineHeight: 1.2 }}>
                    गठजोड़
                  </p>
                </div>
              </div>
              <div className="help" onClick={handleHelpClick} style={{ cursor: "pointer" }}>
                <img src={`help.png`} alt="help" className="help-img" />
              </div>
            </div>
            <div className="login-details">
              <form
                style={{ display: "flex", width: "100%", justifyContent: "center" }}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
              >
                <div className="login">
                  <span>Welcome To EMEELAN</span>
                  <span style={{ fontSize: "1rem" }}>गठजोड़</span>
                  <div style={{ width: "100%", fontSize: "1rem", marginTop: "50px" }}>
                    <span>Email or Mobile Number</span>
                  </div>
                  <Input
                    placeholder="Enter your Email or Mobile Number"
                    onChange={handleUserId}
                  />
                  <div style={{ width: "100%", fontSize: "1rem", marginTop: "10px" }}>
                    <span>Password</span>
                  </div>
                  <Input.Password
                    placeholder="Enter your Password"
                    onChange={handlePassword}
                  />
                  <div className="login-buttons">
                    <Button htmlType="submit" onClick={handleLogin} loading={isLoading}>
                      LOGIN
                    </Button>
                    <div>
                      <span>Don't have an account?</span>
                      <span
                        style={{ cursor: "pointer", color: "white" }}
                        onClick={() => navigate("/register")}
                      >
                        {" "}
                        Sign Up(रजिस्टर करे ){" "}
                      </span>
                    </div>
                    <div>
                      <span>Emeelan Privacy and Policy</span>
                      <span
                        style={{ cursor: "pointer", color: "white" }}
                        onClick={() => navigate("/policy")}
                      >
                        {" "}
                        Emeelan Privacy and Policy(ई-मीलन प्राइवेसी और पालिसी ){" "}
                      </span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
