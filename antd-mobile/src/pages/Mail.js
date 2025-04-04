import React, { useRef } from "react";
import { Tabs, Badge, List, Avatar,Card,Space,Tag, Button, Swiper, Grid } from "antd-mobile";
import { MessageOutline, StarOutline,UserContactOutline ,EnvironmentOutline,HeartOutline} from "antd-mobile-icons";


const DatingProfileCard = () => {
  return (
    <div style={{
      width: '100%',
      maxWidth: '340px',
      margin: '0 auto',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5' // Main gray background
    }}>
      {/* Profile Image Section */}
      <div style={{
        height: '260px',
        background: 'linear-gradient(to bottom, #e8e8e8, #d8d8d8)', // Slightly darker gray gradient
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* ID Badge - Top Left */}
      
        
        {/* Dummy Profile Image */}
        <div style={{
          width: '140px',
          height: '140px',
          borderRadius: '50%',
          backgroundColor: '#c8c8c8', // Gray circle background
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          border: '3px solid #f0f0f0', // Light gray border
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
        }}>
          <img 
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
            alt="Profile" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.95)' // Slightly desaturate image to match gray theme
            }}
          />
        </div>
        <div style={{
        padding: '18px',
       // backgroundColor: '#f5f5f5'
      //  backgroundColor: '#c8c8c8',
      }}>
        <Space block justify='between' align='center' style={{ marginBottom: '12px' }}>
          <h2 style={{ 
            margin: 0, 
            fontSize: '22px', 
            color: '#333',
            fontWeight: '600'
          }}>
            Roopa
          </h2>
          <Tag style={{ 
            backgroundColor: '#e8e8e8', // Light gray tag
            color: '#555',
            borderRadius: '10px',
            padding: '4px 10px',
            fontSize: '13px',
            fontWeight: '500'
          }}>
            23 Yrs.
          </Tag>
        </Space>
        
        <div style={{ 
  display: 'flex',
  gap: '8px',
  marginBottom: '14px',
  flexWrap: 'nowrap', // Prevent wrapping
  overflowX: 'auto', // Enable horizontal scrolling if needed
  whiteSpace: 'nowrap' // Prevent text wrapping within tags
}}>
  <Tag 
    style={{ 
      borderRadius: '10px',
      padding: '5px 10px',
      fontSize: '12px',
      backgroundColor: '#e8e8e8',
      color: '#555',
      margin: 0,
      flexShrink: 0 // Prevent shrinking
    }}
  >
    5'10"
  </Tag>
  <Tag 
    style={{ 
      borderRadius: '10px',
      padding: '5px 10px',
      fontSize: '12px',
      backgroundColor: '#e8e8e8',
      color: '#555',
      margin: 0,
      flexShrink: 0 // Prevent shrinking
    }}
  >
    Software Engineer
  </Tag>
</div>
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '14px',
          color: '#555', // Darker gray text
          fontSize: '14px'
        }}>
          <EnvironmentOutline style={{ fontSize: '16px', color: '#777' }} />
          <span>Rakwil Haryana, India</span>
        </div>
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '20px',
          color: '#444',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          <StarOutline style={{ color: '#ff6b6b', fontSize: '16px' }} />
          <span>Married</span>
          <Tag 
    style={{ 
      borderRadius: '10px',
      padding: '5px 10px',
      fontSize: '12px',
      backgroundColor: '#e8e8e8',
      color: '#555',
      margin: 0,
      flexShrink: 0 // Prevent shrinking
    }}
  >
    5'10"
  </Tag>
        </div>
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '20px',
          color: '#444',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          <StarOutline style={{ color: '#ff6b6b', fontSize: '16px' }} />
          <span>ElArch Architect</span>
        </div>
        <div style={{ 
  display: 'flex',
  gap: '8px',
  marginBottom: '14px',
  flexWrap: 'nowrap', // Prevent wrapping
  overflowX: 'auto', // Enable horizontal scrolling if needed
  whiteSpace: 'nowrap' // Prevent text wrapping within tags
}}>
  <Tag 
    style={{ 
      borderRadius: '10px',
      padding: '5px 10px',
      fontSize: '12px',
      backgroundColor: '#e8e8e8',
      color: '#555',
      margin: 0,
      flexShrink: 0 // Prevent shrinking
    }}
  >
      <HeartOutline style={{ fontSize: '18px', color:'primary' }} />
   Accpet
  </Tag>
  <Tag 
    style={{ 
      borderRadius: '10px',
      padding: '5px 10px',
      fontSize: '12px',
      backgroundColor: '#e8e8e8',
      color: '#555',
      margin: 0,
      flexShrink: 0 // Prevent shrinking
    }}
  >
    Reject
  </Tag>
</div>
        {/* Like Button */}
      
      </div>
      </div>
      
      {/* Gray Card Content Section */}
      
    </div>
  );
};

const ProfileCard = ({ profile }) => {

  return (
    <div style={{
      width: '300px',
      marginRight: '16px',
      flexShrink: 0,
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
      padding: '16px',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0'
    }}>
      <Card
        title={
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            color: '#333',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            <UserContactOutline style={{ marginRight: '12px', color: '#1890ff' }} />
            <span>{profile.name}</span>
          </div>
        }
        style={{ 
          borderRadius: '8px',
          backgroundColor: 'rgba(255,255,255,0.8)'
        }}
      >
        {/* Card content remains the same as before */}
        {/* ... */}
      </Card>
    </div>
  );
};

const ProfileCarousel = () => {
  // Sample profile data
  const profiles = [
    {
      id: 1,
      name: 'ABHJEET RAJ',
      dob: '20-09-1992',
      time: '3:21 am',
      height: '6 feet 2 inch',
      weight: '80 kg',
      place: 'J.P. Nagar, Bangalore',
      contact: '+1 (548) 393-XX00',
      skin: 'Wheatish',
      about: "Reliable, trendy, smart and always smiling. Nature & Animal lover. Lived in different parts of India and appreciates all cultures.",
      // ... other fields
    },
    {
      id: 2,
      name: 'ANOTHER PROFILE',
      // ... other fields
    },
    // Add more profiles as needed
  ];
  return (
    <>
  

    <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', padding: '10px 0' }}>
      {profiles.map((profile, index) => (
        <div key={index} style={{ display: 'inline-block', marginRight: '10px' }}>
          <DatingProfileCard key= {profile.id} profile ={profile}/>
         
        </div>
      ))}
    </div>
  
    </>
  );
};

const chats = [
  {
    id: 1,
    name: "Radhika",
    message: "Hello, We went through your profile...",
    time: "Today",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    badge: 22,
  },
  {
    id: 2,
    name: "Divya",
    message: "I am interested in your profile. Would...",
    time: "Today",
    avatar: "https://randomuser.me/api/portraits/women/20.jpg",
    badge: 2,
  },
  {
    id: 3,
    name: "Sreya",
    message: "Missed video call",
    time: "Yesterday",
    avatar: "https://randomuser.me/api/portraits/women/30.jpg",
  },
  {
    id: 4,
    name: "Anjali",
    message: "Educational Details Requested",
    time: "Yesterday",
    avatar: "https://randomuser.me/api/portraits/women/40.jpg",
    badge: 2,
  },
  {
    id: 5,
    name: "Deepika",
    message: "I am doing very well !! blahh blahh...",
    time: "Yesterday",
    avatar: "https://randomuser.me/api/portraits/women/50.jpg",
  },
  {
    id: 6,
    name: "Kavya",
    message: "She liked you !! Take the next step...",
    time: "23 Nov 2023",
    avatar: "https://randomuser.me/api/portraits/women/60.jpg",
    badge: 2,
  },
];

const Mail = () => {
  return (
    <div>
      {/* Tabs */}
      <Tabs>
        <Tabs.Tab title="Received" key="received" > <List>
        {chats.map((chat) => (
          <List.Item
            key={chat.id}
            prefix={<Avatar src={chat.avatar} />}
            description={chat.message}
            extra={chat.badge ? <Badge content={chat.badge} /> : null}
          >
            {chat.name}
          </List.Item>
        ))}
      </List></Tabs.Tab>
        <Tabs.Tab title="Awaiting Response" key="awaiting" >
        <div style={{ 
    width: '100%',
    minHeight: '100px', // Give it some minimum height
    display: 'flex',
    flexDirection: 'column'
  }}>
    {/* Centered "Awaiting" text */}
    <div style={{
      // border: '1px solid #999999',
      // background: 'var(--adm-color-box)',
      textAlign: 'center',
     
      color: '#BBBBBB',
      padding: '12px',
      borderRadius: '1px',
      margin: '0 auto', // This centers the div
      width: '30%' // Or your preferred width
    }}>
      <h3>Pending</h3>
    </div>

    {/* ProfileCarousel below */}
    <ProfileCarousel />
  </div>
        </Tabs.Tab>
        <Tabs.Tab title="Calls" key="calls" >Completed
        <div style={{ display: "flex", gap: "10px", padding: "10px" }}>
        <Badge content={4}>
          <button style={{ padding: "8px 16px", borderRadius: "20px", border: "1px solid #ddd" }}>Messages</button>
        </Badge>
        <Badge content={123}>
          <button style={{ padding: "8px 16px", borderRadius: "20px", border: "1px solid #ddd" }}>Interests</button>
        </Badge>
      </div>
        </Tabs.Tab>
      </Tabs>

      {/* Filter Buttons */}
      

      {/* Chat List */}
     
    </div>
  );
};

export default Mail;
