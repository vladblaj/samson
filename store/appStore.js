import React, {createContext, useReducer} from 'react';
import reducer, {initialState} from '../reducers/reducer';
import {useActions} from '../actions/actions';
import {applyMiddleware} from '../actions/middleware';

export const SamsonContext = createContext({});

const SamsonContextProvider = ({children}) => {
  const [store, dispatch] = useReducer(reducer, initialState)
  const enhancedDispatch = applyMiddleware(dispatch);
  const actions = useActions(store, enhancedDispatch);
  return (
      <SamsonContext.Provider
          value={{
            store,
            enhancedDispatch,
            actions,
          }}
      >
        {children}
      </SamsonContext.Provider>
  );
};

export default SamsonContextProvider;