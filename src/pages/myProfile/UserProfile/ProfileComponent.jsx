

import React, { useState ,useRef} from "react"
import { Avatar, Typography, Tabs, Card, Button, Descriptions, Space, Layout, theme } from "antd"
import { ArrowLeftOutlined, EditOutlined, LeftOutlined, RightOutlined, LogoutOutlined } from "@ant-design/icons"

const { Title, Text } = Typography
const { Content } = Layout


const users= [
  { name: "Isaiah", avatar: "/placeholder.svg?height=80&width=80" },
  { name: "Jayden", avatar: "/placeholder.svg?height=80&width=80" },
  { name: "Hunter", avatar: "/placeholder.svg?height=80&width=80" },
  { name: "Ethel", avatar: "/placeholder.svg?height=80&width=80" },
  { name: "Kate", avatar: "/placeholder.svg?height=80&width=80" },
  { name: "Michael", avatar: "/placeholder.svg?height=80&width=80" },
  { name: "Sarah", avatar: "/placeholder.svg?height=80&width=80" },
]

export default function ProfileComponent({userid}) {
  
    const { data, isLoading } = useOne({
        resource: "users",
        id: String(userid),
        meta: {
          populate: ["profilePicture"],
        },
      });
    
      const user = data?.data;
    
      if (isLoading) {
        return <p>Loading...</p>;
      }
      
  const { token } = theme.useToken()
  const [activeTab, setActiveTab] = useState("1")
  const [requestTab, setRequestTab] = useState("myrequest")
  const scrollContainerRef1 = useRef(null);
  const scrollContainerRef2 = useRef(null);

  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 200, behavior: "smooth" })
    }
  }

  const containerStyle = {
    maxWidth: "480px",
    margin: "0 auto",
    background: token.colorBgLayout,
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  }

  const headerStyle = {
    padding: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: token.colorBgContainer,
  }

  const profileStyle = {
    display: "flex",
    alignItems: "center",
    padding: "0 24px 24px",
    background: token.colorBgContainer,
  }

  const sectionStyle = {
    padding: "16px",
    background: token.colorBgContainer,
    marginTop: "8px",
  }

  const scrollContainerStyle = {
    display: "flex",
    overflowX: "auto",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    padding: "0 30px",
  }

  const userItemStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 10px",
    minWidth: "70px",
  }

  const navButtonStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 1,
  }

  const tabsContainerStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    marginTop: "8px",
  }

  const tabContentStyle = {
    flex: 1,
    padding: "16px",
    background: "#f0f8ff",
  }

  const logoutContainerStyle = {
    padding: "16px",
    textAlign: "center",
    background: token.colorBgContainer,
  }
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: '1',
      label: 'Tab 1',
      children: 'Content of Tab Pane 1',
    },
    {
      key: '2',
      label: 'Tab 2',
      children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: 'Tab 3',
      children: 'Content of Tab Pane 3',
    },
  ];
  const [mainImage, setMainImage] = useState("/placeholder.svg?height=100&width=100");

  const thumbnails = [
    "/placeholder.svg?height=100&width=100",
    "/placeholder.svg?height=100&width=100&1",
    "/placeholder.svg?height=100&width=100&2",
    "/placeholder.svg?height=100&width=100&3"
  ];
  return (
    <div style={containerStyle}>
      {/* Header with back and edit buttons */}
      <div style={headerStyle}>
        <Button type="text" icon={<ArrowLeftOutlined style={{ color: "#1e3a8a", fontSize: "20px" }} />} />
        <Button type="text" icon={<EditOutlined style={{ color: "#1e3a8a", fontSize: "20px" }} />} />
      </div>

      {/* Profile Section */}
      <div style={{ textAlign: "center", padding: "20px" }}>
      {/* Main Profile Image */}
      <Avatar size={100} src={mainImage} />
      
      {/* Name and Title */}
      <div style={{ marginTop: "10px" }}>
        <Title level={3} style={{ fontSize: "14px", margin: 0, color: "#1e3a8a" }}>
          Harish Muleva
        </Title>
        <Text type="secondary" style={{ fontSize: "12px" }}>
          Software Engineer
        </Text>
      </div>
      
      {/* Thumbnail List */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", gap: "10px" }}>
        {thumbnails.map((thumb, index) => (
          <Avatar
            key={index}
            size={50}
            src={thumb}
            onClick={() => setMainImage(thumb)}
            style={{ cursor: "pointer", border: mainImage === thumb ? "2px solid #1e3a8a" : "none" }}
          />
        ))}
      </div>
    </div>
  

    <div style={tabsContainerStyle}>
        <Tabs
          activeKey={requestTab}
          onChange={setRequestTab}
          centered
          size="small"
          style={{ background: "#e6eeff" }}
          items={[
            { key: "myrequest", label: "MyRequest"  },
            { key: "requesttome", label: "RequestToMe" },
          
          ]}
        />

        <div style={tabContentStyle}>
          {requestTab === "myrequest" && (
            <div style={{ position: "relative" }}>
            <Button
              icon={<LeftOutlined />}
              style={{ ...navButtonStyle, left: 0 }}
              onClick={() => scrollLeft(scrollContainerRef2)}
            />
            <div ref={scrollContainerRef2} style={scrollContainerStyle}>
              {users.map((user, index) => (
                <div key={index} style={userItemStyle}>
                  <Avatar size={60} src={user.avatar} />
                  <Text style={{ marginTop: "8px" }}>{user.name}</Text>
                </div>
              ))}
            </div>
            <Button
              icon={<RightOutlined />}
              style={{ ...navButtonStyle, right: 0 }}
              onClick={() => scrollRight(scrollContainerRef2)}
            />
          </div>
          )}

          {requestTab === "requesttome" && (
           <div style={{ position: "relative" }}>
           <Button
             icon={<LeftOutlined />}
             style={{ ...navButtonStyle, left: 0 }}
             onClick={() => scrollLeft(scrollContainerRef2)}
           />
           <div ref={scrollContainerRef2} style={scrollContainerStyle}>
             {users.map((user, index) => (
               <div key={index} style={userItemStyle}>
                 <Avatar size={60} src={user.avatar} />
                 <Text style={{ marginTop: "8px" }}>{user.name}</Text>
               </div>
             ))}
           </div>
           <Button
             icon={<RightOutlined />}
             style={{ ...navButtonStyle, right: 0 }}
             onClick={() => scrollRight(scrollContainerRef2)}
           />
         </div>
          )}

         
        </div>
      </div>


     

     

            

      {/* Tabs Section */}
      <div style={tabsContainerStyle}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          centered
          size="small"
          style={{ background: "#e6eeff" }}
          items={[
            { key: "1", label: "Personal"  },
            { key: "2", label: "Family" },
            { key: "3", label: "Profession" },
            { key: "4", label: "Profiles" },
            { key: "5", label: "Settings" },
          ]}
        />

        <div style={tabContentStyle}>
          {activeTab === "1" && (
           <Descriptions bordered column={1} size="small" labelStyle={{ fontWeight: "bold" }}>
           <Descriptions.Item label="Date Of Birth">24-08-2000</Descriptions.Item>
           <Descriptions.Item label="Height">5.5</Descriptions.Item>
           <Descriptions.Item label="Weight">57</Descriptions.Item>
           <Descriptions.Item label="Religion">Hindu Leuva Patel</Descriptions.Item>
           <Descriptions.Item label="Native Place">Sanosara</Descriptions.Item>
           <Descriptions.Item label="District">Bhavnagar</Descriptions.Item>
           <Descriptions.Item label="Blood Group">B+</Descriptions.Item>
           <Descriptions.Item label="Address">123 Main Street, [City, State], [Zip Code]</Descriptions.Item>
         </Descriptions>
          )}

          {activeTab === "2" && (
            <Descriptions bordered column={1} size="small" labelStyle={{ fontWeight: "bold" }}>
            <Descriptions.Item label="Father's Name">John Phillips</Descriptions.Item>
            <Descriptions.Item label="Mother's Name">Mary Phillips</Descriptions.Item>
            <Descriptions.Item label="Siblings">2</Descriptions.Item>
            <Descriptions.Item label="Marital Status">Single</Descriptions.Item>
            <Descriptions.Item label="Family Type">Nuclear</Descriptions.Item>
            <Descriptions.Item label="Family Values">Modern</Descriptions.Item>
          </Descriptions>
          )}

          {activeTab === "3" && (
           <Descriptions bordered column={1} size="small" labelStyle={{ fontWeight: "bold" }}>
           <Descriptions.Item label="Occupation">Fashion Model</Descriptions.Item>
           <Descriptions.Item label="Experience">5 years</Descriptions.Item>
           <Descriptions.Item label="Company">Elite Models</Descriptions.Item>
           <Descriptions.Item label="Annual Income">$120,000</Descriptions.Item>
           <Descriptions.Item label="Education">Bachelor in Fashion Design</Descriptions.Item>
           <Descriptions.Item label="Skills">Runway, Photoshoot, Commercial</Descriptions.Item>
         </Descriptions>
          )}

          {activeTab === "4" && (
           <Descriptions bordered column={1} size="small" labelStyle={{ fontWeight: "bold" }}>
           <Descriptions.Item label="Instagram">@emma_phillips</Descriptions.Item>
           <Descriptions.Item label="Twitter">@emmaP_model</Descriptions.Item>
           <Descriptions.Item label="LinkedIn">linkedin.com/in/emmaphillips</Descriptions.Item>
           <Descriptions.Item label="Portfolio">emmaphillips.portfolio.com</Descriptions.Item>
           <Descriptions.Item label="Followers">245K</Descriptions.Item>
         </Descriptions>
          )}

          {activeTab === "5" && (
            <Space direction="vertical" style={{ width: "100%" }}>
            <Button block>Change Password</Button>
            <Button block>Privacy Settings</Button>
            <Button block>Notification Preferences</Button>
            <Button block>Language Settings</Button>
            <Button block>Connected Accounts</Button>
          </Space>
          )}
        </div>
      </div>

      {/* Logout Button */}
      <div style={logoutContainerStyle}>
        <Button type="text" danger icon={<LogoutOutlined />} style={{ fontSize: "16px" }}>
          Log out
        </Button>
      </div>
    </div>
  )
}

