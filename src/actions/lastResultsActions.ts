import { Dispatch, useEffect } from 'react';
import { IResult } from '../interfaces/IResult';
import { firebase } from '@react-native-firebase/database';
import { DatabaseRef } from '../tools/database';

const db = new DatabaseRef();
// const reference = firebase
//     .app()
//     .database('https://gymapp-4662f-default-rtdb.europe-west1.firebasedatabase.app/')

// const currentUser = firebase.auth().currentUser;

// let reference = firebase
//     .app()
//     .database('https://gymapp-4662f-default-rtdb.europe-west1.firebasedatabase.app/')

// let currentUser = firebase.auth().currentUser;


export const setLastResults = (data: any) => ({
    type: "GET_LAST_RESULTS",
    payload: data,
})

export const getLastResults = () => (dispatch: Dispatch<any>) => {
    let arr: IResult[] = [];
    console.log('AAAAAAAAAAAA');
    console.log(db.currentUser?.email);
    db.reference
        .ref('/' + db.currentUser?.uid + '/last_results')
        .on('value', snapshot => {
            if (snapshot.val() !== null) {
                arr = Object?.values(snapshot.val());
                dispatch(setLastResults(arr));
            }
        })
}