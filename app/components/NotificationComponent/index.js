/**
 * 
 */
import React, { Component } from "react";
//
import SplashScreen from 'react-native-splash-screen';
//
import {
  View,
  Text
} from 'react-native';
//
import styles from './styles';

/**
 * @class HomeComponent
 */
export default class NotificationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // Hide SplashScreen
    SplashScreen.hide();
  }

  render() {
    return (
      <View>
        <Text>NotificationComponent</Text>
      </View>
    );
  }
}
