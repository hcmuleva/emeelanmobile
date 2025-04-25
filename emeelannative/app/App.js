// App.js - Routes configuration
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from './contexts/AuthContext';

// Import screens
import LoginScreen from './screens/public/LoginScreen';
import HomeScreen from './screens/private/HomeScreen';

// Create stack navigators
const AuthStack = createStackNavigator();
const AppStack = createStackNavigator();

// Public routes (when not authenticated)
const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
  </AuthStack.Navigator>
);

// Protected routes (when authenticated)
const AppNavigator = () => (
  <AppStack.Navigator screenOptions={{ headerShown: false }}>
    <AppStack.Screen name="Home" component={HomeScreen} />
  </AppStack.Navigator>
);

// Root navigation component
export default function App() {
  const { authState } = useAuth();
  
  return (
    <NavigationContainer>
      {authState.userToken ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}