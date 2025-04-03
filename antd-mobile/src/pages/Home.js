import React from "react";
import { Card, Button, Grid, Tag, Avatar, Tabs ,ScrollView} from "antd-mobile";
import { BellOutline, UserOutline,ArrowDownCircleOutline } from "antd-mobile-icons";
import MyLanguageComponent from "./MyLanguageComponent";
import FeatureTiles from "./homepage/FeatureTiles";



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
    { name: "Divya", age: 26, height: "5'4\"", image: "https://via.placeholder.com/70" },
    { name: "Anjali", age: 26, height: "5'4\"", image: "https://via.placeholder.com/70" },
    { name: "Radhika", age: 26, height: "5'4\"", image: "https://via.placeholder.com/70" },
    { name: "Priya", age: 24, height: "5'6\"", image: "https://via.placeholder.com/70" },
    { name: "Maya", age: 28, height: "5'5\"", image: "https://via.placeholder.com/70" },
    { name: "Sita", age: 30, height: "5'7\"", image: "https://via.placeholder.com/70" },
  
];

const Home = () => {
    const userdata = JSON.parse(localStorage.getItem('user'))
    const accepted = userdata?.accepted??0;
    const acceptedbyme = userdata?.acceptedbyme??0
    const rejected = userdata?.rejected??0
    const rejectedbyme = userdata?.rejectedbyme??0

    return (
        <FeatureTiles/>
    //     <div style={{ padding: "10px" }}>
    //         <MyLanguageComponent/>
    //         {/* Profile Header */}
    //         {/* <Card>
    //             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
    //                 <div style={{ display: "flex", alignItems: "center" }}>
    //                     <Avatar src={user.profilePic} style={{ marginRight: "10px" }} />
    //                     <div>
    //                         <strong>{user.name}</strong>
    //                         {user.premium && <Tag color="warning" style={{ marginLeft: "5px" }}>Premium Member</Tag>}
    //                     </div>
    //                 </div>
    //                 <BellOutline style={{ fontSize: "24px" }} />
    //             </div>
    //         </Card>

    //         {/* Horoscope & Biodata */}
    //         {/* <Card style={{ marginTop: "10px" }}>
    //             <Button block color="primary">Generate Horoscope</Button>
    //         </Card>
    //         <Card style={{ marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
    //             <span>Download & share your biodata</span>
    //             <Button shape="rounded" color="primary" icon={<ArrowDownCircleOutline />}>Download</Button>
    //         </Card>  */}

    //         {/* Journey Summary */}
           
    //         <Grid columns={4} gap={8}>
    //         <Card key={"accepted"} style={{ textAlign: "center" }}>
    //                     <strong>Accepted</strong>
    //                     <p>{accepted}</p>
                       
    //                 </Card>
    //                 <Card key={"rejected"} style={{ textAlign: "center" }}>
    //                     <strong>Rejected</strong>
    //                     <p>{rejected}</p>
    //                 </Card>
    //                 <Card key={"MyAccepted"} style={{ textAlign: "center" }}>
    //                     <strong>MyAccepted</strong>
    //                     <p>{acceptedbyme}</p>
    //                 </Card>
    //                 <Card key={"MyRejected"} style={{ textAlign: "center" }}>
    //                     <strong>MyRejected</strong>
    //                     <p>{rejectedbyme}</p>
    //                 </Card>

    //         </Grid>

    //         {/* Daily Recommendations */}
    //         <h3>Pending Request</h3>
            
    //         <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', padding: '10px 0' }}>
    //   {recommendations.map((item, index) => (
    //     <div key={index} style={{ display: 'inline-block', marginRight: '10px' }}>
    //       <Card
    //         style={{ width: '100px', textAlign: 'center', padding: '10px' }}
    //         cover={<img src={item.image} alt={item.name} />}
    //       >
    //         <div>
    //           <h4>{item.name}</h4>
    //           <p>{item.age} years</p>
    //           <p>{item.height}</p>
    //         </div>
    //       </Card>
    //     </div>
    //   ))}
    // </div>
    //         <FeatureTiles/>

    //         {/* <Grid columns={3} gap={8}>
    //             {recommendations.map((rec, index) => (
    //                 <Card key={index}>
    //                     <Avatar src={rec.image} style={{ width: "70px", height: "70px" }} />
    //                     <p>{rec.name}</p>
    //                     <small>{rec.age} Yrs, {rec.height}</small>
    //                 </Card>
    //             ))}
    //         </Grid> */}

    //         {/* Countdown Timer Placeholder */}
    //         {/* <p style={{ textAlign: "center", color: "red", marginTop: "10px" }}>Time left to view your daily matches - 10:23:13</p> */}
    //     </div>
    );
};

export default Home;
