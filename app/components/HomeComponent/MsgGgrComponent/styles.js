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
        backgroundColor: 'white',
        paddingLeft: 20,
        marginBottom: 15,
        borderTopWidth: 1,
        borderTopColor: '#e3e3e3',
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3'
    },
    //
    title: {
        paddingTop: 10,
        paddingBottom: 10,
        color: '#8c8c8c',
    },
    content: {
        paddingRight: 20,
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