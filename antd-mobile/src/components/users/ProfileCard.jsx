// import React, { useEffect, useState } from "react";
// import { List, InfiniteScroll, SearchBar, Grid } from "antd-mobile";
// import { getPaginatedUsers } from "../../services/api"; // Import API function
// import {
//   Card,
//   Button,
//   Checkbox,
//   Image,
//   Radio,
//   Space,
//   Tag,
//   Divider,
// } from "antd-mobile";
// import { HeartFill, ClockCircleFill, CheckShieldFill } from "antd-mobile-icons";
// import { ProfileDetailPanel } from "./ProfileDetailPanel";

// export default function ProfileCard({ user }) {
//   const [selectedProfile, setSelectedProfile] = useState(null);
//   const [visible, setVisible] = useState(false);
//   const fieldPairs = [
//     [
//       { label: "First Name", value: user.FirstName },
//       { label: "Last Name", value: user.LastName },
//     ],
//     [
//       { label: "Father's Name", value: user.FatherName },
//       { label: "Age", value: user.age },
//     ],
//     [
//       { label: "Marital Status", value: user.maritalStatus },
//       { label: "Education", value: user.education || "N/A" }, // Example additional field
//     ],
//     // Add more pairs as needed
//   ];
//   const [response, setResponse] = React.useState("accept"); // 'accept' or 'decline'

//   return (
//     <div>
//       <Card
//         title={`ProfileId:${user.id}`}
//         style={{
//           width: "100%",
//           maxWidth: "400px",
//           borderRadius: "12px",
//           overflow: "hidden",
//           margin: "0 auto",
//           boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//         }}
//       >
//         <div style={{ display: "flex", padding: "16px" }}>
//           {/* Profile Image (Left Side) */}
//           <Image
//             src="https://example.com/profile-image.jpg" // Replace with your image URL
//             width={80}
//             height={80}
//             style={{
//               borderRadius: "40px",
//               objectFit: "cover",
//               marginRight: "16px",
//             }}
//           />

//           {/* Profile Details (Right Side) */}
//           <div style={{ flex: 1 }}>
//             <Space block justify="between" align="center">
//               <Grid columns={2} gap={8}>
//                 {fieldPairs.flatMap((pair) =>
//                   pair.map((field, idx) => (
//                     <Grid.Item key={`${field.label}-${idx}`}>
//                       <div
//                         style={{
//                           display: "flex",
//                           flexDirection: "column",
//                           padding: "8px",
//                           borderBottom: "1px solid #f0f0f0",
//                         }}
//                       >
//                         <div
//                           style={{
//                             fontWeight: "500",
//                             fontSize: "12px",
//                             color: "#666",
//                             marginBottom: "4px",
//                           }}
//                         >
//                           {field.label}
//                         </div>
//                         <div style={{ fontSize: "14px" }}>
//                           {field.value || "N/A"}
//                         </div>
//                       </div>
//                     </Grid.Item>
//                   ))
//                 )}
//               </Grid>

//               <h5 style={{ margin: 0, fontSize: "20px" }}>
//                 {user.FirstName}-
//                 {user.FatherName ? user.FatherName : user.LastName}
//                 {user.FatherName}
//               </h5>

//               <Tag
//                 color="danger"
//                 fill="outline"
//                 style={{ "--text-color": "var(--adm-color-danger)" }}
//               >
//                 <HeartFill color="var(--adm-color-danger)" /> Liked
//               </Tag>
//             </Space>
//             <Space>
//               <h6>Gotra:{user.Gotra}</h6>
//             </Space>
//             <p
//               style={{
//                 margin: "8px 0 0",
//                 color: "var(--adm-color-weak)",
//                 fontSize: "14px",
//               }}
//             >
//               {user.age} yrs, {user.Height} - {user.HighestDegree}-{" "}
//               {user.marital} - Mysuru
//             </p>
//             {selectedProfile && (
//               <ProfileDetailPanel
//                 profile={selectedProfile}
//                 visible={visible}
//                 onClose={() => setSelectedProfile(null)}
//               />
//             )}

//             <div
//               key={user.id}
//               onClick={() => {
//                 setVisible(true);
//                 setSelectedProfile(user);
//               }}
//             >
//               {/* Profile list item */}

//               {/* <Tag color="success" fill="outline" onClick={()=>{
//                 setSelectedProfile()
//                }}> Detail</Tag> */}
//               <Tag
//                 color="success"
//                 fill="outline"
//                 style={{
//                   marginTop: "8px",
//                   "--text-color": "var(--adm-color-success)",
//                   fontSize: "12px",
//                 }}
//               >
//                 <CheckShieldFill style={{ marginRight: "4px" }} />
//                 Verified Profile
//               </Tag>
//             </div>
//           </div>
//         </div>

//         <Divider style={{ margin: "0 16px" }} />

//         {/* Interest Notification */}
//         <div
//           style={{
//             backgroundColor: "#fff8e6",
//             padding: "12px 16px",
//             margin: "0 16px",
//             borderRadius: "8px",
//           }}
//         >
//           <Space block justify="between" align="center">
//             <Tag
//               color="warning"
//               fill="outline"
//               style={{
//                 "--text-color": "var(--adm-color-warning)",
//                 fontSize: "12px",
//               }}
//             >
//               <ClockCircleFill style={{ marginRight: "4px" }} />
//               Expires in 12 days
//             </Tag>
//           </Space>
//         </div>

//         {/* Action Section */}
//         <div style={{ padding: "16px" }}>
//           <p
//             style={{
//               margin: "8px 0 16px",
//               color: "var(--adm-color-weak)",
//               fontSize: "14px",
//             }}
//           >
//             Accept her interest to communicate further
//           </p>

//           <Radio.Group
//             value={response}
//             onChange={(val) => setResponse(val)}
//             style={{ "--gap": "16px" }}
//           >
//             <Space direction="vertical" block>
//               <Radio
//                 value="accept"
//                 style={{
//                   "--icon-size": "18px",
//                   "--font-size": "14px",
//                   "--gap": "8px",
//                 }}
//               >
//                 Accept
//               </Radio>
//               <Radio
//                 value="decline"
//                 style={{
//                   "--icon-size": "18px",
//                   "--font-size": "14px",
//                   "--gap": "8px",
//                 }}
//               >
//                 Decline
//               </Radio>
//             </Space>
//           </Radio.Group>

//           <Button
//             color="primary"
//             block
//             size="large"
//             shape="rounded"
//             style={{
//               marginTop: "24px",
//               "--border-radius": "8px",
//               fontWeight: "500",
//             }}
//             onClick={() => console.log("Selected:", response)}
//           >
//             Submit Response
//           </Button>
//         </div>
//       </Card>
//     </div>
//   );
// }
