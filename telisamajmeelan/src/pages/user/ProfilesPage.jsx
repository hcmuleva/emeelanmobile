import React from 'react'
import Profiles from '../../components/users/Profiles'
import { useAuth } from '../../context/AuthContext';
import PendingApprovalCard from '../../components/authentication/PendingApprovalCard';

export default function ProfilesPage() {
  const { user, updateUserField } = useAuth();

 return (<>{user.userstatus!=="APPROVED"?<PendingApprovalCard/>:  <Profiles/>}</> )
}
