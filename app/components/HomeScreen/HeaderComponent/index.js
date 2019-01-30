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
  }

  onComponentDidMount()
  {
  }

  /** @var {Object}  */
  _refTextInput = null;

  /**
   * 
   * @param {Object} evt The event
   */
  handleSearchChangeText(evt)
  {

  }

  /**
   * 
   * @param {Object} evt The event
   */
  handleSearchInputBlur(evt, opts = {})
  {
    // this.refViewHead.fadeInDown();
    let duration = 500;
    this.refViewHead.transitionTo(
      { height: this.compLayouts['vHeadTitle'].height },
      duration,
      'ease-in-out'
    );
    setTimeout(() => {
      this.setState(() => ({ searchInputFocused: false }));
    }, duration + 32);
    //
  }

  /**
   * 
   * @param {Object} evt The event
   */
  handleSearchInputFocus(evt)
  {
    // this.refViewHead.fadeOutUp();
    let duration = 500;
    this.refViewHead.transition(
      { height: this.compLayouts['vHeadTitle'].height },
      { height: 0 },
      duration,
      'ease-in-out'
    );
    setTimeout(() => {
      this.setState(() => ({ searchInputFocused: true }))
    }, duration + 32);
  }

  _renderHeadTitle()
  {
    let {
      titleText
    } = this.state;

    return (
      <Ani.View
        style={[styles.header]}
        ref={ref => { this.refViewHead = ref; }}
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
          <Text style={[ESS.value('$textCenter'), styles.headerTitleText]}>
            {titleText}
          </Text>
        </View>
      </Ani.View>
    );
  }

  _renderInputSearch()
  {
    return (
      <Ani.View style={[ESS.value('$p10'), styles.search]}>
        {/* Search box */}
        <View style={[styles.searchBox]}>
          <View style={[styles.searchIcons, styles.searchIconsLeft]}>
            {this.state.searchInputFocused
              ? (<TouchableOpacity
                  onPress={() => { this._refTextInput.blur(); }}
                >
                  <VectorIcon
                    Icon={Ionicon}
                    nameIos='ios-arrow-back'
                    nameAndroid='md-arrow-back'
                    style={[styles.searchIcon, styles.searchIconBack]}
                  />
                </TouchableOpacity>)
              : (<VectorIcon
                Icon={Ionicon}
                nameIos='ios-search'
                nameAndroid='md-search'
                style={[styles.searchIcon, styles.searchIconSearch]}
              />)
            }
          </View>
          <View style={[styles.searchInput]}>
            <TextInput
              style={[styles.searchInputText]}
              //
              placeholder={'627 messages'}
              placeholderTextColor={styles.searchInputTextPhColor}
              returnKeyType="search"
              // underlineColorAndroid={'transparent'}
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
        </View>
        {/* .end#Search box */}
      </Ani.View>
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
