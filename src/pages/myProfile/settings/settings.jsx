import { useUpdate } from "@refinedev/core";
import {
  Button,
  Collapse,
  Form,
  Input,
  notification,
  Radio,
  Space,
} from "antd";
import axios from "axios";
import React, { useState } from "react";
const API_URL = import.meta.env.VITE_SERVER_URL;

const Settings = ({ setting }) => {
  const [selected, setSelected] = useState(0);
  const { mutate: updateSetting } = useUpdate();
  const handleFinish = async (values) => {
    const { currentPassword, newPassword, confirmNewPassword } = values;

    const token = localStorage.getItem("jwt-token");
    if (!token) {
      notification.error({
        message: "Error",
        description: "No token found. Please log in again.",
      });
      return null;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/auth/change-password`,
        {
          currentPassword,
          password: newPassword,
          passwordConfirmation: confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        notification.success({
          message: "Success",
          description: "Your password has been successfully reset.",
        });
      } else {
        throw new Error("Failed to reset password");
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description:
          error.response?.data?.message || "Your current password is wrong.",
      });
    }
  };
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
  const onChange = (e, fieldName) => {
    updateSetting({
      resource: "user-settings",
      id: setting?.id,
      values: {
        [fieldName]: e.target.value,
      },
      successNotification: false,
    });
  };
  const items = [
    {
      key: "1",
      label: "Display Name",
      children: (
        <Radio.Group
          defaultValue={setting?.displayName}
          onChange={(value) => onChange(value, "displayName")}
        >
          <Space direction="vertical">
            <Radio value={"isVisibleToAll"}>Visible To All Members</Radio>
            <Radio value={"isVisibleToOnlyConnections"}>
              Visible To Only Connections
            </Radio>
          </Space>
        </Radio.Group>
      ),
    },
    {
      key: "2",
      label: "Photos",
      children: (
        <Radio.Group
          onChange={(value) => onChange(value, "photos")}
          defaultValue={setting?.photos}
        >
          <Space direction="vertical">
            <Radio value={"isVisibleToAll"}>Visible To All Members</Radio>
            <Radio value={"isVisibleToOnlyConnections"}>
              Visible To Only Connections
            </Radio>
          </Space>
        </Radio.Group>
      ),
    },
    {
      key: "3",
      label: "Phone",
      children: (
        <Radio.Group
          onChange={(value) => onChange(value, "phone")}
          defaultValue={setting?.phone}
        >
          <Space direction="vertical">
            <Radio value={"isVisibleToAll"}>Visible To All Members</Radio>
            <Radio value={"isVisibleToOnlyConnections"}>
              Visible To Only Connections
            </Radio>
          </Space>
        </Radio.Group>
      ),
    },
    {
      key: "4",
      label: "Email",
      children: (
        <Radio.Group
          onChange={(value) => onChange(value, "email")}
          defaultValue={setting?.email}
        >
          <Space direction="vertical">
            <Radio value={"isVisibleToAll"}>Visible To All Members</Radio>
            <Radio value={"isVisibleToOnlyConnections"}>
              Visible To Only Connections
            </Radio>
          </Space>
        </Radio.Group>
      ),
    },
    {
      key: "5",
      label: "Date of Birth",
      children: (
        <>
          <Radio.Group
            onChange={(value) => onChange(value, "dateOfBirth")}
            defaultValue={setting?.dateOfBirth}
          >
            <Space direction="vertical">
              <Radio value={"isVisibleToAll"}>Visible To All Members</Radio>
              <Radio value={"isVisibleToOnlyConnections"}>
                Visible To Only Connections
              </Radio>
            </Space>
          </Radio.Group>
        </>
      ),
    },
  ];
  return (
    <div style={{ display: "flex" }}>
      <div className="settings-left-panel">
        <div
          className="panel-item"
          onClick={() => setSelected(0)}
          style={
            selected === 0
              ? { backgroundColor: "grey", color: "white" }
              : { backgroundColor: "lightgrey" }
          }
        >
          <span>Change Password</span>
        </div>
        <div
          className="panel-item"
          onClick={() => setSelected(1)}
          style={
            selected === 1
              ? {
                  backgroundColor: "grey",
                  color: "white",
                  borderBottomLeftRadius: "0.5rem",
                }
              : {
                  backgroundColor: "lightgrey",
                  borderBottomLeftRadius: "0.5rem",
                }
          }
        >
          <span>Privacy Options</span>
        </div>
      </div>
      <div className="settings-right-panel">
        {selected == 0 && (
          <Form onFinish={handleFinish}>
            <span> Current Password</span>
            <Form.Item name={"currentPassword"}>
              <Input.Password></Input.Password>
            </Form.Item>
            <span> New Password</span>
            <Form.Item name={"newPassword"}>
              <Input.Password></Input.Password>
            </Form.Item>
            <span> Confirm New Password</span>
            <Form.Item name={"confirmNewPassword"}>
              <Input.Password></Input.Password>
            </Form.Item>
            <Form.Item name={"confirmNewPassword"}>
              <Button htmlType="submit">Save</Button>
            </Form.Item>
          </Form>
        )}
        {selected === 1 && (
          <div>
            <Collapse items={items} defaultActiveKey={["1"]} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
