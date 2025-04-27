// src/navigation/PublicStackNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/public/LoginScreen';
import SignupScreen from '../screens/public/SignupScreen';

const Stack = createNativeStackNavigator();

const PublicStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </Stack.Navigator>
);

export default PublicStackNavigator;
