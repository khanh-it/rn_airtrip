/**
 * 
 */
import EStyleSheet from 'react-native-extended-stylesheet';

//
const styles = EStyleSheet.create({
    root: {
        height: 50,
        backgroundColor: '$primaryBlue',
    },
    mnbars: {
        flex: 1,
        flexDirection: 'row',
    },
    mnbar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mnbarImg: {
        width: 20,
        height: 20,
        marginBottom: 5
    },
    mnbarTxt: {
        color: 'white',
        fontSize: 10
    }
});
export default styles;