/**
 * 
 */
import React, { Component } from "react";
//
import SplashScreen from 'react-native-splash-screen';
//
import { createStackNavigator } from 'react-navigation';

// Component(s)
import HomeComponent from '../HomeComponent';
import NotificationComponent from '../NotificationComponent';

/**
 * @class HomeScreenComponent
 */
export class HomeScreenComponent extends Component {

  componentDidMount() {
    // Hide SplashScreen
    SplashScreen.hide();
  }

  render() {
    return ([
      // Home
      <HomeComponent key='home' />,
      //.end
      // Notification
      <NotificationComponent key='notify' />,
      //.end
    ]);
  }
}


/**
 * @class HomeScreen
 */
const HomeScreen  = createStackNavigator(
  {
    '/':  {
      screen: HomeScreenComponent
    }
  },
  {
    initialRouteName: '/',
    headerMode : 'none'
  }
);
export default HomeScreen;
