import React from 'react';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import { createStackNavigator} from '@react-navigation/stack';
import {Box, Text} from 'react-native-design-utility';
import { useTheme } from '@react-navigation/native';
import HomeScreen from '../components/Home';
import SettingsScreen from '../components/Settings';

const MainTab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const AboutStack = createStackNavigator();
const LibraryStack = createStackNavigator();
const iconSize = 24;

const HomeStackNavigator = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Group
                screenOptions={{ }}
            >
            <HomeStack.Screen name="HomeStack" options={{title: "Brainsm"}} component={HomeScreen} />
            {/* <HomeStack.Screen name="Nature" options={{title: "Brainsm"}} component={NatureScreen} />
            <HomeStack.Screen name="ASMR" options={{title: "Brainsm"}} component={ASMRScreen} />
            <HomeStack.Screen name="People" options={{title: "Brainsm"}} component={PeopleScreen} />
            <HomeStack.Screen name="Player" options={{title: "Player"}} component={Player} /> */}
            </HomeStack.Group>
        </HomeStack.Navigator>
    )
}
const LibraryStackNavigator = () => {
    return (
        <LibraryStack.Navigator>
            <LibraryStack.Group
                screenOptions={{ }}
            >
            <LibraryStack.Screen name="LibraryStack" options={{title: "Brainsm"}} component={HomeScreen} />
            {/* <LibraryStack.Screen name="Player" options={{title: "Player"}} component={Player} /> */}
            </LibraryStack.Group>
        </LibraryStack.Navigator>
    )
}
const AboutStackNavigator = () => {
    return (
        <AboutStack.Navigator>
            <AboutStack.Group
                screenOptions={{ }}
            >
            <AboutStack.Screen name="AboutStack" options={{title: "About"}} component={HomeScreen} />
            </AboutStack.Group>
        </AboutStack.Navigator>
    )
}

const MainTabNavigator = () => {
    return (
        <MainTab.Navigator tabBar={(tabsProps)=> (
            <>
                <BottomTabBar {...tabsProps} />
            </>
        )}>
            <MainTab.Group
                screenOptions={{headerShown: false}}
            >
                <MainTab.Screen name="Home" component={HomeScreen} options={{tabBarIcon: (props) => <Text>abc</Text>}} />
                <MainTab.Screen name="Library" component={SettingsScreen} options={{tabBarIcon: (props) => <Text>abc</Text>}}/>
                <MainTab.Screen name="Settings" component={HomeScreen} options={{tabBarIcon: (props) => <Text>abc</Text>}}/>
            </MainTab.Group>
        </MainTab.Navigator>
    )
}

export default MainTabNavigator;