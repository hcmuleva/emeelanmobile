import React, { useState } from 'react'
import { UploadImagesDialog } from '../components/homepage/UploadImagesDialog';
import { ResetPasswordDialog } from '../pages/homepage/ResetPasswordDialog';
import { SettingsDialog } from '../components/homepage/SettingsDialog';
import { AlipayCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import { Card, Divider, Grid } from 'antd-mobile';
import {
  LockOutline,
  PictureOutline,
  SetOutline,
  TeamOutline,
  TravelOutline
} from 'antd-mobile-icons';
import { useNavigate } from 'react-router-dom';

const tiles = [
  { title: 'Logout', color: '#A5D8FF', icon: <LogoutOutlined style={{ fontSize: 24, color: '#212121' }} />, key: 'logout' },
  { title: 'Help', color: '#B2F2BB', icon: <TravelOutline style={{ fontSize: 24, color: '#212121' }} />, key: 'help' },
  { title: 'Password', color: '#AA0BFF', icon: <LockOutline style={{ fontSize: 24, color: '#212121' }} />, key: 'password' },
  { title: 'Settings', color: '#8CE99A', icon: <SetOutline style={{ fontSize: 24, color: '#212121' }} />, key: 'settings' },
  { title: 'UploadImages', color: '#FFA94D', icon: <PictureOutline style={{ fontSize: 24, color: '#212121' }} />, key: 'images' }
]

const UserProfile = () => {
  const [visibleUploadImages, setVisibleUploadImages] = useState(false);
  const [visibleSettings,setSettings] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);

  const navigate = useNavigate();

  const handleTileClick = (tileKey) => {
    switch(tileKey){
      case 'password':
        // Handle Password click
        console.log('Password tile clicked');
        setVisiblePassword(true);
        break;
      case 'settings':
        // Handle Settings click
        setSettings(true)
        console.log('Settings tile clicked');
        break;
      case 'images':
        // Handle Images click
        console.log('Images tile clicked');
        setVisibleUploadImages(true)
        break;
      case 'logout':
        localStorage.removeItem("token"); // Clear auth token
        localStorage.removeItem("user");  // Clear user data
        navigate("/login"); // Redirect to login page
        // Handle Logout click
        console.log('Logout tile clicked');
        // Add your logout logic here
        break;
      case 'help':
        // Handle Help click
        console.log('Help tile clicked');
        // Add your help logic here
        break;
      default:
      console.log('Unknown tile clicked');
    }
  }
  
  return (
    <>
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
        <Divider contentPosition="center"> Help Section</Divider>
        <Grid columns={2} gap={16} style={{ padding: 16 }}>
      </Grid>
      <ResetPasswordDialog 
        visible={visiblePassword} 
        onClose={() => setVisiblePassword(false)} 
      />
      <UploadImagesDialog visible={visibleUploadImages} onClose={()=>setVisibleUploadImages(false)} />
      <SettingsDialog visible={visibleSettings} onClose={()=>setSettings(false)} />
    </>
  )
}

export default UserProfile