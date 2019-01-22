/**
 * 
 */
import React, { Component } from "react";
//
import {
  ScrollView,
  View,
  Image,
  Button,
  TouchableWithoutFeedback
} from 'react-native';
import {
  Text
} from 'react-native-my';
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
    this.onMainNav = this.onMainNav.bind(this);
  }

  componentDidMount() {}

  /**
   * 
   * @param {*} nav 
   * @param {*} evt 
   */
  onMainNav(nav, evt) {
    switch (nav.toLowerCase()) {
      // 
      case 'domestic': {

      } break;
      //
      case 'overseas': {
        // Open webview
        $g.utils.WebView.main.open({
          uri: $g.configs.URL.overseas_secure
        });
      } break;
    }
  }

  render() {
    //
    let { bgSrc } = this.state;

    //
    return (
      <View style={[styles.body]} >
        <HeaderComponent key="header" />
        <BodyComponent />
      </View>
    );
  }
}
