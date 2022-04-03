import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
  StatusBar,
  Text
} from 'react-native';
import { UtilityThemeProvider } from 'react-native-design-utility';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import NavigationCon from './src/navigators/NavigationContainer';
import { useTranslation } from 'react-i18next';
import { color, theme } from './src/constants/theme';
import auth from '@react-native-firebase/auth';
import store from './src/tools/store';
import { Provider } from 'react-redux';
//import LoginScreen from './src/components/LoginScreen/LoginScreen';
import LoginNavigator from './src/navigators/LoginNavigator';
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

  if (!user) {
    return (
        <View style={styles.container}>
          <ScrollView keyboardShouldPersistTaps='never' contentContainerStyle={{flexGrow: 1}}>
          <LoginNavigator />
          </ScrollView>
        </View>
    );
  }

  return (
    <UtilityThemeProvider theme={theme}>
            <Provider store={store}>
      <View style={styles.container}>
        {/* <Provider store={store}> */}
        <NavigationCon />
        {/* </Provider> */}
      </View>
      </Provider>
    </UtilityThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.grey,
    color: color.white
    
  },
  scrollView: {
    flex: 1,
  },
  text: {
    fontSize: 42,
  },
});

export default App;
