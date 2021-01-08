import {combineReducers} from 'redux';
import countReducer from './reducer.js';

const allReducers = combineReducers({
  count: countReducer,
});
export default allReducers;