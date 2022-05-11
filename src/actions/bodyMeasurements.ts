import { Dispatch, useEffect } from 'react';
import { IResult } from '../interfaces/IResult';
import { firebase } from '@react-native-firebase/database';
import { DatabaseRef } from '../tools/database';

const db = new DatabaseRef();

export const setBodyMeasurements = (data: any) => ({
    type: "GET_BODY_MEASUREMENTS",
    payload: data,
})

export const getBodyMeasurements = () => (dispatch: Dispatch<any>) => {
    let arr: IResult[] = [];
    db.reference
        .ref('/' + db.currentUser?.uid + '/body_measurements')
        .on('value', snapshot => {
            if (snapshot.val() !== null) {
                arr = Object?.values(snapshot.val());
                dispatch(setBodyMeasurements(arr));
            }
        })
}