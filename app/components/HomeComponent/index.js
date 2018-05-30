/**
 * 
 */
import React, { Component } from "react";
//
import SplashScreen from 'react-native-splash-screen';
//
import {
  ScrollView,
  View,
  Text
} from 'react-native';
//
import EStyleSheet from 'react-native-extended-stylesheet';
import styles from './styles';

// Component(s)
import NotificationComponent from '../NotificationComponent';

/**
 * @class HomeComponent
 */
export default class HomeComponent extends Component {
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
      <ScrollView
        style={[EStyleSheet.value('$document')]}
        contentContainerStyle={[EStyleSheet.value('$body')]}
      >
        <NotificationComponent />
        <Text>HomeScreen</Text>
      </ScrollView>
    );
  }
}
