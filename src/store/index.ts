import rootReducer from '../redux/reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['productReducer'],
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware => {
    if (process.env.NODE_ENV === 'development') {
      const createDebugger = require('redux-flipper').default;
      return getDefaultMiddleware({
        serializableCheck: false,
      })
        .concat(createDebugger());
    } else {
      return getDefaultMiddleware({
        serializableCheck: false,
      });
    }
  },
});

let storePersist = persistStore(store);

export default () => {
  return {store, storePersist};
};
