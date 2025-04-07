import React from 'react'
import MobileImageUploader from '../../../common/MobileImageUploader'

export default function ProfilePhotos() {
  const MAX_IMAGES = process.env.REACT_APP_MAXPAGE
  const jwt = localStorage.getItem("jwt")
    const {user} = useContext(AuthContext)
    
  

  return (
    <div>
      <MobileImageUploader MAX_IMAGES={MAX_IMAGES} jwt={jwt} user={user}/>
    </div>
  )
}
