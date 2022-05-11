import { IResult } from "../interfaces/IResult"
import * as types from "../actions/databaseTypes";

export interface IBodyMeasurementsReducer {
  bodyMeasurementsList: IResult[];
}
const defaultState = {
  bodyMeasurementsList: []
};


export default (state = defaultState, { type, payload}: any) => {
  switch(type) {
    case types.GET_BODY_MEASUREMENTS:
      state = { ...state, bodyMeasurementsList: payload }
      return state;
    default:
      return state;
  }
}