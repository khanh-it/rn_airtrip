/**
 * 
 */
import React, { PureComponent } from "react";
import ESS from 'react-native-extended-stylesheet';
import * as Ani from 'react-native-animatable';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  VectorIcon
} from 'react-native-my';

// Component(s)

// Css
import styles from './styles';

// Model(s)
import MsgListModel from '../../models/MsgListModel';
import MsgModel from '../../models/MsgModel';
import UserModel from '../../models/UserModel';
import MsgEntity from '../../models/MsgEntity';

/**
 * @class MsgListComponent
 */
export default class MsgListComponent extends PureComponent
{
  constructor(props)
  {
    super(props);

    // Init model(s)
    this._msgListModel = new MsgListModel();
    this._msgModel = new MsgModel();
    this._userModel = new UserModel();

    // Init state
    // +++
    let msg = props.navigation.getParam('msg');
    let contact = this._userModel.findOne({
      filters: { fullname_or_tel: msg.getTel() }
    });
    let dataList = this._msgModel.dataList({
      filters: { tel: msg.getTel() },
      orderBy: {
        date: true
      }
    }); // console.log('dataList: ', dataList);
    // +++
    this.state = {
      msg,
      contact,
      dataList,
      // list of selected msg
      msgsSelected: {},
      //
      msgEditing: false
    };

    // Bind method(s)
    this.handleSelectMsg = this.handleSelectMsg.bind(this);
    this._renderMsgItem = this._renderMsgItem.bind(this);

    // Navigations event(s)
    /* const willFocusSubscription = props.navigation.addListener(
      'willFocus',
      payload => {
        console.debug('willFocus: ', payload);
      }
    );
    const didFocusSubscription = props.navigation.addListener(
      'didFocus',
      payload => {
        console.debug('didFocus: ', payload);
      }
    );
    const willBlurSubscription = props.navigation.addListener(
      'willBlur',
      payload => {
        console.debug('willBlur: ', payload);
      }
    );
    const didBlurSubscription = props.navigation.addListener(
      'didBlur',
      payload => {
        console.debug('didBlur: ', payload);
      }
    ); */
  }

  /**
   * 
   * @param {Object} msgEnt 
   * @param {Object} evt 
   */
  handleSelectMsg(msgEnt, evt)
  {
    let { msgEditing, msgsSelected } = this.state;
    if (!msgEditing) {
      return;
    }
    let key = msgEnt.key();
    msgsSelected = Object.assign({}, msgsSelected);
    // Case: select
    if (!msgsSelected[key]) {
      msgsSelected[key] = msgEnt;
    // Case: unselect
    } else {
      delete msgsSelected[key];
    }
    this.setState(() => ({ msgsSelected }));
  }

  _renderMsgItem({ item: msgEnt, idx })
  {
    let {
      msgEditing,
      msgsSelected
    } = this.state;
    let key = msgEnt.key();

    return (
      <View
        key={key}
        style={[styles.bodyMsg, styles['bodyMsg' + idx], styles.bodyMsgR]}
      >
        <View style={[styles.bodyMsgItem, styles.bodyMsgItemR]}>
          <View style={[styles.bodyMsgTime, styles.bodyMsgTimeR]}>
            <Text style={[styles.bodyMsgTimeTxt]}>{msgEnt.dateAsStr()}</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onLongPress={(evt) => {
              this.setState({ msgEditing: true });
            }}
            onPress={(evt) => {
              this.handleSelectMsg(msgEnt, evt);
            }}
            style={[styles.bodyMsgContent, styles.bodyMsgContentR]}
          >
            <Text style={[styles.bodyMsgContentTxt]}>{msgEnt.getContent()}</Text>
          </TouchableOpacity>
        </View>
        {msgEditing && (
          <Ani.View
            style={[styles.bodyMsgIcons, styles.bodyMsgIconsR]}
            // animation={'fadeIn'}
          >
            <VectorIcon
              Icon={Ionicon}
              nameIos={msgsSelected[key] ? 'ios-radio-button-on' : 'ios-radio-button-off'}
              nameAndroid={msgsSelected[key] ? 'md-radio-button-on' : 'md-radio-button-off'}
              style={[styles.bodyMsgIcon, styles.bodyMsgIconCkb]}
            />
          </Ani.View>
        )}
      </View>
    );
  }

  _renderHeader()
  {
    let {
      msg,
      contact,
      msgsSelected,
      msgEditing,
    } = this.state;

    return (
      <Ani.View
        ref={ref => { this._refHeader = ref; }}
        style={[styles.header]}
      >
        <View style={[styles.headerIcons, styles.headerIconsL]}>
          {msgEditing && (
            <Ani.View
              animation={'fadeIn'}
            >
              <TouchableOpacity
                onPress={() => {
                  this.setState({ msgEditing: false });
                }}
              >
                <VectorIcon
                  Icon={Ionicon}
                  nameIos='ios-close'
                  nameAndroid='md-close'
                  style={[styles.headerIcon, styles.headerIconClose]}
                />
              </TouchableOpacity>
            </Ani.View>
          )}
          {!msgEditing && (
            <Ani.View
              animation={'fadeIn'}
            >
              <TouchableOpacity
                onPress={() => { $g.navServTop.goBack(); }}
              >
                <VectorIcon
                  Icon={Ionicon}
                  nameIos='ios-arrow-back'
                  nameAndroid='md-arrow-back'
                  style={[styles.headerIcon, styles.headerIconBack]}
                />
              </TouchableOpacity>
            </Ani.View>
          )}
        </View>
        <View style={[styles.searchInput]}>
          <Text style={[styles.searchInputText, styles.searchInputTextLine1]}>{contact.fullname()}</Text>
          <Text style={[styles.searchInputText, styles.searchInputTextLine2]}>{msg.getTel()}</Text>
        </View>
        <View style={[styles.headerIcons, styles.headerIconsR]}>
          <VectorIcon
              Icon={Ionicon}
              nameIos='ios-call'
              nameAndroid='md-call'
              style={[styles.headerIcon, styles.searchIconCall]}
            />
        </View>
      </Ani.View>
    );
  }

  _renderTools()
  {
    let {
      msgEditing
    } = this.state;

    return (msgEditing && (
      <Ani.View
        ref={ref => { this._refTools = ref; }}
        style={[styles.tools]}
        animation={'fadeInUp'}
        duration={512}
      >
        {/*Forward*/}
        <View style={[styles.tool]}>
          <TouchableOpacity
            onPress={(evt) => { alert('Forward') }}
            style={[styles.toolTouch]}
          >
            <VectorIcon
              Icon={Ionicon}
              nameIos='ios-redo'
              nameAndroid='md-redo'
              size={32}
              style={[styles.toolIcon]}
            />
            <Text style={[styles.toolTxt]}>{'Forward'}</Text>
          </TouchableOpacity>
        </View>
        {/*end#Forward*/}
        {/*Copy*/}
        <View style={[styles.tool]}>
          <TouchableOpacity
            onPress={(evt) => { alert('Copy') }}
            style={[styles.toolTouch]}
          >
            <VectorIcon
              Icon={Ionicon}
              nameIos='ios-copy'
              nameAndroid='md-copy'
              size={32}
              style={[styles.toolIcon]}
            />
            <Text style={[styles.toolTxt]}>{'Copy'}</Text>
          </TouchableOpacity>
        </View>
        {/*end#Copy*/}
        {/*Delete*/}
        <View style={[styles.tool]}>
          <TouchableOpacity
            onPress={(evt) => { alert('Delete') }}
            style={[styles.toolTouch]}
          >
            <VectorIcon
              Icon={Ionicon}
              nameIos='ios-trash'
              nameAndroid='md-trash'
              size={32}
              style={[styles.toolIcon]}
            />
            <Text style={[styles.toolTxt]}>{'Delete'}</Text>
          </TouchableOpacity>
        </View>
        {/*end#Delete*/}
        {/*More*/}
        <View style={[styles.tool]}>
          <TouchableOpacity
            onPress={(evt) => { alert('More') }}
            style={[styles.toolTouch]}
          >
            <VectorIcon
              Icon={Ionicon}
              name='ios-more'
              size={32}
              style={[styles.toolIcon]}
            />
            <Text style={[styles.toolTxt]}>{'More'}</Text>
          </TouchableOpacity>
        </View>
        {/*end#More*/}
      </Ani.View>
    ));
  }

  _renderBody()
  {
    let {
      dataList
    } = this.state;

    return (
      <View
        ref={ref => { this._refBody = ref; }}
        style={[styles.body]}
      >
      {(dataList.length > 0) && (
        <FlatList
          style={[styles.bodyMsgListBox]}
          contentContainerStyle={[styles.bodyMsgListBoxCC]}
          ref={ref => { this._refFlatList = ref; }}
          data={dataList}
          extraData={this.state}
          keyExtractor={(msgEnt) => msgEnt.key()}
          renderItem={this._renderMsgItem}
          keyboardDismissMode={'on-drag'}
          removeClippedSubviews={true}
          inverted={true}
        />
      )}
      </View>
    );
  }

  _renderFooter()
  {
    let {
      msgEditing
    } = this.state;

    return (!msgEditing && (
      <Ani.View
        ref={ref => { this._refFooter = ref; }}
        style={[styles.footer]}
      >
        <View style={[styles.footerInputPadding]}>
          <View style={[styles.footerIcons, styles.footerIconsLeft]}>
            <TouchableOpacity
              onPress={() => { alert('input more...'); }}
            >
              <VectorIcon
                Icon={Ionicon}
                name='ios-add-circle'
                size={36}
                style={[styles.footerSearchIcon, styles.footerSearchIconAddCircle]}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.footerSearchInput]}>
            <TextInput
              ref={ref => { return this._refFooterSearchTextInput = ref; }}
              style={[styles.footerSearchInputText]}
              //
              placeholder={'Text message'}
              placeholderTextColor={styles.footerSearchInputTextPhColor}
              // returnKeyType="search"
              // underlineColorAndroid={'transparent'}
              contextMenuHidden={true}
              multiline={true}
              //
              onChangeText={this.handleSearchInputChangeText}
            />
          </View>
        </View>
        <View style={[styles.footerIcons, styles.footerIconsRight]}>
          <TouchableOpacity
            onPress={this.handleSend}
            activeOpacity={0.8}
          >
            <VectorIcon
              Icon={Ionicon}
              name='ios-arrow-round-up'
              size={36}
              style={[styles.footerSearchIcon, styles.footerSearchIconArrowRoundUp]}
            />
          </TouchableOpacity>
        </View>
      </Ani.View>
    ));
  }

  render() {
    return (
      <View style={[styles.root]}>
      {/* Header */}
        {this._renderHeader()}
      {/* .end#Header */}
      {/* Body */}
      {this._renderBody()}
      {/* .end#Body */}
      {/* Tools */}
      {this._renderTools()}
      {/* .end#Tools */}
      {/* Footer */}
      {this._renderFooter()}
      {/* .end#Footer */}
      </View>
    );
  }
}
