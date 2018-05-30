/**
 * 
 */
import React, { Component } from "react";
//
import {
  View,
  Image,
  Text
} from 'react-native';
// Css
import styles from './styles';

/**
 * @class NotificationComponent
 */
export default class NotificationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    return ([
      // Page
      <View key='page' style={[styles.page]}>
        <Text>NotificationComponent</Text>
      </View>,
      //.end
      // Floating icon
      <View key='fIcon' style={[styles.fIcon]}>
        <View style={[styles.fIconIcon]}>
          <Image source={require('./img/alarm.png')} style={[styles.fIconImg]} />
        </View>
        <View style={[styles.fIconBadge]}>
          <Text style={[styles.fIconBadgeTxt]}>0</Text>
        </View>
      </View>
    ]);
  }
}
