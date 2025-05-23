import { Button, Card } from "antd-mobile";
import { TravelOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";

export default function ShareProfileCard({ userId }) {
  const navigate = useNavigate();

  const textToCopy = `http://localhost:3000/profile-view/${userId}`;

  const shareProfile = () => {
    // Toast.show({
    //   content: 'Profile link copied to clipboard!',
    //   position: 'bottom',
    // });
    navigate("/shareprofile");
    // navigator.clipboard.writeText(textToCopy)
    //   .then(() => alert("Copied to clipboard!"))
    //   .catch((err) => console.error("Failed to copy:", err));
  };

  return (
    <Card
      style={{
        marginBottom: "16px",
        borderRadius: "8px",
        border: "1px solid rgba(180, 0, 0, 0.2)",
        backgroundColor: "rgba(180, 0, 0, 0.03)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h3 style={{ margin: "0 0 5px 0", color: "#8b0000" }}>
            Share Your Profile
          </h3>
          <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
            Invite friends to view your profile
          </p>
        </div>
        <Button
          onClick={shareProfile}
          color="primary"
          style={{
            backgroundColor: "#b00000",
            borderColor: "#b00000",
            borderRadius: "20px",
          }}
        >
          <TravelOutline fontSize={16} />
        </Button>
      </div>
    </Card>
  );
}
