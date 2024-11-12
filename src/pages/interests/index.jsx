import { HeartTwoTone } from "@ant-design/icons";
import { Button, Card, Image, List, Segmented } from "antd";
import "../../styles/interest.css";
import { setTwoToneColor } from "@ant-design/icons";
import { useGetIdentity } from "@refinedev/core";
import { useMemo, useState } from "react";
import UserCardView from "../../utils/user-card-view";
import formatLikeDate from "../../utils/like_date_formater";
import hasRequest from "../../utils/request-mapper";

setTwoToneColor("#e04c4c");

const Interest = () => {
  const [currentView, setCurrentView] = useState("your-likes");
  const { data, refetch }= useGetIdentity();

  const likedTo = useMemo(() => {
    return data?.likesto?.map((like) => {
      const { id, isRequested } = hasRequest(
        like.usersto[0]?.id,
        data?.requeststo
      );
      return {
        ...like?.usersto[0]?.usermeelan,
        userid: like?.usersto[0]?.id,
        likedbyme: true,
        likeid: like?.id,
        requestbyme: isRequested,
        requestid: id,
      };
    });
  }, [data]);

  const likedfrom = useMemo(() => {
    return data?.likesby?.map((like) => {
      const formateddate = formatLikeDate(like?.createdAt);
      return {
        ...like?.usersfrom[0]?.usermeelan,
        formateddate,
      };
    });
  }, [data]);

  return (
    <div
      style={{ display: "flex", justifyContent: "center" }}
      className="interest-main"
    >
      <Segmented
        block
        options={[
          {
            title: "Your Likes",
            label: "आपकी पसंद",
            icon: <HeartTwoTone />,
            value: "your-likes",
          },
          {
            title: "You Being Likes",
            label: "आपको पसंद किया",
            icon: <HeartTwoTone />,
            value: "others-likes",
          },
        ]}
        onChange={(value) => setCurrentView(value)}
      ></Segmented>
      {currentView === "your-likes" ? (
        <div>
          {likedTo?.map((like) => (
            <UserCardView
              myDetails={data}
              userdata={like}
              refetchDetails={refetch}
            />
          ))}
        </div>
      ) : (
        <div className="liked-from">
          <List
            dataSource={likedfrom}
            renderItem={(item) => (
              <List.Item>
                <Card style={{ width: "100%" }}>
                  <div className="user-likedfrom-card">
                    <Image
                      alt="user-photo"
                      src={item?.photos ? item?.photos[0]?.url : ""}
                      width={55}
                      height={55}
                      className="user-likedfrom-card-user-image"
                    ></Image>
                    <div className="likedfrom-info">
                      <p>
                        <Button type="text" className="likedfrom-btn">
                          {item?.FirstName ?? ""} {item?.LastName ?? ""}
                        </Button>
                        <span>Liked your Profile</span>
                      </p>
                      <span className="liked-info-date">
                        {item?.formateddate}
                      </span>
                    </div>
                  </div>
                </Card>
              </List.Item>
            )}
          ></List>
        </div>
      )}
    </div>
  );
};

export default Interest;
