import { Card } from "antd-mobile";

export default function DonationQrCards({ qrInfo }) {
  const { title, cause, qrimage } = qrInfo.attributes;

  return (
    <Card
      style={{
        margin: "16px auto",
        border: "1px solid #e0b4b4",
        borderRadius: "20px",
        backgroundColor: "#fff8f8",
        maxWidth: "380px",
        boxShadow: "0 4px 12px rgba(128, 0, 0, 0.1)",
        padding: "16px"
      }}
    >
      <div>
        <h3
          style={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#7a0000",
            borderBottom: "2px solid #dba0a0",
            paddingBottom: "6px",
            marginBottom: "10px"
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: "15px",
            fontWeight: 500,
            color: "#a94442",
            marginBottom: "20px",
            fontStyle: "italic"
          }}
        >
          {cause}
        </p>
        <div style={{ textAlign: "center" }}>
          <img
            src={qrimage?.data?.attributes?.url}
            alt="Donation QR"
            style={{
              width: "180px",
              height: "180px",
              objectFit: "contain",
              border: "2px dashed #dba0a0",
              borderRadius: "12px",
              padding: "10px",
              backgroundColor: "#fff"
            }}
          />
        </div>
      </div>
    </Card>
  );
}
