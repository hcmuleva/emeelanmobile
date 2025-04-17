import React, { useCallback, useEffect, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import NewProfileCard from "../users/NewProfileCard";
import { getPaginatedUsers } from "../../services/api";

const limit = 10;

const Page = React.forwardRef(({ number, children }, ref) => (
  <div className="demoPage p-4" ref={ref}>
    <div className="grid grid-cols-1 gap-4">
      {children}
    </div>
  </div>
));

export default function Pageflip({ adminProp }) {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchUsers = async (pageNum = 0) => {
    try {
      const offset = pageNum * limit;
      const data = await getPaginatedUsers(offset, limit);
      const newUsers = data?.data || [];

      if (newUsers.length === 0) {
        setHasMore(false);
      } else {
        setUsers((prev) => [...prev, ...newUsers]);
        setPage(pageNum + 1);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(0);
  }, []);

  const groupedUsers = groupInPairs(users);

  const onFlip = useCallback(
    (e) => {
      const currentPage = e.data;
      if (hasMore && currentPage >= groupedUsers.length - 2) {
        fetchUsers(page);
      }
    },
    [hasMore, page, groupedUsers.length]
  );

  return (
    <div style={{ display: "inline-block",height:"100%", width:"100%" }}>
      <span style={{padding:"10px",display:"flex",justifySelf:"center", textAlign:"center", fontSize:"20px", fontWeight:"bold"}}>Profile Book</span>
      <HTMLFlipBook
        width={350}
        height={1150}
        onFlip={onFlip}
        showCover={false}
        maxShadowOpacity={0.5}
        mobileScrollSupport={true}
        autoSize={true}
        style={{ display: "inline-block", height:"100%", width:"100%" }}
      >
        {groupedUsers.map((pair, idx) => (
          <Page key={idx} number={idx + 1}>
            {pair.map((user) => (
              <NewProfileCard key={user.id} user={user} adminProp={adminProp} />
            ))}
          </Page>
        ))}
      </HTMLFlipBook>
    </div>
  );
}

function groupInPairs(array) {
  const pairs = [];
  for (let i = 0; i < array.length; i += 2) {
    pairs.push([array[i], array[i + 1]].filter(Boolean));
  }
  return pairs;
}
