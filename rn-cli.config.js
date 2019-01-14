// https://gist.github.com/parshap/e3063d9bf6058041b34b26b7166fd6bd
module.exports = {
  resolver: {
    extraNodeModules: {
      'react-native-my': require.resolve('./app/polyfills/react-native-my'),
      // crypto: require.resolve('./app/polyfills/crypto'),
    },
  }
};