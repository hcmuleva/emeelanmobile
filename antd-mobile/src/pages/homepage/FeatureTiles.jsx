import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminUserEditor from '../../components/admin/AdminUserEditor';
import PendingApprovalCard from '../../components/authentication/PendingApprovalCard';
import BreakingNewsMarqueeEN from '../../components/featuretiles/BreakingNewsMarqueeEN';
import DonorMarquee from '../../components/featuretiles/DonorMarquee';
import DynamicQrGenerater from '../../components/featuretiles/DynamicQrGenerater.jsx';
import ShareProfileCard from '../../components/featuretiles/ShareProfileCard';
import { AuthContext } from '../../context/AuthContext';
import { getPaginatedUsers } from '../../services/api';
import "../../styles/scrollHide.css";
import { Button } from 'antd-mobile';
import DonationPage from './shortcuts/DonationPage.jsx';
import DonationCard from '../../components/featuretiles/DonationCard.jsx';
import QuickShortcutsUser from '../../components/featuretiles/QuickShortcutsUser.jsx';
import QuickShortcutsAdmin from '../../components/featuretiles/QuickShortcutsAdmin.jsx';
import GreetCard from '../../components/featuretiles/GreetCard.jsx';

const FeatureTiles = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate();
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  const { jwt } = useContext(AuthContext)
  // const user = JSON.parse(localStorage.getItem("user"));
  const userStatus = user?.userstatus || "PENDING";
  console.log("hcm userStatus", userStatus)
  useEffect(() => {

    // Fetch suggested users only if approved
    if (userStatus === "APPROVED") {
      getPaginatedUsers().then((res) => {
        setSuggestedUsers(res?.data || []);
      });
    }
  }, [userStatus]);

  if (userStatus !== "APPROVED") {
    return <PendingApprovalCard />;
  }

  return (
    <div style={{ padding: '16px' }}>

      <GreetCard />
      <DonorMarquee />

      <DonationCard />
      {user?.emeelanrole === "SUPERADMIN" ?
        <DynamicQrGenerater /> :
        ""
      }

      <BreakingNewsMarqueeEN />

      {user?.emeelanrole?.includes("ADMIN", "CENTER", "SUPERADMIN") ? (
        <QuickShortcutsAdmin />
      ) : (
        <QuickShortcutsUser />
      )}

      {/* <ShareProfileCard userId={user?.id} / > */}

      {(
        user?.emeelanrole === "CENTER" ||
        user?.emeelanrole === "ADMIN" ||
        user?.emeelanrole === "SUPERADMIN"
      ) && <AdminUserEditor />}
    </div>
  );
};

export default FeatureTiles;