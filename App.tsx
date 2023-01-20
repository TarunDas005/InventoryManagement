import React from 'react';
import {Provider} from 'react-redux';
import reduxStore from './src/store';
import {PersistGate} from 'redux-persist/integration/react';
import ApplicationNavigator from "./src/navigators/Application";

const App = () => {
  const {store, storePersist} = reduxStore();
  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={storePersist}>
          <ApplicationNavigator />
        </PersistGate>
      </Provider>
  );
};

export default App;
