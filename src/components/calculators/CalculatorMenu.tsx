import React from 'react';
import { View, ScrollView, SafeAreaView, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Box } from 'react-native-design-utility';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';


const CalculatorMenu = () => {
    const navigation = useNavigation();
    const { t, i18n } = useTranslation();

    const CalculatorsList = [
        {
            id: '1',
            title: t("Calculators.BMR.Title"),
            navigation: 'CalculatorBMR',
        },
        {
            id: '2',
            title: t("Calculators.BMI.Title"),
            navigation: 'CalculatorBMI',
        },
        {
            id: '3',
            title: t("Calculators.Kcal.Title"),
            navigation: 'CalculatorKcal',
        },
        {
            id: '4',
            title: t("Calculators.BF.Title"),
            navigation: 'CalculatorBF',
        },
    ];    

    return (
        <View>
            <FlatList
                style={styles.list}
                data={CalculatorsList}
                numColumns={1}
                renderItem={({item}) => (
                    <TouchableOpacity style={styles.item} onPress={() => navigation.navigate(item.navigation)}>
                        <Text>{item.title}</Text>
                    </TouchableOpacity>
                )} 
                keyExtractor={item => item.id}
            />
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

export default CalculatorMenu