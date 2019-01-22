/**
 * 
 */
import React, { Component } from "react";
import ESS from 'react-native-extended-stylesheet';
import Ionicon from 'react-native-vector-icons/Ionicons';
//
import {
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

      searching: false
    };

    // Bind method(s)
    this.handleSearchChangeText = this.handleSearchChangeText.bind(this);
    this.handleSearchBlur = this.handleSearchBlur.bind(this);
    this.handleSearchFocus = this.handleSearchFocus.bind(this);
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
  handleSearchBlur(evt)
  {

  }

  /**
   * 
   * @param {Object} evt The event
   */
  handleSearchFocus(evt)
  {

  }

  _renderHeadTitle()
  {
    let {
      titleText
    } = this.state;

    return (
      <View style={[ESS.value('$p20'), styles.header]}>
        <Text style={[ESS.value('$textCenter'), styles.headerTitle]}>
          {titleText}
        </Text>
      </View>
    );
  }

  _renderInputSearch()
  {
    return (
      <View style={[ESS.value('$p10'), styles.search]}>
        {/* Search box */}
        <View style={[styles.searchBox]}>
          <View style={[styles.searchIcons, styles.searchIconsLeft]}>
            <VectorIcon
              Icon={Ionicon}
              nameIos='ios-search'
              nameAndroid='md-search'
              style={[styles.searchIcon, styles.searchIconSearch]}
            />
            {this.state.searching && <VectorIcon
              Icon={Ionicon}
              nameIos='ios-arrow-back'
              nameAndroid='md-arrow-back'
              style={[styles.searchIcon, styles.searchIconBack]}
            />}
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
              onBlur={this.handleSearchBlur}
              onFocus={this.handleSearchFocus}
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
