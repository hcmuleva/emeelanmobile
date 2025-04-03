import { AlipayCircleOutlined } from '@ant-design/icons';
import { Card, Grid, NoticeBar, ProgressCircle, Space, Toast } from 'antd-mobile';
import {
  LockOutline,
  PictureOutline,
  SetOutline,
  TeamOutline,
  TravelOutline
} from 'antd-mobile-icons';
import React, { useState } from 'react';
import { ResetPasswordDialog } from './ResetPasswordDialog';
import ScrollingTextBanner from '../../components/homepage/ScrollingTextBanner';
const tiles = [
    { title: 'Bhamasah', color: '#A5D8FF', icon: <AlipayCircleOutlined style={{ fontSize: 24, color: '#212121' }} />, key: 'bhamasah' },
    { title: 'Profession', color: '#B2F2BB', icon: <TravelOutline style={{ fontSize: 24, color: '#212121' }} />, key: 'profession' },
    { title: 'MyFamily', color: '#FFD8A8', icon: <TeamOutline style={{ fontSize: 24, color: '#212121' }} />, key: 'family' },
    { title: 'Admin List', color: '#FFC9C9', icon: <TeamOutline style={{ fontSize: 24, color: '#212121' }} />, key: 'admin' },
    { title: 'Password', color: '#AA0BFF', icon: <LockOutline style={{ fontSize: 24, color: '#212121' }} />, key: 'password' },
    { title: 'Settings', color: '#8CE99A', icon: <SetOutline style={{ fontSize: 24, color: '#212121' }} />, key: 'settings' },
    { title: 'UploadImages', color: '#FFA94D', icon: <PictureOutline style={{ fontSize: 24, color: '#212121' }} />, key: 'images' }
  ];
  
const demoLongText = " This is a sample long text and heere is our message "
const FeatureTiles = () => {
  const [visiblePassword, setVisiblePassword] = useState(false);

  const handleTileClick = (tileKey) => {
    switch(tileKey) {
      case 'bhamasah':
        // Handle Bhamasah click
        console.log('Bhamasah tile clicked');
        Toast.show('Opening Bhamasah section');
        break;
      case 'profession':
        // Handle Profession click
        console.log('Profession tile clicked');
        Toast.show('Opening Profession section');
        break;
      case 'family':
        // Handle Family click
        console.log('Family tile clicked');
        Toast.show('Opening Family section');
        break;
      case 'admin':
        // Handle Admin List click
        console.log('Admin List tile clicked');
        Toast.show('Opening Admin List');
        break;
      case 'password':
        // Handle Password click
        console.log('Password tile clicked');
        setVisiblePassword(true);
        break;
      case 'settings':
        // Handle Settings click
        console.log('Settings tile clicked');
        Toast.show('Opening Settings');
        break;
      case 'images':
        // Handle Images click
        console.log('Images tile clicked');
        Toast.show('Opening Images');
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

      <ResetPasswordDialog 
        visible={visiblePassword} 
        onClose={() => setVisiblePassword(false)} 
      />
    </>
  );
};

export default FeatureTiles;