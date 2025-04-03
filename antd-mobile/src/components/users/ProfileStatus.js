import React, { useState,useEffect } from "react";
import { Tabs, Card,Divider, Button, Tag,Grid, Toast,DotLoading } from "antd-mobile";
import { CheckOutline, CloseOutline, PhoneFill, MessageFill } from "antd-mobile-icons";
import { getCustomMe } from "../../services/api"; // Import API function
import { EnvironmentOutline, UserContactOutline, HeartOutline, SmileOutline } from 'antd-mobile-icons';

const profiles = [

  {
    name: "Divya",
    age: 25,
    height: "5'4\"",
    community: "Brahmin",
    education: "MBA",
    profession: "Human Resource Professional",
    location: "Mysuru",
    verified: true,
    premium: true,
    interest: "She liked your profile",
    expires: "Expires in 12 days",
    new: false,
  },
  {
    name: "Deepika",
    age: 25,
    height: "5'4\"",
    community: "Lingayat",
    education: "MBA",
    profession: "Administrative Professional",
    location: "Bantwal",
    verified: true,
    premium: true,
    interest: "You both like each other",
    expires: "",
    new: true,
  },
];

const ProfileStatus = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const jwt = localStorage.getItem('jwt')
  useEffect(() => {
    const fetchUser = async () => {
      
      try {
        const userData = await getCustomMe(jwt);
        console.log("UserData",userData)
        setUser(userData);
      } catch (err) {
        setError(err.message);
        Toast.show({
          icon: 'fail',
          content: err.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [jwt]);

  if (loading) return <DotLoading color="primary" /> ;

  {loading ? <DotLoading color="primary" /> : <p>Data Loaded</p>}

  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;
  const mycoices=user.mylikes;
  console.log("mylikes",user.mylikes)
  mycoices.map(elm =>{
    console.log("elm", elm)
    if(elm.id ==7210){
      console.log("mycgoud", elm)
    }
  })
  console.log("User ", user)
  return (
    <div>
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
      <Tabs.Tab title="Pending" key="pending" />
      <Tabs.Tab title="Accepted" key="Accepted" />
      <Tabs.Tab title="Rejected" key="Rejected" />
        <Tabs.Tab title="MyAccepted" key="MyAccepted" />
        <Tabs.Tab title="MyRejected" key="MyRejected" >


      
        <div style={{
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
      padding: '16px',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0',
      maxWidth: '500px',
      margin: '0 auto'
    }}>
      <Card
        title={
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            color: '#333',
            fontSize: '20px',
            fontWeight: '600'
          }}>
            <UserContactOutline style={{ marginRight: '12px', color: '#1890ff' }} />
            <span>ABHJEET RAJ</span>
          </div>
        }
        style={{ 
          borderRadius: '8px',
          backgroundColor: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(5px)'
        }}
      >
        <div style={{ padding: '8px' }}>
          <Grid columns={2} gap={8}>
            <div>
              <p style={{ margin: '6px 0', color: '#555' }}>
                <strong style={{ color: '#333' }}>D.O.B:</strong> 20-09-1992
              </p>
              <p style={{ margin: '6px 0', color: '#555' }}>
                <strong style={{ color: '#333' }}>Time:</strong> 3:21 am
              </p>
            </div>
            <div>
              <p style={{ margin: '6px 0', color: '#555' }}>
                <strong style={{ color: '#333' }}>Height:</strong> 6'2"
              </p>
              <p style={{ margin: '6px 0', color: '#555' }}>
                <strong style={{ color: '#333' }}>Weight:</strong> 80 kg
              </p>
            </div>
          </Grid>
          
          <p style={{ margin: '6px 0', color: '#555' }}>
            <strong style={{ color: '#333' }}>Place:</strong> J.P. Nagar, Bangalore
          </p>
          <p style={{ margin: '6px 0', color: '#555' }}>
            <strong style={{ color: '#333' }}>Contact:</strong> +1 (548) 393-XX00
          </p>
          <p style={{ margin: '6px 0', color: '#555' }}>
            <strong style={{ color: '#333' }}>Skin:</strong> Wheatish
          </p>
          
          <Divider style={{ 
            borderColor: '#e0e0e0',
            margin: '12px 0'
          }} />
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '8px',
            color: '#333'
          }}>
            <SmileOutline style={{ marginRight: '12px', color: '#1890ff' }} />
            <strong style={{ fontSize: '16px' }}>About Yourself</strong>
          </div>
          <p style={{ 
            marginBottom: '12px', 
            color: '#555',
            lineHeight: '1.5'
          }}>
            I'd describe myself as someone who's reliable, trendy, smart and someone who always has a smile on the face. A big-time Nature & Animal lover. I have lived in different parts of India and appreciate all cultures.
          </p>
          
          <Divider style={{ 
            borderColor: '#e0e0e0',
            margin: '12px 0'
          }} />
          
          <div style={{ marginBottom: '12px' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '8px',
              color: '#333'
            }}>
              <SmileOutline style={{ marginRight: '12px', color: '#1890ff' }} />
              <strong style={{ fontSize: '16px' }}>Family Details</strong>
            </div>
            <p style={{ margin: '6px 0', color: '#555' }}>
              <strong style={{ color: '#333' }}>Father:</strong> Rakesh Bindal (Govt. Teacher)
            </p>
            <p style={{ margin: '6px 0', color: '#555' }}>
              <strong style={{ color: '#333' }}>Mother:</strong> Yashoda Bindal (Govt. Nurse)
            </p>
            <p style={{ margin: '6px 0', color: '#555' }}>
              <strong style={{ color: '#333' }}>Lives in:</strong> Bharatpur
            </p>
            <p style={{ margin: '6px 0', color: '#555' }}>
              <strong style={{ color: '#333' }}>Family Type:</strong> Nuclear Family
            </p>
            <p style={{ margin: '6px 0', color: '#555' }}>
              <strong style={{ color: '#333' }}>Siblings:</strong> 1 Brother (Software Engg.) & 1 Sister (Bank Manager at SBI)
            </p>
          </div>
          
          <Divider style={{ 
            borderColor: '#e0e0e0',
            margin: '12px 0'
          }} />
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '8px',
            color: '#333'
          }}>
            <HeartOutline style={{ marginRight: '12px', color: '#1890ff' }} />
            <strong style={{ fontSize: '16px' }}>Expectation</strong>
          </div>
          <p style={{ 
            marginBottom: '4px', 
            color: '#555',
            lineHeight: '1.5'
          }}>
            In search of someone who is down to earth, funny and dog lover. Someone who loves to travel and explore new places to discover it's culture & cuisine.
          </p>
        </div>
      </Card>
    </div>
  


        </Tabs.Tab>
     
      </Tabs>
      
      <div style={{ padding: "10px" }}>
        {/* {profiles.map((profile, index) => (
          <Card key={index} style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <strong>{profile.name}, {profile.age} yrs</strong>
              <small>{profile.height} • {profile.community} • {profile.education}</small>
              <small>{profile.profession} • {profile.location}</small>
              <Tag color="primary">{profile.verified ? "ID Verified" : "Not Verified"}</Tag>
              {profile.premium && <Tag color="warning">Premium Member</Tag>}
              <p style={{ marginTop: "5px", fontSize: "14px", color: "#666" }}>{profile.interest}</p>
              {profile.expires && <small style={{ color: "red" }}>{profile.expires}</small>}
              
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                {profile.new ? (
                  <>
                    <Button shape="rounded" color="primary" icon={<PhoneFill />}>Call Now</Button>
                    <Button shape="rounded" color="primary" icon={<MessageFill />}>Message</Button>
                  </>
                ) : (
                  <>
                    <Button shape="rounded" color="success" icon={<CheckOutline />}>Accept</Button>
                    <Button shape="rounded" color="danger" icon={<CloseOutline />}>Decline</Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))} */}
      </div>
    </div>
  );
};

export default ProfileStatus;
