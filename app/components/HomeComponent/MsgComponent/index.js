/**
 * 
 */
import React, { Component } from "react";
import ESS from 'react-native-extended-stylesheet';
//
import { View } from 'react-native';
//
import {
  Text
} from 'react-native-my'
// Css
import styles from './styles';

/**
 * @class MsgComponent
 */
export default class MsgComponent extends Component
{
  constructor(props) {
    super(props);

    // Init state
    this.state = {
      title: props.title || '',
      date: props.date || '',
      content: props.content || ''
    };
  }

  render() {
    return (
      <View style={[ESS.value('$p25'), styles.root]}>
        <View style={[styles.col, styles.col1]}>
          <View style={[styles.title]}>
            <View style={[styles.titleLeft]}>
              <Text style={[styles.titleText]} style={[styles.titleText]}>{this.state.title}</Text>
            </View>
            <View style={[styles.titleRight]}>
              <View style={[styles.titleDate]}>
                <Text>{new String(this.state.date).toString()}</Text>
              </View>
            </View>
          </View>
          <View style={[styles.content]}>
            <Text>{this.state.content}</Text>
          </View>
        </View>
        <View style={[styles.col, styles.col2]}>
          <View style={[styles.more]}>
            <Text>{'>'}</Text>
          </View>
        </View>
      </View>
    );
  }
}
