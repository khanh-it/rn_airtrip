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
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import {
  Text,
  VectorIcon
} from 'react-native-my';

// Css
import styles from './styles';

/**
 * @class HeaderComponent
 */
export default class HeaderComponent extends Component
{
  constructor(props) {
    super(props);

    // Init state
    this.state = {
      title: {},
      titleText: $g.Lang('Messaging'),
      //
      searchInputFocused: null,
      searching: false
    };

    //
    this.compLayouts = {

    },
    //.end

    // Bind method(s)
    this.handleSearchChangeText = this.handleSearchChangeText.bind(this);
    this.handleSearchInputBlur = this.handleSearchInputBlur.bind(this);
    this.handleSearchInputFocus = this.handleSearchInputFocus.bind(this);
    this._switchIconSearch = this._switchIconSearch.bind(this);
  }

  onComponentDidMount()
  {
  }

  /** @var {Object}  */
  _refTextInput = null;

  /**
   * 
   */
  getRefTextInput()
  {
    return this._refTextInput;
  }

  getRefViewHead()
  {
    return this.refViewHead;
  }

  /**
   * 
   * @param {Object} evt The event
   */
  handleSearchChangeText(evt)
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
   */
  handleScrolledYOffset(evt)
  {
    // Hide body overlay
    let { y } = evt;
    let _h = this.compLayouts['viewSearch'].height;
    let height = _h + y;
    height = (height <= 0) ? 0 : Math.min(height, _h);
    return;
    if (height > 0) {
      return;
    }
    // console.log('sYOHandler: ', height, y);
    let _sYOHandlerTimer = this._sYOHandlerTimer;
    // clearTimeout(this._sYOHandlerTimer);
    // this._sYOHandlerTimer = setTimeout(() => {
      // clearTimeout(_sYOHandlerTimer);
      // return console.log('sYOHandler --- set: ', height, y);
      this._refSearch.setNativeProps({ height });
    // }, 0);
  }

  _renderHeadTitle()
  {
    let {
      titleText
    } = this.state;

    return (
      <Ani.View
        style={[styles.header]}
        ref={ref => { $g._refViewHead = this.refViewHead = ref; }}
      >
        <View
          style={[styles.headerTitle]}
          ref={ref => { this.refViewHeadTitle = ref; }}
          onLayout={(event) => {
            if (!this.compLayouts['vHeadTitle']) {
              this.compLayouts['vHeadTitle'] = event.nativeEvent.layout;
              /* var { x, y, width, height } = event.nativeEvent.layout
              this.refViewHeadTitle.setNativeProps({ height });
              console.log('height: ', height); */
            }
          }}
        >
          <Text style={[ESS.value('$textCenter'), styles.headerTitleText]}>{titleText}</Text>
        </View>
      </Ani.View>
    );
  }

  _renderInputSearch()
  {
    let {
      searchInputFocused 
    } = this.state;

    return (
      <View
        ref={ref => { this._refSearch = ref; }}
        style={[ESS.value('$p10'), styles.search]}
        onLayout={(event) => {
          this.compLayouts['viewSearch'] = this.compLayouts['viewSearch'] || event.nativeEvent.layout;
        }}
      >
        {/* Search box */}
        <Ani.View
          ref={ref => { this._refInputSearch = ref; }}
          style={[styles.searchBox]}
        >
          <View style={[styles.searchIcons, styles.searchIconsLeft]}>
            <TouchableOpacity
              style={[!searchInputFocused && ESS.value('$hidden')]}
              onPress={() => { this._refTextInput.blur(); }}
              ref={ref => { this._refIconArrowBack = ref; }}
            >
              <VectorIcon
                Icon={Ionicon}
                nameIos='ios-arrow-back'
                nameAndroid='md-arrow-back'
                style={[styles.searchIcon, styles.searchIconBack]}
              />
            </TouchableOpacity>
            <View
              style={[searchInputFocused && ESS.value('$hidden')]}
              ref={ref => { this._refIconSearch = ref; }}
            >
              <VectorIcon
                Icon={Ionicon}
                nameIos='ios-search'
                nameAndroid='md-search'
                style={[styles.searchIcon, styles.searchIconSearch]}
              />
            </View>
          </View>
          <View style={[styles.searchInput]}>
            <TextInput
              style={[styles.searchInputText]}
              //
              placeholder={'627 messages'}
              placeholderTextColor={styles.searchInputTextPhColor}
              returnKeyType="search"
              // underlineColorAndroid={'transparent'}
              contextMenuHidden={true}
              maxLength={256}
              //
              onChangeText={this.handleSearchChangeText}
              // onChange={this.handleSearchChange}
              onBlur={this.handleSearchInputBlur}
              onFocus={this.handleSearchInputFocus}
              //
              ref={ref => { return this._refTextInput = ref; }}
            />
          </View>
          <View style={[styles.searchIcons, styles.searchIconsRight]}>            
            {this.state.searching && <VectorIcon
                Icon={Ionicon}
                nameIos='ios-close-circle'
                nameAndroid='md-close-circle'
                style={[styles.searchIcon, styles.searchIconBack]}
              />}
          </View>
        </Ani.View>
        {/* .end#Search box */}
      </View>
    );
  }

  render() {
    return (
      <View style={[styles.root]}>
      {/* Header title */}
        {this._renderHeadTitle()}
      {/* .end#Header title */}
      {/* Input search */}
        {this._renderInputSearch()}
      {/* .end#Input search */}
      </View>
    );
  }
}
