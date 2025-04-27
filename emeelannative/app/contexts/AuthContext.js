// contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as apiLogin } from '../services/api'; 

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    isLoading: true,
    userToken: null,
  });

  const authContext = {
    signIn: async ({ username, password }) => {
      try {
        // Call real API
        const result = await apiLogin(username, password);
        const token = result.jwt; // assume API response has jwt

        if (token) {
          await AsyncStorage.setItem('userToken', token);
          setState({
            isLoading: false,
            userToken: token,
          });
          return { success: true };
        } else {
          return { success: false, error: 'No token received' };
        }
      } catch (error) {
        console.error('SignIn error:', error);
        return { success: false, error };
      }
    },

    signOut: async () => {
      try {
        await AsyncStorage.removeItem('userToken');
        setState({
          isLoading: false,
          userToken: null,
        });
      } catch (e) {
        console.error('SignOut error:', e);
      }
    },

    authState: state,
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setState({
          isLoading: false,
          userToken: token,
        });
      } catch (e) {
        console.error('Error checking token:', e);
        setState({
          isLoading: false,
          userToken: null,
        });
      }
    };

    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};
