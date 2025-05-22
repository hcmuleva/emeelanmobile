import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { getDonners } from "../../../services/api";
import { NavBar, Space } from "antd-mobile";

export default function ViewDonors() {
  const { jwt } = useContext(AuthContext);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await getDonners(jwt);
        setDonors(res.data || []);
      } catch (e) {
        console.error("Error fetching donors", e);
      } finally {
        setLoading(false);
      }
    };
    fetchDonors();
  }, [jwt]);

  const getProfileSrc = (attr) => {
    if (attr?.photo?.data?.attributes?.url) return attr.photo.data.attributes.url;
    if (attr?.gender?.toUpperCase() === "MALE") return "/assets/man-user-circle-icon.png";
    if (attr?.gender?.toUpperCase() === "FEMALE") return "/assets/woman-user-circle-icon.png";
    return "/assets/question-mark-circle-outline-icon.png";
  };

  const truncate = (text = "", limit = 5) => {
    const words = text.trim().split(" ");
    return words.slice(0, limit).join(" ") + (words.length > limit ? "..." : "");
  };

  return (
    <div style={{ padding: "16px" }}>
      <NavBar onBack={() => navigate(-1)} style={{ "--height": "48px" }}>
        <h3 style={{ marginBottom: "12px", color: "#b00000" }}>All Donors</h3>
      </NavBar>
      <Space />

      {loading ? (
        <div style={{ textAlign: "center", color: "#888" }}>Loading...</div>
      ) : donors.length === 0 ? (
        <div style={{ textAlign: "center", fontStyle: "italic", color: "#999" }}>No donors yet.</div>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          {donors.map((data, i) => {
            const attr = data?.attributes || {};
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  maxWidth: "420px",
                  background: "#fff",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "1px solid #eee",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                  gap: "12px",
                }}
              >
                <img
                  src={getProfileSrc(attr)}
                  alt="Profile"
                  width="48"
                  height="48"
                  style={{ borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
                />
                <div style={{ flex: 1, fontSize: "14px", overflow: "hidden" }}>
                  <div style={{ fontWeight: "600" }}>{attr.name || "Anonymous"}</div>
                  <div style={{ color: "#555" }}>
                    ₹{attr.amount || "0"} • {attr.gender || "-"} • {attr.gotra || "-"}
                  </div>
                  <div style={{ color: "#777", fontSize: "13px" }}>
                    {truncate(attr.purpose || "", 4)}
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/donors/${data.id}`)}
                  style={{
                    padding: "6px 10px",
                    backgroundColor: "#b00000",
                    color: "#fff",
                    borderRadius: "6px",
                    border: "none",
                    fontSize: "13px",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                  }}
                >
                  View
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
