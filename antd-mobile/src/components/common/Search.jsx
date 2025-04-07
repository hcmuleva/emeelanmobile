import React, { useState } from "react";
import { Tabs, List, Collapse, Button, Badge } from "antd-mobile";

const Search = () => {
  const [expanded, setExpanded] = useState(true);
  const [matches, setMatches] = useState(7654);

  const filters = [
    { label: "Age", value: "22 Yrs - 38 Yrs" },
    { label: "Height", value: "4’9” - 5’11”" },
    { label: "Profile Created By", value: "Self, Parents" },
    { label: "Marital Status", value: "Divorced" },
    { label: "Having Children", value: "Doesn't matter" },
    { label: "Mother Tongue", value: "Any" },
    { label: "Physical Status", value: "Any" },
  ];

  return (
    <div>
      {/* Tabs Section */}
      <Tabs defaultActiveKey="criteria">
        <Tabs.Tab title="By Criteria" key="criteria" />
        <Tabs.Tab title="By Profile ID" key="profileId" />
        <Tabs.Tab title={<Badge content={0}>Saved Search</Badge>} key="saved" />
      </Tabs>

      {/* Description */}
      <p style={{ padding: "12px", fontSize: "14px", color: "#666" }}>
        Search profiles using the below criteria
      </p>

      {/* Collapsible Filters */}
      <Collapse accordion activeKey={expanded ? "1" : null}>
        <Collapse.Panel key="1" title="Basic Details">
          <List>
            {filters.map((filter, index) => (
              <List.Item key={index} arrow="horizontal">
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                  <span style={{ fontWeight: "bold" }}>{filter.label}</span>
                  <span style={{ color: "#666" }}>{filter.value}</span>
                </div>
              </List.Item>
            ))}
          </List>
        </Collapse.Panel>
      </Collapse>

      {/* Expand / Collapse Button */}
      <div style={{ padding: "12px", textAlign: "right" }}>
        <span
          style={{ color: "#f60", cursor: "pointer" }}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "View less ▲" : "View more ▼"}
        </span>
      </div>

      {/* Matches Count & Search Button */}
      <div style={{ textAlign: "center", padding: "16px" }}>
        <p style={{ fontSize: "14px", color: "#666" }}>
          {matches} matches based on your preferences
        </p>
        <Button
          style={{
            background: "linear-gradient(90deg, #ff7e5f, #ff5f6d)",
            color: "#fff",
            borderRadius: "20px",
            padding: "10px 40px",
          }}
          size="large"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default Search;
