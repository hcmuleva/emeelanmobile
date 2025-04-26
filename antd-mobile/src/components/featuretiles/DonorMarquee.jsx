import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GiftOutline } from "antd-mobile-icons";
import { AuthContext } from "../../context/AuthContext";
import { getDonners } from "../../services/api";

export default function DonorMarquee() {
  const { jwt } = useContext(AuthContext);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contentWidth, setContentWidth] = useState(0);
  const scrollSpeed = 50; // pixels per second (constant)
  const marqueeContentRef = useRef(null);
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

  // Calculate content width and set animation duration
  useEffect(() => {
    if (!marqueeContentRef.current || donors.length === 0) return;

    const observer = new ResizeObserver(() => {
      const width = marqueeContentRef.current?.scrollWidth || 0;
      // We only need the width of the original content (not duplicated)
      const singleContentWidth = width / 2;
      setContentWidth(singleContentWidth);
    });

    observer.observe(marqueeContentRef.current);

    return () => {
      observer.disconnect();
    };
  }, [donors]);

  const animationDuration = contentWidth > 0 ? (contentWidth / scrollSpeed) + 50 : 80;

  const truncateWords = (text = "", limit = 2) => {
    if (typeof text !== "string") return "";
    const words = text.trim().split(" ");
    return words.slice(0, limit).join(" ") + (words.length > limit ? "..." : "");
  };

  const getProfileSrc = (attr) => {
    if (attr?.photo?.data?.attributes?.url) {
      return attr.photo.data.attributes.url;
    }
    if (attr?.gender?.toUpperCase() === "MALE") {
      return "/assets/man-user-circle-icon.png";
    }
    if (attr?.gender?.toUpperCase() === "FEMALE") {
      return "/assets/woman-user-circle-icon.png";
    }
    return "/assets/question-mark-circle-outline-icon.png";
  };

  const renderDonorCard = (data, i, keyPrefix = "") => {
    const attr = data?.attributes || {};
    return (
      <div
        key={`${keyPrefix}${i}`}
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
          verticalAlign: "top",
          height: "auto",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={getProfileSrc(attr)}
            alt="Profile"
            width="40"
            height="40"
            style={{
              borderRadius: "50%",
              marginRight: "12px",
              objectFit: "cover",
            }}
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
            textOverflow: "ellipsis",
          }}
        >
          <span style={{ color: "#555" }}>Purpose: </span>
          {truncateWords(attr?.purpose, 5)}
        </div>
        {attr?.description && (
          <div
            style={{
              fontSize: "12px",
              color: "#555",
              marginTop: "4px",
              whiteSpace: "normal",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <span style={{ fontWeight: "500" }}>Description: </span>
            {truncateWords(attr?.description, 5)}
          </div>
        )}
      </div>
    );
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
        <div style={{
          textAlign: 'center',
          fontStyle: 'italic',
          color: '#888',
          fontSize: '14px',
          padding: '20px 0'
        }}>
          Loading donors...
        </div>
      ) : donors.length > 0 ? (
        <div className="marquee-wrapper" style={{
          overflow: "hidden",
          width: "100%",
          position: "relative"
        }}>
          <div
            ref={marqueeContentRef}
            className="marquee-content"
            style={{
              display: "flex",
              width: "max-content",
              animation: `marqueeScroll ${animationDuration}s linear infinite`,
            }}
          >
            {donors.map((data, i) => renderDonorCard(data, i))}
            {/* Duplicate donors for continuous scrolling */}
            {donors.map((data, i) => renderDonorCard(data, i, "duplicate-"))}
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
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        
        .marquee-wrapper:hover .marquee-content {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}