//
import Lang from './helpers/lang';
//
// export * from './helpers/native-base';

// Init global styles
export * from './assets/css/styles';

/**
 * Define project's global 
 */
const $global = {
    /**
     * Project development environment!
     * @var String
     */
    ENV: 'dev' // dev | live
};

// public?
Object.assign(global, {
    projectGlobal: $global,
    Lang
});

// export
export default $global;
