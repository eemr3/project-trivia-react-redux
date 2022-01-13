import { combineReducers } from 'redux';
import quizReducer from './quizReducer';
import tokenReducer from './tokenReducer';

const rootReducer = combineReducers({ quizReducer, tokenReducer });

export default rootReducer;
