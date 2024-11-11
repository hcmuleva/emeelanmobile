import React, { useEffect, useState } from "react";
import { useActiveAuthProvider, useLogin, useTranslate } from "@refinedev/core";
import {
  Row,
  Col,
  Layout,
  Card,
  Typography,
  Form,
  Input,
  Button,
  Checkbox,
  Divider,
  theme,
  Image,
} from "antd";
 import "../../styles/loginpage.css";
 import CoverImage from "../../../public/gathjod.png";
 import Logo from "../../../public/logo.png";
 import Help from "../../../public/help.png";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_SERVER_URL;

export const LoginPage = ({
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
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const translate = useTranslate();
  const [userid, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const authProvider = useActiveAuthProvider();
  const { mutate: login, isLoading } = useLogin({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  useEffect(() => {
    if (localStorage.getItem("jwt-token")) navigate("/dashboard");
  }, []);

  const PageTitle =
    title === false ? null : (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "32px",
          fontSize: "20px",
        }}
      >
        <img
          src="/emeelan_logo.jpg"
          alt="EMEELAN Logo"
          style={{ width: "100px", marginRight: "8px" }}
        />
        {title ?? ""}
      </div>
    );

  const CardTitle = (
    <Typography.Title
      level={3}
      style={{
        color: token.colorPrimaryTextHover,
        fontSize: "24px",
        textAlign: "center",
      }}
    >
      {translate("pages.login.title", "ई मीलन लॉगिन")}
    </Typography.Title>
  );

  const renderProviders = () => {
    if (providers && providers.length > 0) {
      return (
        <>
          {providers.map((provider) => (
            <Button
              key={provider.name}
              type="default"
              block
              icon={provider.icon}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                marginBottom: "8px",
              }}
              onClick={() => login({ providerName: provider.name })}
            >
              {provider.label}
            </Button>
          ))}
          {!hideForm && (
            <Divider>
              <Typography.Text
                style={{
                  color: token.colorTextLabel,
                }}
              >
                {translate("pages.login.divider", "or")}
              </Typography.Text>
            </Divider>
          )}
        </>
      );
    }
    return null;
  };

  const CardContent = (
    <Card
      title={CardTitle}
      style={{
        maxWidth: "400px",
        margin: "auto",
        backgroundColor: token.colorBgElevated,
        padding: "24px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
      {...contentProps}
    >
      {renderProviders()}
      {!hideForm && (
        <Form
          layout="vertical"
          form={form}
          onFinish={(values) => login(values)}
          requiredMark={false}
          initialValues={{ remember: false }}
          {...formProps}
        >
          <Form.Item
            name="userid"
            label={translate("pages.login.fields.userid", "User ID")}
            rules={[
              {
                required: true,
                message: translate(
                  "pages.login.errors.requiredUserid",
                  "User ID is required"
                ),
              },
            ]}
          >
            <Input
              size="large"
              placeholder={translate("pages.login.fields.userid", "User ID")}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label={translate("pages.login.fields.password", "Password")}
            rules={[
              {
                required: true,
                message: translate(
                  "pages.login.errors.requiredPassword",
                  "Password is required"
                ),
              },
            ]}
          >
            <Input
              type="password"
              autoComplete="current-password"
              placeholder="●●●●●●●●"
              size="large"
            />
          </Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "24px",
            }}
          ></div>
          {!hideForm && (
            <Form.Item>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                loading={isLoading}
                block
              >
                {translate("pages.login.signin", "Sign in")}
              </Button>
            </Form.Item>
          )}
        </Form>
      )}

      {registerLink ?? (
        <div style={{ marginTop: hideForm ? 16 : 8 }}>
          <Typography.Text style={{ fontSize: 12 }}>
            {translate(
              "pages.login.buttons.noAccount",
              "पहली बार ईमीलन वाले यूजर यहाँ क्लिक करे"
            )}{" "}
            <a
              href="/gathjod/register"
              style={{
                fontWeight: "bold",
                color: token.colorPrimaryTextHover,
              }}
            >
              {translate("pages.login.signup", "Sign up")}
            </a>
          </Typography.Text>
        </div>
      )}
    </Card>
  );
  const handleUserId = (e) => {
    setUserId(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: userid,
          password: password,
        }),
      });
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await res.json();
        if (data?.user?.userstatus === "APPROVED") {
          login({ userid: userid, password: password });
          return;
        } else if (data?.user?.userstatus === "PENDING") {
          navigate("/pending");
          return;
        } else if (data?.user?.userstatus === "REJECTED") {
          navigate("/rejected");
        } else if (data?.user?.userstatus === "BLOCKED") {
          navigate("/blocked");
        } else {
          navigate("/unauthorized");
        }
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
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
