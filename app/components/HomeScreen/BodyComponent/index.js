/**
 * 
 */
import React, { PureComponent } from "react";
import ESS from 'react-native-extended-stylesheet';
import * as Ani from 'react-native-animatable';
import Ionicon from 'react-native-vector-icons/Ionicons';
//
import {
  View,
  FlatList,
  Button,
  ImageBackground,
  Alert,
  // TouchableOpacity,
  // TouchableHighlight,
  // TouchableWithoutFeedback
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
  _compLayouts = {};

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

  hideOverlay()
  {

  }

  showOverlay()
  {
    
  }

  _compLayout(evt, key)
  {
    let { nativeEvent: { layout } } = evt || {};
    this._compLayouts[key] = layout;
    //
    /* if ('viewMsgList' === key) {
      let height = Math.round(layout.height / 2);
      console.log('layout height: ', key, layout, height);
      this._refViewFLZero.setNativeProps({ height });
    } */
    //.end
    return this;
  }

  _formatMsgDataList(dataList)
  {
    let sections = {
      
    };
  }

  _renderViewSync()
  {
    let {
      syncText
    } = this.state;

    return (
      <View
        style={[ESS.value('$p20'), styles.sync]}
        ref={ref => { this._refViewSync = ref; }}
        onLayout={(evt) => { this._compLayout(evt, 'viewSync'); }}
        /* {height: 60, width: 478, y: 1, x: 1} */
      >
        <Text style={[ESS.value('$textCenter'), styles.syncText]}>{syncText}</Text>
      </View>
    );
  }

  _renderViewFLZero()
  {
    this._vFLZeroMinHeight = Math.round($g.dimensions.window.height * 2/4);
    return (
      <View
        style={{ borderWidth: 2, borderColor: 'red', width: 0, height: this._vFLZeroMinHeight }}
        ref={ref => { this._refViewFLZero = $g._refViewFLZero = ref; }}
        onLayout={(evt) => { this._compLayout(evt, 'viewFLZero'); }}
      />
    );
  }

  _renderMsgItem({ item: contact, index })
  {
    if (0 === contact) {
      return this._renderViewFLZero();
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
    dataList = [0].concat(dataList);

    // Reset
    this._headers = {
      yesterday: null,
      today: null,
      others: null,
    };

    return (
      <ImageBackground
        source={require('../../../assets/img/lock_256x256.png')}
        resizeMode="center"
        style={[ESS.value('$floating'), styles.msgList]}
        ref={ref => { this._refViewMsgList = ref; }}
        onLayout={(evt) => { this._compLayout(evt, 'viewMsgList'); }}
        // ---
        // onStartShouldSetResponderCapture={(evt) => true}
        // onMoveShouldSetResponderCapture={(evt) => true}
        // onStartShouldSetResponder={(evt) => true}
        // onMoveShouldSetResponder={(evt) => false}
        // onResponderGrant={(evt) => { console.log('parent: onResponderGrant: '); }}
        // onResponderReject={(evt) => { console.log('parent: onResponderReject: '); }}
        // onResponderMove={(evt) => { console.log('parent: onResponderMove: '); }}
        // onResponderRelease={(evt) => { console.log('parent: onResponderRelease: '); }}
        // onResponderTerminationRequest={(evt) => { console.log('parent: onResponderTerminationRequest: '); }}
        // onResponderTerminate={(evt) => { console.log('parent: onResponderTerminate: '); }}
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
          onMoveShouldSetResponder={(evt) => false}
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
          // decelerationRate={0.8}
          onScrollBeginDrag={(evt) => {
            // console.log('onScrollBeginDrag: ');
            let { contentOffset } = evt.nativeEvent;
            this._scrollContentOffset = contentOffset;
          }}
          onScroll={(evt) => {
            let { contentOffset } = evt.nativeEvent;
            if (this._scrollContentOffset) {
              let threshold = 50;
              let newY = (this._scrollContentOffset.y - contentOffset.y);
              newY = (newY != 0) ? ((newY > 0) ? 1 : -1) : 0; 
              let height = Math.max(this._vFLZeroMinHeight, this._compLayouts['viewFLZero'].height) + newY;
              // console.log('onScroll: ', newY, height);
              // this._refViewFLZero.setNativeProps({ height });
              // 
              if (Math.abs(0 - contentOffset.y) <= threshold) {
                // Alert.alert('show secure password...');
                console.log('show secure password...');
              }
              //.end
            }
            // this._scrollContentOffset = contentOffset;
          }}
          onScrollEndDrag={(evt) => {
            // this._scrollContentOffset = null;
            let threshold = 50;
            let { contentOffset } = evt.nativeEvent;
            let vFL1stMinHeight = 60;
            let y = (this._scrollContentOffset.y - contentOffset.y);
            let viewOffset = 0;
            if (contentOffset.y >= vFL1stMinHeight) {
              viewOffset = vFL1stMinHeight;
            }
            console.log('onScrollEndDrag: ', y, contentOffset, viewOffset);
            if ((y > 0) || (y < 0 && y >= (-1 * threshold))) {
              this._refFlatList.scrollToIndex({ index: 1, viewOffset });
            }
          }}
          // onMomentumScrollBegin={(evt) => { console.log('onMomentumScrollBegin: ', evt); }}
          // onMomentumScrollEnd={(evt) => { console.log('onMomentumScrollEnd: ', evt); }}
          onLayout={(evt) => {
            this._compLayout(evt, 'viewFlatList');
            this._refFlatList.scrollToIndex({ index: 1, animated: false });
            setTimeout(() => {
              $g._refFlatList = this._refFlatList;
              this._refViewBody.setNativeProps({
                opacity: 1
              });
            }, 64);
          }}
          //.end
          removeClippedSubviews={true}
        />
        {/* .end#Msg list box */}
      </ImageBackground>
    );
  }

  render() {
    return (
      <View
        style={[styles.root, { opacity: 0 }]}
        ref={ref => { this._refViewBody = ref; }}
      >
      {/* Turn sync */}
        {this._renderViewSync()}
      {/* .end#Turn sync */}
      {/* Msg list */}
        {this._renderMsgList()}
      {/* .end#Msg list */}
      </View>
    );
  }
}
