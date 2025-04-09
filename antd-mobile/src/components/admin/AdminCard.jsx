import { Avatar } from 'antd-mobile';
import React from 'react'

export default function AdminCard({user}) {
    const images=user.images || {};
let userProfile= "https://demo.adminkit.io/img/avatars/avatar-4.jpg";
if (images.photos?.[0]?.url) {
  userProfile = images.photos[0].url;
} else if (images.profilePicture?.url) {
  userProfile = images.profilePicture.url;
} else if (Array.isArray(images.pictures) && images.pictures[0]) {
  userProfile = images.pictures[0];
}
    const avatar = user?.images[0] || 'https://via.placeholder.com/150';
    const name=user?.FirstName +""+ user?.LastName
    console.log("user",user," end")
  return (
    <>
     <div key={user.id} className="scroll-item" style={{ minWidth: '100px' }}>
          <Avatar
            src={userProfile}
            style={{
              '--size': '60px',
              borderRadius: '8px',
              marginBottom: '4px'
            }}
          />
          <div style={{ textAlign: 'center', fontSize: '12px', whiteSpace: 'nowrap' }}>
            <div>{name}, {user.age}</div>
            <div style={{ fontSize: '11px', color: '#555' }}>{user?.MobileNumber}</div>
            <div style={{ fontSize: '11px', color: '#777' }}>
             {user?.city}-{user?.state}
            </div>
          </div>
        </div>      
    </>
  )
}
