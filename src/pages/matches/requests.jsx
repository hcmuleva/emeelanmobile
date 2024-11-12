import { useCustom } from "@refinedev/core";
import { Button, Card, Spin } from "antd";
import React, { useEffect, useState } from "react";
import calculateAge from "../../utils/age-finder";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_SERVER_URL;

const Requests = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const jwt_token = localStorage.getItem("jwt-token");
  const userid = localStorage.getItem("userid");
  const [data, setData] = useState([{val: null}]);
  const navigate = useNavigate();
  const {
    data: response,
    isFetching,
  } = useCustom({
    url: `${API_URL}/api/custom-requests`,
    method: "get",
    config: {
      headers: {
        Authorization: `Bearer ${jwt_token}`,
        "x-custom-header": "foo-bar",
      },
      query: {
        id: localStorage.getItem("userid"),
        pagination: {
          page: current,
          pageSize: pageSize,
        },
      },
    },
  });
  useEffect(() => {
    if (data?.length > 1) {
      const newList = [...data, ...response?.data?.data];
      const uniqueList = Array.from(new Set(newList.map(item => item.id)))
      .map(id => newList.find(item => item.id === id)); 
      setData(uniqueList);
    } else {
      setData(response?.data?.data);
    }
  }, [response, isFetching]);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (scrollTop + windowHeight >= documentHeight) {
        setCurrent(current + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // Clean up the event listener
    };
  }, []);
  const handleAcceptIgnore = async (index, id, action) => {
    setData((prevData) => prevData.filter((_, i) => i !== index));
    await fetch(`${API_URL}/api/custom-remove-request/${id}/userid/${userid}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt-token")}`, // Include the token in the Authorization header
      },
    });
    if (action === "Accept") {
      await fetch(
        `${API_URL}/api/custom-update-connections/${id}/userid/${userid}`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt-token")}`, // Include the token in the Authorization header
          },
        }
      ).then(() => {
        console.log("successfully done");
      });
    }
  };
  if (isFetching) {
    return <div style={{width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}><LoadingOutlined/></div>;
  }
  return (
    <div>
      {data?.map((record, index) => {
        if ("val" in record) {
          return;
        }
        const pic = record?.Pictures;
        let photos = null;
        if (pic) {
          photos = pic?.replace(/[\[\]']/g, "").split(", ");
        }
        return (
          <Card style={{ marginTop: "0.5rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "6rem",
                  height: "6rem",
                  overflow: "hidden",
                  borderRadius: "20%",
                  cursor: "pointer"
                }}
                onClick={() => navigate(`/profile/${record?.id}`)}
              >
                <img style={{ width: "6rem" }} src={photos} alt="image"></img>
              </div>
              <div style={{ width: "30%" }}>
                <p>
                  Name: {record?.FirstName} {record?.LastName}
                </p>
                <p>Height: {record?.Height}</p>
              </div>
              <div style={{ width: "30%" }}>
                <p>Age: {calculateAge(record?.DOB)}</p>
                <p>State: {record?.State}</p>
              </div>
              <div>
                <Button
                  style={{ backgroundColor: "green", color: "white" }}
                  onClick={() =>
                    handleAcceptIgnore(index, record?.id, "Accept")
                  }
                >
                  Accept
                </Button>{" "}
                <Button
                  onClick={() =>
                    handleAcceptIgnore(index, record?.id, "Ignore")
                  }
                >
                  Ignore
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default Requests;
