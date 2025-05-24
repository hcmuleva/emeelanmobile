import React, { useContext } from "react";
import UserRoleProfile from "./rolebasedProfiles/UserRoleProfile";
import { AuthContext } from "../../context/AuthContext";
import AdminRoleProfiles from "./rolebasedProfiles/AdminRoleProfiles";

export default function Profiles() {
  const { user } = useContext(AuthContext);
  switch (user.emeelanrole) {
    case "MEELAN":
      return <UserRoleProfile />;
    case "ADMIN":
      return <AdminRoleProfiles userrole={user.emeelanrole} />;
    case "SUPERADMIN":
      return <AdminRoleProfiles userrole={user.emeelanrole} />;
    case "CENTER":
      return <AdminRoleProfiles userrole={user.emeelanrole} />;
    default:
  }
}
