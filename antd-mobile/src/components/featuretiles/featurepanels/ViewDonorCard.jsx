import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleDonner } from "../../../services/api";
import { AuthContext } from "../../../context/AuthContext";
import { NavBar, DotLoading, ErrorBlock } from "antd-mobile";

export default function ViewDonorCard() {
  const { donorid } = useParams();
  const { jwt } = useContext(AuthContext);
  const [donor, setDonor] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonor = async () => {
      try {
        const res = await getSingleDonner(donorid, jwt);
        setDonor(res.data || null);
      } catch (e) {
        console.error("Error fetching donor", e);
      } finally {
        setLoading(false);
      }
    };
    fetchDonor();
  }, [donorid, jwt]);

  const getProfileSrc = (attr) => {
    if (attr?.photo?.data?.attributes?.url) return attr.photo.data.attributes.url;
    if (attr?.gender?.toUpperCase() === "MALE") return "/assets/man-user-circle-icon.png";
    if (attr?.gender?.toUpperCase() === "FEMALE") return "/assets/woman-user-circle-icon.png";
    return "/assets/question-mark-circle-outline-icon.png";
  };

  if (loading) {
    return (
      <div style={{ padding: 24, textAlign: "center" }}>
        <DotLoading color="primary" /> Loading donor...
      </div>
    );
  }

  if (!donor) {
    return <ErrorBlock status="empty" description="Donor not found." />;
  }

  const attr = donor.attributes || {};

  return (
    <div>
      <NavBar onBack={() => navigate(-1)} style={{ "--height": "48px" }}>
        Donor Profile
      </NavBar>

      <div
        style={{
          padding: "16px",
          marginTop: "8px",
          background: "#fff",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
          <img
            src={getProfileSrc(attr)}
            alt="Profile"
            width={72}
            height={72}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              border: "1px solid #eee",
            }}
          />
          <div>
            <div style={{ fontSize: 18, fontWeight: 600 }}>{attr.name || "Anonymous"}</div>
            <div style={{ fontSize: 14, color: "#999" }}>Gotra: {attr.gotra || "-"}</div>
          </div>
        </div>

        {/* Info Grid */}
        <div style={{ display: "grid", rowGap: 12 }}>
          <Info label="Gender" value={attr.gender} />
          <Info label="Caste" value={attr.cast} />
          <Info label="Donation Amount" value={`₹${attr.amount || "0"}`} />
          <Info label="Purpose" value={attr.purpose} multiline />
          <Info label="Description" value={attr.description} multiline />
        </div>
      </div>
    </div>
  );
}

// Detail Field Component
function Info({ label, value, multiline = false }) {
  return (
    <div>
      <div style={{ fontSize: 13, color: "#888", marginBottom: 2 }}>{label}</div>
      <div
        style={{
          fontSize: 15,
          fontWeight: 500,
          color: "#333",
          whiteSpace: multiline ? "normal" : "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {value || <span style={{ color: "#ccc" }}>-</span>}
      </div>
    </div>
  );
}
