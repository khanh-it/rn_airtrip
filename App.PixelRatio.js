import React, { Component, } from "react";
import {
  PixelRatio,
  View,
  Text
} from "react-native";

/**
 * @class App
 */
export default class App extends Component
{
  render() {
    return (
      <View>
        <Text>get: {1 / PixelRatio.get()}</Text>
      </View>
    );
  }
}
