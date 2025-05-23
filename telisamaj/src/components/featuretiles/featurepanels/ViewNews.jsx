import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { getBreakingNews } from "../../../services/api";
import { EyeOutline } from "antd-mobile-icons";
import { NavBar, Space } from "antd-mobile";

export default function ViewNews() {
  const { jwt } = useContext(AuthContext);
  const [breakingMessages, setBreakingMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBreakingNews = async () => {
      const res = await getBreakingNews(jwt);
      setBreakingMessages(res.data || []);
    };
    fetchBreakingNews();
  }, [jwt]);

  const getImageSrc = (news) =>
    news?.attributes?.image?.data?.attributes?.url ||
    "/assets/news-placeholder.png";

  const truncate = (text = "", limit = 30) =>
    text.length > limit ? text.slice(0, limit) + "..." : text;

  return (
    <div style={{ padding: "16px" }}>
      <NavBar onBack={() => navigate(-1)} style={{ "--height": "48px" }}>
        <h3 style={{ marginBottom: "12px", color: "#b00000" }}>All News</h3>
      </NavBar>
      <Space />

      {breakingMessages && breakingMessages.length > 0 ? (
        breakingMessages?.map((news, i) => {
          const attr = news.attributes || {};
          return (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 12,
                backgroundColor: "#fff",
                borderRadius: "10px",
                padding: "12px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                marginBottom: "14px",
                alignItems: "flex-start",
              }}
            >
              <img
                src={getImageSrc(news)}
                alt="News"
                width={64}
                height={64}
                style={{
                  borderRadius: "8px",
                  objectFit: "cover",
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                    marginBottom: "6px",
                  }}
                >
                  <span
                    style={{ fontSize: 13, fontWeight: 600, color: "#999" }}
                  >
                    Title:
                  </span>
                  <span
                    style={{ fontSize: 14, fontWeight: 500, color: "#333" }}
                  >
                    {truncate(attr.title || "Untitled", 35)}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
                    marginBottom: "10px",
                  }}
                >
                  <span
                    style={{ fontSize: 13, fontWeight: 600, color: "#999" }}
                  >
                    Description:
                  </span>
                  <span style={{ fontSize: 14, color: "#666" }}>
                    {truncate(attr.description || "", 60)}
                  </span>
                </div>

                <button
                  onClick={() => navigate(`/allnews/${news.id}`)}
                  style={{
                    background: "#b00000",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "4px 10px",
                    fontSize: 13,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    cursor: "pointer",
                  }}
                >
                  <EyeOutline /> View
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div style={{ textAlign: "center", marginTop: "20px", color: "#666" }}>
          No news available.
        </div>
      )}
    </div>
  );
}
