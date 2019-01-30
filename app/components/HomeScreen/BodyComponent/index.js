/**
 * 
 */
import React, { PureComponent } from "react";
import ESS from 'react-native-extended-stylesheet';
import Ionicon from 'react-native-vector-icons/Ionicons';
//
import {
  View,
  FlatList,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback
} from 'react-native';
import {
  Text,
  VectorIcon
} from 'react-native-my';

// Css
import styles from './styles';

// Component(s)
import MsgComponent from '../MsgComponent';

// Model(s)
import MsgListModel from '../../../models/MsgListModel';

/**
 * @class BodyComponent
 */
export default class BodyComponent extends PureComponent
{
  constructor(props)
  {
    super(props);
    // console.log('VC props: ', props);

    // Init model(s)
    this.msgListModel = new MsgListModel();

    // Init state
    this.state = {
      title: {},
      syncText: $g.Lang('Turn on sync with Cloud to sync messages >'),
      searching: false,
      //
      contactsWithLatestMsgs: []
    };

    // Bind method(s)
    this._renderMsgItem = this._renderMsgItem.bind(this);
  }

  /**
   * @var  {Object}
   */
  _headers = {};

  componentDidMount()
  {
    // Get data --> trigger re-render...
    this.setState((state) => ({
      contactsWithLatestMsgs: this.msgListModel.getContactsWithLatestMsgs()
    }));
  }

  _formatMsgDataList(dataList)
  {
    let sections = {
      
    };
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

  _renderMsgItem({ item: contact, index })
  {
    if (false === contact) {
      return (
        <View
          style={{ borderWidth: 2, borderColor: 'green', height: 55 }}
          ref={ref => { this._refViewFLTop = ref; }}
        />
      );
    }
    let msg = ((contact && contact._msgs) || [])[0];
    if (!msg) {
      return;
    }
    let header = null;
    if (!contact.favorite) {
      if (msg.dateIsToday() && !this._headers.today) {
        this._headers.today = header = $g.Lang('TODAY');
      } else if (msg.dateIsYesterday() && !this._headers.yesterday) {
        this._headers.yesterday = header = $g.Lang('YESTERDAY');
      } else {
        if (!this._headers.others) {
          this._headers.others = header = $g.Lang('OTHER');
        }
      }
    }
    return (
      <MsgComponent
        header={header}
        title={contact.fullname()}
        date={msg.dateAsStr()}
        content={msg.content}
      />
    );
  }

  _renderMsgList()
  {
    let {
      contactsWithLatestMsgs: dataList
    } = this.state;
    dataList = [false].concat(dataList);

    // Reset
    this._headers = {
      yesterday: null,
      today: null,
      others: null,
    };

    return (
      <View
        style={[ESS.value('$floating'), styles.msgList]}
        ref={ref => { this._refViewMsgList = ref; }}
        // ---
        // onStartShouldSetResponderCapture={(evt) => true}
        // onMoveShouldSetResponderCapture={(evt) => true}
        // onStartShouldSetResponder={(evt) => true}
        onMoveShouldSetResponder={(evt) => false}
        // onResponderGrant={(evt) => { console.log('parent: onResponderGrant: '); }}
        // onResponderReject={(evt) => {
        //  console.log('parent: onResponderReject: ');
        // }}
        onResponderMove={(evt) => {
          console.log('parent: onResponderMove: ');
        }}
        onResponderRelease={(evt) => {
          console.log('parent: onResponderRelease: ');
        }}
        // onResponderTerminationRequest={(evt) => {
        //   console.log('parent: onResponderTerminationRequest: ');
        // }}
        onResponderTerminate={(evt) => {
          console.log('parent: onResponderTerminate: ');
        }}
        //.end
      >
        {/* <Button title="Set data 'msg'" onPress={() => { this.msgListModel.setMsgs(); }} />
        <Button title="Set data 'users'" onPress={() => { this.msgListModel.setUsers(); }} /> */}
        {/* Msg list box */}
        
        <FlatList
          style={[styles.msgListBox]}
          ref={ref => { this._refFlatList = ref; }}
          data={dataList}
          extraData={this.state}
          keyExtractor={(contact) => (contact.tel || Math.random().toString())}
          renderItem={this._renderMsgItem}
          // initialScrollIndex={1}
          // ---
          // onStartShouldSetResponderCapture={(evt) => true}
          // onMoveShouldSetResponderCapture={(evt) => true}
          onStartShouldSetResponder={(evt) => false}
          onMoveShouldSetResponder={(evt) => true}
          onResponderGrant={(evt) => { console.log('child: onResponderGrant: '); }}
          onResponderReject={(evt) => { console.log('child: onResponderReject: '); }}
          onResponderMove={(evt) => { console.log('child: onResponderMove: '); }}
          onResponderRelease={(evt) => { console.log('child: onResponderRelease: '); }}
          onResponderTerminationRequest={(evt) => { console.log('parent: onResponderTerminationRequest: '); }}
          onResponderTerminate={(evt) => { console.log('child: onResponderTerminate: '); }}
          //.end
          // ListHeaderComponent={}
          // ListEmptyComponent={}
          // ListFooterComponent={}
          // refreshing={false}
          // onRefresh={(evt) => { console.log('onRefresh: ', evt); }}
          snapToStart={false}
          snapToEnd={false}
          keyboardDismissMode={'on-drag'}
          decelerationRate={'fast'}
          onScrollBeginDrag={(evt) => { console.log('onScrollBeginDrag: '); }}
          onScroll={(evt) => {
            let { contentOffset } = evt.nativeEvent;
            console.log('onScroll: ', contentOffset);
            this._scrollContentOffset = this._scrollContentOffset || contentOffset;
            if (this._scrollContentOffset.y > contentOffset.y) {
              this._refViewFLTop.setNativeProps({
                height: 55 + (this._scrollContentOffset.y - contentOffset.y)
              });
            }
            this._scrollContentOffset = contentOffset;
          }}
          onScrollEndDrag={(evt) => { console.log('onScrollEndDrag: '); }}
          // onMomentumScrollBegin={(evt) => { console.log('onMomentumScrollBegin: ', evt); }}
          // onMomentumScrollEnd={(evt) => { console.log('onMomentumScrollEnd: ', evt); }}
          onLayout={(evt) => {
            // let { x, y, width, height } = evt.nativeEvent;
            console.log('onLayout: ', evt.nativeEvent);
            this._refFlatList.scrollToIndex({
              index: 1, animated: false
            });
            setTimeout(() => {
              $g._refFlatList = this._refFlatList;
            }, 256);
          }}
          //.end
          removeClippedSubviews={true}
        />
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
