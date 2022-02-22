import React from 'react';
import MainStackNavigator from './MainStackNavigator';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';


const NavigationCon = () => {

  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
};

export default NavigationCon;
