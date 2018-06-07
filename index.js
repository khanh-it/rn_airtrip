import { AppRegistry } from 'react-native';
//
import SplashScreen from 'react-native-splash-screen';
// project's globals
import prjGlob from './app/global';
// Load App root component
// import App from './App';
// import App from './App.ReactNavigation';
// import App from './App.ReactNativeEmojis';
// import App from './App.ReactNativeExtendedStyleSheet';
// import App from './App.ReactRedux';
// import App from './App.SplashScreen';
// import App from './App.ReactNativeVectorIcons';
// import App from './App.ReactNativeAnimatable';
import App from './App.WebView';

// Hide SplashScreen
SplashScreen.hide();

//
AppRegistry.registerComponent('rn_airtrip', () => App);
