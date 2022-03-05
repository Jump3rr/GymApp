import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
  StatusBar
} from 'react-native';
import { Text, UtilityThemeProvider } from 'react-native-design-utility';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import NavigationCon from './src/navigators/NavigationContainer';
import { useTranslation } from 'react-i18next';
import { theme } from './src/constants/theme';
import auth from '@react-native-firebase/auth';
import LoginScreen from './src/components/LoginScreen/LoginScreen';


const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const { t, i18n } = useTranslation();

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  console.log(user);
  if (!user) {
    return (
      <UtilityThemeProvider theme={theme}>
        <View style={{ flex: 1 }}>
          <LoginScreen />
        </View>
      </UtilityThemeProvider>
    );
  }

  return (
    <UtilityThemeProvider theme={theme}>
      <View style={{ flex: 1 }}>
        {/* <Provider store={store}> */}
        <NavigationCon />
        {/* </Provider> */}
      </View>
    </UtilityThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
  },
  text: {
    fontSize: 42,
  },
});

export default App;
