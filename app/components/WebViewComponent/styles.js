/**
 * 
 */
import EStyleSheet from 'react-native-extended-stylesheet';

//
const styles = EStyleSheet.create({
    root: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 99999,
        // borderWidth: 1, borderColor: 'green',
        // opacity: 0,
        // transform: [{ translateY: $g.dimensions.screen.height }]
    },
    head: {
        height: 50,
        backgroundColor: '$primaryBlue',
        flexDirection: 'row'
    },
    headBtns: {
        width: 50,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headBtn: {
        fontSize: 28
    },
    headTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleTxt: {
        color: 'white',
        fontSize: 16
    },

    // webview
    webview: {
        flex: 1,
        backgroundColor: 'white',
        // borderWidth: 2, borderColor: 'blue'
    }
    //.end
});
export default styles;