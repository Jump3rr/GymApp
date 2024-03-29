import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'react-native-gesture-handler';
import { color } from '../../constants/theme';
import { RadioButton } from 'react-native-paper';

const CalculatorBMI = () => {
    const { t, i18n } = useTranslation();
    const [height, setHeight] = useState('');
    const [heightInches, setHeightInches] = useState('');
    const [weight, setWeight] = useState('');
    const [result, setResult] = useState(0);
    const [textResult, setTextResult] = useState('');
    const [colorResult, setColorResult] = useState(color.white);
    const [unit, setUnit] = useState('eu')

    const calculateBmi = (height: any, weight: any, heightInches?: any) => {
        height = height.replace(/,/, '.');
        weight = weight.replace(/,/, '.');
        setTextResult('');
        if (height === 0 || weight === 0) {
            setTextResult('You have to fill all fields!')
            setResult(0);
            return;
        }
        if (unit === 'us') {
            weight = weight * 0.45359237;
            height = height * 30.48;
            if (heightInches) {
                height += heightInches * 2.54;
                heightInches = heightInches.replace(/,/, '.');
            }
            console.log(height)
            console.log(weight)
        }
        const bmi = +(weight / Math.pow(height / 100, 2)).toFixed(2);
        setResult(bmi);

        if (bmi < 16) {
            setTextResult(t("Calculators.BMI.SeverelyUnderweight"));
            setColorResult(color.red)
        }
        else if (bmi < 18.5) {
            setTextResult(t("Calculators.BMI.Underweight"));
            setColorResult(color.redLight)
        }
        else if (bmi < 25) {
            setTextResult(t("Calculators.BMI.Normal"));
            setColorResult(color.green)
        }
        else if (bmi < 30) {
            setTextResult(t("Calculators.BMI.Overweight"));
            setColorResult(color.redLight)
        }
        else if (bmi < 35) {
            setTextResult(t("Calculators.BMI.Obese"));
            setColorResult(color.red)
        }
        else {
            setTextResult(t("Calculators.BMI.ExtremelyObese"));
            setColorResult(color.redDark)
        }

    }

    return (
        <View style={styles.main}>
            <View style={styles.oneRow}>
                <RadioButton.Group onValueChange={newValue => setUnit(newValue)} value={unit}>
                    <View style={styles.unitsSettings}>
                        <View style={styles.oneUnitSettings}>
                            <Text style={styles.unitText}>Metric Units</Text>
                            <RadioButton value="eu" />
                        </View>
                        <View style={styles.oneUnitSettings}>
                            <Text style={styles.unitText}>US Units</Text>
                            <RadioButton value="us" />
                        </View>
                    </View>
                </RadioButton.Group>
            </View>
            {unit === 'eu' && (
                <>
                    <View style={styles.oneRow}>
                        <Text>{t("Calculators.BMI.Height")} (cm):</Text>
                        <TextInput style={styles.inputs} value={height.toString()} onChangeText={(height) => setHeight(height)} keyboardType="numeric"></TextInput>
                    </View>
                    <View style={styles.oneRow}>
                        <Text>{t("Calculators.BMI.Weight")} (kg):</Text>
                        <TextInput style={styles.inputs} value={weight.toString()} onChangeText={(weight) => setWeight(weight)} keyboardType="numeric"></TextInput>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => calculateBmi(height, weight)}>
                        <Text>Calculate</Text>
                    </TouchableOpacity>
                </>
            )}
            {unit === 'us' && (
                <>
                    <View style={styles.oneRow}>
                        <Text style={{width: '60%'}}>{t("Calculators.BMI.Height")} (feet):</Text>
                        <TextInput style={styles.inputs} value={height.toString()} onChangeText={(height) => setHeight(height)} keyboardType="numeric"></TextInput>
                    </View>
                    <View style={styles.oneRow}>
                        <Text style={{width: '60%'}}>{t("Calculators.BMI.Height")} (inches):</Text>
                        <TextInput style={styles.inputs} value={heightInches.toString()} onChangeText={(heightInches) => setHeightInches(heightInches)} keyboardType="numeric"></TextInput>
                    </View>
                    <View style={styles.oneRow}>
                        <Text style={{width: '60%'}}>{t("Calculators.BMI.Weight")} (pounds):</Text>
                        <TextInput style={styles.inputs} value={weight.toString()} onChangeText={(weight) => setWeight(weight)} keyboardType="numeric"></TextInput>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => calculateBmi(height, weight, heightInches)}>
                        <Text>Calculate</Text>
                    </TouchableOpacity>
                </>
            )}
            {result !== 0 && (
                <View>
                    <Text>{t("Calculators.BMI.Result")} {result}</Text>
                </View>
            )}
            {textResult !== '' && (
                <View>
                    <Text style={{ color: colorResult }}>{textResult}</Text>
                </View>
            )}
            <View style={{ width: '70%' }}>
                <Text>{t("Calculators.BMI.Categories")}</Text>
                <View style={styles.categories}>
                    <Text>&#60; 16 </Text><Text>{t("Calculators.BMI.SeverelyUnderweight")}</Text>
                </View>
                <View style={styles.categories}>
                    <Text>16.1 - 18.4 </Text><Text>{t("Calculators.BMI.Underweight")}</Text>
                </View>
                <View style={styles.categories}>
                    <Text>18.5 - 24.9 </Text><Text>{t("Calculators.BMI.Normal")}</Text>
                </View>
                <View style={styles.categories}>
                    <Text>25.0 - 29.9 </Text><Text>{t("Calculators.BMI.Overweight")}</Text>
                </View>
                <View style={styles.categories}>
                    <Text>30.0 - 34.9 </Text><Text>{t("Calculators.BMI.Obese")}</Text>
                </View>
                <View style={styles.categories}>
                    <Text>&#62; 35.0 </Text><Text>{t("Calculators.BMI.ExtremelyObese")}</Text>
                </View>
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
        width: "70%",
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'space-between'
    },
    unitsSettings: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    },
    oneUnitSettings: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',  
        marginBottom: 25
    },
    unitText: {
        paddingTop: 8
    },
    inputs: {
        backgroundColor: color.white,
        color: color.black,
        borderWidth: 1,
        borderStyle: 'solid',
        paddingHorizontal: 5,
        paddingVertical: 0,
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
    },
    categories: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

export default CalculatorBMI