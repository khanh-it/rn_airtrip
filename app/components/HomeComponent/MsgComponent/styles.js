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

    },
    //
    title: {
        
    },
    titleText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: '1.25rem'
    },
    titleDate: {

    },
    content: {
        color: '#666666'
    }
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