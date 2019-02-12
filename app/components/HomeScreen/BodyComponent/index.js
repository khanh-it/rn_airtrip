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
  ImageBackground,
  Alert,
  TouchableOpacity,
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
    this.handleSelectMsg = this.handleSelectMsg.bind(this);
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

  handleSelectMsg(msg, evt)
  {
    $g.navServTop.navigate('/msg', { msg });
  }

  handleAddMsg(evt)
  {
    $g.navServTop.navigate('/msg/add', {});
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
        <TouchableOpacity
          onPress={() => { Alert.alert('sync: title', 'sync: touched') }}
        >
          <View>
            <Text style={[ESS.value('$textCenter'), styles.syncText]}>{syncText}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _renderViewFLZero()
  {
    this._vFLZeroMinHeight = Math.round($g.dimensions.window.height * 1/4);
    return (
      <View
        style={[styles.vFLZero, { height: this._vFLZeroMinHeight }]}
        ref={ref => { this._refViewFLZero = $g._refViewFLZero = ref; }}
        onLayout={(evt) => { this._compLayout(evt, 'viewFLZero'); }}
        pointerEvents="none"
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
        handleSelectMsg={(evt) => {
          this.handleSelectMsg(msg, evt);
        }}
      />
    );
  }

  _renderMsgList()
  {
    let {
      contactsWithLatestMsgs: dataList
    } = this.state;
    dataList = (dataList.length > 0) ? [0].concat(dataList) : dataList;

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
        style={[ESS.value('$floating'), styles.msgList, styles.msgList_withFLTop]}
        ref={ref => { this._refViewMsgList = ref; }}
        onLayout={(evt) => { this._compLayout(evt, 'viewMsgList'); }}
      >
        {/* <Button title="Set data 'msg'" onPress={() => { this.msgListModel.setMsgs(); }} />
        <Button title="Set data 'users'" onPress={() => { this.msgListModel.setUsers(); }} /> */}
        {/* Msg list box */}
        <FlatList
          style={[styles.msgListBox]}
          contentContainerStyle={[styles.msgListBoxCC]}
          ref={ref => { this._refFlatList = ref; }}
          data={dataList}
          extraData={this.state}
          keyExtractor={(contact) => (contact.tel || Math.random().toString())}
          renderItem={this._renderMsgItem}
          // ListHeaderComponent={}
          // ListEmptyComponent={}
          // ListFooterComponent={}
          // refreshing={false}
          // onRefresh={(evt) => { console.log('onRefresh: ', evt); }}
          keyboardDismissMode={'on-drag'}
          removeClippedSubviews={true}
          showsVerticalScrollIndicator={false}
          decelerationRate={1}
          // onResponderMove={(evt) => { console.log('onResponderMove: '); }}
          onScrollBeginDrag={(evt) => {
            // console.log('onScrollBeginDrag: ');
            let { contentOffset } = evt.nativeEvent;
            this._scrollContentOffset = contentOffset;
            //
            this._refViewSync.setNativeProps({ zIndex: null });
          }}
          onScroll={(evt) => {
            let { contentOffset } = evt.nativeEvent;
            let _scrollContentOffset = this._scrollContentOffset;
            if (_scrollContentOffset) {
              let y = (_scrollContentOffset.y - contentOffset.y);// scrolled y
              let { handleScrolledYOffset: sYOHandler } = this.props;
              sYOHandler = sYOHandler || (() => {});
              let vFL1stMinHeight = 60;
              let threshold = 0;//50;
              let scrolledY = Math.round(this._vFLZeroMinHeight - contentOffset.y);
              let viewOffset = 0;
              if (scrolledY >= vFL1stMinHeight) {
                viewOffset += vFL1stMinHeight;
              }
              sYOHandler({ y });
              // console.log('onScroll: ', y, contentOffset);
              // 
              if (Math.abs(0 - contentOffset.y) <= threshold) {
                // Alert.alert('show secure password...');
                console.log('show secure password...');
              }
              //.end
              // scroll up?
              // if (y < 0) {}
              //.end
            }
            this._refViewSync.setNativeProps({ zIndex: null });
            // this._scrollContentOffset = contentOffset;
          }}
          onScrollEndDrag={(evt) => {
            // this._scrollContentOffset = null;
            let threshold = 0;//50;
            let { contentOffset } = evt.nativeEvent;
            let vFL1stMinHeight = 60;
            let y = (this._scrollContentOffset.y - contentOffset.y);
            // scrolled y
            let scrolledY = Math.round(this._vFLZeroMinHeight - contentOffset.y);
            let viewOffset = 0;
            if (scrolledY >= vFL1stMinHeight) {
              viewOffset += vFL1stMinHeight;
            }
            // console.log('onScrollEndDrag: ', y, contentOffset, viewOffset);
            if ((y > 0) || (y < 0 && y >= (-1 * threshold))) {
              this._refFlatList.scrollToIndex({ index: 1, viewOffset: 0 + viewOffset });
              viewOffset && this._refViewSync.setNativeProps({ zIndex: 999 });
            }
          }}
          // onMomentumScrollBegin={(evt) => { console.log('onMomentumScrollBegin: ', evt); }}
          // onMomentumScrollEnd={(evt) => { console.log('onMomentumScrollEnd: ', evt); }}
          onLayout={(evt) => {
            this._compLayout(evt, 'viewFlatList');
            if (dataList.length > 0) {
              this._refFlatList.scrollToIndex({ index: 1, animated: false, viewOffset: 0 });
            }
            setTimeout(() => {
              $g._refFlatList = this._refFlatList;
              this._refViewBody.setNativeProps({ opacity: 1 });
            }, 32);
          }}
          //.end
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
      {/* Add msg button */}
        <TouchableOpacity
          style={[ESS.value('$floating'), styles.btnAddMsg]}
          activeOpacity={0.8}
          onPress={this.handleAddMsg}
        >
          <Text style={[ESS.value('$textCenter'), styles.btnAddMsgTxt]}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
