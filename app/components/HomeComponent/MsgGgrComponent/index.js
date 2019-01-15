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
 * @class MsgGgrComponent
 */
export default class MsgGgrComponent extends Component
{
  constructor(props) {
    super(props);

    // Init state
    this.state = {
      title: props.title || ''
    };
  }

  render() {
    return (
      <View style={[ESS.value('$p25'), styles.root]}>
        {this.state.title ? (
          <View style={[styles.title]}>
            <Text>{this.state.title}</Text>
          </View>
        ) : null}
        {this.props.children}
      </View>
    );
  }
}
