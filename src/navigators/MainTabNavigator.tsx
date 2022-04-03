import React from 'react';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Box, Text } from 'react-native-design-utility';
import { useTheme } from '@react-navigation/native';
import HomeScreen from '../components/Home';
import SettingsScreen from '../components/Settings';
import CalculatorMenu from '../components/calculators/CalculatorMenu';
import ResultsMain from '../components/Results/ResultsMain';
import LoginScreen from '../components/LoginScreen/LoginScreen';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
import { color } from '../constants/theme';
import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import MainStackNavigator from './MainStackNavigator';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CalculatorBMR from '../components/calculators/CalculatorBMR';
import CalculatorBMI from '../components/calculators/CalculatorBMI';
import CalculatorBF from '../components/calculators/CalculatorBF';

const MainTab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const AboutStack = createStackNavigator();
const LibraryStack = createStackNavigator();
const iconSize = 24;

const HomeStackNavigator = () => {
    const { t, i18n } = useTranslation();

    return (
        <HomeStack.Navigator>
            <HomeStack.Group
                screenOptions={{headerShown: false}}
            >
                <HomeStack.Screen name="HomeStack" component={HomeScreen} />
                <HomeStack.Screen name="CalculatorMenu" component={CalculatorStackNavigator} />
                {/* <HomeStack.Screen name="ASMR" options={{title: "Brainsm"}} component={ASMRScreen} />
                <HomeStack.Screen name="People" options={{title: "Brainsm"}} component={PeopleScreen} />
                <HomeStack.Screen name="Player" options={{title: "Player"}} component={Player} /> */}
            </HomeStack.Group>
        </HomeStack.Navigator>
    )
}

const CalculatorStackNavigator = () => {
    const { t, i18n } = useTranslation();

    return (
        <HomeStack.Navigator>
            <HomeStack.Group
                screenOptions={{headerShown: false}}
            >
                <HomeStack.Screen name="CalculatorMenu" component={CalculatorMenu} />
                <HomeStack.Screen name="CalculatorBMI" component={CalculatorBMI} />
                <HomeStack.Screen name="CalculatorBMR" component={CalculatorBMR} />
                <HomeStack.Screen name="CalculatorBF" component={CalculatorBF} />
            </HomeStack.Group>
        </HomeStack.Navigator>
    )
}

const LibraryStackNavigator = () => {
    return (
        <LibraryStack.Navigator>
            <LibraryStack.Group
                screenOptions={{}}
            >
                <LibraryStack.Screen name="LibraryStack" options={{ title: "Brainsm" }} component={HomeScreen} />
                {/* <LibraryStack.Screen name="Player" options={{title: "Player"}} component={Player} /> */}
            </LibraryStack.Group>
        </LibraryStack.Navigator>
    )
}
const AboutStackNavigator = () => {
    return (
        <AboutStack.Navigator>
            <AboutStack.Group
                screenOptions={{}}
            >
                <AboutStack.Screen name="AboutStack" options={{ title: "About" }} component={HomeScreen} />
            </AboutStack.Group>
        </AboutStack.Navigator>
    )
}

const MainTabNavigator = () => {
    return (
        <MainTab.Navigator tabBar={(tabsProps) => (
            <>
                <BottomTabBar {...tabsProps} />
            </>
        )}>
            <MainTab.Group
                screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: color.black } }}
            >
                <MainTab.Screen name="Home" component={HomeStackNavigator} options={{ tabBarIcon: (props) => <Text style={styles.tabIcons}>{t('Navigation.FirstTab')}</Text> }} />
                <MainTab.Screen name="Training" component={ResultsMain} options={{ tabBarIcon: (props) => <Text style={styles.tabIcons}>{t('Navigation.SecondTab')}</Text> }} />
                <MainTab.Screen name="Results" component={ResultsMain} options={{ tabBarIcon: (props) => <Text style={styles.tabIcons}>{t('Navigation.ThirdTab')}</Text> }} />
                <MainTab.Screen name="More" component={SettingsScreen} options={{ tabBarIcon: (props) => <Text style={styles.tabIcons}>{t('Navigation.FourthTab')}</Text> }} />
            </MainTab.Group>
        </MainTab.Navigator>
    )
}

export const styles = StyleSheet.create({
    tabIcons: {
        color: color.white
    }
})

export default MainTabNavigator;