

    import React from "react";
    import { Card, Grid, Avatar } from "antd-mobile";
    export default function Hompage() { 
    // Sample Data
    const spaces = [
      { name: "Product Management", members: 3 },
      { name: "IT", members: 3 },
      { name: "Sales", members: 1 },
      { name: "Internal KB", members: 1 },
      { name: "API Docs", members: 1 },
      { name: "Marketing", members: 1 },
    ];
    
    // Function to get initials
    const getInitials = (name) => {
      return name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase();
    };
   
      return (
        <div style={{ padding: "16px" }}>
          <h3>Spaces you belong to</h3>
          <Grid columns={3} gap={12}>
            {spaces.map((space, index) => (
              <Grid.Item key={index}>
                <Card style={{ textAlign: "center", borderRadius: "10px" }}>
                  <Avatar
                    style={{
                      backgroundColor: "#1677ff",
                      color: "#fff",
                      fontSize: "18px",
                      "--size": "40px",
                      margin: "10px auto",
                    }}
                  >
                    {getInitials(space.name)}
                  </Avatar>
                  <div style={{ fontWeight: "bold" }}>{space.name}</div>
                  <div style={{ color: "gray", fontSize: "14px" }}>
                    {space.members} {space.members > 1 ? "members" : "member"}
                  </div>
                </Card>
              </Grid.Item>
            ))}
          </Grid>
        </div>
      );
    };