import { Card, Row, Col, Avatar, Typography, List } from "antd"
import { UserOutlined, HeartOutlined, EyeOutlined, TeamOutlined } from "@ant-design/icons"

const { Title, Text, Paragraph } = Typography

const ProfileDetailCard = () => {
  return (
    <Card
      bordered={false}
      style={{
        maxWidth: 1000,
        margin: "0 auto",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Row>
        {/* Left Column */}
        <Col
          xs={24}
          sm={8}
          style={{
            backgroundColor: "#e6eef7",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            size={150}
            src="/placeholder.svg?height=150&width=150"
            style={{
              border: "4px solid white",
              marginBottom: "20px",
            }}
          />

          <div style={{ width: "100%" }}>
            <Title level={4} style={{ display: "flex", alignItems: "center" }}>
              <EyeOutlined style={{ marginRight: 8 }} /> OVERVIEW
            </Title>
            <Paragraph>
              <Text strong>Working as</Text>: Neuro Surgeon at AIIMS, New Delhi
              <br />
              <Text strong>Annual-Income</Text>: 20LPA
              <br />
              <Text strong>Highest-Degree</Text>: Master Of Business Administration, 2020
              <br />
              <Text strong>Diet</Text>: Vegetarian
              <br />
              <Text strong>Skin</Text>: Fair
              <br />
              <Text strong>Drink</Text>: Never
              <br />
              <Text strong>Personality</Text>: Simple
            </Paragraph>

            <Title level={4} style={{ display: "flex", alignItems: "center", marginTop: 30 }}>
              <HeartOutlined style={{ marginRight: 8 }} /> EXPECTATIONS
            </Title>
            <Paragraph>
              I am looking for a soulmate, who is understanding, down to earth, lives and enjoys every moment of life.
              The girl should have strong inclination for values & morals.
            </Paragraph>

            <Title level={4} style={{ marginTop: 30 }}>
              <span style={{ display: "flex", alignItems: "center" }}>
                <span style={{ marginRight: 8 }}>🕉️</span> BELIEFS
              </span>
            </Title>
            <List
              itemLayout="horizontal"
              dataSource={["Hindu", "Caste: Brahmin", "Gotra: Marwadi", "Rashi: Dhanu (Sagittarius)", "Manglik: No"]}
              renderItem={(item) => <List.Item style={{ padding: "4px 0", border: "none" }}>• {item}</List.Item>}
            />
          </div>
        </Col>

        {/* Right Column */}
        <Col xs={24} sm={16}>
          {/* Header */}
          <div style={{ backgroundColor: "#e9a84c", padding: "20px", color: "#333" }}>
            <Title level={2} style={{ margin: 0, color: "#333" }}>
              NIKHIL DESHMUKH
            </Title>
            <Paragraph style={{ margin: 0, fontSize: 16 }}>
              D.O.B: 16/02/199X, Time: 10:40PM
              <br />
              Height: 5 feet 10 inch
              <br />
              Contact: 630088XXA23
              <br />
              Place-of-Birth: Pune, Maharashtra
              <br />
              Mother Tongue: Marathi
            </Paragraph>
          </div>

          {/* About Section */}
          <div style={{ padding: "20px" }}>
            <Title level={4} style={{ display: "flex", alignItems: "center" }}>
              <UserOutlined style={{ marginRight: 8 }} /> ABOUT MYSELF
            </Title>
            <Paragraph>
              I belong to a well-mannered middle-class Brahmin family and strongly consider Hindu culture, rituals &
              holds an open-minded personality. I'm a pure vegetarian and never not drank or smoked. I'm Affectionate,
              kind-hearted, Caring, Happy & belives in Hard Working and creativity. My hobbies are playing cricket,
              Watch Online Documentaries and Learn New Things.
            </Paragraph>

            <Title level={4} style={{ display: "flex", alignItems: "center", marginTop: 30 }}>
              <TeamOutlined style={{ marginRight: 8 }} /> FAMILY DETAILS
            </Title>
            <List
              itemLayout="horizontal"
              dataSource={[
                "Father: Avinash Deshmukh, Textile business",
                "Mother: Arti Deshmukh, Homemaker",
                "Family-lives-in: Pune, Maharastra",
                "Family-Type: Nuclear Family",
                "Siblings: 2",
                "Younger Sister: Studying B.Tech from KIIT, Bhubaneswar",
              ]}
              renderItem={(item) => <List.Item style={{ padding: "4px 0", border: "none" }}>• {item}</List.Item>}
            />
          </div>
        </Col>
      </Row>
    </Card>
  )
}

export default ProfileDetailCard

