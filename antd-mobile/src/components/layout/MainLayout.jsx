import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import AdminLayout from './AdminLayout';
import SuperAdminLayout from './SuperAdminLayout';
import UserLayout from './UserLayout';

const MainLayout = ({ children }) => {
  const { user } = useContext(AuthContext);
  // const role = user?.role || 'USER';
  const emeelanrole =user.emeelanrole
  console.log("Meeelan rol", emeelanrole)
  const LayoutMap = {
    ADMIN: AdminLayout,
    SUPERADMIN: SuperAdminLayout,
    MEELAN: UserLayout,
    CENTER: SuperAdminLayout,
  };

  const Layout = LayoutMap[emeelanrole.toUpperCase()] || UserLayout;

  return <Layout>{children}</Layout>;
};

export default MainLayout;

