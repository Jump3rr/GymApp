import React from 'react';
import { View, ScrollView, SafeAreaView, FlatList, StyleSheet, Text } from 'react-native';
import { useTranslation } from 'react-i18next';


const CalculatorBF = () => {
    const { t, i18n } = useTranslation();
   

    return (
        <View>
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        minWidth: '100%'
    },
    item: {
        flex: 1,
        margin: 5,
        backgroundColor: 'grey',
        height: 230,
        maxWidth: '100%',
        alignItems: 'center'
    },
});

export default CalculatorBF