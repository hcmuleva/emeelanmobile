import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import ably from "../utils/ablyClient";
import { getUserById } from '../services/api';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
  const [jwt, setJwt] = useState(() => localStorage.getItem('jwt'));
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('authenticated') === 'true');
  const [loading, setLoading] = useState(true);
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [completionBar, setCompletionBar] = useState(0)

  const [userMe, setUserMe] = useState("")

  const channelRef = useRef(null); // 👈 Track the active channel
  const activeChannelId = useRef(null);
  const cleanupPromise = useRef(null);
  useEffect(() => {
    const storedJwt = localStorage.getItem('jwt');
    const storedUser = localStorage.getItem('user');
    const storedAuthenticated = localStorage.getItem('authenticated') === 'true';

    if (storedJwt && storedUser && storedAuthenticated) {
      setJwt(storedJwt);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    } else {
      setJwt(null);
      setUser(null);
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {

      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  const getMessage = (channelName) => {
    console.log("Channeld Name", channelName)
    const channel = ably.channels.get(channelName);

    const handleMessage = (message) => {
      console.log("EMEELAN ROLE Changes", message?.data)

      if (channelName.includes("userrole") && message.data?.emeelanrole) {
        updateUserField("emeelanrole", message.data.emeelanrole);
      }
      if (channelName.includes("userstatus") && message.data?.userstatus) {
        updateUserField("userstatus", message.data.userstatus);
      }
    };

    channel.subscribe("connection-request", handleMessage);

    return () => {
      channel.unsubscribe("connection-request", handleMessage);
    };
  }

  useEffect(() => {
    if (!user?.id) return;

    getMessage(`userrole:${user.id}`)
    getMessage(`userstatus:${user.id}`)

  }, [user?.id]);

  useEffect(() => {
    // Skip if user doesn't exist or progress is already 100
    if (!user?.id || completionBar === 100) return;

    const calculateProgress = async () => {
      try {
        const res = await getUserById(user.id, jwt);
        setUserMe(res); // Update userMe state
        let progressPer = 0;

        // Profile completeness checks
        if (res?.mybasicdata?.aboutme) progressPer += 10;
        if (res?.mybasicdata?.educations?.[0]) progressPer += 10;
        if (res?.mybasicdata?.families?.[0]) progressPer += 20;
        if (res?.mybasicdata?.preferences?.[0]) progressPer += 10;
        if (res?.mybasicdata?.professions?.[0]) progressPer += 10;
        if (res?.profilePicture) progressPer += 10;
        if (res?.photos?.[0]) progressPer += 10;

        // Basic info completeness check
        const requiredBasicFields = ['FirstName', 'LastName', 'age', 'Height', 'postalcode', 'mobile'];
        if (requiredBasicFields.every(key => !!user?.[key])) progressPer += 20;

        // Only update if changed to prevent unnecessary re-renders
        if (progressPer !== completionBar) {
          setCompletionBar(progressPer);
        }
      } catch (error) {
        console.error("Error calculating progress:", error);
      }
    };

    calculateProgress();
  }, [user, profileUpdated, jwt, completionBar]); // Add all dependencies here

  const login = (token, userData) => {
    localStorage.setItem('jwt', token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('authenticated', 'true');
    setJwt(token);
    setUser(userData);
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    localStorage.setItem('authenticated', 'false');
    setJwt(null);
    setUser(null);
    setIsAuthenticated(false);
    return false;
  };

  const updateUser = (updatedFields) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, ...updatedFields };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
    setProfileUpdated(prev => !prev);
  };

  const updateUserField = (key, value) => {
    updateUser({ [key]: value });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        jwt,
        setJwt,
        isAuthenticated,
        setIsAuthenticated,
        loading,
        login,
        logout,
        profileUpdated,
        setProfileUpdated,
        updateUser,
        updateUserField,
        completionBar
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
