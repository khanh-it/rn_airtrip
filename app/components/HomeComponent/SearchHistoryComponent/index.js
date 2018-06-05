/**
 * 
 */
import React, { Component } from "react";
//
import {
  View,
  Text
} from 'react-native';

// Css
import styles from './styles';

/**
 * @class SearchHistoryComponent
 */
export default class SearchHistoryComponent extends Component {
  constructor(props) {
    super(props);

    // Init state
    this.state = {
      history: []
    };
  }

  render() {
    let { history } = this.state;
    return (
      <View style={styles.root}>
        <View style={styles.content}>
          <Text style={styles.txt}>
            {(history.length <= 0) ? $g.Lang(
              'エアトリをダウンロードいただきまして、\n誠にありがとうございます。\n国内海外の格安航空券をお探しいただけます。\nお探しのメニューをタップください。'
            ) : null}
          </Text>
        </View>
      </View>
    );
  }
}
