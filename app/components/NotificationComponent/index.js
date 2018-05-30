/**
 * 
 */
import React, { Component } from "react";
//
import {
  View,
  // Image,
  Text
} from 'react-native';
//
import Icon from 'react-native-vector-icons/Ionicons';
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
          {/* <Image source={require('./img/alarm.png')} style={[styles.fIconImg]} /> */}
          <Icon.Button
            name='ios-notifications-outline'
            iconStyle={[styles.fIconImg]}
            style={{ margin: 0, padding: 0 }}
            backgroundColor='transparent'
            onPress={evt => {
              alert('icon touched');
            }}
          />
        </View>
        <View style={[styles.fIconBadge]}>
          <Text style={[styles.fIconBadgeTxt]}>5</Text>
        </View>
      </View>
    ]);
  }
}
