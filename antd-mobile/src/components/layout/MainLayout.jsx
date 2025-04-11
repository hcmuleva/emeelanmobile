import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import AdminLayout from './AdminLayout';
import SuperAdminLayout from './SuperAdminLayout';
import UserLayout from './UserLayout';

const MainLayout = ({ children }) => {
  const { user } = useContext(AuthContext);
  console.log(user) 
  // const role = user?.role || 'USER';
  const emeelanrole =user.emeelanrole

  const LayoutMap = {
    ADMIN: AdminLayout,
    SUPERADMIN: SuperAdminLayout,
    MEELAN: UserLayout,
  };

  const Layout = LayoutMap[emeelanrole.toUpperCase()] || UserLayout;

  return <Layout>{children}</Layout>;
};

export default MainLayout;

