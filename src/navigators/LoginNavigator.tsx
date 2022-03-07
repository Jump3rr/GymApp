import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../components/LoginScreen/LoginScreen';
import RegisterScreen from '../components/LoginScreen/RegisterScreen';
import { NavigationContainer } from '@react-navigation/native';


const LoginStack = createNativeStackNavigator();

const LoginNavigator = () => {
    return (
        <NavigationContainer>
        <LoginStack.Navigator>
            <LoginStack.Group
                screenOptions={{headerShown: false, presentation: "modal"}}
            >
                <LoginStack.Screen name="Login" component={LoginScreen} />
                <LoginStack.Screen name="Register" component={RegisterScreen} />
            </LoginStack.Group>
        </LoginStack.Navigator>
        </NavigationContainer>
    )
}

export default LoginNavigator