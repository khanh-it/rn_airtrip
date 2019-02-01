/**
 * 
 */
import React, { Component } from "react";
// import ESS from 'react-native-extended-stylesheet';
import Ionicon from 'react-native-vector-icons/Ionicons';
//
import {
  View,
  TouchableOpacity,
} from 'react-native';
//
import {
  Text,
  VectorIcon
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
      header: props.header || null,
      title: props.title || '',
      date: props.date || '',
      content: props.content || ''
    };
  }

  _textContent(content)
  {
    return (new String(content).toString()) + '...';
  }


  render() {
    let {
      header
    } = this.state;

    return ([
      /* seperator */
      (header && (<View key="seperator" style={[styles.rootSep]} />)),
      /* msg */
      <View key="msg" style={[styles.rootMsg]}>
        {/* header */}
        {header && (<View style={[styles.header]}>
          <Text style={[styles.headerText]}>{header}</Text>
        </View>)}   
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.props.handleSelectMsg}
        >
          <View style={[styles.body]}>
            <View style={[styles.col, styles.col1]}>
              {/* title, date */}
              <View style={[styles.title]}>
                <View style={[styles.titleCol, styles.titleCol1]}>
                  <Text style={[styles.titleText]}>{this.state.title}</Text>
                </View>
                <View style={[styles.titleCol, styles.titleCol2]}>
                  <View style={[styles.titleDate]}>
                    <Text>{this.state.date}</Text>
                  </View>
                </View>
              </View>
              {/* .end#title, date */}
              {/* content */}
              <View style={[styles.content]}>
                <Text style={[styles.contentText]}>
                  {this._textContent(this.state.content)}
                </Text>
              </View>
              {/* .end#content */}
            </View>
            <View style={[styles.col, styles.col2]}>
              <View style={[styles.more]}>
                <VectorIcon
                    Icon={Ionicon}
                    name='ios-arrow-forward'
                    // nameIos='ios-arrow-forward'
                    // nameAndroid='md-arrow-forward'
                    style={[styles.moreIcon, styles.moreIconArrowForward]}
                  />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    ]);
  }
}
