/**
 * 
 */
import EStyleSheet from 'react-native-extended-stylesheet';

//
const styles = EStyleSheet.create({
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
});
export default styles;