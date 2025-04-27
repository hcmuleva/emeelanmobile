import { useContext, useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getBreakingNews } from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { Button } from "antd-mobile";

export default function BreakingNewsMarqueeEN() {
  const { jwt } = useContext(AuthContext);
  const [breakingMessages, setBreakingMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contentWidth, setContentWidth] = useState(0);
  const navigate = useNavigate();
  const marqueeContentRef = useRef(null);
  const scrollSpeed = 50; // pixels per second
  const animationRef = useRef(null);

  const fetchBreakingNews = useCallback(async () => {
    try {
      const res = await getBreakingNews(jwt);
      setBreakingMessages(res.data || []);
    } catch (error) {
      console.error("Failed to fetch breaking news:", error);
    } finally {
      setLoading(false);
    }
  }, [jwt]);

  useEffect(() => {
    fetchBreakingNews();
  }, [fetchBreakingNews]);

  // Calculate content width and handle resize
  useEffect(() => {
    if (!marqueeContentRef.current || breakingMessages.length === 0) return;

    const calculateWidth = () => {
      const width = marqueeContentRef.current?.scrollWidth || 0;
      // Calculate width of original content only (not duplicated)
      const singleContentWidth = width / 2;
      setContentWidth(singleContentWidth);
    };

    const observer = new ResizeObserver(calculateWidth);
    observer.observe(marqueeContentRef.current);

    // Initial calculation
    calculateWidth();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationRef.current);
    };
  }, [breakingMessages]);

  const animationDuration = contentWidth > 0 ? (contentWidth / scrollSpeed) + 50 : 80;

  const hasNews = breakingMessages.length > 0;

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
          style={{
            borderRadius: '16px',
            padding: '2px 12px',
            '--background-color': '#0064b4',
            '--text-color': 'white'
          }}
        >
          View All News
        </Button>
        <span style={{
          fontWeight: 'bold',
          color: '#0064b4',
          fontSize: '16px',
          textTransform: 'uppercase'
        }}>Breaking News</span>
      </div>

      {loading ? (
        <div style={{
          textAlign: 'center',
          fontStyle: 'italic',
          color: '#888',
          fontSize: '14px',
          padding: '20px 0'
        }}>
          Loading news...
        </div>
      ) : hasNews ? (
        <div
          className="marquee-container"
          style={{
            width: '100%',
            overflow: 'hidden',
            position: 'relative',
            minHeight: '160px' // Ensure consistent height
          }}
        >
          <div
            ref={marqueeContentRef}
            className="marquee-content"
            style={{
              display: 'flex',
              gap: '24px',
              width: 'max-content',
              animation: `scrollingMarquee ${animationDuration}s linear infinite`,
              willChange: 'transform' // Optimize for performance
            }}
          >
            {[...breakingMessages, ...breakingMessages].map((news, index) => (
              <div
                key={`${news.id}-${index}`}
                onClick={() => navigate(`/allnews/${news.id}`)}
                style={{
                  display: 'inline-block',
                  minWidth: '250px',
                  maxWidth: '250px',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  padding: '10px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                  flexShrink: 0 // Prevent items from shrinking
                }}
              >
                <img
                  src={news?.attributes?.image?.data?.attributes?.url || "/assets/news-placeholder.png"}
                  alt="news"
                  style={{
                    width: '100%',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    backgroundColor: '#f5f5f5' // Fallback background
                  }}
                  onError={(e) => {
                    e.target.src = "/assets/news-placeholder.png";
                  }}
                />
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  margin: '8px 0 4px 0',
                  color: '#1a1a1a',
                  lineHeight: '1.2',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {news.attributes?.title || 'Untitled News'}
                </h4>
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
                }}>
                  {news.attributes?.description || 'No description available'}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          fontStyle: 'italic',
          color: '#888',
          fontSize: '14px',
          padding: '20px 0',
          minHeight: '160px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          No breaking news available
        </div>
      )}

      <style>{`
        @keyframes scrollingMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .marquee-container:hover .marquee-content {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}