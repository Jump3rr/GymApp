import { Dispatch } from 'react';
import { reference, currentUser } from '../tools/database';
import {IResult} from '../interfaces/IResult';


export const setLastResults = (data: any) => ({
    type: "GET_LAST_RESULTS",
    payload: data,
})

export const getLastResults = () => (dispatch: Dispatch<any>) => {
    let arr: IResult[] = [];
    reference
    .ref('/'+currentUser?.uid+'/last_results')
    .on('value', snapshot => {
        if(snapshot.val() !== null) {
            arr = Object?.values(snapshot.val());
            dispatch(setLastResults(arr));
        }
    })
}