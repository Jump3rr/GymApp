import { IResult } from "../interfaces/IResult"
import * as types from "../actions/databaseTypes";

export interface IRecordsReducer {
    recordsList: IResult[];
}
const defaultState = {
    recordsList: []
};


export default (state = defaultState, { type, payload}: any) => {
  switch(type) {
    case types.GET_RECORDS:
      state = { ...state, recordsList: payload }
      return state;
    default:
      return state;
  }
}