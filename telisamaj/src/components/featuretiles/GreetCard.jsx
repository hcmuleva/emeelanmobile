import react, { useContext, useEffect, useState } from "react";
import { AuthContext, useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getSamajTitle } from "../../services/api";

export default function GreetCard() {
  const { user, samajInfo, completionBar } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div
      style={{
        border: "1px solid rgba(180, 0, 0, 0.2)",
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "16px",
        background: "linear-gradient(45deg, #8b0000, #b00000)",
        boxShadow: "0 4px 12px rgba(139, 0, 0, 0.15)",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative elements */}
      <div
        style={{
          position: "absolute",
          top: "-10px",
          right: "-10px",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-15px",
          left: "30%",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.08)",
          zIndex: 1,
        }}
      />

      {/* Content container */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <h3
          style={{
            margin: 0,
            fontWeight: "600",
            fontSize: "18px",
            color: "white",
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
          }}
        >
          <span style={{ textTransform: "lowercase", textAlign: "center" }}>
            {samajInfo?.[0]?.attributes?.subtitle_hi}
          </span>
        </h3>

        <h3
          style={{
            margin: 0,
            fontWeight: "600",
            fontSize: "20px",
            color: "white",
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
          }}
        >
          <span>Welcome, </span> {user?.FirstName || "Matchmaker"}!
        </h3>

        <p
          style={{
            margin: "8px 0 12px 0",
            color: "rgba(255, 255, 255, 0.9)",
            fontSize: "14px",
            lineHeight: "1.4",
          }}
        >
          Your perfect match could be just a tap away. Ready to begin your
          journey to love?
        </p>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "8px",
          }}
        >
          <button
            onClick={() => navigate("/profiles")}
            style={{
              background: "white",
              color: "#b00000",
              border: "none",
              borderRadius: "20px",
              padding: "8px 16px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            Find Matches
          </button>
          {completionBar !== 100 && (
            <button
              onClick={() => navigate("/userprofile")}
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.4)",
                borderRadius: "20px",
                padding: "8px 16px",
                fontSize: "13px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              Complete Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
