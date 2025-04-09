import React, { useEffect, useState } from 'react';
import { Grid } from 'antd-mobile';
import { useNavigate } from "react-router-dom";
import { BhamasahDialog } from '../../components/homepage/BhamasahDialog';
import { MyFamilyDialog } from '../../components/homepage/MyFamilyDialog';
import { ProfessionDialog } from '../../components/homepage/ProfessionDialog';
import { 
  BhamasahTile, 
  ProfessionTile, 
  FamilyTile, 
  AdminListTile 
} from './TileComponent';
import { getPaginatedUsers } from '../../services/api';
import { getHomepageTiles } from '../../services/strapi';
import Marquee from '../../components/marquee/Marquee';
import "../../styles/scrollHide.css";
import UserLocation from './Userlocation';

const FeatureTiles = () => {
  const navigate = useNavigate();
  
  // Dialogs visibility state
  const [visibleBhamasah, setVisibleBhamasah] = useState(false);
  const [visibleProfession, setVisibleProfession] = useState(false);
  const [visibleFamily, setVisibleFamily] = useState(false);
  
  // Data state
  const [users, setUsers] = useState([]);
  const [recentMatches, setRecentMatches] = useState([]);
  const [featureTiles, setFeatureTiles] = useState([]);
  const [pageSettings, setPageSettings] = useState({
    showLocation: true,
    showMarquee: true
  });

  // Mock data for demonstration - kept for fallback
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

   // Fetch users from API
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

  // Fetch tiles and page settings from Strapi
  const fetchTilesAndSettings = async () => {
    try {
      const data = await getHomepageTiles();
      if (data && data.data) {
        // Extract tiles
        const visibleTiles = data.data.attributes.tiles.filter(tile => tile.isVisible !== false);
        setFeatureTiles(visibleTiles || []);
        
        // Extract page settings if they exist
        if (data.data.attributes.settings) {
          setPageSettings({
            showLocation: data.data.attributes.settings.showLocation !== false,
            showMarquee: data.data.attributes.settings.showMarquee !== false
          });
        }
      }
    } catch (error) {
      console.error("Error fetching tiles and settings:", error);
      // Fallback to hardcoded values if Strapi fetch fails
      setFeatureTiles([
        { 
          __component: 'feature-tiles.bhamasah-tile', 
          title: 'Donation', 
          description: 'Support our community',
          icon: null,
          isVisible: true
        },
        { 
          __component: 'feature-tiles.profession-tile', 
          title: 'Profession', 
          description: 'Find your profession',
          icon: null,
          isVisible: true
        }
      ]);
      setPageSettings({
        showLocation: true,
        showMarquee: true
      });
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchTilesAndSettings();
    
    // For demo, use mock data immediately
    setUsers(mockSuggestion);
    setRecentMatches(mockRecentMatches);
  }, []);
  
  // Render a tile based on its component type
  const renderTile = (tile) => {
    switch(tile.__component) {
      case 'feature-tiles.bhamasah-tile':
        return (
          <BhamasahTile 
            data={tile} 
            onOpen={() => setVisibleBhamasah(true)} 
          />
        );
      case 'feature-tiles.profession-tile':
        return (
          <ProfessionTile 
            data={tile} 
            onOpen={() => setVisibleProfession(true)} 
          />
        );
      case 'feature-tiles.family-tile':
        return (
          <FamilyTile 
            data={tile} 
            onOpen={() => setVisibleFamily(true)} 
          />
        );
      case 'feature-tiles.admin-list-tile':
        return <AdminListTile data={tile} />;
      default:
        return null;
    }
  };

  // Custom grid layout that handles automatic arrangement
  const renderTileGrid = () => {
    // Only work with visible tiles
    const visibleTilesArray = featureTiles.filter(tile => tile.isVisible !== false);
    
    // Empty state
    if (visibleTilesArray.length === 0) {
      return <div>No features available</div>;
    }
    
    // If there's only 1 tile, display it centered
    if (visibleTilesArray.length === 1) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', paddingTop: 16 }}>
          <div style={{ width: '50%' }}>
            {renderTile(visibleTilesArray[0])}
          </div>
        </div>
      );
    }
    
    // If we have 2 or more tiles, arrange them in a grid
    return (
      <Grid columns={2} gap={16}>
        {visibleTilesArray.map((tile, index) => (
          <Grid.Item key={`${tile.__component}-${index}`}>
            {renderTile(tile)}
          </Grid.Item>
        ))}
      </Grid>
    );
  };

  return (
    <div style={{padding:"16px"}}>
      {/* User Location - now with visibility control */}
      <UserLocation isVisible={pageSettings.showLocation} />
      
      {/* Marquee with visibility control */}
      {pageSettings.showMarquee && <Marquee mockSuggestion={mockSuggestion} />}
      
      {/* Dynamic Feature Tiles */}
      <div style={{ padding: 16 }}>
        {renderTileGrid()}
      </div>
      
      {/* Dialogs */}
      <ProfessionDialog visible={visibleProfession} onClose={() => setVisibleProfession(false)} />
      <MyFamilyDialog visible={visibleFamily} onClose={() => setVisibleFamily(false)} />
      <BhamasahDialog visible={visibleBhamasah} onClose={() => setVisibleBhamasah(false)} />
    </div>
  );
};

export default FeatureTiles;