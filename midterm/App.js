import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import HomeScreen from "./src/views/screens/HomeScreen";
import LoginScreen from "./src/views/screens/LoginScreen";
import SignupScreen from "./src/views/screens/SignupScreen";

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>

            <Stack.Navigator initialRouteName="LoginScreen">
                {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
                <Stack.Screen options={{ headerShown: false }} name="SignupScreen" component={SignupScreen} />
                <Stack.Screen options={{ headerShown: false }} name="LoginScreen" component={LoginScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;