import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import AdminLayout from './AdminLayout';
import SuperAdminLayout from './SuperAdminLayout';
import UserLayout from './UserLayout';

const MainLayout = ({ children }) => {
  const { user } = useContext(AuthContext);
  console.log(user) 
  // const role = user?.role || 'USER';
  const role = "ADMIN"

  const LayoutMap = {
    ADMIN: AdminLayout,
    SUPERADMIN: SuperAdminLayout,
    USER: UserLayout,
  };

  const Layout = LayoutMap[role.toUpperCase()] || UserLayout;

  return <Layout>{children}</Layout>;
};

export default MainLayout;



// import React, { useState } from "react";
// import { Button } from "antd-mobile";
// import UserLayout from "./UserLayout";
// import SuperAdminLayout from "./SuperAdminLayout";
// import AdminLayout from "./AdminLayout";

// const MainLayout = ({ children }) => {
//   const [layoutname, setLayoutName] = useState("ADMIN");

//   const getLayoutName = () => {
//     switch (layoutname) {
//       case "ADMIN":
//         return <AdminLayout children={children} />;
//       case "SUPERADMIN":
//         return <SuperAdminLayout children={children} />;
//       default:
//         return <UserLayout children={children} />;
//     }
//   };

//   return <>{ getLayoutName() }</>;
// };

// export default MainLayout;
