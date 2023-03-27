import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Text, TextInput, TouchableOpacity, ImageBackground, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// firebase
import 'expo-dev-client';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// default function
export default function SignInScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const [userData, setUserData] = useState({ email: '', password: '' });

  const getUserData = async () => {
    try {
      let value = await AsyncStorage.getItem('userData');
      if (value !== null) {
        return JSON.parse(value);
      }
    } catch (e) {
      console.log(e);
    }
    return null;
  };


  const handleSignIn = async () => {
    const value = await getUserData();
    if (value && email === value.email && password === value.password) {
      // Navigate to another screen if login data is matched
      navigation.navigate('HomeScreen');
      AsyncStorage.setItem(
        "value",
        JSON.stringify({ ...value, loggedIn: true })
      );
    } else {
      // Display error message if login data is not matched
      console.log('Invalid email or password');
    }
  };


  GoogleSignin.configure({
    webClientId: '470967437584-ualsqii53b4628ql7rtacib9moqpg5f0.apps.googleusercontent.com',
  });

  // function for google button
  const onGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    // return auth().signInWithCredential(googleCredential);
    const userGoogle = auth().signInWithCredential(googleCredential);
    userGoogle
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);

    if (initializing) setInitializing(false);
  }

  if (user) {
    console.log("user >>");
    console.log("user");
    console.log("user <<");
  } else {
    console.log("No user specified");
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <ImageBackground source={require('../../img/background.png')} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.logo}>ArtLand</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#f8f9fa90"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#f8f9fa90"
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
          <Text style={styles.registerText} onPress={() => navigation.navigate('SignupScreen')}>
            Don't have an account? Register
          </Text>

          <View style={styles.contTextContainer}>
            <Text style={styles.contText}>or continue with</Text>
          </View>

          <Button
            style={styles.googleBtn}
            title="Google"
            onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
          />
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
    opacity: 1,
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 0,
    borderBottomWidth: 2,
    borderBottomColor: '#f8f9fa90',
  },
  loginBtn: {
    width: '60%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 5,
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

  // Register text
  registerText: {
    color: '#f8f9fa',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 40,
  },

  // Google button
  // googleBtn: {
  //   paddingTop: 50,
  // }
});
