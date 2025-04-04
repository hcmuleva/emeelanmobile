import React, { useEffect, useState } from 'react';
import { Layout, Spin } from 'antd';
import { useNavigate } from "react-router-dom";
import { useLogout, useOne } from "@refinedev/core";
import ProfileComponent from './UserProfile/ProfileComponent';
import Header from '../Header';

const { Content } = Layout;

export default function MyProfile() {
  const [isEditProfile, setIsEditProfile] = useState(false);
  const userid = localStorage.getItem("userid");
 
  const { data, isLoading } = useOne({
    resource: "users",
    id: String(userid),
    meta: {
      populate: ["profilePicture"],
    },
  });

  const user = data?.data;

  if (isLoading) {
    return <p>Loading...</p>;
  }
  console.log("user",user)
  return(<>
   <Header />
  </>)
  return (
    <>
      <ProfileComponent userid={userid} />
    </>
  );
}
