// screens/private/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

// Dummy data for home screen
const dummyPosts = [
  { id: '1', title: 'Welcome to your dashboard', content: 'This is your private area after successful login.' },
  { id: '2', title: 'Getting Started', content: 'Explore the features available in this protected area.' },
  { id: '3', title: 'Security Note', content: 'Remember to logout when you\'re done using the application.' },
  { id: '4', title: 'User Settings', content: 'You can update your profile in the settings.' },
  { id: '5', title: 'App Updates', content: 'Check regularly for new features and improvements.' },
];

export default function HomeScreen() {
  const { signOut } = useAuth();
  
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardContent}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={signOut}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.welcomeText}>
          Welcome to your private area
        </Text>
        
        <FlatList
          data={dummyPosts}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  header: {
    backgroundColor: '#007BFF',
    padding: 15,
    paddingTop: 50, // For status bar
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    // Fixed shadow properties to use boxShadow instead of deprecated shadowX properties
    elevation: 2,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  cardContent: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  }
});