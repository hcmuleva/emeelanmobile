import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import AdminLayout from './AdminLayout';
import SuperAdminLayout from './SuperAdminLayout';
import UserLayout from './UserLayout';

const MainLayout = ({ children }) => {
  const { user } = useContext(AuthContext);
  // const role = user?.role || 'USER';
  const emeelanrole = user.emeelanrole
  console.log("Meeelan rol", emeelanrole)
  const LayoutMap = {
    ADMIN: AdminLayout,
    SUPERADMIN: SuperAdminLayout,
    MEELAN: UserLayout,
    CENTER: SuperAdminLayout,
  };

  const Layout = LayoutMap[emeelanrole?.toUpperCase()] || UserLayout;

  return <Layout>{children}</Layout>;
};

export default MainLayout;


// import React, { useContext, useEffect } from 'react';
// import { AuthContext } from '../../context/AuthContext';
// import useAblySubscription from '../../utils/useAblySubscription';
// import AdminLayout from './AdminLayout';
// import SuperAdminLayout from './SuperAdminLayout';
// import UserLayout from './UserLayout';

// const MainLayout = ({ children }) => {
//   const { user, setUser } = useContext(AuthContext);
//   // const [customUser, setCustomUser] = useContext(null)
//   // useEffect(() => {
//   //   const fetchUser = async()=>{
//   //     const res = await getCustomMe()
//   //   }
//   // })

//   console.log(user)

//   useAblySubscription({
//     channelName: `userrole:${user?.id}`,
//     event: 'role-changed',
//     onMessage: ({ message, newRole }) => {
//       console.log('[RoleChange]', message, newRole);
//       const updated = { ...user, emeelanrole: newRole };
//       setUser(updated);
//       localStorage.setItem('user', JSON.stringify(updated));
//     },
//     toastFormatter: ({ message, newRole }) => ({
//       icon: 'info',
//       content: `${message} → Role: ${newRole}`
//     }),
//   });

//   const role = (user?.emeelanrole || 'MEELAN').toUpperCase();
//   const Layout = { ADMIN: AdminLayout, SUPERADMIN: SuperAdminLayout, CENTER: SuperAdminLayout, MEELAN: UserLayout }[role] || UserLayout;

//   return <Layout>{children}</Layout>;
// };

// export default MainLayout;