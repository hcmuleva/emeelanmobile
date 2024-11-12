import { Segmented } from "antd";
import { Button, Card, Image, List } from "antd";
import React, { useMemo, useState } from "react";
import UserCardView from "../../utils/user-card-view";
import { PlusCircleFilled } from "@ant-design/icons";
import { useGetIdentity } from "@refinedev/core";
import hasLikedPost from "../../utils/like-mapper";

const Requests = () => {
  const [currentView, setCurrentView] = useState("your-requests");

  const { data, refetch } = useGetIdentity();

  const requestsTo = useMemo(() => {
    return data?.requeststo?.map((request) => {
      const { likedTo, id } = hasLikedPost(
        request?.requeststo[0]?.id,
        data?.likesto
      );
      return {
        ...request?.requeststo[0]?.usermeelan,
        userid: request?.requeststo[0]?.id,
        requestbyme: true,
        requestid: request?.id,
        likedbyme: likedTo,
        likeid: id,
      };
    });
  }, [data]);

  const likedfrom = useMemo(() => {
    return data?.likesby?.map((like) => {
      // const formateddate = formatLikeDate(like?.createdAt);
      return {
        ...like?.usersfrom[0]?.usermeelan,
        // formateddate,
      };
    });
  }, [data]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
      className="request-main"
    >
      <Segmented
        block
        options={[
          {
            title: "Your Requests",
            label: "आपकी रिक्वेस्ट",
            icon: <PlusCircleFilled />,
            value: "your-requests",
          },
          {
            title: "Recived Requests",
            label: "प्राप्त अनुरोध",
            icon: <PlusCircleFilled />,
            value: "recived-requests",
          },
        ]}
        onChange={(value) => setCurrentView(value)}
      ></Segmented>
      {currentView === "your-requests" ? (
        <div>
          {requestsTo?.map((request) => (
            <UserCardView
              myDetails={data}
              userdata={request}
              refetchDetails={refetch}
            />
          ))}
        </div>
      ) : (
        <div className="recived-requests">
          <List
            // dataSource={likedfrom}
            renderItem={(item) => (
              <List.Item>
                <Card style={{ width: "100%" }}>
                  <div className="request-card">
                    <Image
                      alt="request-user-photo"
                      src={item?.photos ? item?.photos[0]?.url : ""}
                      width={55}
                      height={55}
                      className="user-requestsfrom-card-user-image"
                    ></Image>
                    <div className="requestsfrom-info">
                      <p>
                        <Button type="text" className="requestsfrom-btn">
                          {item?.FirstName ?? ""} {item?.LastName ?? ""}
                        </Button>
                        <span>Send A Requests</span>
                      </p>
                      <span className="requests-info-date">
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
export default Requests;
