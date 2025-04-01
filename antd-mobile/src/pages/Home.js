import React from "react";
import { Card, Button, Grid, Tag, Avatar, Tabs } from "antd-mobile";
import { BellOutline, UserOutline,ArrowDownCircleOutline } from "antd-mobile-icons";

const user = {
    name: "Rahul",
    premium: true,
    profilePic: "https://via.placeholder.com/50", // Replace with actual image
};

const journeyStats = [
    { label: "Acceptances received", count: 45, new: 16 },
    { label: "Interests received", count: 56, new: 16 },
    { label: "Shortlisted you", count: 1, new: 1 },
    { label: "Viewed you", count: 999, new: 16 },
];

const recommendations = [
    { name: "Divya", age: 26, height: "5'4\"", image: "https://via.placeholder.com/70" },
    { name: "Anjali", age: 26, height: "5'4\"", image: "https://via.placeholder.com/70" },
    { name: "Radhika", age: 26, height: "5'4\"", image: "https://via.placeholder.com/70" },
];

const Home = () => {
    return (
        <div style={{ padding: "10px" }}>
            {/* Profile Header */}
            <Card>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Avatar src={user.profilePic} style={{ marginRight: "10px" }} />
                        <div>
                            <strong>{user.name}</strong>
                            {user.premium && <Tag color="warning" style={{ marginLeft: "5px" }}>Premium Member</Tag>}
                        </div>
                    </div>
                    <BellOutline style={{ fontSize: "24px" }} />
                </div>
            </Card>

            {/* Horoscope & Biodata */}
            <Card style={{ marginTop: "10px" }}>
                <Button block color="primary">Generate Horoscope</Button>
            </Card>
            <Card style={{ marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span>Download & share your biodata</span>
                <Button shape="rounded" color="primary" icon={<ArrowDownCircleOutline />}>Download</Button>
            </Card>

            {/* Journey Summary */}
            <h3>Your journey so far</h3>
            <Grid columns={4} gap={8}>
                {journeyStats.map((item, index) => (
                    <Card key={index} style={{ textAlign: "center" }}>
                        <strong>{item.count}</strong>
                        <p>{item.label}</p>
                        {item.new > 0 && <Tag color="danger">{item.new} new</Tag>}
                    </Card>
                ))}
            </Grid>

            {/* Daily Recommendations */}
            <h3>Your daily recommendations</h3>
            <Grid columns={3} gap={8}>
                {recommendations.map((rec, index) => (
                    <Card key={index}>
                        <Avatar src={rec.image} style={{ width: "70px", height: "70px" }} />
                        <p>{rec.name}</p>
                        <small>{rec.age} Yrs, {rec.height}</small>
                    </Card>
                ))}
            </Grid>

            {/* Countdown Timer Placeholder */}
            <p style={{ textAlign: "center", color: "red", marginTop: "10px" }}>Time left to view your daily matches - 10:23:13</p>
        </div>
    );
};

export default Home;
