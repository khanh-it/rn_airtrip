/**
 * 
 */
import EStyleSheet from 'react-native-extended-stylesheet';

//
const zIndexRoot = 2990;

//
const styles = EStyleSheet.create({
    // Page
    page: {
        flex: 1,
        zIndex: zIndexRoot,
        // borderWidth: 1, borderColor: 'blue',
        // opacity: 0,
        // transform: [{ translateY: -$g.dimensions.screen.height }]
    },
    pageBg: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        opacity: 0.9
    },
    pageRoot: {
        flex: 1,
        zIndex: 2
    },
    pageHead: {
        paddingTop: 3,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
    },
    pageTopbars: {
        alignItems: 'flex-end',
    },
    pageIcon: {
        paddingTop: 7,
        paddingRight: 10,
        paddingBottom: 7,
        paddingLeft: 10,
        // borderWidth: 1, borderColor: 'blue',
    },
    pageIconClose: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    pageTitle: {
        paddingTop: 33,
    },
    pageTitleTxt: {
        height: 42,
        lineHeight: 42,
        borderRadius: 6,
        backgroundColor: '$primaryBlue',
        color: 'white',
        textAlign: 'center'
    },
    pageToolbars: {
        marginTop: 24,
        flexDirection: 'row'
    },
    pageToolbarsL: {
        flex: 1
    },
    pageToolbarsR: {
        flex: 1,
        alignItems: 'flex-end',
    },
    pageToolbarTxt: {
        color: 'white',
    },
    //
    pageBody: {
        // borderWidth: 2, borderColor: 'green',
    },
    pageBodyContent: {
        // borderWidth: 1, borderColor: 'red',
    },
    //.end
    
    // Float icon
    fIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: zIndexRoot - 1,
        minWidth: 35,
        minHeight: 35,
        justifyContent: 'flex-end',
        // borderWidth: 2, borderColor: 'red',
    },
    fIconIcon: {
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    fIconImg: {
        // width: 20,
        // height: 20,
        color: 'white',
        fontWeight: '900',
        fontSize: 24
    },
    fIconBadge: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'red',
        minWidth: 20,
        minHeight: 20,
        borderRadius: 10,
        justifyContent: 'center'
    },
    fIconBadgeTxt: {
        color: 'white',
        textAlign: 'center',
        fontSize: 10
    },
    //.end

    // news list
    newsList: {
        borderTopWidth: 1,
        borderTopColor: 'white',
    },
    news: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        flex: 1,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 15,
    },
    newsRead: {
        borderRightWidth: 1,
        borderRightColor: 'red',
        opacity: 0.5
    },
    newsItem: {
        padding: 20
    },
    newsDate: {},
    newsMsg: {
        flex: 1,
    },
    newsTxt: {
        color: 'white',
        fontSize: 14,
    },
    newsTxtUnread: {
        fontSize: 12,
        marginTop: 14,
        color: '$primaryBlue'
    },
    newsDetails: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    newsDetailsIcon: {
        fontSize: 24,
        color: '$primaryBlue'
    }
    //.end
});
export default styles;