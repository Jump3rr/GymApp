import { firebase } from '@react-native-firebase/database';
import { useEffect } from 'react';

export class DatabaseRef {
    public get reference(){return firebase
    .app()
    .database('https://gymapp-4662f-default-rtdb.europe-west1.firebasedatabase.app/')
    }
    public get currentUser() { return firebase.auth().currentUser}
}