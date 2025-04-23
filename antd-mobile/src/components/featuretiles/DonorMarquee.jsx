import { GiftOutline } from "antd-mobile-icons";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getDonners } from "../../services/api";

export default function DonorMarquee() {
  const { jwt } = useContext(AuthContext)
  const [donors, setDonors] = useState([])

  useEffect(() => {
    const fetchDonors = async () => {
      const res = await getDonners(jwt);
      setDonors(res.data);
    };
    fetchDonors();
  }, []);

  const hasDonors = Array.isArray(donors) && donors.length > 0;


  console.log(donors)
  return (
    <div className="donor-marquee-container" style={{
      overflow: 'hidden',
      backgroundColor: 'rgba(180, 0, 0, 0.07)',
      borderRadius: '8px',
      padding: '8px',
      marginBottom: '16px',
      border: '1px solid rgba(180, 0, 0, 0.2)'
    }}>
      <div className="marquee-header" style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '8px'
      }}>
        <GiftOutline color="#b00000" fontSize={18} />
        <span style={{
          marginLeft: '6px',
          fontWeight: 'bold',
          color: '#b00000'
        }}>Recent Donors</span>
      </div>

      {hasDonors ? (
        <div className="donor-marquee" style={{
          whiteSpace: 'nowrap',
          animation: 'marquee 30s linear infinite',
          padding: '4px 0'
        }}>
          {donors.map((donor, index) => (
            <span key={index} style={{
              padding: '4px 16px 4px 0',
              display: 'inline-block'
            }}>
              <span style={{ fontWeight: 'bold' }}>{donor?.attributes?.name}</span>
              <span style={{ color: '#b00000' }}> ₹{donor?.attributes?.amount}</span>
            </span>
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '8px',
          fontStyle: 'italic',
          color: '#999'
        }}>
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
  )
}