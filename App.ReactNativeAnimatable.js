import React, { Component } from "react";
//
import { View, Text } from 'react-native';
//
import SplashScreen from 'react-native-splash-screen';
//
import * as Animatable from 'react-native-animatable';

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
        <View>
          <Animatable.Text animation="zoomInUp">Zoom me up, Scotty</Animatable.Text>
        </View>
    );
  }
}
