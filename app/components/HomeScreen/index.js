/**
 * 
 */
import React, { Component } from "react";
//
import { createStackNavigator } from 'react-navigation';
// +++
import HomeComponent from '../HomeComponent';

/**
 * @class HomeScreen
 */
const HomeScreen  = createStackNavigator(
  {
    '/':  {
      screen: HomeComponent
    }
  },
  {
    initialRouteName: '/',
    headerMode : 'none'
  }
);
export default HomeScreen;
