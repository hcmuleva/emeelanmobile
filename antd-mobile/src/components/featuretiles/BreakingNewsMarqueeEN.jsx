import { useContext, useEffect, useState } from "react";
import { getBreakingNews } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

export default function BreakingNewsMarqueeEN() {

  const { jwt } = useContext(AuthContext)
  const [breakingMessages, setBreakingMessages] = useState([])

  useEffect(() => {
    const fetchDonors = async () => {
      const res = await getBreakingNews(jwt);
      setBreakingMessages(res.data);
    };
    fetchDonors();
  }, []);

  console.log(breakingMessages)
  const newsItems = [
    [
      "Easy to register: This is very easy app to register now",
      "आसान पंजीकरण: यह ऐप पंजीकरण के लिए बहुत आसान है, अभी रजिस्टर करें",
    ],
    [
      "Admins: 350 plus admin to help you to get register profiles details and background verification",
      "प्रशासक: 350 से अधिक प्रशासक आपकी प्रोफाइल विवरण और पृष्ठभूमि सत्यापन में मदद करने के लिए उपलब्ध हैं",
    ],
    [
      "Invite: Invite option to find suitable profile and based on this other side person can accept or reject",
      "आमंत्रण: उपयुक्त प्रोफाइल खोजने के लिए आमंत्रण विकल्प, जिसके आधार पर दूसरा व्यक्ति स्वीकार या अस्वीकार कर सकता है",
    ]
  ];
  return (
    <div className="news-marquee-container" style={{
      overflow: 'hidden',
      backgroundColor: 'rgba(0, 100, 180, 0.07)',
      borderRadius: '8px',
      padding: '8px',
      marginBottom: '16px',
      border: '1px solid rgba(0, 100, 180, 0.2)'
    }}>
      <div className="marquee-header" style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '8px'
      }}>
        <span style={{
          marginLeft: '6px',
          fontWeight: 'bold',
          color: '#0064b4'
        }}>Breaking News</span>
      </div>
      <div className="news-marquee" style={{
        whiteSpace: 'nowrap',
        animation: 'marquee 30s linear infinite',
        padding: '4px 0'
      }}>
        {newsItems.map((item, index) => (
          <div key={index} style={{
            padding: '4px 10px 4px 0',
            display: "inline-block"
          }}>
            {item[0]} •
            <br />
            {item[1]} •
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  )
}