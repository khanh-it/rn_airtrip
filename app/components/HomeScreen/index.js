import { createStackNavigator, createAppContainer } from "react-navigation";
// Import component(s)
import HomeScreen from '../HomeScreen/HomeComponent';
import MsgListScreen from '../MsgListScreen';
import MsgAddScreen from '../MsgAddScreen';
import ModalScreen from '../ModalScreen';
import WebViewScreen from '../WebViewScreen';

/**
 * 
 */
export const HomeStackNavigator = createStackNavigator({
    '/home':  {
        screen: HomeScreen
    },
    // Add new message
    '/msg/add': {
        screen: MsgAddScreen,
        path: 'msg/add'
    },
    // View all messages of a contact
    '/msgs':  {
        screen: MsgListScreen
    }
},
{
    // initialRouteName: '/',
    headerMode : 'none',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
        title: 'Messaging',
        headerBackTitle: 'BackTitle',
        headerTruncatedBackTitle: 'TruncatedBackTitle',
        // headerLeft: (<Text>Nut back</Text>),
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
    },
});

export const RootStackNavigator = createStackNavigator({
    '/':  {
        screen: HomeStackNavigator
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
 * @class RootScreen (AppContainer)
 */
const RootScreen = createAppContainer(RootStackNavigator);
//
export default RootScreen;


