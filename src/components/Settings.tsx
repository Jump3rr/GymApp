import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';
//import { reference, currentUser } from '../tools/database';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import { useTranslation } from 'react-i18next';
import Icons from 'react-native-vector-icons/EvilIcons';

const SettingsScreen = () => {
  const currentUser = firebase.auth().currentUser;
  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }
  const { t, i18n } = useTranslation();

  return (
      <View style={styles.mainSettings}>
        <View style={styles.profile}>
          <Icons name="user" size={50} />
          <Text>{currentUser?.displayName !== null ? currentUser?.displayName : currentUser?.email}</Text>
        </View>
        <TouchableOpacity onPress={logout} style={styles.element}>
          <Text>{t("Settings.Language")}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout} style={styles.element}>
          <Text>{t("Settings.About")}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout} style={styles.element}>
          <Text>{t("Settings.Logout")}</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  mainSettings: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%'

  },
  profile: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 15

  },
  element: {
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 15
  }
});

export default SettingsScreen;