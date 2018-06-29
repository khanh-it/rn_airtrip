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
    this.scrollTo = this.scrollTo.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.onOpenWebLink = this.onOpenWebLink.bind(this);
  }

  /** @var {boolean} */
  scrollToFlags = false; // false (begin) | 0 (middle) | true (end)

  scrollTo(dir) {
    if (typeof this.scrollToFlags) {
    }
    let { scrollTo } = this.state;
    let { scrollSpeed } = this.props;
    scrollSpeed = (scrollSpeed || 64);
    if (('R' === dir) && (this.scrollToFlags !== true)) { // go right
      scrollTo.x += scrollSpeed;
    }
    if (('L' === dir) && (this.scrollToFlags !== false)) { // go left
      scrollTo.x -= scrollSpeed;
    }
    this.refScrollView.scrollTo(this.state.scrollTo = scrollTo);
    // console.log("scrollTo: ", scrollTo);
  }

  onScroll(evt) {
    let { contentOffset, contentSize, layoutMeasurement } = evt.nativeEvent;
    this.scrollToFlags = (contentOffset.x + layoutMeasurement.width);
    if (contentOffset.x === 0) {
      this.scrollToFlags = false;
    } else if (this.scrollToFlags >= contentSize.width) {
      this.scrollToFlags = true;
    }
    // console.log('onScroll: ', this.scrollToFlags);
  }

  /**
   * 
   * @param {*} item 
   * @param {*} evt 
   */
  onOpenWebLink(item, evt) {
    // console.log('onOpenWebLink: ', item, evt);
    // open weblink
    $g.utils.WebView.main.open(item.source);
  }

  render() {
    return (
      <View style={[styles.weblinks]}>
        <View style={[styles.weblinksBg]} />
        <View style={[styles.weblinksContent]}>
          <View style={[styles.wlArrow, styles.wlArrowL]}>
            <TouchableWithoutFeedback
              onPress={(evt) => this.scrollTo('L', evt)}
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
            // onLayout={evt => { console.log('onLayout: ', evt.nativeEvent) }}
            onScroll={this.onScroll}
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
              onPress={(evt) => this.scrollTo('R', evt)}
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
