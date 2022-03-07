import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Button, Text, KeyboardAvoidingView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';
import { color } from '../../constants/theme';
import Colors from '../../constants/Colors';

const RegisterScreen = () => {
    const { t, i18n } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [validationErrorMessage, setValidationErrorMessage] = useState('');


    const registerByEmail = () => {
        if(email === '' || password === '' || confirmPassword === '') {
            setErrorMessage('You must fill all fields.');
            return;   
        }
        else if(password !== confirmPassword) {
            setErrorMessage("Thoso passwords didn't match. Try again.");
            return;
        }
        else {
            setErrorMessage('');
        }
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    setValidationErrorMessage('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    setValidationErrorMessage('That email address is invalid!');
                }

                console.error(error);
            });
    }

    return (
        <KeyboardAvoidingView behavior='height' style={styles.container}>
            <View >
                <TextInput placeholder='Email' value={email} onChangeText={text => setEmail(text)} style={styles.input} keyboardType='email-address' />
                <TextInput placeholder='Password' value={password} onChangeText={text => setPassword(text)} style={styles.input} textContentType="password" secureTextEntry={true} />
                <TextInput placeholder='Confirm Password' value={confirmPassword} onChangeText={text => setConfirmPassword(text)} style={styles.input} textContentType="password" secureTextEntry={true} />
            </View>
            {errorMessage !== '' && (
                <Text style={styles.errorText}>{errorMessage}</Text>
            )}
            {validationErrorMessage !== '' && (
                <Text style={styles.errorText}>{validationErrorMessage}</Text>
            )}
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={registerByEmail} style={styles.button}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.black
    },
    errorText: {
        color: color.red,
        fontSize: 14
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: color.grey,
        paddingHorizontal: 15,
        width: 200,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: color.greyLight,
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        borderColor: color.black,
    },
    buttonOutline: {
        backgroundColor: color.white,
        marginTop: 5,
        borderColor: color.black,
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    registerText: {
        color: color.white,
        fontWeight: '700',
        fontSize: 16,
        textAlign: 'center',
        paddingVertical: 20
    },
})

export default RegisterScreen