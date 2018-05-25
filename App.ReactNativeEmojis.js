// In App.js in a new project
import React from 'react';
import { View, Text } from 'react-native';

// 
import Emojis from './app/components/Emojis';

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Emojis />
      </View>
    );
  }
}
