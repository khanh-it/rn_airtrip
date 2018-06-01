/**
 * 
 */
import EStyleSheet from 'react-native-extended-stylesheet';

//
const styles = EStyleSheet.create({
    // Page
    page: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 9999,
        width: '100%',
        height: '100%',
        borderWidth: 1, borderColor: 'blue'
    },
    pageBg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'grey',
        opacity: 0.6
    },
    pageRoot: {
        flex: 1
    },
    pageHead: {
        padding: 12
    },
    pageTopbars: {
        paddingTop: 0,
        paddingRight: 7,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    pageIconClose: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    pageTitle: {
        paddingTop: 40,
    },
    pageTitleTxt: {
        height: 42,
        lineHeight: 42,
        borderRadius: 6,
        backgroundColor: '#3498db',
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
        zIndex: 9998,
        minWidth: 35,
        minHeight: 35,
        justifyContent: 'flex-end',
        // borderWidth: 1, borderColor: 'red',
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
    },
    newsItem: {
        padding: 20
    },
    newsDate: {
        
    },
    newsMsg: {
        flex: 1
    },
    newsDetails: {
        alignItems: 'center'
    },
    newsDetailsIcon: {
        fontSize: 24,
        color: '#3498db'
    }
    //.end
});
export default styles;