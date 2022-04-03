import React from 'react';
import MainStackNavigator from './MainStackNavigator';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { BWLDefaultTheme } from '../tools/themes';


const NavigationCon = () => {

  return (
    <NavigationContainer theme={BWLDefaultTheme}>
      <MainStackNavigator />
    </NavigationContainer>
  );
};

export default NavigationCon;
