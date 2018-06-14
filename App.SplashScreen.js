import React, { Component } from "react";
//
import { StyleSheet, View, Text } from 'react-native';
//
import SplashScreen from 'react-native-splash-screen';
//
import LinearGradient from 'react-native-linear-gradient';

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

  _renderSplashScreen() {
    return (
        <View><Text>React SplashScreen</Text></View>
    );
  }

  _renderLinearGradient() {
    return (
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
        <Text style={styles.buttonText}>
          Sign in with Facebook
        </Text>
      </LinearGradient>
    );
  }

  render() {
    return this._renderLinearGradient();
  }
}

// Later on in your styles..
var styles = StyleSheet.create({
  linearGradient: {
    // flex: 1,
    // height: 100,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
