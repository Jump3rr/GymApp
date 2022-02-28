import React from 'react';
import 'react-native-gesture-handler';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { Text, UtilityThemeProvider } from 'react-native-design-utility';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import NavigationCon from './src/navigators/NavigationContainer';
import { useTranslation } from 'react-i18next';


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const { t, i18n } = useTranslation()

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
