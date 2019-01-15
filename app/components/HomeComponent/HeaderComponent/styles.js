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
    header: {},
    headerTitle: {
        color: ESS.value('$textColor'),
        fontSize: '1.5rem',
        fontWeight: 'bold'
    },
    // search
    search: {
        borderBottomWidth: 1,
        borderBottomColor: '#d8d8d8'
    },
    searchBox: {
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
        fontSize: '1.6rem'
    },
    searchInput: {
        flex: 1,
        flexDirection: 'row',
    },
    searchInputText: {
        width: '100%',
        // height: '2rem',
        fontSize: '1.25rem',
        color: '#8f8f8f'
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