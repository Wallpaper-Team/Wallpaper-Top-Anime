/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import admob, {MaxAdContentRating} from '@react-native-firebase/admob';
import React from 'react';
import {LogBox, StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import SQLite from 'react-native-sqlite-storage';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';
import AppNavigator from './router/AppNavigator';
import characterReducer from './store/reducers/character';
import dataReducer from './store/reducers/data';
import fileReducer from './store/reducers/tempFiles';

const rootReducer = combineReducers({
  character: characterReducer,
  file: fileReducer,
  data: dataReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  LogBox.ignoreAllLogs(true);
  SQLite.enablePromise(true);
  admob()
    .setRequestConfiguration({
      maxAdContentRating: MaxAdContentRating.PG,
      tagForChildDirectedTreatment: true,
      tagForUnderAgeOfConsent: true,
    })
    .then(() => {});
  return (
    <Provider store={store}>
      <StatusBar backgroundColor="black" />
      <AppNavigator />
    </Provider>
  );
};

export default App;
