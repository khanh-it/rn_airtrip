/**
 * 
 */
import EStyleSheet from 'react-native-extended-stylesheet';

//
const styles = EStyleSheet.create({
    // Page
    page: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderWidth: 1, borderColor: 'blue',
    },
    //.end
    
    // Float icon
    fIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 9999,
        minWidth: 35,
        minHeight: 35,
        // borderWidth: 1, borderColor: 'red',
    },
    fIconIcon: {
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    fIconImg: {
        // width: 20,
        // height: 20,
        color: 'white',
        fontWeight: '900',
        fontSize: 24
    },
    fIconBadge: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'red',
        minWidth: 20,
        minHeight: 20,
        borderRadius: 10,
        justifyContent: 'center'
    },
    fIconBadgeTxt: {
        color: 'white',
        textAlign: 'center',
        fontSize: 10
    }
    //.end
});
export default styles;