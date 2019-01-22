/**
 * 
 */
import ESS from 'react-native-extended-stylesheet';

//
// +++ 
const theme = ESS.value('$theme');
// +++ theme default: 'light'
const dfStyles = {
    //
    root: {
        backgroundColor: '#f7f7f7',
    },
    //
    sync: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#d8d8d8'
    },
    syncText: {
        color: '#33aaff',
        fontSize: '0.85rem'
    },
    // message list
    msgList: {
    },
    msgListBox: {
        // flexDirection: 'row',
    },
    msgListIcons: {
        justifyContent: 'center',
    },
    msgListIconsLeft: {
    },
    msgListIconsRight: {
    },
    msgListIcon: {
        fontSize: '1.6rem'
    },
    //.end#search
};
const css = {
    // theme 'light'
    light : dfStyles,
    //.end

    // theme 'dark'
    dark : Object.assign({}, dfStyles, {
        // ...
    }),
    //.end
};
const styles = ESS.create(css[theme] || dfStyles);
export default styles;