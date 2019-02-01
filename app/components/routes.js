import { createStackNavigator, createAppContainer } from "react-navigation";
// Import component(s)
import HomeScreen from './HomeScreen';
import MsgScreen from './MsgScreen';
import MsgAddScreen from './MsgAddScreen';

/**
 * 
 */
export const HomeStackNavigator = createStackNavigator({
    '/':  {
        screen: HomeScreen
    },
    // Add new message
    '/msg/add': {
        screen: MsgAddScreen
    },
    // View all messages of a contact
    '/msg':  {
        screen: MsgScreen
    }
},
{
    initialRouteName: '/',
    headerMode : 'none'
});
/**
 * 
 */
export const HomeStackContainer = createAppContainer(HomeStackNavigator);

