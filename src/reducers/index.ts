import { combineReducers } from "redux";
import records, { IRecordsReducer } from './recordsReducer';

export default combineReducers({
    records
});

export interface IState {
    records: IRecordsReducer;
    // records: IRecords;
    // myTraining: IMyTraining;
    // myMeasurement: IMyMeasurement;
}