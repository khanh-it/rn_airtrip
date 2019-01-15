/**
 * 
 */
import React, { Component } from "react";
import ESS from 'react-native-extended-stylesheet';
import Ionicon from 'react-native-vector-icons/Ionicons';
//
import {
  ScrollView,
  View,
  TextInput,
  TouchableWithoutFeedback
} from 'react-native';
import {
  Text,
  VectorIcon
} from 'react-native-my';

// Css
import styles from './styles';

// Component(s)
import MsgGgrComponent from '../MsgGgrComponent';
import MsgComponent from '../MsgComponent';

/**
 * @class BodyComponent
 */
export default class BodyComponent extends Component
{
  constructor(props) {
    super(props);

    // Init state
    this.state = {
      title: {},
      syncText: $g.Lang('Turn on sync with Cloud to sync messages >'),
      searching: false
    };

    // Bind method(s)
  }

  _renderSync()
  {
    let {
      syncText
    } = this.state;

    return (
      <View style={[ESS.value('$p20'), styles.sync]}>
        <Text style={[ESS.value('$textCenter'), styles.syncText]}>
          {syncText}
        </Text>
      </View>
    );
  }

  _renderMsgList()
  {
    return (
      <View style={[styles.msgList]}>
        {/* Msg list box */}
        <ScrollView style={[styles.msgListBox]}>
          <MsgGgrComponent title="">
            <MsgComponent
              title={'Favorites'}
              date={new Date()}
              content={'TK 1250###'}
            />
          </MsgGgrComponent>

          <MsgGgrComponent title="YESTERDAY">
            <MsgComponent
              title={'Favorites'}
              date={new Date()}
              content={'YESTERDAY 001'}
            />
          </MsgGgrComponent>

          <MsgGgrComponent title="EARLIER">
            <MsgComponent
              title={'Favorites'}
              date={new Date()}
              content={'EARLIER 001'}
            />
          </MsgGgrComponent>
        </ScrollView>
        {/* .end#Msg list box */}
      </View>
    );
  }

  render() {
    return (
      <View style={[styles.root]}>
      {/* Turn sync */}
        {this._renderSync()}
      {/* .end#Turn sync */}
      {/* Msg list */}
        {this._renderMsgList()}
      {/* .end#Msg list */}
      </View>
    );
  }
}
