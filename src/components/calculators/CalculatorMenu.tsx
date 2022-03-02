import React from 'react';
import { Text } from 'react-native-design-utility';
import { View, ScrollView, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import { Box } from 'react-native-design-utility';
import { useTranslation } from 'react-i18next';


const CalculatorMenu = () => {
    const { t, i18n } = useTranslation();

    const CalculatorsList = [
        {
            id: '1',
            title: t("Calculators.BMR.Title"),
            navigation: 'Calculator_BMR',
        },
        {
            id: '2',
            title: t("Calculators.BMI.Title"),
            navigation: 'Calculator_BMI',
        },
        {
            id: '3',
            title: t("Calculators.BF.Title"),
            navigation: 'Calculator_BF',
        },
    ];    

    return (
        <View>
            <FlatList
                style={styles.list}
                data={CalculatorsList}
                numColumns={1}
                renderItem={({item}) => (
                    <View style={styles.item}>
                        <Text>{item.title}</Text>
                    </View>
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