import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { Font } from 'expo';
import { StatusBar } from 'expo-status-bar';

import {SignupScreen} from './OpeningScreen';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // TODO: handle sign-in logic
  };

  return (
    <ImageBackground source={require('../../img/background.png')} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.logo}>ArtLand</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#f8f9fa"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#f8f9fa"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
        </View>

        {/* login button */}

        <TouchableOpacity style={styles.loginBtn} onPress={handleSignIn}>
          <Text style={styles.loginText}>SIGN IN</Text>
        </TouchableOpacity>

        {/* other way of login */}

        <View style={styles.contContainer}>
          <View>
            <SignupScreen text="Click me!" onPress={handlePress} />
          </View>

          <View style={styles.contTextContainer}>
            <Text style={styles.contText}>or continue with</Text>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {  // main container
    flex: 1,
    backgroundColor: 'rgba(52, 58, 64, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontFamily: 'FrederickatheGreat-Regular',
    // fontWeight: 'bold',
    fontSize: 50,
    color: '#f8f9fa',
    marginBottom: 40,
  },
  inputView: {
    width: '65%',
    marginBottom: 20,
    alignItems: 'center',
  },
  inputText: {
    height: 50,
    color: '#f8f9fa',
    opacity: 0.6,
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 0,
    borderBottomWidth: 2,
    borderBottomColor: '#f8f9fa',
  },
  loginBtn: {
    width: '60%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: '#f8f9fa',
  },

  contContainer: {
    width: '65%',
    alignItems: 'center',
    marginTop: 20,
  },
  contText: {
    alignItems: 'center',
    height: 30,
    color: '#f8f9fa90',
    fontWeight: 'bold',
    width: '100%',
    fontSize: 14,
    paddingLeft: '20%',
    paddingRight: '20%',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f9fa90',
  },
});
