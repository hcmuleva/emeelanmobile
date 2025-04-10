import { AlipayCircleOutlined } from '@ant-design/icons';
import {
  Card,
  Grid
} from 'antd-mobile';
import {
  TeamOutline
} from 'antd-mobile-icons';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { BhamasahDialog } from '../../components/homepage/BhamasahDialog';
import { MyFamilyDialog } from '../../components/homepage/MyFamilyDialog';
import { ProfessionDialog } from '../../components/homepage/ProfessionDialog';

import { getPaginatedUsers } from '../../services/api';

import Marquee from '../../components/marquee/Marquee';
import "../../styles/scrollHide.css";
import UserLocation from './Userlocation';

const tiles = [
  { title: 'Donation', color: '#A5D8FF', icon: <AlipayCircleOutlined style={{ fontSize: 24, color: '#212121' }} />, key: 'bhamasah' },
  
  { title: 'Admin List', color: '#FFC9C9', icon: <TeamOutline style={{ fontSize: 24, color: '#212121' }} />, key: 'admin' },
  
];
  
const demoLongText = " This is a sample long text and heere is our message "
const FeatureTiles = () => {
  const navigate = useNavigate();

  const [visibleBhamasah, setVisibleBhamasah] = useState(false);
  const [visibleProfession, setVisibleProfession] = useState(false);
  // const [visibleAdminList, setVisibleAdminList] = useState(false);
  const [visibleFamily, setVisibleFamily] = useState(false);
  const [users, setUsers] = useState([])
  const [recentMatches, setRecentMatches] = useState([]);
  
  // Mock data for demonstration
  const mockSuggestion = [
    {
      id: 1,
      name: 'Radhika',
      age: 23,
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMaT_ZJ1PscPs0m7B0xx_gLUcM8WPjPw1uDol5_cog3HqI0LvNFXOeNTW6WTbiRAh0PDE&usqp=CAU',
      mobileNumber: '9876543210',
      city: 'Jaipur',
      state: 'Rajasthan',
    },
    {
      id: 2,
      name: 'Chanchala',
      age: 28,
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlzzonSCay4c4CRv3zAejWFWtV793n52JFVtvO4PL39Qc7993khhzUaxM_9O2iyFjCajs&usqp=CAU',
      mobileNumber: '9123456780',
      city: 'Indore',
      state: 'Madhya Pradesh',
    },
    {
      id: 3,
      name: 'Geeta',
      age: 21,
      avatar: 'https://demo.adminkit.io/img/avatars/avatar-4.jpg',
      mobileNumber: '7012345678',
      city: 'Udaipur',
      state: 'Rajasthan',
    },
    {
      id: 4,
      name: 'Manubai',
      age: 32,
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSycJK9L_nCGUU3cCbBvrW371fQRZ3LUHpsHNxcGEZy4GEZbQYF0ZJsmvhNWJ66_a0a7B0&usqp=CAU',
      mobileNumber: '9001234567',
      city: 'Bikaner',
      state: 'Rajasthan',
    },
    {
      id: 5,
      name: 'Mamta',
      age: 23,
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMaT_ZJ1PscPs0m7B0xx_gLUcM8WPjPw1uDol5_cog3HqI0LvNFXOeNTW6WTbiRAh0PDE&usqp=CAU',
      mobileNumber: '9999999999',
      city: 'Jodhpur',
      state: 'Rajasthan',
    },
    {
      id: 6,
      name: 'Bhanupriya',
      age: 28,
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlzzonSCay4c4CRv3zAejWFWtV793n52JFVtvO4PL39Qc7993khhzUaxM_9O2iyFjCajs&usqp=CAU',
      mobileNumber: '8888888888',
      city: 'Ahmedabad',
      state: 'Gujarat',
    },
    {
      id: 7,
      name: 'Priti',
      age: 21,
      avatar: 'https://demo.adminkit.io/img/avatars/avatar-4.jpg',
      mobileNumber: '7777777777',
      city: 'Mumbai',
      state: 'Maharashtra',
    },
    {
      id: 8,
      name: 'Sangeeta',
      age: 32,
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSycJK9L_nCGUU3cCbBvrW371fQRZ3LUHpsHNxcGEZy4GEZbQYF0ZJsmvhNWJ66_a0a7B0&usqp=CAU',
      mobileNumber: '6666666666',
      city: 'Surat',
      state: 'Gujarat',
    },
    {
      id: 9,
      name: 'Rachana',
      age: 23,
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMaT_ZJ1PscPs0m7B0xx_gLUcM8WPjPw1uDol5_cog3HqI0LvNFXOeNTW6WTbiRAh0PDE&usqp=CAU',
      mobileNumber: '9555555555',
      city: 'Kota',
      state: 'Rajasthan',
    },
    {
      id: 10,
      name: 'Komal',
      age: 28,
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlzzonSCay4c4CRv3zAejWFWtV793n52JFVtvO4PL39Qc7993khhzUaxM_9O2iyFjCajs&usqp=CAU',
      mobileNumber: '9444444444',
      city: 'Pune',
      state: 'Maharashtra',
    },
    {
      id: 11,
      name: 'Bhumika',
      age: 21,
      avatar: 'https://demo.adminkit.io/img/avatars/avatar-4.jpg',
      mobileNumber: '9333333333',
      city: 'Nagpur',
      state: 'Maharashtra',
    },
    {
      id: 12,
      name: 'Vandana',
      age: 32,
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSycJK9L_nCGUU3cCbBvrW371fQRZ3LUHpsHNxcGEZy4GEZbQYF0ZJsmvhNWJ66_a0a7B0&usqp=CAU',
      mobileNumber: '9222222222',
      city: 'Ajmer',
      state: 'Rajasthan',
    },
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
        navigate('/adminlist')
        // Handle Admin List click
        // setVisibleAdminList(true)
        console.log('Admin List tile clicked');
        break;
      default:
        console.log('Unknown tile clicked');
    }
  };

  return (
    <div style={{padding:"16px"}}>
      <UserLocation />
      {/* Likes */}
     <Marquee mockSuggestion={mockSuggestion} />  

      {/* <NoticeBar content={demoLongText} color='alert'/> */}
      
      
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
      {/* <AdminListDialog visible={visibleAdminList} onClose={()=>setVisibleAdminList(false)} /> */}
      <BhamasahDialog visible={visibleBhamasah} onClose={()=>setVisibleBhamasah(false)} />
      
      {/* Recent */}
      {/* <div >
        <RandomHeightMatches matches={mockRecentMatches} />
      </div> */}
    </div>
  );
};

export default FeatureTiles;