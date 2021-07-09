import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';

export const rootEpic = combineEpics();

export const rootReducer = combineReducers({});
