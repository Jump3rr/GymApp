import { IResult } from "../interfaces/IResult"
import { ITrainings } from "../interfaces/ITrainings";
import * as types from "../actions/databaseTypes";

export interface ITrainingsReducer {
    trainingsList: ITrainings[];
}
const defaultState = {
    trainingsList: []
};

export default (state = defaultState, { type, payload}: any) => {
  switch(type) {
    case types.GET_TRAININGS:
      state = { ...state, trainingsList: payload }
      return state;
    default:
      return state;
  }
}