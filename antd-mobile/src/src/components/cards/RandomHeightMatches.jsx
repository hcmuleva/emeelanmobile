import React, { useMemo } from "react";
import { Card, Image } from "antd-mobile";

const RandomHeightMatches = ({ matches }) => {
  // This function distributes matches into two columns with random heights
  const getRandomProfileGrid = useMemo(() => {
    // Ensure we have matches data
    if (!matches || matches.length === 0) return null;

    // Split matches into two columns (odd indices to left column, even to right)
    const leftColumnMatches = [];
    const rightColumnMatches = [];

    matches.forEach((match, index) => {
      // Generate a random height for each match
      const randomHeight = Math.floor(Math.random() * 100) + 120; // 120-220px
      const matchWithHeight = {
        ...match,
        id: match.id || `match-${index}-${Date.now()}`, // Use existing ID or generate random one
        height: randomHeight,
      };

      // Distribute matches evenly between the two columns
      if (index % 2 === 0) {
        leftColumnMatches.push(matchWithHeight);
      } else {
        rightColumnMatches.push(matchWithHeight);
      }
    });

    return {
      leftColumnMatches,
      rightColumnMatches,
    };
  }, [matches]);

  // If we don't have proper matches data
  if (!getRandomProfileGrid) return null;

  const renderMatchCard = (match) => (
    <div key={match.id} style={{ marginBottom: "2px", padding: "0px", margin:"0px" }}>
      <Card
        bodyStyle={{
          padding: 0,
          borderRadius: "12px",
          overflow: "hidden",
          margin: "0px",
          position: "relative",
        }}
      >
        <Image
          src={match.image}
          style={{
            width: "100%",
            height: `${match.height}px`,
            padding: "0",
            margin: "0",
          }}
          fit="cover"
        />
        <div
          style={{
            padding: "8px",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 2,
          }}
        >
          <div style={{ fontSize: "18px", fontWeight: "500", color: "white" }}>
            {match.name}, {match.age}
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div style={{ marginBottom: "16px" }}>
      <div
        style={{
          fontSize: "16px",
          fontWeight: "bold",
          color: "#D30000",
          marginBottom: "16px",
          marginLeft: "8px",
        }}
      >
        Your recent matches
      </div>

      <div style={{ display: "flex", }}>
        {/* Left column */}
        <div style={{ flex: "1", display: "flex", flexDirection: "column" }}>
          {getRandomProfileGrid.leftColumnMatches.map((match) =>
            renderMatchCard(match)
          )}
        </div>

        {/* Right column */}
        <div style={{ flex: "1", display: "flex", flexDirection: "column" }}>
          {getRandomProfileGrid.rightColumnMatches.map((match) =>
            renderMatchCard(match)
          )}
        </div>
      </div>
    </div>
  );
};

export default RandomHeightMatches;
