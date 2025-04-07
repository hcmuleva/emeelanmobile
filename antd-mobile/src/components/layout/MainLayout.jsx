import React, { useState } from "react";
import { Button } from "antd-mobile";
import UserLayout from "./UserLayout";
import SuperAdminLayout from "./SuperAdminLayout";
import AdminLayout from "./AdminLayout";

const MainLayout = ({ children }) => {
  const [layoutname, setLayoutName] = useState("USER");

  const getLayoutName = () => {
    switch (layoutname) {
      case "ADMIN":
        return <AdminLayout children={children} />;
      case "SUPERADMIN":
        return <SuperAdminLayout children={children} />;
      default:
        return <UserLayout children={children} />;
    }
  };

  return <>{ getLayoutName() }</>;
};

export default MainLayout;
