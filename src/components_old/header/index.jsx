import { useGetIdentity } from "@refinedev/core";
import {
  Layout as AntdLayout,
  Avatar,
  Button,
  Space,
  Switch,
  Typography,
  theme,
} from "antd";
import React, { useContext } from "react";
import { ColorModeContext } from "../../contexts/color-mode";
import { useNavigate } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";

const { Text } = Typography;
const { useToken } = theme;

export const Header = ({
  sticky = true,
}) => {
  const { token } = useToken();
  const { data: user } = useGetIdentity();
  const navigate = useNavigate();
  const { mode, setMode } = useContext(ColorModeContext);

  const headerStyles = {
    backgroundColor: token.colorBgElevated,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0px 24px",
    height: "64px",
    position: "relative",
  };

  if (sticky) {
    headerStyles.position = "sticky";
    headerStyles.top = 0;
    headerStyles.zIndex = 1;
  }

  const handleNavigateToProfile = () => {
    navigate("/profile");
  };

  const handleNavigateToHome = () => {
    navigate("/");
  };

  return (
    <AntdLayout.Header style={headerStyles}>
      <Button
        style={{ position: "absolute", left: "1rem" }}
        onClick={handleNavigateToHome}
      >
        <HomeOutlined /> <span>होम</span>
      </Button>
      <Space>
        <Switch
          checkedChildren="🌛"
          unCheckedChildren="🔆"
          onChange={() => setMode(mode === "light" ? "dark" : "light")}
          defaultChecked={mode === "dark"}
        />
        <Space style={{ marginLeft: "8px" }} size="middle">
          {user?.username && <Text strong>{user?.username}</Text>}
          {user?.usermeelan?.photos ? (
            <Avatar
              src={user?.usermeelan?.photos[0]?.url}
              alt={user?.name}
              onClick={handleNavigateToProfile}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <Avatar
              onClick={handleNavigateToProfile}
              icon={<div>{user?.username.charAt(0).toUpperCase()}</div>}
              style={{ cursor: "pointer" }}
            />
          )}
        </Space>
      </Space>
    </AntdLayout.Header>
  );
};
