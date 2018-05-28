import React, { Component } from "react";
//
import { View, Text } from 'react-native';
//
import SplashScreen from 'react-native-splash-screen';

/**
 * 
 */
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();
  }

  render() {
    return (
        <View><Text>React SplashScreen</Text></View>
    );
  }
}
