import { firebase } from '@react-native-firebase/database';

export const reference = firebase
    .app()
    .database('https://gymapp-4662f-default-rtdb.europe-west1.firebasedatabase.app/')
export const currentUser = firebase.auth().currentUser;