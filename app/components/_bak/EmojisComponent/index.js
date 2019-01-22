//
import React, { PureComponent } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Text,
    TouchableOpacity
} from 'react-native';
import Emoji from 'react-native-emoji';

//
import emojis from './data.json';

const emojisF = emojis.filter((emoji, idx) => {
    return (idx >= 800 && idx <= 1600);
});

//
let styles = StyleSheet.create({
    box: {

    },
    boxContent: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    text: {
        fontSize: 18
    }
});

//
export default class EmojisComponent extends PureComponent {

    _onPressButton() {

    }

    render() {
        return (
            <ScrollView style={styles.box} contentContainerStyle={styles.boxContent}>
            {emojisF.map(emoji => {
                return (
                    <TouchableOpacity key={emoji.name} onPress={this._onPressButton}>
                        <Text style={styles.text}><Emoji name={emoji.name} /></Text>
                    </TouchableOpacity>
                );
            })}
            </ScrollView>
        );
    }
}