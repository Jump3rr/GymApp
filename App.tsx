import React from 'react';
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


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const { t, i18n } = useTranslation()

  return (
    <UtilityThemeProvider theme={theme}>
        <View style={{flex: 1}}>
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
