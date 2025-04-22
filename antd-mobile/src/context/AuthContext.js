  import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
  import ably from "../utils/ablyClient";

  export const AuthContext = createContext();

  export const useAuth = () => useContext(AuthContext);

  export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
    const [jwt, setJwt] = useState(() => localStorage.getItem('jwt'));
    const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('authenticated') === 'true');
    const [loading, setLoading] = useState(true);
    const [profileUpdated, setProfileUpdated] = useState(false);
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

    useEffect(() => {
      if (!user?.id) return;
    
      const channel = ably.channels.get(`userrole:${user.id}`);
      
      const handleMessage = (message) => {
        console.log("EMEELAN ROLE Changes", message?.data)
        if (message.data?.emeelanrole) {
          updateUserField("emeelanrole", message.data.emeelanrole);
        }
      };
    
      channel.subscribe("connection-request", handleMessage);
    
      return () => {
        channel.unsubscribe("connection-request", handleMessage);
      };
    }, [user?.id]);

    
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
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
