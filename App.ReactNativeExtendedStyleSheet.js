// In App.js in a new project
import React from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

// define extended styles 
const styles = EStyleSheet.create({
  column: {
    width: '80%'                                    // 80% of screen width
  },
  text: {
    color: '$textColor',                            // global variable $textColor
    fontSize: '1.5rem'                              // relative REM unit
  },
  '@media (min-width: 350) and (max-width: 500)': { // media queries
    text: {
      fontSize: '2rem',
    }
  }
});
EStyleSheet.build({ // always call EStyleSheet.build() even if you don't use global variables!
  $textColor: '#0275d8'
});

// use styles as usual
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.column}>
        <Text style={styles.text}>Hello</Text>
      </View>
    );
  }
}
