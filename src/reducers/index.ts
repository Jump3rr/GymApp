import { combineReducers } from "redux";
import records, { IRecordsReducer } from './recordsReducer';
import lastResults, { ILastResultsReducer } from './lastResultsReducer';
import bodyMeasurements, { IBodyMeasurementsReducer } from './bodyMeasurementsReducer';
import trainings, { ITrainingsReducer } from './trainingsReducer';

export default combineReducers({
    records,
    lastResults,
    bodyMeasurements,
    trainings
});

export interface IState {
    records: IRecordsReducer;
    lastResults: ILastResultsReducer;
    bodyMeasurements: IBodyMeasurementsReducer;
    trainings: ITrainingsReducer;
    // records: IRecords;
    // myTraining: IMyTraining;
}