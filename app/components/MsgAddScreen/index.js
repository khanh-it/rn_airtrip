/**
 * 
 */
import React, { Component } from "react";
import ESS from 'react-native-extended-stylesheet';
import * as Ani from 'react-native-animatable';
import Ionicon from 'react-native-vector-icons/Ionicons';
//
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  VectorIcon
} from 'react-native-my';

// Css
import styles from './styles';

// Model(s)
import MsgListModel from '../../models/MsgListModel';
import UserModel from '../../models/UserModel';
import MsgModel from '../../models/MsgModel';

/**
 * @class MsgAddScreen
 */
export default class MsgAddScreen extends Component
{
  constructor(props)
  {
    super(props);
    
    // Init model(s)
    this._msgListModel = new MsgListModel();
    this._userModel = new UserModel();
    this._msgModel = new MsgModel();

    // Init state
    this.state = {
      // selected contact(s)
      selectedContacts: [],
      //
      searchInputFocused: null,
      searching: false,
      //
      latestUsedContacts: this._msgListModel.getLatestUsedContacts({ cnt: 4 }),
      searchingContacts: [],
    };

    // Bind method(s)
    this.handleSearchChangeText = this.handleSearchChangeText.bind(this);
    this.handleSearchInputChangeText = this.handleSearchInputChangeText.bind(this);
    this.handleSearchInputBlur = this.handleSearchInputBlur.bind(this);
    this.handleSearchInputFocus = this.handleSearchInputFocus.bind(this);
    this._switchIconSearch = this._switchIconSearch.bind(this);
    this.handleSelectContact = this.handleSelectContact.bind(this);
    this.handleUnselectContact = this.handleUnselectContact.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  onComponentDidMount()
  {
  }

  /** @var {Object}  */
  _refTextInput = null;

  /** @var {Object}  */
  _refFooterSearchTextInput = null;

  /** @var {Object}  */
  _handleSearchTimer = null;

  /**
   * 
   * @param {String} txt The searching text
   */
  handleSearchChangeText(txt)
  {
    //
    clearTimeout(this._handleSearchTimer);
    this._handleSearchTimer = setTimeout(() => {
      let searchingContacts = [];
      if (txt) {
        searchingContacts = this._userModel.dataList({
          filters: { fullname_or_tel: txt }
        });
      }
      // console.log('handleSearchChangeText#searchingContacts: ', txt, searchingContacts);
      this.setState(() => ({ searchingContacts }));
    }, 512);
    //.end
  }

  /**
   * 
   * @param {String} txt The input text
   */
  handleSearchInputChangeText(txt)
  {
    let str = txt.toString();
    let linesCnt = str.split(/\r?\n/g).length;
    this._refFooterSearchTextInput.setNativeProps({
      height: (linesCnt + 1) * ESS.value('$rem')
    });
    this._footerSearchTextInputTxt = txt;
  }

  /**
   * 
   * @param {boolean}} isFocused
   * @returns this
   */
  _switchIconSearch(isFocused)
  {
    if (isFocused) {
      this._refIconArrowBack.setNativeProps(ESS.value('$unhidden'));
      this._refIconSearch.setNativeProps(ESS.value('$hidden'));
    } else {
      this._refIconArrowBack.setNativeProps(ESS.value('$hidden'));
      this._refIconSearch.setNativeProps(ESS.value('$unhidden'));
    }
    return this;
  }

  /**
   * 
   * @param {Object} evt The event
   */
  handleSearchInputBlur(evt, opts = {})
  {
    // Trigger
    let { handleSearchInputBlur: handle } = this.props;
    handle = handle || (() => {});
    if (false === handle(evt)) {
      return;
    }
    //.end
    let duration = 200;
    this.refViewHead.transitionTo(
      { height: this.compLayouts['vHeadTitle'].height },
      duration,
      'ease-in'
    );
    setTimeout(() => {
      this._switchIconSearch(false);
    }, duration);
  }

  /**
   * 
   * @param {Object} evt The event
   */
  handleSearchInputFocus(evt)
  {
    // Trigger
    let { handleSearchInputFocus: handle } = this.props;
    handle = handle || (() => {});
    if (false === handle(evt)) {
      return;
    }
    //.end
    let duration = 200;
    this.refViewHead.transition(
      { height: this.compLayouts['vHeadTitle'].height },
      { height: 0 },
      duration,
      'ease-out'
    );
    setTimeout(() => {
      this._switchIconSearch(true);
    }, duration);
  }

  /**
   * 
   * @param {*} contact 
   * @param {*} evt 
   */
  handleSelectContact(contact, evt)
  {
    this.setState((state) => {
      let { selectedContacts: contacts } = state;
      let foundIdx = contacts.findIndex(item => (item === contact));
      if (foundIdx >= 0) { // Selected --> skip!
        return;
      }
      let selectedContacts = contacts.concat([]);
      selectedContacts.push(contact);
      return { selectedContacts };
    });
  }

  /**
   * 
   * @param {*} contact 
   * @param {*} evt
   */
  handleUnselectContact(contact, evt)
  {
    this.setState((state) => {
      let { selectedContacts: contacts } = state;
      let foundIdx = contacts.findIndex(item => (item === contact));
      if (foundIdx >= 0) {
        let selectedContacts = contacts.concat([]);
        selectedContacts.splice(foundIdx, 1);
        return { selectedContacts };
      }
    });
  }

  /**
   * 
   * @param {*} evt
   */
  handleSend(evt)
  {
    let { selectedContacts: contacts } = this.state;
    let content = this._footerSearchTextInputTxt;
    content = content.toString().trim();
    if (contacts.length && content.length) {
      let createCnt = 0;
      contacts.forEach((contact) => {
        try {
          let msgData = {
            tel: contact.tel,
            content
          };
          this._msgModel.create(msgData);
          //
          ++createCnt;
        } catch (error) {
          //...
          console.log(error);
        }
      });
      if (createCnt) {
        this.setState(() => {
          setTimeout(() => {
            $g.navServTop.goBack();
          }, 512);
          this._refFooterSearchTextInput.clear();
          return { selectedContacts: [] };
        });
      }
    }
  }

  _renderHeader()
  {
    let {
      selectedContacts
    } = this.state;

    return (
      <View
        ref={ref => { this._refHeader = ref; }}
        style={[styles.header]}
      >
        <View style={[styles.headerIcons, styles.headerIconsLeft]}>
          <TouchableOpacity
            onPress={() => { $g.navServTop.goBack(); }}
          >
            <VectorIcon
              Icon={Ionicon}
              name='ios-arrow-back'
              size={18}
              style={[styles.headerIcon, styles.headerIconBack]}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={[styles.searchInput]}
          contentContainerStyle={[styles.searchInputContainer]}
        >
          {selectedContacts.map((contact) => {
            return (
              <View key={contact.key()} style={[styles.headContact]}>
                <Text style={[styles.headContactTxt]}>{contact.fullname()}</Text>
                <TouchableOpacity
                  onPress={(evt) => {
                    return this.handleUnselectContact(contact, evt);
                  }}
                >
                  <Text style={[styles.headContactRemoveTxt]}>x</Text>
                </TouchableOpacity>
              </View>
            );
          })}
          <TextInput
            ref={ref => { return this._refTextInput = ref; }}
            style={[styles.searchInputText]}
            //
            placeholder={'To'}
            placeholderTextColor={styles.searchInputTextPhColor}
            // returnKeyType="search"
            // underlineColorAndroid={'transparent'}
            contextMenuHidden={true}
            //
            onChangeText={this.handleSearchChangeText}
          />
        </ScrollView>
        <View style={[styles.headerIcons, styles.headerIconsRight]}>            
          <VectorIcon
              Icon={Ionicon}
              nameIos='ios-person'
              nameAndroid='md-person'
              size={18}
              style={[styles.searchIcon, styles.searchIconPerson]}
            />
            <Text style={[styles.headerIconsRightTxtCnt]}>{
              selectedContacts.length ? selectedContacts.length : ''
            }</Text>
        </View>
      </View>
    );
  }

  _renderBody()
  {
    let {
      latestUsedContacts 
    } = this.state;

    return (
      <View
        ref={ref => { this._refBody = ref; }}
        style={[styles.body]}
      >
      {(latestUsedContacts.length > 0) && (
        <View style={[styles.bodyLatestUsedContacts]}>
        {latestUsedContacts.map((contact, idx) => {
          return (
            <View
              key={contact.key()}
              style={[styles.bodyContact, styles['bodyContact' + idx], styles.bodyContactLatestUsed]}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={(evt) => {
                  return this.handleSelectContact(contact, evt);
                }}
              >
                <Text style={[styles.bodyContactTxt]}>{contact.fullname()}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
        </View>
      )}
      </View>
    );
  }

  _renderFooter()
  {
    let {
      latestUsedContacts
    } = this.state;

    return (
      <View
        ref={ref => { this._refFooter = ref; }}
        style={[ESS.value('$floating'), styles.footer]}
      >
        <View style={[styles.footerInputPadding]}>
          <View style={[styles.footerIcons, styles.footerIconsLeft]}>
            <TouchableOpacity
              onPress={() => { $g.navServTop.goBack(); }}
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
      </View>
    );
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
      {/* Footer */}
      {this._renderFooter()}
      {/* .end#Footer */}
      </View>
    );
  }
}
