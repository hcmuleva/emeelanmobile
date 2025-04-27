import { Button, Card } from "antd-mobile";
import { PayCircleOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";

export default function DonationCard() {
  const navigate = useNavigate();

  const goToDonation = () => {
    console.log("DonationPage")
    navigate('/donation');
  };

  return (
    <Card style={{
      marginBottom: '16px',
      borderRadius: '8px',
      background: 'linear-gradient(45deg, #8b0000, #b00000)',
      color: 'white'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <h3 style={{ margin: '0 0 5px 0', color: 'white' }}>Support Our Community</h3>
          <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
            Your contribution helps us grow
          </p>
        </div>
        <Button
          onClick={goToDonation}
          style={{
            backgroundColor: 'white',
            color: '#b00000',
            borderColor: 'white',
            borderRadius: '20px'
          }}
        >
          <PayCircleOutline fontSize={16} /> Donate
        </Button>
      </div>
    </Card>
  )
}