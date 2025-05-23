import { useState } from "react";
import React from "react";
import ResetPassword from "../users/profilesections/ResetPassword";
import { Button, CapsuleTabs, Form, Input, Space, Switch } from "antd-mobile";
import EnggagedRequestsTable from "./EnggagedRequestsTable";
import UpdateStatusToEnggaged from "./UpdateUserEnggagement";
import DonationForm from "./DonationForm";
import EngaggementList from "./EngaggementList";
import ConnectionListView from "./ConnectionListView";

export default function AdminUserEditor() {
  const [userId, setUserId] = useState("");
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [engagedButton, setEngagedButton] = useState(false);
  const handleToggle = (checked) => {
    setEngagedButton(checked);
  };

  return (
    <>
      <CapsuleTabs>
        <CapsuleTabs.Tab title="Engaggement" key="engaggement">
          <UpdateStatusToEnggaged />
        </CapsuleTabs.Tab>
        <CapsuleTabs.Tab title="ConnectionList" key="connection">
          <ConnectionListView />
        </CapsuleTabs.Tab>
        <CapsuleTabs.Tab title="UserPassword" key="resetpassword">
          <Space style={{ display: "flex", justifySelf: "center" }}>
            <Form.Item
              name="userId"
              label="User ID"
              rules={[
                { required: true, message: "Enter UserId to changePassword" },
              ]}
            >
              <Input onChange={setUserId} placeholder="Enter UserId" />
            </Form.Item>
            {showResetPassword ? (
              <Button
                color="primary"
                onClick={() => setShowResetPassword(false)}
              >
                Reset
              </Button>
            ) : (
              <Button
                color="primary"
                onClick={() => setShowResetPassword(true)}
              >
                Change
              </Button>
            )}
          </Space>
          {showResetPassword && <ResetPassword userId={userId} />}
        </CapsuleTabs.Tab>
        <CapsuleTabs.Tab title="Engaggements List" key="engaggements">
          <EngaggementList />
        </CapsuleTabs.Tab>
        <CapsuleTabs.Tab title="DonationForm" key="donationform">
          <DonationForm />
        </CapsuleTabs.Tab>
      </CapsuleTabs>
    </>
  );
}
