import { Button, Space } from "antd-mobile";
import { PayCircleOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";

export default function DynamicQrGenerater() {
  const navigate = useNavigate();

  const goToDonation = () => {
    console.log("DonationPage");
    navigate('/qr-creation');
  };

  return (
    <>
      <div style={{ padding: '16px', textAlign: 'center' }}>
        <Button
          onClick={goToDonation}
          style={{
            background: 'linear-gradient(45deg, #8b0000, #b00000)',
            color: 'white',
            borderRadius: '24px',
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: 'bold',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <PayCircleOutline fontSize={18} /> Create QR Code
        </Button>

      </div>
      <Space />
    </>
  );
}
