//
import Lang from './helpers/lang';
//
// export * from './helpers/native-base';
//
import xml2js from 'react-native-xml2js';

// Init global styles
export * from './assets/css/styles';

// Project's environment
const ENV = 'dev'; // dev | live.
const isDEV = ('dev' === ENV);

// Configs
const configs = isDEV
    ? require('./configs/env.dev.js')
    : require('./configs/env.live.js')
;

/**
 * Define project's global 
 */
const $glob = {
    // @var {String} Project development environment!
    ENV,
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

