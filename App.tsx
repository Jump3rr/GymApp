import React from 'react';
import 'react-native-gesture-handler';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { UtilityThemeProvider } from 'react-native-design-utility';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import NavigationCon from './src/navigators/NavigationContainer';


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <UtilityThemeProvider>
      {/* <Provider store={store}> */}
          <NavigationCon />
      {/* </Provider> */}
    </UtilityThemeProvider>
  );
};

const styles = StyleSheet.create({
});

export default App;
