import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  List,
  Button,
  Tag,
  Avatar,
  Loading,
  Empty,
  SearchBar,
  InfiniteScroll,
} from "antd-mobile";
import {
  MessageOutline,
  EyeOutline,
  ClockCircleOutline,
} from "antd-mobile-icons";
import { fetchConnectionRequest } from "../../services/api";

export default function ConnectionListView() {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchConnectionUsers = useCallback(
    async (pageNum = 1, query = "") => {
      if (loading || !hasMore) return; // Prevent multiple simultaneous fetches
      try {
        setLoading(true);
        const res = await fetchConnectionRequest(query, pageNum, 10);
        console.log("API Response:", res);

        // Update connections based on page number
        setConnections((prev) =>
          pageNum === 1 ? res.data : [...prev, ...res.data]
        );

        // Update pagination and hasMore state
        setPagination(res.meta?.pagination || null);
        const totalPages =
          Math.ceil(
            res.meta?.pagination?.total / res.meta?.pagination?.pageSize
          ) || 1;
        setHasMore(pageNum < totalPages && res.data.length > 0);
        setPage(pageNum + 1);
      } catch (error) {
        console.error("Failed to fetch connections:", error);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore]
  );

  // Debounced search
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery !== inputValue) {
        setSearchQuery(inputValue);
        setPage(1); // Reset page to 1 on new search
        setConnections([]); // Clear existing connections
        setHasMore(true); // Reset hasMore for new search
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue, searchQuery]);

  // Fetch connections when searchQuery or fetchConnectionUsers changes
  useEffect(() => {
    fetchConnectionUsers(1, searchQuery);
  }, [searchQuery, fetchConnectionUsers]);

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "#FF6B6B";
      case "ACCEPTED":
        return "#4ECDC4";
      case "REJECTED":
        return "#95A5A6";
      default:
        return "#FF6B6B";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "PENDING":
        return "Pending";
      case "ACCEPTED":
        return "Accepted";
      case "REJECTED":
        return "Rejected";
      default:
        return status;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getGenderIcon = (gender) => {
    if (gender?.toLowerCase() === "male") return "👨";
    if (gender?.toLowerCase() === "female") return "👩";
    return "👤";
  };

  const handleViewProfile = useCallback((userId, userType) => {
    console.log(`View ${userType} profile:`, userId);
    // Add navigation logic here
  }, []);

  const handleSearchChange = useCallback((val) => {
    setInputValue(val);
  }, []);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchConnectionUsers(page, searchQuery);
    }
  }, [loading, hasMore, page, searchQuery, fetchConnectionUsers]);

  if (loading && connections.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "linear-gradient(135deg, #8B0000 0%, #DC143C 100%)",
        }}
      >
        <Loading color="white" />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          zIndex: 100,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          padding: "16px 12px 8px 12px",
        }}
      >
        <h2
          style={{
            margin: "0 0 8px 0",
            fontSize: "20px",
            fontWeight: "600",
            color: "#8B0000",
            textAlign: "center",
          }}
        >
          Connection Requests
        </h2>
        {pagination && (
          <p
            style={{
              color: "#666",
              margin: "0 0 12px 0",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {pagination.total} total connections
          </p>
        )}
        <SearchBar
          key="connection-search-bar"
          placeholder="Search by ID, Name, or Status"
          value={inputValue}
          onChange={handleSearchChange}
          style={{
            "--background": "rgba(255, 255, 255, 0.9)",
            "--border-radius": "8px",
          }}
        />
      </div>
      <div style={{ padding: "8px" }}>
        {!loading && connections.length === 0 && (
          <div style={{ padding: "60px 20px", textAlign: "center" }}>
            <Empty
              description={
                <span style={{ color: "white", fontSize: "16px" }}>
                  {searchQuery
                    ? "No connections match your search"
                    : "No connections found"}
                </span>
              }
            />
          </div>
        )}
        {connections.length > 0 && (
          <List>
            {connections.map((connection) => (
              <Card
                key={`connection-${connection.id}`}
                style={{
                  margin: "0 0 12px 0",
                  borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid rgba(139, 0, 0, 0.1)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <Tag
                    color={getStatusColor(connection.status)}
                    style={{
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: "500",
                    }}
                  >
                    {getStatusText(connection.status)}
                  </Tag>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "#666",
                      fontSize: "12px",
                    }}
                  >
                    <ClockCircleOutline style={{ marginRight: "4px" }} />
                    {formatDate(connection.createdAt)}
                  </div>
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "8px",
                      padding: "8px",
                      background: "rgba(139, 0, 0, 0.05)",
                      borderRadius: "8px",
                    }}
                  >
                    <Avatar
                      style={{
                        backgroundColor: "#8B0000",
                        marginRight: "12px",
                        fontSize: "14px",
                      }}
                    >
                      {getGenderIcon(
                        connection.sender?.Sex?.toLowerCase() ||
                          connection.sender?.gender?.toLowerCase()
                      )}
                    </Avatar>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#8B0000",
                          marginBottom: "2px",
                        }}
                      >
                        From:{" "}
                        {connection.sender?.FirstName ||
                          connection.sender?.username ||
                          "N/A"}
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#666",
                        }}
                      >
                        ID: {connection.sender?.id} •{" "}
                        {connection.sender?.Sex ||
                          connection.sender?.gender ||
                          "Not specified"}
                      </div>
                    </div>
                    <Button
                      size="mini"
                      color="primary"
                      fill="outline"
                      style={{
                        "--border-color": "#8B0000",
                        "--text-color": "#8B0000",
                        fontSize: "11px",
                        height: "28px",
                      }}
                      onClick={() =>
                        handleViewProfile(connection.sender?.id, "sender")
                      }
                    >
                      <EyeOutline style={{ marginRight: "2px" }} />
                      View
                    </Button>
                  </div>
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "8px",
                      padding: "8px",
                      background: "rgba(220, 20, 60, 0.05)",
                      borderRadius: "8px",
                    }}
                  >
                    <Avatar
                      style={{
                        backgroundColor: "#DC143C",
                        marginRight: "12px",
                        fontSize: "14px",
                      }}
                    >
                      {getGenderIcon(
                        connection.receiver?.Sex?.toLowerCase() ||
                          connection.receiver?.gender?.toLowerCase()
                      )}
                    </Avatar>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#DC143C",
                          marginBottom: "2px",
                        }}
                      >
                        To:{" "}
                        {connection.receiver?.FirstName ||
                          connection.receiver?.username ||
                          "N/A"}
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#666",
                        }}
                      >
                        ID: {connection.receiver?.id} •{" "}
                        {connection.receiver?.Sex ||
                          connection.receiver?.gender ||
                          "Not specified"}
                      </div>
                    </div>
                    <Button
                      size="mini"
                      color="primary"
                      fill="outline"
                      style={{
                        "--border-color": "#DC143C",
                        "--text-color": "#DC143C",
                        fontSize: "11px",
                        height: "28px",
                      }}
                      onClick={() =>
                        handleViewProfile(connection.receiver?.id, "receiver")
                      }
                    >
                      <EyeOutline style={{ marginRight: "2px" }} />
                      View
                    </Button>
                  </div>
                </div>
                {connection.message ? (
                  <div
                    style={{
                      padding: "12px",
                      background: "rgba(248, 249, 250, 0.8)",
                      borderRadius: "8px",
                      marginTop: "8px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "6px",
                      }}
                    >
                      <MessageOutline
                        style={{
                          marginRight: "6px",
                          color: "#8B0000",
                          fontSize: "14px",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: "500",
                          color: "#8B0000",
                        }}
                      >
                        Message:
                      </span>
                    </div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "13px",
                        color: "#444",
                        lineHeight: "1.4",
                      }}
                    >
                      {connection.message}
                    </p>
                  </div>
                ) : (
                  <div
                    style={{
                      padding: "8px 12px",
                      background: "rgba(248, 249, 250, 0.5)",
                      borderRadius: "6px",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#999",
                        fontStyle: "italic",
                      }}
                    >
                      No message included
                    </span>
                  </div>
                )}
              </Card>
            ))}
          </List>
        )}
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </div>
    </div>
  );
}
