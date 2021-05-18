import React from 'react';
import reducer from '../reducers/reducer';
import {persistReducer, persistStore} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {applyMiddleware, compose, createStore} from "redux"; // defaults to localStorage for web
import {PersistGate} from 'redux-persist/integration/react'
import {Provider} from 'react-redux'
import thunk from "redux-thunk";

const SamsonContextProvider = ({children}) => {
  const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['navigation','paused']
  }
  const persistedReducer = persistReducer(persistConfig, reducer)

  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
      persistedReducer,
      composeEnhancer(applyMiddleware(thunk))
  )
  const persistor = persistStore(store)

  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
  );
};

export default SamsonContextProvider;