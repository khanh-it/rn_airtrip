/**
 * 
 */
import ESS from 'react-native-extended-stylesheet';

//
const styles = ESS.create({
    root: Object.assign({
        // flex: 1
    }, ESS.value('$body')),
    bodyWrap: {
        flex: 1
    },
    bodyOverlay: {
        width: '100%',
        height: '100%',
        backgroundColor: 'silver',
        opacity: 0.3
    },
});
export default styles;