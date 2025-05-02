import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleNews } from "../../../services/api";
import { AuthContext } from "../../../context/AuthContext";
import { NavBar, Toast } from "antd-mobile";
import { LeftOutline } from "antd-mobile-icons";

export default function ViewNewsCard() {
  const { newsid } = useParams();
  const { jwt } = useContext(AuthContext);
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await getSingleNews(newsid, jwt);
        setNews(res.data || null);
      } catch (e) {
        Toast.show({ content: "Failed to load news", position: "bottom" });
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [newsid, jwt]);

  const getImageSrc = () =>
    news?.attributes?.image?.data?.attributes?.url || "/assets/news-placeholder.png";

  if (loading) return <div style={{ padding: 16 }}>Loading...</div>;

  const attr = news?.attributes || {};

  return (
    <div style={{ paddingBottom: "16px" }}>
      <NavBar
        backArrow={<LeftOutline />}
        onBack={() => navigate(-1)}
        style={{ background: "#fff", borderBottom: "1px solid #eee" }}
      >
        News Details
      </NavBar>

      <img
        src={getImageSrc()}
        alt="News"
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          marginBottom: "16px",
        }}
      />

      <div style={{ padding: "0 16px" }}>
        <div style={{ marginBottom: "12px" }}>
          <div style={{ fontSize: "14px", fontWeight: "600", color: "#999" }}>Title</div>
          <div style={{ fontSize: "18px", fontWeight: "bold", color: "#222" }}>
            {attr.title || "Untitled"}
          </div>
        </div>
        <hr />
        <div>
          <div style={{ fontSize: "14px", fontWeight: "600", color: "#999" }}>Description</div>

          <div
            style={{
              fontSize: "15px",
              lineHeight: 1.6,
              color: "#444",
              whiteSpace: "pre-line",
            }}
          >
            {attr.description || "No description available."}
          </div>
        </div>
      </div>
    </div>
  );
}