/**
 * 
 */
import EStyleSheet from 'react-native-extended-stylesheet';

//
const styles = EStyleSheet.create({
    
    // Float icon
    fIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        minWidth: 35,
        minHeight: 35,
        borderWidth: 1, borderColor: 'red',
    },
    fIconIcon: {
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    fIconImg: {
        width: 20,
        height: 20,
    },
    fIconBadge: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'red',
        minWidth: 20,
        minHeight: 20,
        borderRadius: 10
    },
    fIconBadgeTxt: {
        color: 'white',
        textAlign: 'center',
        // fontSize: '0.8rem'
    }
    //.end
});
export default styles;