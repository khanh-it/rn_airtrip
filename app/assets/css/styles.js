/**
 * Project's global styles
 */
import EStyleSheet from 'react-native-extended-stylesheet';

// global variables
const vars = {
    $textColor: '#0275d8',
    $primaryBlue: '#3498db',
};

// global styles
const css = {
    html: {
        flex: 1,
        // borderWidth: 1, borderColor: 'red'
    },
    document: {
        flex: 1,
        // borderWidth: 1, borderColor: 'yellow'
    },
    body: {
        flex: 1,
        // borderWidth: 1, borderColor: 'green'
    }
};
const styles = EStyleSheet.create(css);
export default styles;

//
EStyleSheet.build(Object.assign({}, vars, {
    $document: css['document'],
    $body: css['body']
}));