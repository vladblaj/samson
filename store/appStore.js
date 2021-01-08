import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'; // this is for debugging with React-Native-Debugger, you may leave it out
import { allReducers } from '../reducers/index';



export const store = createStore(
    allReducers,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
);