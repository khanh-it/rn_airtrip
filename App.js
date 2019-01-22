import React, { Component } from "react";
import { Provider } from 'react-redux';
// https://github.com/rt2zz/redux-persist
import { PersistGate } from 'redux-persist/integration/react';
// +++
import { store, persistor } from './app/configs/store';

// Component(s)
import RootComponent from './app/components/RootComponent';

/**
 * @class App
 */
export default class App extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {}
  }

  render()
  {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootComponent />
        </PersistGate>
      </Provider>
    );
  }
}
