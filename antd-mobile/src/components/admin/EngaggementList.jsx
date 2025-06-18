import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  Avatar,
  Space,
  Tag,
  DotLoading,
  Button,
  InfiniteScroll,
} from "antd-mobile";
import { getEngagedRequests } from "../../services/api";
import { HeartFill } from "antd-mobile-icons";
import { AuthContext } from "../../context/AuthContext";

const EngagedCard = ({ male, female, message, date }) => {
  return (
    <Card
      style={{
        borderRadius: "1rem",
        background: "linear-gradient(145deg, #fff0f0, #ffe6e6)",
        padding: "0.75rem",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.06)",
        width: "100%",
      }}
      bodyStyle={{ padding: "0" }}
    >
      {/* Engagement header with date */}
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          marginBottom: "0.5rem",
        }}
      >
        <div
          style={{
            fontSize: "10px",
            color: "#888",
            flexShrink: 0,
          }}
        >
          {new Date(date).toLocaleDateString()}
        </div>
      </div>

      {/* Male Profile */}
      <div
        style={{
          display: "flex",
          marginBottom: "0.75rem",
          padding: "0.5rem",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: "0.5rem",
        }}
      >
        <Avatar
          src={male?.avatar || "/placeholder.svg"}
          style={{ "--size": "50px", "--border-radius": "50%" }}
        />
        <div style={{ marginLeft: "0.75rem", flex: 1 }}>
          <div style={{ fontWeight: "bold", fontSize: "14px" }}>
            {male?.name}
          </div>
          <div style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>
            {male?.age} years • ID: {male?.id}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "4px",
            }}
          >
            <Tag color="primary" style={{ fontSize: "10px", padding: "0 6px" }}>
              Gotra: {male?.gotra || "Gotra"}
            </Tag>
            <Tag color="success" style={{ fontSize: "10px", padding: "0 6px" }}>
              {male?.gender || "Male"}
            </Tag>
          </div>
        </div>
      </div>

      {/* Heart Divider */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "0.5rem 0",
          position: "relative",
        }}
      >
        <div
          style={{
            height: "1px",
            backgroundColor: "#ffcdd2",
            width: "80%",
            position: "absolute",
            top: "50%",
          }}
        ></div>
        <HeartFill
          style={{
            fontSize: "24px",
            color: "#ff4d4f",
            backgroundColor: "#ffe6e6",
            borderRadius: "50%",
            padding: "4px",
            position: "relative",
            zIndex: 1,
          }}
        />
      </div>

      {/* Female Profile */}
      <div
        style={{
          display: "flex",
          padding: "0.5rem",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: "0.5rem",
        }}
      >
        <Avatar
          src={female?.avatar || "/placeholder.svg"}
          style={{ "--size": "50px", "--border-radius": "50%" }}
        />
        <div style={{ marginLeft: "0.75rem", flex: 1 }}>
          <div style={{ fontWeight: "bold", fontSize: "14px" }}>
            {female?.name}
          </div>
          <div style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>
            {female?.age} years • ID: {female?.id}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "4px",
            }}
          >
            <Tag color="primary" style={{ fontSize: "10px", padding: "0 6px" }}>
              Gotra: {female?.gotra || "Gotra"}
            </Tag>
            <Tag color="success" style={{ fontSize: "10px", padding: "0 6px" }}>
              {female?.gender || "Female"}
            </Tag>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Updated mapEngageData function
const mapEngageData = (engagedData) => {
  if (!engagedData?.data || !Array.isArray(engagedData.data)) {
    console.warn("Invalid engaged data structure:", engagedData);
    return [];
  }

  return engagedData.data
    .map((item) => {
      const { sender, receiver, createdAt, message } = item.attributes;

      // Calculate age from DOB
      const calculateAge = (dob) => {
        if (!dob) return "N/A";
        try {
          const birthDate = new Date(dob);
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
          ) {
            age--;
          }
          return age > 0 ? age : "N/A";
        } catch (error) {
          console.error("Error calculating age for DOB:", dob, error);
          return "N/A";
        }
      };

      // Extract profile picture from Pictures array string
      const extractProfilePicture = (picturesString) => {
        if (!picturesString) return null;
        try {
          const picturesArray = JSON.parse(picturesString.replace(/'/g, '"'));
          return picturesArray && picturesArray.length > 0
            ? picturesArray[0]
            : null;
        } catch (error) {
          console.error("Error parsing pictures:", picturesString, error);
          return null;
        }
      };

      // Determine male and female based on Sex field
      const isMaleSender = sender?.Sex === "Male";
      const maleData = isMaleSender ? sender : receiver;
      const femaleData = isMaleSender ? receiver : sender;

      // Validate that we have both male and female data
      if (!maleData || !femaleData) {
        console.warn("Missing gender data for engagement:", item);
        return null;
      }

      return {
        male: {
          name:
            `${maleData?.FirstName || ""} ${maleData?.LastName || ""}`.trim() ||
            maleData?.username ||
            "Unknown",
          age: calculateAge(maleData?.DOB),
          avatar:
            extractProfilePicture(maleData?.Pictures) ||
            "/assets/man-user-circle-icon.png",
          id: maleData?.id,
          gotra: maleData?.Gotra || "N/A",
          gender: "Male",
          city: maleData?.City,
          profession: maleData?.Profession || maleData?.occupation,
        },
        female: {
          name:
            `${femaleData?.FirstName || ""} ${
              femaleData?.LastName || ""
            }`.trim() ||
            femaleData?.username ||
            "Unknown",
          age: calculateAge(femaleData?.DOB),
          avatar:
            extractProfilePicture(femaleData?.Pictures) ||
            "/assets/woman-user-circle-icon.png",
          id: femaleData?.id,
          gotra: femaleData?.Gotra || "N/A",
          gender: "Female",
          city: femaleData?.City,
          profession: femaleData?.Profession || femaleData?.occupation,
        },
        date: createdAt,
        message: message || "Engaged",
      };
    })
    .filter(Boolean); // Remove null entries
};

export default function EngagementList() {
  const { jwt } = useContext(AuthContext);
  const [engagedData, setEngagedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    start: 0,
    limit: 10,
    total: 0,
    page: 1,
    pageCount: 1,
  });
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (start = 0, append = false) => {
    if (!jwt || loading) return;

    setLoading(true);
    setError(null);

    try {
      console.log(`Fetching engagements - Start: ${start}, Append: ${append}`);
      const res = await getEngagedRequests(start, pagination.limit, jwt);
      console.log("API Response:", res);

      const mapped = mapEngageData(res);
      console.log("Mapped data:", mapped);

      if (append) {
        setEngagedData((prev) => [...prev, ...mapped]);
      } else {
        setEngagedData(mapped);
      }

      // Update pagination info
      if (res.meta?.pagination) {
        setPagination({
          start: res.meta.pagination.start,
          limit: res.meta.pagination.limit,
          total: res.meta.pagination.total,
          page: res.meta.pagination.page,
          pageCount: res.meta.pagination.pageCount,
        });
        setHasMore(res.meta.pagination.page < res.meta.pagination.pageCount);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch engagements:", error);
      setError("Failed to load engagements. Please try again.");
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jwt) {
      fetchData(0, false);
    }
  }, [jwt]);

  const loadMore = async () => {
    if (hasMore && !loading) {
      const nextStart = pagination.start + pagination.limit;
      await fetchData(nextStart, true);
    }
  };

  const refreshData = () => {
    setEngagedData([]);
    setError(null);
    setPagination((prev) => ({ ...prev, start: 0, page: 1 }));
    setHasMore(true);
    fetchData(0, false);
  };

  // Show error state
  if (error && engagedData.length === 0) {
    return (
      <div style={{ padding: "0.75rem", textAlign: "center" }}>
        <div style={{ color: "#ff4d4f", marginBottom: "1rem" }}>{error}</div>
        <Button onClick={refreshData} size="small">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div style={{ padding: "0.75rem", width: "100%", boxSizing: "border-box" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h1
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            margin: 0,
          }}
        >
          Recent Engagements
        </h1>
        <Button
          size="small"
          onClick={refreshData}
          loading={loading}
          style={{ fontSize: "12px" }}
        >
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "1rem",
          fontSize: "12px",
          color: "#666",
        }}
      >
        Total Engagements: {pagination.total}
      </div>

      {/* Error display */}
      {error && engagedData.length > 0 && (
        <div
          style={{
            color: "#ff4d4f",
            textAlign: "center",
            fontSize: "12px",
            marginBottom: "1rem",
          }}
        >
          {error}
        </div>
      )}

      <Space direction="vertical" block style={{ gap: "0.75rem" }}>
        {engagedData.length > 0 ? (
          <>
            {engagedData.map((engagement, index) => (
              <EngagedCard
                key={`${engagement.male.id}-${engagement.female.id}-${index}`}
                male={engagement.male}
                female={engagement.female}
                message={engagement.message}
                date={engagement.date}
              />
            ))}

            {/* Infinite Scroll */}
            <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
              {hasMore ? (
                <div style={{ textAlign: "center", padding: "1rem" }}>
                  {loading ? <DotLoading /> : "Pull up to load more"}
                </div>
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    color: "#aaa",
                    padding: "1rem",
                  }}
                >
                  No more engagements to load
                </div>
              )}
            </InfiniteScroll>
          </>
        ) : loading ? (
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <DotLoading />
          </div>
        ) : (
          <div
            style={{ textAlign: "center", color: "#aaa", marginTop: "1rem" }}
          >
            No Engagements Yet
          </div>
        )}
      </Space>
    </div>
  );
}
