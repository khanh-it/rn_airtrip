import React, { Component } from "react";
import { Provider } from 'react-redux';
// https://github.com/rt2zz/redux-persist
import { PersistGate } from 'redux-persist/integration/react';
// +++
import { store, persistor } from './app/configs/store';
// +++
import { View, ScrollView, Text } from 'react-native';
// +++
import HomeScreen from './app/components/HomeScreen';

// Global styles
import styles from './app/assets/css/styles';

/**
 * 
 */
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={[styles.html]}>
            <View style={[styles.document]}>
              <HomeScreen />
            </View>
          </View>
        </PersistGate>
      </Provider>
    );
  }
}
