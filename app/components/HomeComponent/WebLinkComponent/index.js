/**
 * 
 */
import React, { Component } from "react";
//
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableWithoutFeedback
} from 'react-native';

// Css
import styles from './styles';

//
import weblinks from './weblinks';

/**
 * @class WebLinkComponent
 */
export default class WebLinkComponent extends Component {
  constructor(props) {
    super(props);

    // Init state
    this.state = {
      scrollTo: { x: 0, y: 0, animated: true }
    };

    // Bind method(s)
    this.onScrollTo = this.onScrollTo.bind(this);
    this.onOpenWebLink = this.onOpenWebLink.bind(this);
  }

  onScrollTo(dir) {
    let { scrollTo } = this.state;
    let { scrollSpeed } = this.props;
    scrollSpeed = (scrollSpeed || 50);
    if ('R' === dir) { // go right
      scrollTo.x += scrollSpeed;
    }
    if ('L' === dir) { // go left
      scrollTo.x -= scrollSpeed;
    }    
    this.refScrollView.scrollTo(this.state.scrollTo = scrollTo);
    console.log(scrollTo);
  }

  /**
   * 
   * @param {*} item 
   * @param {*} evt 
   */
  onOpenWebLink(item, evt) {

  }

  render() {
    return (
      <View style={[styles.weblinks]}>
        <View style={[styles.weblinksBg]} />
        <View style={[styles.weblinksContent]}>
          <View style={[styles.wlArrow, styles.wlArrowL]}>
            <TouchableWithoutFeedback
              onPress={(evt) => this.onScrollTo('L', evt)}
            >
              <Image
                style={[styles.wlArrowImg, styles.wlArrowImgL]}
                source={require('../../../assets/img/arrow_left.png')}
              />
            </TouchableWithoutFeedback>
          </View>
          <ScrollView
            ref={ref => { this.refScrollView = ref; }}
            style={[styles.wlSlides]}
            contentContainerStyle={[styles.wlSlidesContent]}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            onLayout={evt => {
              console.log('onLayout: ', evt.nativeEvent)
            }}
            onScroll={evt => {
              console.log('onScroll: ', evt.nativeEvent)
            }}
          >
          {weblinks.map((slide, idx) => {
            return (
              <TouchableWithoutFeedback
                key={`slide-${idx}`}
                onPress={(evt) => this.onOpenWebLink(slide, evt)}
              >
                <View style={[styles.wlSlide]}>
                  <Image style={[styles.wlSlideImg]} source={slide.img} resizeMode='contain' />
                  <Text style={[styles.wlSlideTxt]}>
                    {$g.Lang(slide.txt)}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })}  
          </ScrollView>
          <View style={[styles.wlArrow, styles.wlArrowR]}>
            <TouchableWithoutFeedback
              onPress={(evt) => this.onScrollTo('R', evt)}
            >
              <Image
                style={[styles.wlArrowImg, styles.wlArrowImgR]}
                source={require('../../../assets/img/arrow_right.png')}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
  }
}
