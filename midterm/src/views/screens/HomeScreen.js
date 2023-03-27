import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import auth from '@react-native-firebase/auth';

const HomeScreen = ({ navigation, route }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    async function getUsername() {
      try {
        const userData = await AsyncStorage.getItem('userData');
        const { username } = JSON.parse(userData);
        setUsername(username);
      } catch (error) {
        console.error('Error while retrieving user data:', error);
      }
    }

    getUsername();
  }, []);

  const handleLogout = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('value');
      if (jsonValue !== null) {
        const value = JSON.parse(jsonValue);
        value.loggedIn = false;
        await AsyncStorage.setItem('value', JSON.stringify(value));
      }
      navigation.navigate('LoginScreen');
      auth()
        .signOut()
        .then(() => console.log('User signed out!'));

    } catch (error) {
      console.error('Error while logging out:', error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to ArtLand, {username}!</Text>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logoutBtn: {
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 5,
    width: '60%',
  },
  logoutText: {
    color: '#f8f9fa',
  },
});

export default HomeScreen;
