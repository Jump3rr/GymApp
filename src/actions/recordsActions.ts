import { Dispatch } from 'react';
import { reference, currentUser } from '../tools/database';
import {IResult} from '../interfaces/IResult';


export const setRecords = (data: any) => ({
    type: "GET_RECORDS",
    payload: data,
})

export const getRecords = () => (dispatch: Dispatch<any>) => {
    let arr: IResult[];
    reference
    .ref('/'+currentUser?.uid+'/records')
    .on('value', snapshot => {
        console.log('User data: ', snapshot.val())
        arr = Object.values(snapshot.val());
        dispatch(setRecords(arr));
    })
}