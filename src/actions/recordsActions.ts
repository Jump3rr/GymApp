import { Dispatch } from 'react';
import { IResult } from '../interfaces/IResult';
import { firebase } from '@react-native-firebase/database';
import { DatabaseRef } from '../tools/database';

const db = new DatabaseRef();

export const setRecords = (data: any) => ({
    type: "GET_RECORDS",
    payload: data,
})

export const getRecords = () => (dispatch: Dispatch<any>) => {
    let arr: IResult[] = [];
    db.reference
        .ref('/' + db.currentUser?.uid + '/records')
        .on('value', snapshot => {
            if (snapshot.val() !== null) {
                arr = Object?.values(snapshot.val());
                dispatch(setRecords(arr));
            }
        })
}