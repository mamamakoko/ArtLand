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

    const handleSubmit = () => {
        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Password:', password);
        // add code here to submit the form data to your server
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
