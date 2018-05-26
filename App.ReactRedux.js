import React, { Component } from "react";
import { Provider } from 'react-redux';
// https://github.com/rt2zz/redux-persist
import { PersistGate } from 'redux-persist/integration/react';
//
import { View, Text } from 'react-native';
// +++
import { store, persistor } from './app/configs/store';

/**
 * 
 */
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {}

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View><Text>React Redux</Text></View>
        </PersistGate>
      </Provider>
    );
  }
}
