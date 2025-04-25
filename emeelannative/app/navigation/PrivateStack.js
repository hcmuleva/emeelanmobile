import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// (Assume these screen components exist under ../screens/private/)
import HomeScreen from '../screens/private/HomeScreen';
// import ProfileScreen from '../screens/private/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function PrivateStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
    </Stack.Navigator>
  );
}
