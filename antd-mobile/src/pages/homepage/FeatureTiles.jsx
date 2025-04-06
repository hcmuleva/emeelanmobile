import { AlipayCircleOutlined} from '@ant-design/icons';
import { 
  Card, 
  Grid, 
  Avatar, 
  Image, 
  NavBar, 
  TabBar, 
  Space, 
  Badge,
  List,
  ProgressCircle,
  ScrollMask
} from 'antd-mobile';
import { 
  HeartOutline, 
  MessageOutline, 
  UserOutline, 
  AppOutline, 
  TravelOutline,
  TeamOutline
} from 'antd-mobile-icons';
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { AdminListDialog } from '../../components/homepage/AdminListDialog';
import { BhamasahDialog } from '../../components/homepage/BhamasahDialog';
import { MyFamilyDialog } from '../../components/homepage/MyFamilyDialog';
import { ProfessionDialog } from '../../components/homepage/ProfessionDialog';

import { getPaginatedUsers } from '../../services/api';
import RandomHeightMatches from '../../components/cards/RandomHeightMatches';

import "../../styles/scrollHide.css"

const tiles = [
  { title: 'Bhamasah', color: '#A5D8FF', icon: <AlipayCircleOutlined style={{ fontSize: 24, color: '#212121' }} />, key: 'bhamasah' },
  { title: 'Profession', color: '#B2F2BB', icon: <TravelOutline style={{ fontSize: 24, color: '#212121' }} />, key: 'profession' },
  { title: 'MyFamily', color: '#FFD8A8', icon: <TeamOutline style={{ fontSize: 24, color: '#212121' }} />, key: 'family' },
  { title: 'Admin List', color: '#FFC9C9', icon: <TeamOutline style={{ fontSize: 24, color: '#212121' }} />, key: 'admin' },
];
  
const demoLongText = " This is a sample long text and heere is our message "
const FeatureTiles = () => {
  const navigate = useNavigate();

  const [visibleBhamasah, setVisibleBhamasah] = useState(false);
  const [visibleProfession, setVisibleProfession] = useState(false);
  const [visibleAdminList, setVisibleAdminList] = useState(false);
  const [visibleFamily, setVisibleFamily] = useState(false);
  const [users, setUsers] = useState([])
  const [recentMatches, setRecentMatches] = useState([]);
  
  // Mock data for demonstration
  const mockSuggestion = [
    { id: 1, name: 'Michel', age: 23, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMaT_ZJ1PscPs0m7B0xx_gLUcM8WPjPw1uDol5_cog3HqI0LvNFXOeNTW6WTbiRAh0PDE&usqp=CAU' },
    { id: 2, name: 'Jon', age: 28, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlzzonSCay4c4CRv3zAejWFWtV793n52JFVtvO4PL39Qc7993khhzUaxM_9O2iyFjCajs&usqp=CAU' },
    { id: 3, name: 'Matt', age: 21, avatar: 'https://demo.adminkit.io/img/avatars/avatar-4.jpg' },
    { id: 4, name: 'Alex', age: 32, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSycJK9L_nCGUU3cCbBvrW371fQRZ3LUHpsHNxcGEZy4GEZbQYF0ZJsmvhNWJ66_a0a7B0&usqp=CAU' },
    { id: 5, name: 'Michel', age: 23, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMaT_ZJ1PscPs0m7B0xx_gLUcM8WPjPw1uDol5_cog3HqI0LvNFXOeNTW6WTbiRAh0PDE&usqp=CAU' },
    { id: 6, name: 'Jon', age: 28, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlzzonSCay4c4CRv3zAejWFWtV793n52JFVtvO4PL39Qc7993khhzUaxM_9O2iyFjCajs&usqp=CAU' },
    { id: 7, name: 'Matt', age: 21, avatar: 'https://demo.adminkit.io/img/avatars/avatar-4.jpg' },
    { id: 8, name: 'Alex', age: 32, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSycJK9L_nCGUU3cCbBvrW371fQRZ3LUHpsHNxcGEZy4GEZbQYF0ZJsmvhNWJ66_a0a7B0&usqp=CAU' },
    { id: 9, name: 'Michel', age: 23, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMaT_ZJ1PscPs0m7B0xx_gLUcM8WPjPw1uDol5_cog3HqI0LvNFXOeNTW6WTbiRAh0PDE&usqp=CAU' },
    { id: 10, name: 'Jon', age: 28, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlzzonSCay4c4CRv3zAejWFWtV793n52JFVtvO4PL39Qc7993khhzUaxM_9O2iyFjCajs&usqp=CAU' },
    { id: 11, name: 'Matt', age: 21, avatar: 'https://demo.adminkit.io/img/avatars/avatar-4.jpg' },
    { id: 12, name: 'Alex', age: 32, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSycJK9L_nCGUU3cCbBvrW371fQRZ3LUHpsHNxcGEZy4GEZbQYF0ZJsmvhNWJ66_a0a7B0&usqp=CAU' },
  ];
  
  const mockRecentMatches = [
    { id: 1, name: 'James', age: 26, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMaT_ZJ1PscPs0m7B0xx_gLUcM8WPjPw1uDol5_cog3HqI0LvNFXOeNTW6WTbiRAh0PDE&usqp=CAU' },
    { id: 2, name: 'Robert', age: 29, image: 'https://demo.adminkit.io/img/avatars/avatar-4.jpg' },
    { id: 3, name: 'Chris', age: 31, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlzzonSCay4c4CRv3zAejWFWtV793n52JFVtvO4PL39Qc7993khhzUaxM_9O2iyFjCajs&usqp=CAU' },
    { id: 4, name: 'David', age: 25, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSycJK9L_nCGUU3cCbBvrW371fQRZ3LUHpsHNxcGEZy4GEZbQYF0ZJsmvhNWJ66_a0a7B0&usqp=CAU' },
    { id: 5, name: 'James', age: 26, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMaT_ZJ1PscPs0m7B0xx_gLUcM8WPjPw1uDol5_cog3HqI0LvNFXOeNTW6WTbiRAh0PDE&usqp=CAU' },
    { id: 6, name: 'Robert', age: 29, image: 'https://demo.adminkit.io/img/avatars/avatar-4.jpg' },
    { id: 7, name: 'Chris', age: 31, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlzzonSCay4c4CRv3zAejWFWtV793n52JFVtvO4PL39Qc7993khhzUaxM_9O2iyFjCajs&usqp=CAU' },
    { id: 8, name: 'David', age: 25, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSycJK9L_nCGUU3cCbBvrW371fQRZ3LUHpsHNxcGEZy4GEZbQYF0ZJsmvhNWJ66_a0a7B0&usqp=CAU' },
    { id: 9, name: 'James', age: 26, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMaT_ZJ1PscPs0m7B0xx_gLUcM8WPjPw1uDol5_cog3HqI0LvNFXOeNTW6WTbiRAh0PDE&usqp=CAU' },
    { id: 10, name: 'Robert', age: 29, image: 'https://demo.adminkit.io/img/avatars/avatar-4.jpg' },
    { id: 11, name: 'Chris', age: 31, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlzzonSCay4c4CRv3zAejWFWtV793n52JFVtvO4PL39Qc7993khhzUaxM_9O2iyFjCajs&usqp=CAU' },
    { id: 12, name: 'David', age: 25, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSycJK9L_nCGUU3cCbBvrW371fQRZ3LUHpsHNxcGEZy4GEZbQYF0ZJsmvhNWJ66_a0a7B0&usqp=CAU' },
    { id: 13, name: 'James', age: 26, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMaT_ZJ1PscPs0m7B0xx_gLUcM8WPjPw1uDol5_cog3HqI0LvNFXOeNTW6WTbiRAh0PDE&usqp=CAU' },
    { id: 14, name: 'Robert', age: 29, image: 'https://demo.adminkit.io/img/avatars/avatar-4.jpg' },
    { id: 15, name: 'Chris', age: 31, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlzzonSCay4c4CRv3zAejWFWtV793n52JFVtvO4PL39Qc7993khhzUaxM_9O2iyFjCajs&usqp=CAU' },
    { id: 16, name: 'David', age: 25, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSycJK9L_nCGUU3cCbBvrW371fQRZ3LUHpsHNxcGEZy4GEZbQYF0ZJsmvhNWJ66_a0a7B0&usqp=CAU' },
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
      setRecentMatches(mockRecentMatches);
    }
  };

  useEffect(() => {
    fetchUsers();
    // For demo, use mock data immediately
    setUsers(mockSuggestion);
    setRecentMatches(mockRecentMatches);
  }, []);
  
  const handleTileClick = (tileKey) => {
    switch(tileKey) {
      case 'bhamasah':
        // Handle Bhamasah click
        console.log('Bhamasah tile clicked');
        setVisibleBhamasah(true);
        
        break;
      case 'profession':
        // Handle Profession click
        console.log('Profession tile clicked');
        setVisibleProfession(true);
        break;
      case 'family':
        // Handle Family click
        console.log('Family tile clicked');
        setVisibleFamily(true)
        break;
      case 'admin':
        // Handle Admin List click
        setVisibleAdminList(true)
        console.log('Admin List tile clicked');
        break;
      default:
        console.log('Unknown tile clicked');
    }
  };

  return (
    <div style={{padding:"16px"}}>
      {/* Likes */}
      <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <h3 style={{ margin: '0', fontSize: '16px' }}>Suggestions</h3>
            <span style={{ color: '#D30000', fontWeight: 'bold' }}>22</span>
          </div>
          <Card style={{ borderRadius: '12px', marginBottom: '16px', padding:"0px" }} >
            <div 
             className='container'
            style={{
              display:"flex", 
              overflowX:"auto", 
              gap:"8px",
              alignItems:'center'
            }}
            >
              {mockSuggestion.map((user) => (
                <Grid.Item key={user.id}>
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center' 
                  }}>
                    <Avatar
                      src={user.avatar}
                      style={{ 
                        '--size': '60px',
                        borderRadius: '8px',
                        marginBottom: '4px'
                      }}
                    />
                    <div style={{ 
                      textAlign: 'center', 
                      fontSize: '12px', 
                      whiteSpace: 'nowrap' 
                    }}>
                      {user.name}, {user.age}
                    </div>
                  </div>
                </Grid.Item>
              ))}
              <span style={{
                fontWeight:"bold",
                marginLeft:"5px"
              }}
              onClick={()=>navigate("/profiles")}
              >View More</span>
            </div>
          </Card>
      </div>

      {/* <NoticeBar content={demoLongText} color='alert'/> */}
      <Grid columns={4} gap={14} style={{padding:16}}>
      <Space style={{ '--gap': '24px' }}>
        <Card title="Profile Settings " >
        <ProgressCircle
          percent={60}
          style={{
            '--fill-color': 'var(--adm-color-success)',
          }}
        >
          60%
        </ProgressCircle>
        </Card>
        {/* <ProgressCircle
          percent={60}
          style={{
            '--fill-color': 'var(--adm-color-warning)',
          }}
        >
          60%
        </ProgressCircle>
        <ProgressCircle
          percent={60}
          style={{
            '--fill-color': 'var(--adm-color-danger)',
          }}
        >
          60%
        </ProgressCircle> */}
      </Space>
      </Grid>
      
      <Grid columns={2} gap={16} style={{ padding: 16 }}>
        {tiles.map((tile) => (
          <Grid.Item key={tile.key}>
            <Card 
              style={{
                backgroundColor: tile.color,
                color: '#212121',
                padding: '12px',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
              onClick={() => handleTileClick(tile.key)}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {tile.icon}
                <span style={{ marginTop: 8, fontWeight: 'bold' }}>{tile.title}</span>
              </div>
            </Card>
          </Grid.Item>
        ))}
      </Grid>
      
      <ProfessionDialog visible={visibleProfession} onClose={()=>setVisibleProfession(false)} />
      <MyFamilyDialog visible={visibleFamily} onClose={()=>setVisibleFamily(false)} />
      <AdminListDialog visible={visibleAdminList} onClose={()=>setVisibleAdminList(false)} />
      <BhamasahDialog visible={visibleBhamasah} onClose={()=>setVisibleBhamasah(false)} />
      
      {/* Recent */}
      <div >
        <RandomHeightMatches matches={mockRecentMatches} />
      </div>
    </div>
  );
};

export default FeatureTiles;