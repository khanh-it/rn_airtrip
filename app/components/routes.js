import { createStackNavigator, createAppContainer } from "react-navigation";
// Import component(s)
import HomeScreen from './HomeScreen';
import MsgScreen from './MsgScreen';

/**
 * 
 */
export const HomeStackNavigator = createStackNavigator({
    '/':  {
        screen: HomeScreen
    },
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

