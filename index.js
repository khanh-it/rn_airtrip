import { AppRegistry } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
// project's globals
import prjGlob from './app/global';
// Load App root component
import App from './App';

// Hide SplashScreen
SplashScreen.hide();

// Start app
AppRegistry.registerComponent('messaging', () => App);
