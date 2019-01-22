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
        paddingTop: 20,
        paddingBottom: 15,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#d8d8d8'
    },
    col1: {
        flex: 1,
    },
    //
    title: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleCol: {},
    titleCol1: {
        flex: 1,
    },
    titleCol2: {},
    titleText: {
        color: 'black',
        fontSize: '1rem'
    },
    titleDate: {
        color: '#b1b1b1',
        fontSize: '0.6rem'
    },
    content: {
        paddingTop: 5,
        paddingRight: 40,
        paddingBottom: 5,
    },
    contentText: {
        color: '#666666',
        fontSize: '0.7rem'
    },
    col2: {
    },
    more: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 5
    },
    moreIcon: {

    },
    moreIconArrowForward: {
        color: '#b5b5b5',
        fontSize: '1.2rem',
    },
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