import { GiftOutline } from "antd-mobile-icons";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getDonners } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function DonorMarquee() {
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
  }, []);

  const truncateWords = (text = "", limit = 2) => {
    if (typeof text !== "string") return "";
    const words = text.trim().split(" ");
    return words.slice(0, limit).join(" ") + (words.length > limit ? "..." : "");
  };

  return (
    <div
      className="donor-marquee-container"
      style={{
        overflow: "hidden",
        backgroundColor: "rgba(180, 0, 0, 0.07)",
        borderRadius: "8px",
        padding: "12px",
        marginBottom: "16px",
        border: "1px solid rgba(180, 0, 0, 0.2)",
      }}
    >
      <div
        className="marquee-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <GiftOutline color="#b00000" fontSize={18} />
          <span
            style={{
              marginLeft: "6px",
              fontWeight: "bold",
              color: "#b00000",
              fontSize: "16px",
            }}
          >
            Recent Donors
          </span>
        </div>
        <button
          onClick={() => navigate("/donors")}
          style={{
            background: "none",
            border: "none",
            color: "#b00000",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          View All
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "8px", color: "#666" }}>
          Loading donors...
        </div>
      ) : donors.length > 0 ? (
        <div style={{ overflow: "hidden", width: "100%" }}>
          <div
            style={{
              display: "inline-block",
              animation: "marquee 30s linear infinite",
            }}
          >
            {donors.map((data, i) => {
              const attr = data?.attributes || {};
              return (
                <div
                  key={i}
                  onClick={() => navigate(`/donors/${data?.id}`)}
                  style={{
                    display: "inline-block",
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    marginRight: "16px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                    width: "240px",
                    cursor: "pointer",
                    verticalAlign: "top"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={attr?.profileImage || "/placeholder.png"}
                      alt="Profile"
                      width="40"
                      height="40"
                      style={{ borderRadius: "50%", marginRight: "12px" }}
                    />
                    <div>
                      <div style={{ fontWeight: "bold", fontSize: "14px" }}>
                        {attr?.name || "Anonymous"}
                      </div>
                      <div style={{ color: "#b00000", fontWeight: "500" }}>
                        ₹{attr?.amount || "0"}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: "500",
                      marginTop: "6px",
                      whiteSpace: "normal",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}
                  >
                    <span style={{ color: "#555" }}>Purpose: </span>
                    {truncateWords(attr?.purpose, 1)}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#555",
                      marginTop: "4px",
                      whiteSpace: "normal",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}
                  >
                    <span style={{ fontWeight: "500" }}>Description: </span>
                    {truncateWords(attr?.description, 1)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "8px",
            fontStyle: "italic",
            color: "#999",
          }}
        >
          No donations yet.
        </div>
      )}

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}