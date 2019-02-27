/**
 * 
 */
import React, { PureComponent } from "react";
import ESS from 'react-native-extended-stylesheet';
import * as Ani from 'react-native-animatable';
import Ionicon from 'react-native-vector-icons/Ionicons';
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

// Component(s)

// Css
import styles from './styles';

// Model(s)
import MsgListModel from '../../models/MsgListModel';
import MsgModel from '../../models/MsgModel';
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

    // Init state
    this.state = {
      msg: props.navigation.getParam('msg'),
      dataList: [],
    };

    // Bind method(s)
    this.handleSelectMsg = this.handleSelectMsg.bind(this);

    // Navigations event(s)
    const willFocusSubscription = props.navigation.addListener(
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
    );
  }

  componentDidMount()
  {
    let { msg } = this.state;
    if (msg instanceof MsgEntity) {
      let dataList = this._msgModel.dataList({
        filters: {
          tel: msg.getTel()
        }
      });
      this.setState(state => ({ dataList }));
    }
  }

  /**
   * 
   * @param {Object} msgEnt 
   * @param {Object} evt 
   */
  handleSelectMsg(msgEnt, evt)
  {

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

  _renderHeader()
  {
    let {
      msg
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
        <View
          style={[styles.searchInput]}
          contentContainerStyle={[styles.searchInputContainer]}
        >
          <Text>{msg.getTel()}</Text>
        </View>
        <View style={[styles.headerIcons, styles.headerIconsRight]}>            
          <VectorIcon
              Icon={Ionicon}
              nameIos='ios-person'
              nameAndroid='md-person'
              size={18}
              style={[styles.searchIcon, styles.searchIconPerson]}
            />
        </View>
      </View>
    );
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
        <ScrollView style={[styles.bodyLatestUsedContacts]}>
        {dataList.map((msgEnt, idx) => {
          return (
            <View
              key={msgEnt.key()}
              style={[styles.bodyContact, styles['bodyContact' + idx], styles.bodyContactLatestUsed]}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={(evt) => {
                  return this.handleSelectMsg(msgEnt, evt);
                }}
              >
                <Text style={[styles.bodyContactTxt]}>{msgEnt.getContent()}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
        </ScrollView>
      )}
      </View>
    );
  }

  _renderFooter()
  {
    let {
      dataList
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
