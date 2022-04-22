import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'react-native-gesture-handler';
import { color } from '../../constants/theme';
import { RadioButton } from 'react-native-paper';

const CalculatorBF = () => {
    const { t, i18n } = useTranslation();
    const [age, setAge] = useState(0);
    const [waist, setWaist] = useState('');
    const [neck, setNeck] = useState('');
    const [hip, setHip] = useState('');
    const [gender, setGender] = useState('male')
    const [height, setHeight] = useState('');
    const [heightInches, setHeightInches] = useState('');
    const [weight, setWeight] = useState('');
    const [result, setResult] = useState(0);
    const [textResult, setTextResult] = useState('');
    const [colorResult, setColorResult] = useState(color.white);
    const [unit, setUnit] = useState('eu')

    const calculateBF = (neck: any, waist: any, hip: any, age: any, height: any, weight: any, heightInches?: any) => {
        setTextResult('');
        neck = neck.replace(/,/, '.');
        waist = waist.replace(/,/, '.');
        hip = hip.replace(/,/, '.');
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
            waist = waist * 2.54;
            neck = neck * 2.54;
            hip = hip * 2.54;
        }
        let bf: number = 0;
        if (gender === 'male') {
            bf = +((495/(1.0324 - 0.19077 * Math.log10(waist-neck) + 0.15456 * Math.log10(height))) - 450).toFixed(2);
        }
        if (gender === 'female') {
            bf = +((495/(1.29579 - 0.35004 * Math.log10(waist+hip-neck) + 0.22100 * Math.log10(height))) - 450).toFixed(2);
        }
        setResult(bf);


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
                    <View style={styles.oneRow}>
                        <Text>{t("Calculators.BF.Neck")} (cm):</Text>
                        <TextInput style={styles.inputs} value={neck.toString()} onChangeText={(neck) => setNeck(neck)} keyboardType="numeric"></TextInput>
                    </View>
                    <View style={styles.oneRow}>
                        <Text>{t("Calculators.BF.Waist")} (cm):</Text>
                        <TextInput style={styles.inputs} value={waist.toString()} onChangeText={(waist) => setWaist(waist)} keyboardType="numeric"></TextInput>
                    </View>
                    {gender === 'female' && (
                    <View style={styles.oneRow}>
                        <Text>{t("Calculators.BF.Hip")} (cm):</Text>
                        <TextInput style={styles.inputs} value={hip.toString()} onChangeText={(hip) => setHip(hip)} keyboardType="numeric"></TextInput>
                    </View>
                    )}
                    <TouchableOpacity style={styles.button} onPress={() => calculateBF(neck, waist, hip, age, height, weight)}>
                        <Text>Calculate</Text>
                    </TouchableOpacity>
                </>
            )}
            {unit === 'us' && (
                <>
                    <View style={styles.oneRow}>
                        <Text>{t("Calculators.BMI.Height")} (feet):</Text>
                        <TextInput style={styles.inputs} value={height.toString()} onChangeText={(height) => setHeight(height)} keyboardType="numeric"></TextInput>
                    </View>
                    <View style={styles.oneRow}>
                        <Text>{t("Calculators.BMI.Height")} (inches):</Text>
                        <TextInput style={styles.inputs} value={heightInches.toString()} onChangeText={(heightInches) => setHeightInches(heightInches)} keyboardType="numeric"></TextInput>
                    </View>
                    <View style={styles.oneRow}>
                        <Text>{t("Calculators.BMI.Weight")} (pounds):</Text>
                        <TextInput style={styles.inputs} value={weight.toString()} onChangeText={(weight) => setWeight(weight)} keyboardType="numeric"></TextInput>
                    </View>
                    <View style={styles.oneRow}>
                        <Text>{t("Calculators.BF.Neck")} (inches):</Text>
                        <TextInput style={styles.inputs} value={neck.toString()} onChangeText={(neck) => setNeck(neck)} keyboardType="numeric"></TextInput>
                    </View>
                    <View style={styles.oneRow}>
                        <Text>{t("Calculators.BF.Waist")} (inches):</Text>
                        <TextInput style={styles.inputs} value={waist.toString()} onChangeText={(waist) => setWaist(waist)} keyboardType="numeric"></TextInput>
                    </View>
                    {gender === 'female' && (
                    <View style={styles.oneRow}>
                        <Text>{t("Calculators.BF.Hip")} (inches):</Text>
                        <TextInput style={styles.inputs} value={hip.toString()} onChangeText={(hip) => setHip(hip)} keyboardType="numeric"></TextInput>
                    </View>
                    )}
                    <TouchableOpacity style={styles.button} onPress={() => calculateBF(neck, waist, hip, age, height, weight, heightInches)}>
                        <Text>Calculate</Text>
                    </TouchableOpacity>
                </>
            )}
            {result !== 0 && (
                <View>
                    <Text>{t("Calculators.BF.Result")} {result}%</Text>
                </View>
            )}
            {textResult !== '' && (
                <View>
                    <Text style={{ color: colorResult }}>{textResult}</Text>
                </View>
            )}
            {gender === 'male' && (
            <View style={{ width: '70%' }}>
                <Text>{t("Calculators.BMI.Categories")}</Text>
                <View style={styles.categories}>
                    <Text>1% - 5%</Text><Text>{t("Calculators.BF.Essential")}</Text>
                </View>
                <View style={styles.categories}>
                    <Text>6% - 13%</Text><Text>{t("Calculators.BF.Athletes")}</Text>
                </View>
                <View style={styles.categories}>
                    <Text>14% - 17%</Text><Text>{t("Calculators.BF.Fitness")}</Text>
                </View>
                <View style={styles.categories}>
                    <Text>18% - 25%</Text><Text>{t("Calculators.BF.Average")}</Text>
                </View>
                <View style={styles.categories}>
                    <Text>&#62; 25% </Text><Text>{t("Calculators.BF.Obese")}</Text>
                </View>
            </View>
            )}
            {gender === 'female' && (
            <View style={{ width: '70%' }}>
                <Text>{t("Calculators.BMI.Categories")}</Text>
                <View style={styles.categories}>
                    <Text>10% - 13%</Text><Text>{t("Calculators.BF.Essential")}</Text>
                </View>
                <View style={styles.categories}>
                    <Text>14% - 20%</Text><Text>{t("Calculators.BF.Athletes")}</Text>
                </View>
                <View style={styles.categories}>
                    <Text>21% - 24%</Text><Text>{t("Calculators.BF.Fitness")}</Text>
                </View>
                <View style={styles.categories}>
                    <Text>25% - 31%</Text><Text>{t("Calculators.BF.Average")}</Text>
                </View>
                <View style={styles.categories}>
                    <Text>&#62; 32% </Text><Text>{t("Calculators.BF.Obese")}</Text>
                </View>
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
        marginVertical: 5,
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
        marginBottom: 10
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

export default CalculatorBF