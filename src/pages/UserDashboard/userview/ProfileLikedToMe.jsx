import React from 'react'
const API_URL=import.meta.env.VITE_SERVER_URL
export default function ProfileLikedToMe() {

    const getProfileLikedToMe = async () => {
        const userId = localStorage.getItem("userid")
        const response = await fetch(`${API_URL}/users/${userId}/populate[likesby][populate][accepted]=*`)
        const data = await response.json()
        console.log("Data", data)
    }
  /**
   * profile liked to me 
   *   This is request come to me and I need to take a action on it to accept or reject 
   *  1)  We have two level of list 1) acceptedbyme[] from me 2) accepted by me from users.likesby.accepted[]
   * 2) I need to show the list of profiles liked by me
   * 3) I need to show the list of profiles accepted by me
   * 4) I need to show the list of profiles rejected by me
   */
  return (
    <div>
      <h1>ProfileLiked To me</h1>
    </div>
  )
}
