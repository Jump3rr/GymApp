import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'react-native-gesture-handler';
import { color } from '../../constants/theme';

const CalculatorBMI = () => {
    const { t, i18n } = useTranslation();
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [result, setResult] = useState(0);
    const [textResult, setTextResult] = useState('');

    const calculateBmi = (height: number, weight: number) => {
        setResult(+(weight/Math.pow(height/100, 2)).toFixed(2))
    }

    return (
        <View style={styles.main}>
            <View style={styles.oneRow}>
                <Text>{t("Calculators.BMI.Height")}:</Text>
                <TextInput style={styles.inputs} value={height.toString()} onChangeText={(height) => setHeight(Number(height))} keyboardType="numeric"></TextInput>
            </View>
            <View style={styles.oneRow}>
                <Text>{t("Calculators.BMI.Weight")}:</Text>
                <TextInput style={styles.inputs} value={weight.toString()} onChangeText={(weight) => setWeight(Number(weight))} keyboardType="numeric"></TextInput>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => calculateBmi(height, weight)}>
                <Text>Calculate</Text>
            </TouchableOpacity>
            {result !== 0 && (
                <View>
                    <Text>{t("Calculators.BMI.Result")} {result}</Text>
                    <Text>{textResult}</Text>
                </View>
            )}
            <View>
                <Text>{t("Calculators.BMI.Categories")}</Text>
                <Text>&#60; 16 - {t("Calculators.BMI.SeverelyUnderweight")}</Text>
                <Text>16.1 - 18.4 - {t("Calculators.BMI.Underweight")}</Text>
                <Text>18.5 - 24.9 - {t("Calculators.BMI.Normal")}</Text>
                <Text>25.0 - 29.9 - {t("Calculators.BMI.Overweight")}</Text>
                <Text>30.0 - 34.9 - {t("Calculators.BMI.Obese")}</Text>
                <Text>&#62; 35.0 - {t("Calculators.BMI.ExtremelyObese")}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        margin: 5,
        backgroundColor: 'grey',
        height: 230,
        maxWidth: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    oneRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    inputs: {
        backgroundColor: color.red,
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 0,
        marginLeft: 30,
        width: 100,
    },
    button: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 20,
        padding: 10,
        marginVertical: 20,
        backgroundColor: color.lime,
    }
});

export default CalculatorBMI