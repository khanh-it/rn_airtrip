/**
 * 
 */
import React, { Component } from "react";
import { View, Text } from 'react-native';

// Component(s)
// import MsgScreenNavigator from './routes';

/**
 * @class MsgScreen
 */
/* export class MsgScreen extends Component
{
  render() {
    return <MsgScreenNavigator />;
  }
}
export default MsgScreen; */

class MsgComponent extends Component
{
  render()
  {
    return <View>
      <Text>MsgComponent</Text>
    </View>;
  }
}

export default MsgComponent;
