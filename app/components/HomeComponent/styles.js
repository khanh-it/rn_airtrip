/**
 * 
 */
import EStyleSheet from 'react-native-extended-stylesheet';

//
const styles = EStyleSheet.create({
    body: EStyleSheet.value('$body'),
    root: {
        zIndex: 10,
    },
    page: {

    },

    // page's header
    head: {
        paddingTop: 5,
    },
    title: {
        alignItems: 'center',
        paddingTop: 34,
        paddingBottom: 34,
    },
    titleTxt: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
        paddingBottom: 12,
    },
    titleWelcome: {
        color: 'white',
        fontSize: 16,
    },
    // +++ main navigation
    mainNav: {
        flexDirection: 'row',
    },
    mainNavL: {
        flex: 1,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    mainNavR: {
        flex: 1,
        paddingLeft: 10,
        alignItems: 'flex-start'
    },
    mnavItem: {
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 30,
        width: 130,
        height: 130,
        overflow: 'hidden'
    },
    mnavItemBg: {
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        position: 'absolute',
        zIndex: 1,
        backgroundColor: 'white',
        opacity: 0.4
    },
    mnavItemContent: {
        zIndex: 10,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mnavImg: {
        width: 55,
        height: 55,
        marginBottom: 14,
    },
    mnavItemTxt: {
        color: 'white',
        fontSize: 16
    },
    //+++.end
    //.end

    // weblinks
    weblinks: {
        marginTop: 20,
    },
    weblinksBg: {
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        position: 'absolute',
        zIndex: 1,
        backgroundColor: 'white',
        opacity: 0.7
    },
    weblinksContent: {
        zIndex: 10,
        flexDirection: 'row',
        height: 110,
    },
    wlArrow: {
        width: 45,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    wlArrowImg: {
        width: 25,
        height: 45,
    },
    wlSlides: {
        // borderWidth: 1, borderColor: 'green',
    },
    wlSlidesContent: {
        // borderWidth: 1, borderColor: 'blue',
    },
    wlSlide: {
        // borderWidth: 1, borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 15,
    },
    wlSlideImg: {
        width: 50,
        height: 40,
        marginBottom: 5
    },
    wlSlideTxt: {
        color: 'black',
        fontSize: 11
    }
    //.end#weblinks
});
export default styles;