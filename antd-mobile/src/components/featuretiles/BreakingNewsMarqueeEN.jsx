import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBreakingNews } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "antd-mobile";

export default function BreakingNewsMarqueeEN() {
  const { jwt } = useContext(AuthContext);
  const [breakingMessages, setBreakingMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBreakingNews = async () => {
      const res = await getBreakingNews(jwt);
      setBreakingMessages(res.data || []);
    };
    fetchBreakingNews();
  }, []);

  console.log(breakingMessages)

  return (
    <div style={{
      position: 'relative',
      backgroundColor: 'rgba(0, 100, 180, 0.07)',
      border: '1px solid rgba(0, 100, 180, 0.2)',
      borderRadius: '12px',
      padding: '12px',
      overflow: 'hidden',
      marginBottom: '20px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px'
      }}>
        <Button
          size="mini"
          color="primary"
          onClick={() => navigate('/allnews')}
          style={{ borderRadius: '16px', padding: '2px 12px' }}
        >
          View All News
        </Button>
        <span style={{
          fontWeight: 'bold',
          color: '#0064b4',
          fontSize: '16px'
        }}>Breaking News</span>
      </div>

      <div style={{
        width: '100%',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div className="scroll-track" style={{
          display: 'flex',
          gap: '24px',
          animation: 'scrollingMarquee 60s linear infinite'
        }}>
          {[...breakingMessages, ...breakingMessages].map((news, index) => (
            <div
              key={index}
              onClick={() => navigate(`/allnews/${news.id}`)}
              style={{
                display: 'inline-block',
                minWidth: '250px',
                maxWidth: '250px',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                padding: '10px',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
              }}
            >
              <img
                src={news?.attributes?.image?.data?.attributes?.url || "/assets/news-placeholder.png"}
                alt="news-image"
                style={{
                  width: '100%',
                  height: '100px',
                  objectFit: 'cover',
                  borderRadius: '6px'
                }}
              />
              <h4 style={{
                fontSize: '14px',
                fontWeight: '600',
                margin: '8px 0 4px 0',
                color: '#1a1a1a',
                lineHeight: '1.2'
              }}>{news.attributes?.title}</h4>
              <p style={{
                fontSize: '12px',
                color: '#555',
                margin: 0,
                lineHeight: '1.4',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}>{news.attributes?.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scrollingMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
