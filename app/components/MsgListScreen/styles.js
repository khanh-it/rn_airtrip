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
        fontSize: '2rem'
    },
    headerIconsL: {
        paddingRight: 12
    },
    searchInput: {
        flex: 1,
        alignItems: 'center',
    },
    searchInputText: {
        padding: 0,
    },
    searchInputTextLine1: {
        fontSize: '1.25rem',
        fontWeight: '700'
    },
    headerIconsR: {
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
    bodyMsgListBox: {

    },
    bodyMsgListBoxCC: {

    },
    bodyMsg: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    bodyMsgL: {
        justifyContent: 'flex-start',
    },
    bodyMsgR: {
        justifyContent: 'flex-end',
    },
    bodyMsgItem: {
        flexShrink: 1,
        maxWidth: '66%'
    },
    bodyMsgItemL: {
        
    },
    bodyMsgItemR: {

    },
    bodyMsgContent: {
        width: 'auto',
        padding: 15,
        backgroundColor: 'green',
        borderRadius: 10
    },
    bodyMsgContentL: {},
    bodyMsgContentR: {},
    bodyMsgContentTxt: {
        color: 'white',
    },
    bodyMsgTime: {
        alignItems: 'flex-end',
    },
    bodyMsgTimeTxt: {

    },
    bodyMsgIcons: {
    },
    bodyMsgIconsL: {
        paddingRight: 10
    },
    bodyMsgIconsR: {
        paddingLeft: 10
    },
    bodyMsgIcon: {
        fontSize: 32
    },
    //tools
    tools: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderTopColor: '#d8d8d8'
    },
    tool: {
        marginTop: 12,
        marginBottom: 12,
        marginLeft: 17,
        marginRight: 17,
    },
    toolTouch: {
        alignItems: 'center',
        justifyContent: 'center',
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
    footerIconsR: {
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
