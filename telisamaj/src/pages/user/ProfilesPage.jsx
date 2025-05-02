import React from 'react'
import Profiles from '../../components/users/Profiles'
import { useAuth } from '../../context/AuthContext';
import PendingApprovalCard from '../../components/authentication/PendingApprovalCard';

export default function ProfilesPage() {
  const { user } = useAuth();

  // Guard clauses
  if (!user) return <div>Loading...</div>;
  if (user.userstatus !== "APPROVED") return <PendingApprovalCard />;

  return <Profiles />;
}
