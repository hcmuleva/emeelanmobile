import React, { useEffect, useState } from "react";
import { Card, Avatar, List, Button, DotLoading } from "antd-mobile";
import { getEngagedRequests } from "../../services/api";

const EnggagedRequestsList = () => {
  const [data, setData] = useState([]);
  const [pageInfo, setPageInfo] = useState({ page: 1, pageSize: 5, total: 0 });
  const [loading, setLoading] = useState(false);

  const loadData = async (page = 1) => {
    setLoading(true);
    try {
      const res = await getEngagedRequests(page, pageInfo.pageSize);
      if (page === 1) {
        setData(res.data);
      } else {
        setData((prev) => [...prev, ...res.data]);
      }
      setPageInfo(res.pagination);
    } catch (err) {
      console.error("Error fetching engaged list", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(1);
  }, []);

  const loadMore = () => {
    if (pageInfo.page < pageInfo.pageCount) {
      loadData(pageInfo.page + 1);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <List header="Engaged Connections">
        {data.map((item) => {
          const { id, sender, receiver } = item;

          return (
            <List.Item key={id}>
              <Card style={{ marginBottom: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                  {/* Sender Info */}
                  <div style={{ textAlign: "center" }}>
                    <Avatar
                      src={sender?.avatarUrl || defaultAvatar(sender?.gender)}
                      style={{ "--size": "48px" }}
                    />
                    <div>{sender?.FirstName} {sender?.LastName}</div>
                    <div>ID: {sender?.id}</div>
                    <div>{sender?.marital}</div>
                  </div>

                  <div style={{ alignSelf: "center" }}>❤️</div>

                  {/* Receiver Info */}
                  <div style={{ textAlign: "center" }}>
                    <Avatar
                      src={receiver?.avatarUrl || defaultAvatar(receiver?.gender)}
                      style={{ "--size": "48px" }}
                    />
                    <div>{receiver?.FirstName} {receiver?.LastName}</div>
                    <div>ID: {receiver?.id}</div>
                    <div>{receiver?.marital}</div>
                  </div>
                </div>
              </Card>
            </List.Item>
          );
        })}
      </List>

      {/* Load More Button */}
      {pageInfo.page < pageInfo.pageCount && (
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <Button loading={loading} onClick={loadMore} block>
            {loading ? <DotLoading /> : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
};

const defaultAvatar = (gender) =>
  gender === "female"
    ? "https://cdn-icons-png.flaticon.com/512/847/847969.png"
    : "https://cdn-icons-png.flaticon.com/512/847/847969.png";

export default EnggagedRequestsList;
