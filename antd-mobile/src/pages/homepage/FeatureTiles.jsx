import React, { useEffect, useState } from 'react';
import { 
  Card, 
  Grid, 
  Avatar, 
  Button, 
  SwipeAction, 
  Toast, 
  Badge, 
  List, 
  Space, 
  FloatingBubble,
  Divider,
  Tag
} from 'antd-mobile';
import { 
  TeamOutline, 
  HeartOutline, 
  GiftOutline, 
  UserAddOutline,
  PayCircleOutline,
  TravelOutline
} from 'antd-mobile-icons';
import { useNavigate } from 'react-router-dom';
import { getPaginatedUsers } from '../../services/api';
import "../../styles/scrollHide.css";

// Custom styled Marquee component for donors
const DonorMarquee = ({ donors }) => {
  return (
    <div className="donor-marquee-container" style={{ 
      overflow: 'hidden',
      backgroundColor: 'rgba(180, 0, 0, 0.07)',
      borderRadius: '8px',
      padding: '8px',
      marginBottom: '16px',
      border: '1px solid rgba(180, 0, 0, 0.2)'
    }}>
      <div className="marquee-header" style={{ 
        display: 'flex',
        alignItems: 'center',
        marginBottom: '8px'
      }}>
        <GiftOutline color="#b00000" fontSize={18} />
        <span style={{ 
          marginLeft: '6px',
          fontWeight: 'bold',
          color: '#b00000'
        }}>Recent Donors</span>
      </div>
      <div className="donor-marquee" style={{ 
        whiteSpace: 'nowrap',
        animation: 'marquee 30s linear infinite',
        padding: '4px 0'
      }}>
        {donors.map((donor, index) => (
          <span key={index} style={{ 
            padding: '4px 16px 4px 0',
            display: 'inline-block'
          }}>
            <span style={{ fontWeight: 'bold' }}>{donor.name}</span>
            <span style={{ color: '#b00000' }}> ₹{donor.amount}</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};

// User suggestion carousel
const UserSuggestionBar = ({ users }) => {
  const navigate = useNavigate();
  
  const viewProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };
  
  return (
    <div className="user-suggestions" style={{ marginBottom: '20px' }}>
      <div style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px'
      }}>
        <h3 style={{ margin: 0, color: '#8b0000' }}>
          <TeamOutline /> Suggested Matches
        </h3>
        <Button 
          size='small' 
          color='primary' 
          fill='none'
          style={{ color: '#b00000' }}
          onClick={() => navigate('/all-matches')}
        >
          View All
        </Button>
      </div>
      
      <div style={{ 
        display: 'flex',
        overflowX: 'auto',
        paddingBottom: '10px',
        scrollbarWidth: 'none'
      }} className="scroll-hide">
        {users.map(user => (
          <Card 
            key={user.id}
            onClick={() => viewProfile(user.id)}
            style={{ 
              minWidth: '140px',
              marginRight: '12px',
              borderRadius: '8px',
              border: '1px solid #f0f0f0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}
            bodyStyle={{ padding: '12px' }}
          >
            <div style={{ textAlign: 'center' }}>
              <Badge content={<HeartOutline fontSize={12} />} color='#b00000'>
                <Avatar 
                  src={user.avatar} 
                  style={{ 
                    width: '70px', 
                    height: '70px',
                    border: '2px solid #b00000'
                  }} 
                />
              </Badge>
              <div style={{ 
                marginTop: '8px',
                fontSize: '15px',
                fontWeight: '500',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {user.name}, {user.age}
              </div>
              <div style={{ 
                fontSize: '12px',
                color: '#666',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {user.city}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Share profile component
const ShareProfileCard = ({ userId }) => {
  console.log(userId)
  const textToCopy = `http://localhost:3000/profile-view/${userId}`;

  const shareProfile = () => {
    // Toast.show({
    //   content: 'Profile link copied to clipboard!',
    //   position: 'bottom',
    // });
    navigator.clipboard.writeText(textToCopy)
      .then(() => alert("Copied to clipboard!"))
      .catch((err) => console.error("Failed to copy:", err));
  };
  
  return (
    <Card style={{ 
      marginBottom: '16px',
      borderRadius: '8px',
      border: '1px solid rgba(180, 0, 0, 0.2)',
      backgroundColor: 'rgba(180, 0, 0, 0.03)'
    }}>
      <div style={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <h3 style={{ margin: '0 0 5px 0', color: '#8b0000' }}>Share Your Profile</h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
            Invite friends to view your profile
          </p>
        </div>
        <Button
          onClick={shareProfile}
          color='primary'
          style={{ 
            backgroundColor: '#b00000',
            borderColor: '#b00000',
            borderRadius: '20px'
          }}
        >
          <TravelOutline fontSize={16}/>
        </Button>
      </div>
    </Card>
  );
};

// Donation link component
const DonationLink = () => {
  const navigate = useNavigate();
  
  const goToDonation = () => {
    navigate('/donation');
  };
  
  return (
    <Card style={{ 
      marginBottom: '16px',
      borderRadius: '8px',
      background: 'linear-gradient(45deg, #8b0000, #b00000)',
      color: 'white'
    }}>
      <div style={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <h3 style={{ margin: '0 0 5px 0', color: 'white' }}>Support Our Community</h3>
          <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
            Your contribution helps us grow
          </p>
        </div>
        <Button
          onClick={goToDonation}
          style={{ 
            backgroundColor: 'white',
            color: '#b00000',
            borderColor: 'white',
            borderRadius: '20px'
          }}
        >
          <PayCircleOutline fontSize={16} /> Donate
        </Button>
      </div>
    </Card>
  );
};

// Quick shortcuts component
const QuickShortcuts = () => {
  const navigate = useNavigate();
  
  const shortcuts = [
    { icon: <TeamOutline />, text: 'Browse', path: '/browse' },
    { icon: <HeartOutline />, text: 'Matches', path: '/matches' },
    { icon: <UserAddOutline />, text: 'Invite', path: '/invite' },
    { icon: <GiftOutline />, text: 'Donate', path: '/donation' }
  ];
  
  return (
    <Card style={{ 
      marginBottom: '16px',
      borderRadius: '8px',
    }}>
      <h3 style={{ margin: '0 0 12px 0', color: '#8b0000' }}>Quick Actions</h3>
      <Grid columns={4} gap={8}>
        {shortcuts.map((item, index) => (
          <Grid.Item key={index}>
            <div 
              onClick={() => navigate(item.path)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '12px',
                backgroundColor: index === 0 ? 'rgba(180, 0, 0, 0.07)' : '#f5f5f5',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              <div style={{ 
                fontSize: '24px',
                color: '#b00000',
                marginBottom: '8px' 
              }}>
                {item.icon}
              </div>
              <div style={{ fontSize: '12px' }}>{item.text}</div>
            </div>
          </Grid.Item>
        ))}
      </Grid>
    </Card>
  );
};

const FeatureTiles = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [donors, setDonors] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"))
  // Mock donors data
  const mockDonors = [
    { name: 'Rahul Sharma', amount: 1000 },
    { name: 'Priya Patel', amount: 500 },
    { name: 'Amit Singh', amount: 2000 },
    { name: 'Meera Reddy', amount: 1500 },
    { name: 'Vishal Agarwal', amount: 3000 },
    { name: 'Sunita Jain', amount: 750 },
    { name: 'Karan Malhotra', amount: 1200 },
    { name: 'Deepika Kapoor', amount: 2500 },
    { name: 'Rajesh Kumar', amount: 1800 },
    { name: 'Anita Sharma', amount: 1000 }
  ];
  
  // Mock user suggestions
  const mockSuggestion = [
    {
      id: 1,
      name: 'Radhika',
      age: 23,
      avatar: 'data:image/jpeg;base64,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',
      city: 'Jaipur',
      state: 'Rajasthan',
    },
    {
      id: 2,
      name: 'Chanchala',
      age: 28,
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlzzonSCay4c4CRv3zAejWFWtV793n52JFVtvO4PL39Qc7993khhzUaxM_9O2iyFjCajs&usqp=CAU',
      city: 'Indore',
      state: 'Madhya Pradesh',
    },
    {
      id: 3,
      name: 'Geeta',
      age: 21,
      avatar: 'https://demo.adminkit.io/img/avatars/avatar-4.jpg',
      city: 'Udaipur',
      state: 'Rajasthan',
    },
    {
      id: 4,
      name: 'Manubai',
      age: 32,
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSycJK9L_nCGUU3cCbBvrW371fQRZ3LUHpsHNxcGEZy4GEZbQYF0ZJsmvhNWJ66_a0a7B0&usqp=CAU',
      city: 'Bikaner',
      state: 'Rajasthan',
    },
    {
      id: 5,
      name: 'Mamta',
      age: 23,
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMaT_ZJ1PscPs0m7B0xx_gLUcM8WPjPw1uDol5_cog3HqI0LvNFXOeNTW6WTbiRAh0PDE&usqp=CAU',
      city: 'Jodhpur',
      state: 'Rajasthan',
    },
    {
      id: 6,
      name: 'Bhanupriya',
      age: 28,
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlzzonSCay4c4CRv3zAejWFWtV793n52JFVtvO4PL39Qc7993khhzUaxM_9O2iyFjCajs&usqp=CAU',
      city: 'Ahmedabad',
      state: 'Gujarat',
    }
  ];

  const fetchUsers = async () => {
    try {
      const data = await getPaginatedUsers();
      if (data) {
        setUsers(data?.data || []);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      // Use mock data if API fails
      setUsers(mockSuggestion);
      setDonors(mockDonors);
    }
  };

  useEffect(() => {
    // fetchUsers();
    // For demo, use mock data immediately
    setUsers(mockSuggestion);
    setDonors(mockDonors);
  }, []);

  return (
    <div style={{ 
      padding: "16px", 
      backgroundColor: '#fafafa',
    }}>
      {/* Welcome message */}
      <Card style={{ 
        marginBottom: '16px',
        borderRadius: '8px',
        background: 'linear-gradient(to right, #8b0000, #b00000)',
        color: 'white'
      }}>
        <h2 style={{ margin: '0 0 8px 0' }}>Welcome Back!</h2>
        <p style={{ margin: 0, opacity: 0.9 }}>Find your perfect match today</p>
        <div style={{ 
          marginTop: '10px',
          display: 'flex',
          gap: '8px'
        }}>
          <Tag 
            color='white' 
            style={{ 
              color: '#b00000', 
              borderRadius: '12px',
              paddingLeft: '10px',
              paddingRight: '10px'
            }}
          >
            10 new matches
          </Tag>
          <Tag 
            color='white' 
            style={{ 
              color: '#b00000', 
              borderRadius: '12px',
              paddingLeft: '10px',
              paddingRight: '10px'
            }}
            onClick={()=>navigate("userprofile")}
          >
            Complete your profile
          </Tag>
        </div>
      </Card>

      {/* Donor Marquee */}
      <DonorMarquee donors={donors} />
      
      {/* User Suggestions */}
      <UserSuggestionBar users={users} />
      
      {/* Share Profile Card */}
      <ShareProfileCard userId={user?.id}/>
      
      {/* Donation Link */}
      <DonationLink />
      
      {/* Quick Shortcuts */}
      <QuickShortcuts />
      
      {/* Floating action button */}
      <FloatingBubble
        style={{
          '--initial-position-bottom': '24px',
          '--initial-position-right': '24px',
          '--edge-distance': '24px',
          '--background': '#b00000',
        }}
        onClick={() => {
          Toast.show('Start chatting with matches!');
          navigate('/messages');
        }}
      >
        <TravelOutline fontSize={24}/>
      </FloatingBubble>
    </div>
  );
};

export default FeatureTiles;