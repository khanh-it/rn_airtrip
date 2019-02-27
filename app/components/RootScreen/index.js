import SplashScreen from 'react-native-splash-screen';
import React, { PureComponent } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
// Import component(s)
import HomeScreen from '../HomeScreen';
import ModalScreen from '../ModalScreen';
import WebViewScreen from '../WebViewScreen';

// Global styles
import styles from '../../assets/css/styles';

/**
 * @class RootStackNavigator
 */
export const RootStackNavigator = createStackNavigator({
    '/':  {
        screen: HomeScreen
    },
    '/modal':  {
        screen: ModalScreen,
    },
    '/webview': {
        screen: WebViewScreen
    }
},
{
    // initialRouteName: '/',
    mode: 'modal',
    headerMode : 'none',
});
/**
 * @class RootStackContainer
 */
const RootStackContainer = createAppContainer(RootStackNavigator);

/**
 * @class RootScreen
 */
export default class RootScreen extends PureComponent
{
  componentDidMount()
  {
    // Hide SplashScreen
    SplashScreen.hide();
  }

  render()
  {
    return (
      <RootStackContainer
        style={[styles.html]}
        ref={navigatorRef => {
          $g.navServTop.setNavigator(navigatorRef);
        }}
        uriPrefix={'messaging://'}
      />
    );
  }
}
