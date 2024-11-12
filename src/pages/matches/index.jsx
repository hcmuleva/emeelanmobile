import React, { useEffect, useState } from "react";
import Header from "./header/header";
import { Button, Card, Segmented, Spin, Tabs } from "antd";
import "../../styles/matches.css";
import { useCustom, useDelete, useUpdate } from "@refinedev/core";

import Requests from "./requests";
import Connections from "./connections";
import Likes from "./likes";
const API_URL = import.meta.env.VITE_SERVER_URL;

const MatchesPage = () => {
  const [tab, setTab] = useState(0);
  return (
    <div style={{ overflow: "hidden" }}>
      <Header></Header>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div style={{ width: "60%" }}>
          <div className="matches-tabs">
            <div
              className="matches-tabs-panel"
              style={
                tab === 0
                  ? {
                      backgroundColor: "red",
                      color: "white",
                      borderTopLeftRadius: "0.5rem",
                      borderTopRightRadius: "0.5rem",
                    }
                  : { color: "black" }
              }
              onClick={() => setTab(0)}
            >
              Requests
            </div>
            <div
              className="matches-tabs-panel"
              style={
                tab === 1
                  ? {
                      backgroundColor: "red",
                      color: "white",
                      borderTopLeftRadius: "0.5rem",
                      borderTopRightRadius: "0.5rem",
                    }
                  : { color: "black" }
              }
              onClick={() => setTab(1)}
            >
              Connections
            </div>
            <div
              className="matches-tabs-panel"
              style={
                tab === 2
                  ? {
                      backgroundColor: "red",
                      color: "white",
                      borderTopLeftRadius: "0.5rem",
                      borderTopRightRadius: "0.5rem",
                    }
                  : { color: "black" }
              }
              onClick={() => setTab(2)}
            >
              Likes
            </div>
          </div>
          <div style={{ marginTop: "1rem" }}>
            {tab == 0 && <Requests />}
            {tab == 1 && <Connections />}
            {tab == 2 && <Likes />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchesPage;
