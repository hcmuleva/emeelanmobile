import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { getQrCards } from "../../services/api";
import DonationQrCards from "../cards/DonationQrCards";

export default function Donation() {
  const [qrCards, setQrCards] = useState(null);
  const { jwt } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getQrs = async () => {
      const res = await getQrCards(jwt);
      setQrCards(res.data);
    };
    getQrs();
  }, []);

  return (
    <div style={{ padding: "24px 16px", backgroundColor: "#fffafa", minHeight: "100vh" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          backgroundColor: "transparent",
          border: "none",
          color: "#7a0000",
          fontWeight: "bold",
          fontSize: "16px",
          marginBottom: "16px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "6px"
        }}
      >
        ← Back
      </button>

      <h1
        style={{
          fontSize: "26px",
          fontWeight: "bold",
          color: "#7a0000",
          borderBottom: "2px solid #dba0a0",
          paddingBottom: "8px",
          marginBottom: "20px",
          textAlign: "center"
        }}
      >
        Support a Cause 💖
      </h1>

      {qrCards?.length > 0 ? (
        qrCards.map((qrInfo, index) => (
          <DonationQrCards key={index} qrInfo={qrInfo} />
        ))
      ) : (
        <p
          style={{
            fontSize: "16px",
            color: "#999",
            textAlign: "center",
            marginTop: "40px"
          }}
        >
          No Donation Listings Available.
        </p>
      )}
    </div>
  );
}