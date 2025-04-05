import { Space, Tag } from "antd-mobile";
import { EnvironmentOutline, HeartOutline, StarOutline } from "antd-mobile-icons";
import React from "react";


const CardForListView = ({profile}) => {
    console.log(profile, "Profile Obj")
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

export default CardForListView;
