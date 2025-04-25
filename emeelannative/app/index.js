// index.js - Main entry point
import { registerRootComponent } from 'expo';
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import App from './App';

// Main component that wraps our app with the AuthProvider
function Main() {
  return (
    <AuthProvider>
      <AppWithAuth />
    </AuthProvider>
  );
}

// Component that accesses auth state and decides what to render
function AppWithAuth() {
  const { authState } = useAuth();
  
  if (authState.isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  
  return <App />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

// Register the root component
export default Main;
registerRootComponent(Main);