import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSubmit = async () => {
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    try {
      await saveUserData(username, email, password);
      console.log('User data saved successfully.');
    } catch (error) {
      console.error('Error while saving user data:', error);
    }
    // add code here to submit the form data to your server
  };

  const saveUserData = async (username, email, password) => {
    try {
      const userData = { username, email, password };
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      navigation.navigate('LoginScreen')

    } catch (error) {
      console.error('Error while saving user data:', error);
      throw error;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={handleUsernameChange}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={handleEmailChange}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={handlePasswordChange}
        value={password}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: '80%',
  },
});

export default SignupScreen;
