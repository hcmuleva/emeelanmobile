import {
  EnvironmentOutlined,
  GlobalOutlined,
  HeartFilled,
  HeartOutlined,
  PlusCircleFilled,
  PlusCircleOutlined,
  UserAddOutlined,
  VerticalAlignTopOutlined,
  WalletOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import { Button, Card, Divider, Image, Modal, Tag } from "antd";
import "../styles/interest.css";
import { useMemo, useState } from "react";
import calculateAge from "./age-finder";
import { useCreate, useDelete } from "@refinedev/core";
import "./styles.css";

const UserCardView = ({ userdata, myDetails, refetchDetails }) => {
  const { mutate: CreateNewLike } = useCreate();
  const { mutate: DeleteLike } = useDelete();
  const [open, setOpen] = useState(false);

  const currentuserData = useMemo(() => {
    let photo = null;
    photo = userdata?.Pictures?.replace(/[\[\]']/g, "").split(", ");
    if (userdata?.photos) {
      photo = userdata?.photos[0]?.url;
    }
    return {
      ...userdata,
      photo,
    };
  }, [userdata]);

  const handleRequestEvent = () => {
    if (userdata?.requestbyme === false) {
      CreateNewLike(
        {
          resource: "requests",
          values: {
            requeststo: currentuserData?.userid,
            requestsfrom: myDetails?.id,
            rating: 1,
          },
        },
        {
          onSuccess(data, variables, context) {
            if (!refetchDetails) {
              currentuserData.requestbyme = true;
              return;
            }
            refetchDetails();
          },
        }
      );
    } else {
      DeleteLike(
        {
          resource: "requests",
          id: currentuserData?.requestid,
        },
        {
          onSuccess(data, variables, context) {
            if (!refetchDetails) {
              currentuserData.requestbyme = false;
              return;
            }
            refetchDetails();
          },
        }
      );
    }
  };

  const handleLikeEvent = () => {
    if (userdata?.likedbyme === false) {
      CreateNewLike(
        {
          resource: "likes",
          values: {
            usersto: currentuserData?.userid,
            usersfrom: myDetails?.id,
            rating: 1,
          },
        },
        {
          onSuccess(data, variables, context) {
            if (!refetchDetails) {
              currentuserData.likedbyme = true;
              return;
            }
            refetchDetails();
          },
        }
      );
    } else {
      DeleteLike(
        {
          resource: "likes",
          id: currentuserData?.likeid,
        },
        {
          onSuccess(data, variables, context) {
            if (!refetchDetails) {
              currentuserData.likedbyme = false;
              return;
            }
            refetchDetails();
          },
        }
      );
    }
  };

  const handleShow = () => {
    setOpen(true);
  };
  return (
    <Card style={{ width: "100%" }}>
      <div className="profile-card">
        <div>
          <Image
            id="profile-image"
            src={currentuserData?.photo}
            style={{ borderRadius: "50%" }}
          ></Image>
        </div>
        <div className="profile-card-details">
          <h4 className="profile-name">
            {currentuserData?.FirstName} {currentuserData?.LastName ?? ""}
            <Button type="text" className="like-btn" onClick={handleLikeEvent}>
              Select{" "}
              {currentuserData?.likedbyme ? <HeartFilled /> : <HeartOutlined />}
            </Button>
          </h4>
          <div className="profile-sub-info">
            <div className="profile-sub-info-row-1">
              <p>
                <GlobalOutlined /> {currentuserData?.City}
              </p>
              <p>
                <VerticalAlignTopOutlined /> {currentuserData?.Height}
              </p>
              <p>
                <WomanOutlined /> {currentuserData?.MeritalStatus}
              </p>
              <p>
                <EnvironmentOutlined /> {currentuserData?.State}
              </p>
              <div className="profile-age-info">
                <span>{calculateAge(currentuserData?.DOB)}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  width={"20"}
                  style={{ marginLeft: "5px" }}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z"
                  />
                </svg>
              </div>
            </div>
            <div className="profile-sub-info-row-1">
              <p>
                <WalletOutlined /> {currentuserData?.Profession}
              </p>
            </div>
          </div>
          <div>
            <p className="interest-header">
              <span>Interest</span>
              <Button type="text" onClick={handleShow}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                  width={"20"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
              </Button>
            </p>
            {Array.from({ length: 1 }).map((_, index) => (
              <Tag key={index} color="blue">
                Reading
              </Tag>
            ))}
          </div>
          <div className="profile-card-footer">
            <Button
              type="text"
              className="request-btn"
              onClick={handleRequestEvent}
            >
              Request{" "}
              {currentuserData?.requestbyme ? (
                <PlusCircleFilled />
              ) : (
                <PlusCircleOutlined />
              )}{" "}
            </Button>
          </div>
        </div>
      </div>
      <UserModal open={open} setOpen={setOpen} user={currentuserData} />
    </Card>
  );
};

const UserModal = ({ open, setOpen, user }) => {
  return (
    <Modal
      open={open}
      width={800}
      title={
        <div style={{display: "flex", justifyContent: "center"}}>
          <p>Meelan Details</p>
        </div>
      }
      onClose={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <div style={{marginTop: "20px", display: "flex", gap: 12}}>
        <Image src={user.photo} width={200}></Image>
        <div style={{display: "flex"}}>
          <div>
            <p>Name: {user.FirstName} {user.LastName}</p>
            <p>Gender: {user.Gender}</p>
            <p>Age: {calculateAge(user.DOB)}</p>
            <p>Profession: {user.Profession}</p>
            <p>Height: {user.Height}</p>
          </div>
          <div style={{marginLeft: 150}}>
            <p>Weight: </p>
            <p>Place: {user.State}</p>
            <p>Interests: </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default UserCardView;
