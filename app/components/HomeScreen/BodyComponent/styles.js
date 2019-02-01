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
        flex: 1,
        // $outline: 1,
        backgroundColor: '#f7f7f7',
    },
    //
    sync: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#d8d8d8'
    },
    syncText: {
        // $outline: 1,
        color: '#33aaff',
        fontSize: '0.85rem'
    },
    vFLZero: {
        borderWidth: 2,
        borderColor: 'red',
        width: 0,
    },
    // message list
    msgList: {
        $outline: 1,
        // top: 0,
        borderColor: 'blue',
        width: '100%',
        height: '100%',
    },
    msgList_withFLTop: {
        // top: 110,
    },
    msgListBox: {
        // $outline: 2,
        borderColor: 'red',
        flex: 1,
    },
    msgListBoxCC: {},
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
    //
    btnAddMsg: {
        height: 56,
        width: 56,
        borderRadius: 28,
        backgroundColor: '#f7ad3c',
        top: null,
        left: null,
        right: 45,
        bottom: 45,
        justifyContent: 'center'
    },
    btnAddMsgTxt: {
        fontSize: 22,
        color: 'white'
    },
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