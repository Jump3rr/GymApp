import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Button, Text, KeyboardAvoidingView, StyleSheet, TouchableOpacity } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { TextInput } from 'react-native-gesture-handler';
import { color } from '../../constants/theme';

const LoginScreen = () => {
    const { t, i18n } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    GoogleSignin.configure({
        webClientId: '239108394404-7qo8apdf6bgg3tvn2c64f7uu0rh8qv9s.apps.googleusercontent.com',
    });

    const signInWithGoogleAsync = async () => {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }
    const signInByEmail = () => {
        auth()
            .signInWithEmailAndPassword(email, password);
    }
    const registerByEmail = () => {
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
    }
    const logout = () => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'));
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <View>
                <TextInput placeholder='Email' value={email} onChangeText={text => setEmail(text)} style={styles.input} />
                <TextInput placeholder='Password' value={password} onChangeText={text => setPassword(text)} style={styles.input} />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={signInByEmail} style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={registerByEmail}>
                    <Text style={styles.registerText}>{t('Logins.Register')}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={logout}>
                    <Text style={styles.registerText}>Logout</Text>
                </TouchableOpacity>
            </View>
            <Button title={t('Logins.GoogleLogin')} onPress={signInWithGoogleAsync}></Button>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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

export default LoginScreen