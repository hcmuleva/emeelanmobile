import React, { useContext, useEffect, useState } from 'react';
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
import AdminUserEditor from '../../components/admin/AdminUserEditor';
import PendingApprovalCard from '../../components/authentication/PendingApprovalCard';
import { authService } from '../../services';
import { AuthContext } from '../../context/AuthContext';
import SocialMediaCard from '../../components/socialmedia/SocialMediaCard';

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
const BreakingNewsMarquee_EN = () => {
  const newsItems = [
    [
      "Easy to register: This is very easy app to register now",
      "आसान पंजीकरण: यह ऐप पंजीकरण के लिए बहुत आसान है, अभी रजिस्टर करें",
    ],
    [
      "Admins: 350 plus admin to help you to get register profiles details and background verification",
      "प्रशासक: 350 से अधिक प्रशासक आपकी प्रोफाइल विवरण और पृष्ठभूमि सत्यापन में मदद करने के लिए उपलब्ध हैं",
    ],
    [
      "Invite: Invite option to find suitable profile and based on this other side person can accept or reject",
      "आमंत्रण: उपयुक्त प्रोफाइल खोजने के लिए आमंत्रण विकल्प, जिसके आधार पर दूसरा व्यक्ति स्वीकार या अस्वीकार कर सकता है",
    ]
  ];

  return (
    <div className="news-marquee-container" style={{
      overflow: 'hidden',
      backgroundColor: 'rgba(0, 100, 180, 0.07)',
      borderRadius: '8px',
      padding: '8px',
      marginBottom: '16px',
      border: '1px solid rgba(0, 100, 180, 0.2)'
    }}>
      <div className="marquee-header" style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '8px'
      }}>
        <span style={{
          marginLeft: '6px',
          fontWeight: 'bold',
          color: '#0064b4'
        }}>Breaking News</span>
      </div>
      <div className="news-marquee" style={{
        whiteSpace: 'nowrap',
        animation: 'marquee 30s linear infinite',
        padding: '4px 0'
      }}>
        {newsItems.map((item, index) => (
          <div key={index} style={{
            padding: '4px 10px 4px 0',
            display: "inline-block"
          }}>
            {item[0]} •
            <br />
            {item[1]} •
          </div>
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
const BreakingNewsMarquee_HI = () => {
  const newsItems = [
    { title: "आसान पंजीकरण:", text: "यह ऐप पंजीकरण के लिए बहुत आसान है, अभी रजिस्टर करें" },
    { title: "प्रशासक:", text: "350 से अधिक प्रशासक आपकी प्रोफाइल विवरण और पृष्ठभूमि सत्यापन में मदद करने के लिए उपलब्ध हैं" },
    { title: "आमंत्रण:", text: "उपयुक्त प्रोफाइल खोजने के लिए आमंत्रण विकल्प, जिसके आधार पर दूसरा व्यक्ति स्वीकार या अस्वीकार कर सकता है" }
  ];

  return (
    <div className="news-marquee-container" style={{
      overflow: 'hidden',
      backgroundColor: 'rgba(0, 100, 180, 0.07)',
      borderRadius: '8px',
      padding: '8px',
      marginBottom: '16px',
      border: '1px solid rgba(0, 100, 180, 0.2)'
    }}>
      <div className="marquee-header" style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '8px'
      }}>
        <span style={{
          marginLeft: '6px',
          fontWeight: 'bold',
          color: '#0064b4',
          fontSize: '18px'
        }}>ताज़ा खबर</span>
      </div>
      <div className="news-marquee" style={{
        whiteSpace: 'nowrap',
        animation: 'marquee 20s linear infinite',
        padding: '4px 0',
        fontSize: '16px'
      }}>
        {newsItems.map((item, index) => (
          <span key={index} style={{
            padding: '4px 16px 4px 0',
            display: 'inline-block'
          }}>
            <span style={{ fontWeight: 'bold' }}>{item.title}</span>
            <span> {item.text} • </span>
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
    if (userId) navigate(`/profile/${userId}`);
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
        // onClick={() => navigate('/all-matches')}
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
            // onClick={() => viewProfile(user.id)}
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
          <TravelOutline fontSize={16} />
        </Button>
      </div>
    </Card>
  );
};

// Donation link component
const DonationLink = () => {
  const navigate = useNavigate();

  const goToDonation = () => {
    console.log("DonationPage")
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
    { icon: <TeamOutline />, text: 'Browse', path: '/profiles' },
    { icon: <HeartOutline />, text: 'Matches', path: '/status' },
    { icon: <UserAddOutline />, text: 'Invite', path: '/status' },
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
  const { user } = useContext(AuthContext)
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [donors, setDonors] = useState([]);
  // const user = JSON.parse(localStorage.getItem("user"));
  const userStatus = user?.userstatus || "PENDING";
  console.log("hcm userStatus", userStatus)
  useEffect(() => {
    // You can optionally fetch users/donors if needed
    setDonors([
      { name: 'Pokarji Rathore', amount: 20000 },
      { name: 'Mangilalji Patel', amount: 1500 },
      { name: 'Amit Muleva', amount: 2100 },
      { name: 'Meera bai Hammad', amount: 1500 },
      { name: 'Vishal Solanki', amount: 3000 },
      { name: 'Sunita ji Gehlot', amount: 1750 },
      { name: 'Karan Bhagwan', amount: 1200 },
      { name: 'Deepak Pawar', amount: 2500 },
    ]);

    // Fetch suggested users only if approved
    if (userStatus === "APPROVED") {
      getPaginatedUsers().then((res) => {
        setUsers(res?.data || []);
      });
    }
  }, [userStatus]);

  if (userStatus !== "APPROVED") {
    return <PendingApprovalCard />;
  }

  return (
    <div style={{ padding: '16px' }}>
      <DonorMarquee donors={donors} />
      <BreakingNewsMarquee_EN />
      {/* <BreakingNewsMarquee_HI /> */}
      <QuickShortcuts />
      <DonationLink />
      <SocialMediaCard />
      {/* <ShareProfileCard userId={user?.id} /> */}
      {/* <UserSuggestionBar users={users} /> */}
      {(
        user.emeelanrole === "CENTER" ||
        user.emeelanrole === "ADMIN" ||
        user.emeelanrole === "SUPERADMIN"
      ) && <AdminUserEditor />}
    </div>
  );
};

export default FeatureTiles;