/**
 * 
 */
import ESS from 'react-native-extended-stylesheet';

//
// +++ 
const theme = ESS.value('$theme');
// +++ theme default: 'light'
const dfStyles = {
    root: Object.assign({
        // flex: 1
    }, ESS.value('$body')),
    header: {
        borderWidth: 1,
        borderColor: '#d9d9d9',
        paddingLeft: 22,
        paddingRight: 22,
        paddingTop: 18,
        paddingBottom: 18,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerIcons: {},
    headerIcon: {
        fontSize: 18
    },
    headerIconsLeft: {
        paddingRight: 12
    },
    searchInput: {
        // $outline: 1,
        flex: 1,
        paddingLeft: 12,
        paddingRight: 12,
        maxHeight: 100
    },
    searchInputContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    searchInputText: {
        padding: 0,
        height: 18
    },
    searchInputTextPhColor: '#b3b3b3',
    // +++
    headContact: {
        height: 34,
        borderWidth: 1,
        borderColor: '#d2d2d2',
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        paddingLeft: 14,
        paddingRight: 14,
        marginRight: 5,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headContactTxt: {
        color: '#313131',
        paddingRight: 15,
        fontSize: '0.8rem'
    },
    headContactRemoveTxt: {
        color: '#909090',
        fontSize: '1rem',
    },

    headerIconsRight: {
        paddingLeft: 12,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    searchIconPerson: {

    },
    //body
    body: {
        flex: 1
    },
    bodyLatestUsedContacts: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    bodyContact: {
        width: '50%',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#d9d9d9',
        paddingTop: 18,
        paddingBottom: 18,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bodyContactLatestUsed: {
        
    },
    bodyContactTxt: {
        color: '#333333',
        // fontWeight: '700'
    },
    //footer
    footer: {
        borderWidth: 1,
        borderColor: '#e5e5e5',
        padding: 12,
        top: null,
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    footerInputPadding: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        borderRadius: 36,
        borderWidth: 1,
        borderColor: '#d3d3d3',
        backgroundColor: '#f0f0f0',
        padding: 5,
        marginRight: 25
    },
    footerSearchIconAddCircle: {
        color: '#cccccc'
    },
    footerSearchInput: {
        flex: 1,
        padding: 0,
    },
    footerSearchInputText: {
        // $outline: 1,
        height: '2rem',
        maxHeight: '5rem'
    },
    footerSearchInputTextPhColor: '#b7b7b7',
    footerIconsRight: {
        paddingRight: 12
    },
    footerSearchIconArrowRoundUp: {
        fontWeight: '700'
    }
};
const css = {
    // theme 'light'z
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
