/**
 * 
 */
import { createStackNavigator } from "react-navigation";

// Component(s)
import MsgListComponent from './MsgListComponent';

/**
 * @class MsgListScreen
 */
const MsgListScreen = createStackNavigator({
  '/msgs/': {
      screen: MsgListComponent,
      path: 'msgs/:contact'
  }
},
{
  // initialRouteName: '',
  headerMode : 'none',
});
export default MsgListScreen;
