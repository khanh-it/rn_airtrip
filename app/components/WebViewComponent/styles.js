/**
 * 
 */
import EStyleSheet from 'react-native-extended-stylesheet';

//
const zIndexRoot = 999;

//
const styles = EStyleSheet.create({
    root: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: zIndexRoot,
    },
    wv: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: zIndexRoot + 1,
        // borderWidth: 1, borderColor: 'red',
        opacity: 0,
        transform: [{ translateY: $g.dimensions.screen.height }]
    },
    head: {
        height: 50,
        backgroundColor: '$primaryBlue',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'silver'
    },
    headLR: {
        width: 50,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headBtn: {
        fontSize: 28,
        minWidth: 30,
        textAlign: 'center',
        borderWidth: 1, borderColor: 'silver',
        backgroundColor: 'white',
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
    headMenu: {
        position: 'absolute',
        top: 42,
        right: 2,
        zIndex: 9999 + 1,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'silver',
        padding: 10,
        opacity: 0
    },
    headBtnTxt: {
        fontSize: 18,
        paddingTop: 6,
        paddingBottom: 6,
    },
    headBtnIcon: {
        fontSize: 18,
    },

    // webview
    webview: {
        flex: 1,
        backgroundColor: 'white',
        // borderWidth: 2, borderColor: 'blue'
    },
    webviewWV: {
        minHeight: '45%'
    }
    //.end
});
export default styles;