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
    header: {
        paddingTop: 20,
        paddingBottom: 5
    },
    headerTitle: {
        color: ESS.value('$textColor'),
        fontSize: '1rem',
        fontWeight: 'bold'
    },
    // search
    search: {
        borderBottomWidth: 1,
        borderBottomColor: '#d8d8d8'
    },
    searchBox: {
        paddingTop: 10,
        paddingRight: 15,
        paddingBottom: 10,
        paddingLeft: 15,
        flexDirection: 'row',
        backgroundColor: '#efefef',
        borderRadius: 10
    },
    searchIcons: {
        justifyContent: 'center',
    },
    searchIconsLeft: {
    },
    searchIconsRight: {
    },
    searchIcon: {
        fontSize: '1.2rem'
    },
    searchInput: {
        flex: 1,
        flexDirection: 'row',
    },
    searchInputText: {
        width: '100%',
        height: '1.4rem',
        fontSize: '0.9rem',
        color: '#8f8f8f',
        paddingTop: 0,
        paddingBottom: 0
    },
    searchInputTextPhColor: '#8f8f8f',
    //.end#search
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