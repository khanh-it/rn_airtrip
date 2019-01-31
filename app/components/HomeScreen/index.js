/**
 * 
 */
import React, { Component } from "react";
import ESS from 'react-native-extended-stylesheet';
//
import {
  View,
  TouchableOpacity,
  Keyboard
} from 'react-native';
// import { Text } from 'react-native-my';
// Css
import styles from './styles';

// Component(s)
import HeaderComponent from './HeaderComponent';
import BodyComponent from './BodyComponent';

/**
 * @class HomeScreen
 */
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      auth: null
    };

    // Bind method(s)
    this.handleTouchOverlay = this.handleTouchOverlay.bind(this);
    this.handleSearchInputBlur = this.handleSearchInputBlur.bind(this);
    this.handleSearchInputFocus = this.handleSearchInputFocus.bind(this);
  }

  componentDidMount()
  {
    // Hide body overlay
    // this.hideBodyOverlay();
  }

  /**
   * Hide body overlay
   */
  hideBodyOverlay()
  {
    this._refViewBodyOverlay.setNativeProps(ESS.value('$hidden'));
  }

  /**
   * Show body overlay
   */
  showBodyOverlay()
  {
    this._refViewBodyOverlay.setNativeProps(styles.bodyOverlay);
  }

  /**
   * 
   * @param {*} evt 
   */
  handleTouchOverlay(evt)
  {
    Keyboard.dismiss(evt);
    // Hide body overlay
    this.hideBodyOverlay();
  }

  /**
   * 
   */
  handleSearchInputFocus(evt)
  {
    // Show body overlay
    this.showBodyOverlay();
  }

  /**
   * 
   */
  handleSearchInputBlur(evt)
  {
    // Hide body overlay
    this.hideBodyOverlay();
  }

  render() {
    //
    let { bgSrc } = this.state;

    //
    return (
      <View style={[styles.root]}>
        <HeaderComponent
          ref={ref => { this._refViewHeader = ref; }}
          handleSearchInputFocus={this.handleSearchInputFocus}
          handleSearchInputBlur={this.handleSearchInputBlur}
        />
        <View
          style={[styles.bodyWrap]}
          // ref={ref => { this._refViewBodyWrap = ref; }}
        >
          <BodyComponent
            ref={ref => { this._refViewBody = ref; }}
          />
          <TouchableOpacity
            ref={ref => { this._refViewBodyOverlay = ref; }}
            style={[ESS.value('$floating'), styles.bodyOverlay, ESS.value('$hidden')]}
            activeOpacity={0.2}
            onPress={this.handleTouchOverlay}
          />
        </View>
      </View>
    );
  }
}
