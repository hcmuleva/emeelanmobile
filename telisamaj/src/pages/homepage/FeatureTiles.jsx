import { Space } from "antd-mobile";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminUserEditor from "../../components/admin/AdminUserEditor";
import PendingApprovalCard from "../../components/authentication/PendingApprovalCard";
import BreakingNewsMarqueeEN from "../../components/featuretiles/BreakingNewsMarqueeEN";
import DonationCard from "../../components/featuretiles/DonationCard.jsx";
import DonorMarquee from "../../components/featuretiles/DonorMarquee";
import DynamicQrGenerater from "../../components/featuretiles/DynamicQrGenerater.jsx";
import GreetCard from "../../components/featuretiles/GreetCard.jsx";
import QuickShortcutsAdmin from "../../components/featuretiles/QuickShortcutsAdmin.jsx";
import QuickShortcutsUser from "../../components/featuretiles/QuickShortcutsUser.jsx";
import { AuthContext } from "../../context/AuthContext";
import { getPaginatedUsers } from "../../services/api";
import "../../styles/scrollHide.css";

const FeatureTiles = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  const { jwt } = useContext(AuthContext);
  // const user = JSON.parse(localStorage.getItem("user"));
  const userStatus = user?.userstatus || "PENDING";
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
    <div style={{ padding: "16px" }}>
      <GreetCard />

      <DonorMarquee />
      <DonationCard />
      {user?.emeelanrole === "SUPERADMIN" ? <DynamicQrGenerater /> : ""}

      <BreakingNewsMarqueeEN />

      {user?.emeelanrole?.includes("ADMIN", "CENTER", "SUPERADMIN") ? (
        <QuickShortcutsAdmin />
      ) : (
        <QuickShortcutsUser />
      )}

      {/* <ShareProfileCard userId={user?.id} / > */}

      {(user?.emeelanrole === "CENTER" ||
        user?.emeelanrole === "ADMIN" ||
        user?.emeelanrole === "SUPERADMIN") && <AdminUserEditor />}

      <Space />
      <div></div>
      <Space />
    </div>
  );
};

export default FeatureTiles;
