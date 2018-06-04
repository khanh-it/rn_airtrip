//
import Lang from './helpers/lang';
//
// export * from './helpers/native-base';
//
import xml2js from 'react-native-xml2js';

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
const $glob = {
    // @var {Object}
    configs,
    // @var {Object}
    utils: {
        xml2js
    }
};

// public?
Object.assign(global, {
    $g: global, // create ref shortcut
    $glob,
    Lang
});

// export
export default $glob;

