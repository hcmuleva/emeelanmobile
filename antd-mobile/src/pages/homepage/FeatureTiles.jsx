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

  /***
   *  1) check for emeelanrole == SUPERADMIN  then show one button to create Donation data
   *  2) Create Donation data if emeelanrole ===<ADMIN /> <SUPERADMIN /><CENTER></CENTER>
   *  3) For all User Donation Button should be available 
   */
  return (
    <div style={{ padding: '16px' }}>
      <DonorMarquee />

      <BreakingNewsMarqueeEN />


      {user?.emeelanrole === "SUPERADMIN" ?
        <DynamicQrGenerater /> :
        ""
      }

      <Button onClick={() => navigate("/donation")}>Donation Page</Button>

      <ShareProfileCard userId={user?.id} />

      {(
        user?.emeelanrole === "CENTER" ||
        user?.emeelanrole === "ADMIN" ||
        user?.emeelanrole === "SUPERADMIN"
      ) && <AdminUserEditor />}
    </div>
  );
};

export default FeatureTiles;