import { Dispatch, useEffect } from 'react';
import { IResult } from '../interfaces/IResult';
import { firebase } from '@react-native-firebase/database';
import { DatabaseRef } from '../tools/database';

const db = new DatabaseRef();

export const setLastResults = (data: any) => ({
    type: "GET_LAST_RESULTS",
    payload: data,
})

export const getLastResults = () => (dispatch: Dispatch<any>) => {
    let arr: IResult[] = [];
    db.reference
        .ref('/' + db.currentUser?.uid + '/last_results')
        .on('value', snapshot => {
            if (snapshot.val() !== null) {
                arr = Object?.values(snapshot.val());
                dispatch(setLastResults(arr));
            }
        })
}