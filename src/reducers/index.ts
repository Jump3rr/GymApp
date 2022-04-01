import { combineReducers } from "redux";
import records, { IRecordsReducer } from './recordsReducer';
import lastResults, { ILastResultsReducer } from './lastResultsReducer';

export default combineReducers({
    records,
    lastResults
});

export interface IState {
    records: IRecordsReducer;
    lastResults: ILastResultsReducer;
    // records: IRecords;
    // myTraining: IMyTraining;
    // myMeasurement: IMyMeasurement;
}