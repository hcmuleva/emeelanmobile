import { AlipayCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import { Card, Divider, Grid, NoticeBar, ProgressCircle, Space, Toast } from 'antd-mobile';
import {
  LockOutline,
  PictureOutline,
  SetOutline,
  TeamOutline,
  TravelOutline
} from 'antd-mobile-icons';
import React, { useState } from 'react';
import { ResetPasswordDialog } from './ResetPasswordDialog';
import { BhamasahDialog } from '../../components/homepage/BhamasahDialog';
import { ProfessionDialog } from '../../components/homepage/ProfessionDialog';
import { MyFamilyDialog } from '../../components/homepage/MyFamilyDialog';
import { AdminListDialog } from '../../components/homepage/AdminListDialog';
import { SettingsDialog } from '../../components/homepage/SettingsDialog';
import { UploadImagesDialog } from '../../components/homepage/UploadImagesDialog';
const tiles = [
    { title: 'Bhamasah', color: '#A5D8FF', icon: <AlipayCircleOutlined style={{ fontSize: 24, color: '#212121' }} />, key: 'bhamasah' },
    { title: 'Profession', color: '#B2F2BB', icon: <TravelOutline style={{ fontSize: 24, color: '#212121' }} />, key: 'profession' },
    { title: 'MyFamily', color: '#FFD8A8', icon: <TeamOutline style={{ fontSize: 24, color: '#212121' }} />, key: 'family' },
    { title: 'Admin List', color: '#FFC9C9', icon: <TeamOutline style={{ fontSize: 24, color: '#212121' }} />, key: 'admin' },
    { title: 'Password', color: '#AA0BFF', icon: <LockOutline style={{ fontSize: 24, color: '#212121' }} />, key: 'password' },
    { title: 'Settings', color: '#8CE99A', icon: <SetOutline style={{ fontSize: 24, color: '#212121' }} />, key: 'settings' },
    { title: 'UploadImages', color: '#FFA94D', icon: <PictureOutline style={{ fontSize: 24, color: '#212121' }} />, key: 'images' }
  ];
  
const secondTiles = [
  { title: 'Logout', color: '#A5D8FF', icon: <LogoutOutlined style={{ fontSize: 24, color: '#212121' }} />, key: 'logout' },
  { title: 'Help', color: '#B2F2BB', icon: <TravelOutline style={{ fontSize: 24, color: '#212121' }} />, key: 'help' },
]
const demoLongText = " This is a sample long text and heere is our message "
const FeatureTiles = () => {
  const [visibleBhamasah, setVisibleBhamasah] = useState(false);
  const [visibleProfession, setVisibleProfession] = useState(false);
  const [visibleAdminList, setVisibleAdminList] = useState(false);
   
  const [visibleUploadImages, setVisibleUploadImages] = useState(false);

  const [visiblePassword, setVisiblePassword] = useState(false);

  const [visibleFamily, setVisibleFamily] = useState(false);
  const [visibleSettings,setSettings] = useState(false);
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
      default:
        console.log('Unknown tile clicked');
    }
  };

  return (
    <>
      <NoticeBar content={demoLongText} color='alert'/>
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
        <Divider contentPosition="center"> Help Section</Divider>
        <Grid columns={2} gap={16} style={{ padding: 16 }}>
        {secondTiles.map((tile) => (
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
      <ResetPasswordDialog 
        visible={visiblePassword} 
        onClose={() => setVisiblePassword(false)} 
      />
      <ProfessionDialog visible={visibleProfession} onClose={()=>setVisibleProfession(false)} />
      <MyFamilyDialog visible={visibleFamily} onClose={()=>setVisibleFamily(false)} />
      <AdminListDialog visible={visibleAdminList} onClose={()=>setVisibleAdminList(false)} />
      <SettingsDialog visible={visibleSettings} onClose={()=>setSettings(false)} />
      <BhamasahDialog visible={visibleBhamasah} onClose={()=>setVisibleBhamasah(false)} />
      <UploadImagesDialog visible={visibleUploadImages} onClose={()=>setVisibleUploadImages(false)} />
    </>
  );
};

export default FeatureTiles;