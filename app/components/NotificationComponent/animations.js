/**
 * Custom animations 
 */
import { Dimensions } from 'react-native';
import * as Ani from 'react-native-animatable';

/**
 * 
 */
const myFadeOutUp = {
  0: {
    opacity: 1,
    transform: [{ translateY: 0 }]
  },
  1: {
    opacity: 0,
    transform: [{ translateY: -$g.dimensions.screen.height }]
  },
};
Ani.initializeRegistryWithDefinitions({ myFadeOutUp });