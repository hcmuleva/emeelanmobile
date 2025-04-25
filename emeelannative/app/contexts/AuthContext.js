import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AuthContext = createContext();


export const useAuth = () => {
  return useContext(AuthContext);
};

// Authentication Provider component
export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    isLoading: true,
    isSignout: false,
    userToken: null,
  });

  // Authentication actions
  const authContext = {
    signIn: async (data) => {

      // For demo, I am using dummy data
      const { username, password } = data;
      const validUsers = [
        { username: 'user@hph.com', password: 'welcome123' },
        { username: 'admin@hph.com', password: 'admin123' },
      ];

      const validUser = validUsers.find(
        user => user.username === username && user.password === password
      );

      if (validUser) {
        try {
          // Store token in AsyncStorage
          await AsyncStorage.setItem('userToken', 'dummy-auth-token');
          setState({
            ...state,
            userToken: 'dummy-auth-token',
            isLoading: false
          });
          return { success: true };
        } catch (e) {
          console.error('Error storing auth token:', e);
          return { success: false, error: 'Login failed' };
        }
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    },
    signOut: async () => {
      try {
        // Clear token from AsyncStorage
        await AsyncStorage.removeItem('userToken');
        setState({
          ...state,
          userToken: null,
          isSignout: true,
        });
      } catch (e) {
        console.error('Error removing auth token:', e);
      }
    },
    // Expose auth state
    authState: state,
  };

  // Effect to check if user is already signed in
  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken = null;

      try {
        // Check if token exists in AsyncStorage
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.error('Failed to get token from storage:', e);
      }

      // After checking auth state, update the state
      setState({
        ...state,
        userToken,
        isLoading: false,
      });
    };

    bootstrapAsync();
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};