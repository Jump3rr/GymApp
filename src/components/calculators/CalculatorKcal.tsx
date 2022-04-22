import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'react-native-gesture-handler';
import { color } from '../../constants/theme';
import { RadioButton } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';

const CalculatorKcal = () => {
    const { t, i18n } = useTranslation();
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState('male')
    const [height, setHeight] = useState('');
    const [heightInches, setHeightInches] = useState('');
    const [weight, setWeight] = useState('');
    const [result, setResult] = useState(0);
    const [textResult, setTextResult] = useState('');
    const [unit, setUnit] = useState('eu');
    const [workType, setWorkType] = useState(0);
    const [exerciseType, setExerciseType] = useState(0);

    const calculateKcal = (age: number, height: any, weight: any, heightInches?: any) => {
        setTextResult('');
        height = height.replace(/,/, '.');
        weight = weight.replace(/,/, '.');
        if (age === 0 || height === 0 || weight === 0) {
            setTextResult('You have to fill all fields!')
            setResult(0);
            return;
        }
        if (unit === 'us') {
            weight = weight * 0.45359237;
            height = height * 30.48;
            if (heightInches) {
                heightInches = heightInches.replace(/,/, '.');
                height += heightInches * 2.54;
            }
        }
        let bmr: number = 0;
        if (gender === 'male') {
            bmr = +((88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)) * workType * exerciseType).toFixed(2);
        }
        if (gender === 'female') {
            bmr = +(447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)).toFixed(2);
        }
        setResult(bmr);

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
            <>
                <View style={styles.oneRow}>
                    <Text>{t("Calculators.BMR.Age")}:</Text>
                    <TextInput style={styles.inputs} value={age.toString()} onChangeText={(age) => setAge(Number(age))} keyboardType="numeric"></TextInput>
                </View>
                <View style={styles.oneRow}>
                    <RadioButton.Group onValueChange={newValue => setGender(newValue)} value={gender}>
                        <View style={styles.unitsSettings}>
                            <View style={styles.oneUnitSettings}>
                                <Text style={styles.unitText}>{t("Calculators.BMR.Male")}</Text>
                                <RadioButton value="male" />
                            </View>
                            <View style={styles.oneUnitSettings}>
                                <Text style={styles.unitText}>{t("Calculators.BMR.Female")}</Text>
                                <RadioButton value="female" />
                            </View>
                        </View>
                    </RadioButton.Group>
                </View>
            </>
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
                    <TouchableOpacity style={styles.button} onPress={() => calculateKcal(age, height, weight)}>
                        <Text>Calculate</Text>
                    </TouchableOpacity>
                </>
            )}
            {unit === 'us' && (
                <>
                    <View style={styles.oneRow}>
                        <Text style={{ width: '60%' }}>{t("Calculators.BMI.Height")} (feet):</Text>
                        <TextInput style={styles.inputs} value={height.toString()} onChangeText={(height) => setHeight(height)} keyboardType="numeric"></TextInput>
                    </View>
                    <View style={styles.oneRow}>
                        <Text style={{ width: '60%' }}>{t("Calculators.BMI.Height")} (inches):</Text>
                        <TextInput style={styles.inputs} value={heightInches.toString()} onChangeText={(heightInches) => setHeightInches(heightInches)} keyboardType="numeric"></TextInput>
                    </View>
                    <View style={styles.oneRow}>
                        <Text style={{ width: '60%' }}>{t("Calculators.BMI.Weight")} (pounds):</Text>
                        <TextInput style={styles.inputs} value={weight.toString()} onChangeText={(weight) => setWeight(weight)} keyboardType="numeric"></TextInput>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => calculateKcal(age, height, weight, heightInches)}>
                        <Text>Calculate</Text>
                    </TouchableOpacity>
                </>
            )}
            <RNPickerSelect
                onValueChange={(value) => setWorkType(value)}
                items={[
                    { label: t("Calculators.Kcal.WorkOption1"), value: 1.25 },
                    { label: t("Calculators.Kcal.WorkOption2"), value: 1.36 },
                    { label: t("Calculators.Kcal.WorkOption3"), value: 1.47 },
                ]}
                useNativeAndroidPickerStyle={false}
            />
            <RNPickerSelect
                onValueChange={(value) => setExerciseType(value)}
                items={[
                    { label: t("Calculators.Kcal.ExerciseOption1"), value: 1 },
                    { label: t("Calculators.Kcal.ExerciseOption2"), value: 1.1 },
                    { label: t("Calculators.Kcal.ExerciseOption3"), value: 1.15 },
                    { label: t("Calculators.Kcal.ExerciseOption4"), value: 1.2 },
                ]}
                useNativeAndroidPickerStyle={false}
            />
            {result !== 0 && (
                <View>
                    <Text>{t("Calculators.BMR.Result")} {result} kcal</Text>
                </View>
            )}
            {textResult !== '' && (
                <View>
                    <Text style={{ color: color.red }}>{textResult}</Text>
                </View>
            )}
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

export default CalculatorKcal