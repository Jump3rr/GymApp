import { Dispatch } from 'react';
import { ITrainings } from '../interfaces/ITrainings';
import { firebase } from '@react-native-firebase/database';
import { DatabaseRef } from '../tools/database';
import { IResult } from '../interfaces/IResult';

const db = new DatabaseRef();

export const setTrainings = (data: any) => ({
    type: "GET_TRAININGS",
    payload: data,
})

export const getTrainings = () => (dispatch: Dispatch<any>) => {
    let arr: ITrainings[] = [];
    db.reference
        .ref('/' + db.currentUser?.uid + '/training')
        .on('value', snapshot => {
            if (snapshot.val() !== null) {
                arr = Object?.values(snapshot.val());
                dispatch(setTrainings(arr));
            }
        })
}