/**
 * 
 */
import React, { Component } from "react";
//
import {
  ScrollView,
  View,
  Text,
  ImageBackground
} from 'react-native';
// Css
import styles from './styles';

// Component(s)
import ImgBgSliderComponent from './ImgBgSliderComponent';

/**
 * @class HomeComponent
 */
export default class HomeComponent extends Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {};
  }

  componentDidMount() {}

  render() {
    let { bgSrc } = this.state;
    return (
      <View
        style={[styles.root]}
      >
        <ImgBgSliderComponent />
        <ScrollView
          style={[styles.page]}
          contentContainerStyle={[styles.pageContent]}
        >
          <Text>HomeScreen</Text>
        </ScrollView>
      </View>
    );
  }
}
