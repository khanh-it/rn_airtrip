// https://gist.github.com/parshap/e3063d9bf6058041b34b26b7166fd6bd
module.exports = {
    extraNodeModules: {
      // 'react-native-extended': require.resolve('./app/node_modules/react-native-extended'),
      crypto: require.resolve('./app/polyfills/crypto'),
    },
};