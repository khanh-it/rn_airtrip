//
import { Dimensions } from 'react-native';
//
import EStyleSheet from 'react-native-extended-stylesheet';
//
import xml2js from 'react-native-xml2js';
//
import Lang from './helpers/lang';
//
// export * from './helpers/native-base';

// Init global styles
export * from './assets/css/styles';

// Configs
const configs = global.__DEV__
  ? require('./configs/env.dev.js')
  : require('./configs/env.live.js')
;

/**
 * Define project's global 
 */
Object.assign(global, {
  // create ref shortcut
  $g: global,
  // @var {Object}
  configs,
  // @var {Object} translate helper
  Lang,
  // @var {Object}
  utils: {
    xml2js,
    Dimensions
  },
  // @var {Object}
  dimensions: {
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen')
  },
  // @var {Object}
  EStyleSheet
});
// Event Listener for orientation changes
Dimensions.addEventListener('change', (dimensions) => {
  Object.assign(global, { dimensions });
});

// export
export default global;
