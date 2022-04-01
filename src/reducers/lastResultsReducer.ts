import { IResult } from "../interfaces/IResult"
import * as types from "../actions/databaseTypes";

export interface ILastResultsReducer {
    lastResultsList: IResult[];
}
const defaultState = {
  lastResultsList: []
};


export default (state = defaultState, { type, payload}: any) => {
  switch(type) {
    case types.GET_LAST_RESULTS:
      state = { ...state, lastResultsList: payload }
      return state;
    default:
      return state;
  }
}