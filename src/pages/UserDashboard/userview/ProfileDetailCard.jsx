import { Card, Row, Col, Avatar, Typography, List, Button, notification } from "antd"
import { UserOutlined, HeartOutlined, EyeOutlined, TeamOutlined } from "@ant-design/icons"
import { useCreate, useOne } from "@refinedev/core"

const { Title, Text, Paragraph } = Typography
const API_URL = import.meta.env.VITE_SERVER_URL;

const ProfileDetailCard = ({profileData}) => {
  console.log("ProfileDetailCard",profileData)
  const { data, isLoading } = useOne({
    resource: "users",
    id: String(profileData.id),
    meta: {
      populate: ["profilePicture","photos"],
    },
  });

  const user = data?.data;
  if (isLoading) {
    return <p>Loading...</p>;
  }
  console.log("user",user)
  const handleCreateLike = async () => {
    console.log("handleCreateLike",profileData.id, " self user ", localStorage.getItem('userid'))
    const id = profileData.id;
    const userid = localStorage.getItem('userid');
    await fetch(
      `${API_URL}/api/custom-update-likes/${id}/userid/${userid}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt-token")}`, // Include the token in the Authorization header
        },
      }
    ).then(() => {
      notification.success({
        message: "Success",
        description: "Request sent successfully",
      });
      console.log("successfully done");
    });
  }
  console.log("ProfileDetailCard",profileData)

  return (
    <>
      <Row>
        {/* Left Column */}
        <Col
          xs={24}
          sm={8}
          style={{
            backgroundColor: "#e6eef7",
            padding: "1px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            size={150}
            src={user.photos?.[0]?.formats?.medium?.url || "/placeholder.svg?height=150&width=150"}
            style={{
              border: "4px solid white",
              marginBottom: "20px",
            }}
          />
          <h4>ProfileID: {user.id}</h4>
         

          <div style={{ width: "100%" }}>
            <Title level={4} style={{ display: "flex", alignItems: "center" }}>
              <EyeOutlined style={{ marginRight: 8 }} /> OVERVIEW
            </Title>
            <Paragraph>
              <Text strong>Working as</Text>: {user.professionjson?.profession?.[1]?.designation || "N/A"} at{" "}
              {user.professionjson?.profession?.[1]?.organization || "N/A"}
              <br />
              <Text strong>Annual-Income</Text>: {user.professionjson?.profession?.[1]?.salary || "N/A"}
              <br />
              <Text strong>Highest-Degree</Text>: {user.professionjson?.profession?.[0]?.educationDescription || "N/A"},{" "}
              {user.professionjson?.profession?.[0]?.passingYear || "N/A"}
              <br />
              <Text strong>Diet</Text>: {user.professionjson?.aboutMe?.diet || "N/A"}
              <br />
              <Text strong>Skin</Text>: {user.professionjson?.aboutMe?.complexion || "N/A"}
              <br />
              <Text strong>Drink</Text>: {user.professionjson?.aboutMe?.drink || "Never"}
              <br />
              <Text strong>Personality</Text>: {user.professionjson?.aboutMe?.personality || "Simple"}
            </Paragraph>

            <Title level={4} style={{ display: "flex", alignItems: "center", marginTop: 30 }}>
              <HeartOutlined style={{ marginRight: 8 }} /> EXPECTATIONS
            </Title>
            <Paragraph>
              {user.professionjson?.mychoice?.preference ||
                "Looking for a kind-hearted, understanding partner who enjoys family values and traditions."}
            </Paragraph>

            <Title level={4} style={{ marginTop: 30 }}>
              <span style={{ display: "flex", alignItems: "center" }}>
                <span style={{ marginRight: 8 }}>🕉️</span> BELIEFS
              </span>
            </Title>
            <List
              itemLayout="horizontal"
              dataSource={[
                `Hindu`,
                `Caste: ${user.professionjson?.aboutMe?.caste || "N/A"}`,
                `Gotra: ${user.Gotra || "N/A"}`,
                `Subcaste: ${user.professionjson?.aboutMe?.subcaste || "N/A"}`,
                `Blood Group: ${user.professionjson?.aboutMe?.bloodGroup || "N/A"}`,
              ]}
              renderItem={(item) => <List.Item style={{ padding: "4px 0", border: "none" }}>• {item}</List.Item>}
            />
          </div>
        </Col>

        {/* Right Column */}
        <Col xs={24} sm={16}>
          {/* Header */}
          <div style={{ backgroundColor: "#e9a84c", padding: "20px", color: "#333" }}>
            <Title level={2} style={{ margin: 0, color: "#333" }}>
              {user.FirstName || "N/A"} {user.LastName || ""}
            </Title>
            <Paragraph style={{ margin: 0, fontSize: 16 }}>
              D.O.B: {user.DOB || "N/A"}, Time: {user.professionjson?.aboutMe?.timeofbirth || "N/A"}
              <br />
              Height: {user.professionjson?.aboutMe?.height || "N/A"}
              <br />
              Contact: {user.MobileNumber || "N/A"}
              <br />
              Place-of-Birth: {user.professionjson?.aboutMe?.birthplace || "N/A"}
              <br />
              Mother Tongue: {user.professionjson?.aboutMe?.othertongue || "N/A"}
            </Paragraph>
          </div>

          {/* About Section */}
          <div style={{ padding: "20px" }}>
            <Title level={4} style={{ display: "flex", alignItems: "center" }}>
              <UserOutlined style={{ marginRight: 8 }} /> ABOUT MYSELF
            </Title>
            <Paragraph>{user.professionjson?.aboutMe?.aboutMe || "N/A"}</Paragraph>

            <Title level={4} style={{ display: "flex", alignItems: "center", marginTop: 30 }}>
              <TeamOutlined style={{ marginRight: 8 }} /> FAMILY DETAILS
            </Title>
            <List
              itemLayout="horizontal"
              dataSource={user.professionjson?.family?.map(
                (member) =>
                  `${member.type}: ${member.firstName || "N/A"} ${member.lastName || ""}, ${member.profession || "N/A"}`
              )}
              renderItem={(item) => <List.Item style={{ padding: "4px 0", border: "none" }}>• {item}</List.Item>}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Button onClick={handleCreateLike}>Like</Button>
        </Row>
      </>
    
  )
}

export default ProfileDetailCard

