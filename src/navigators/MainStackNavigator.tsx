import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabNavigator from "./MainTabNavigator";
import SettingsScreen from '../components/Settings';
import { useDispatch } from 'react-redux';
import { getRecords } from '../actions/recordsActions'

const MainStack = createNativeStackNavigator();

type GetRecords = ReturnType<typeof getRecords>;

const MainStackNavigator = () => {


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch<GetRecords>(getRecords());
    }, [dispatch]);

    return (
        <MainStack.Navigator>
            <MainStack.Group
                screenOptions={{headerShown: false, presentation: "modal"}}
            >
            <MainStack.Screen name ="Tabs" component={MainTabNavigator} />
            <MainStack.Screen name ="Player" component={SettingsScreen} />
            </MainStack.Group>
        </MainStack.Navigator>
    )
}

export default MainStackNavigator