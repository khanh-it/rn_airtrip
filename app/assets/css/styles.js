/**
 * Project's global styles
 */
import EStyleSheet from 'react-native-extended-stylesheet';

// global variables
EStyleSheet.build({
    $textColor: '#0275d8'
});

// global styles
const css = {
    html: {
        flex: 1
    },
    document: {
        flex: 1,
        // borderWidth: 1, borderColor: 'red'
    },
    body: {
        borderWidth: 1,
        borderColor: 'green'
    }
};
const styles = EStyleSheet.create(css);
export default styles;

//
EStyleSheet.build({
    $document: css['document'],
    $body: css['body']
});