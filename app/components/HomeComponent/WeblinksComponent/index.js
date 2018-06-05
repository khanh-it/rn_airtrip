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
 * @class WeblinksComponent
 */
export default class WeblinksComponent extends Component {
  constructor(props) {
    super(props);

    // Init state
    this.state = {};
  }

  render() {
    return (
      <View style={[styles.weblinks]}>
        <View style={[styles.weblinksBg]} />
        <View style={[styles.weblinksContent]}>
          <View style={[styles.wlArrow, styles.wlArrowL]}>
            <TouchableWithoutFeedback
              onPress={() => {
                alert('wlArrowL')
              }}
            >
              <Image
                style={[styles.wlArrowImg, styles.wlArrowImgL]}
                source={require('../../../assets/img/arrow_left.png')}
              />
            </TouchableWithoutFeedback>
          </View>
          <ScrollView
            style={[styles.wlSlides]}
            contentContainerStyle={[styles.wlSlidesContent]}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
          {weblinks.map((slide, idx) => {
            return (
              <TouchableWithoutFeedback
                key={`slide-${idx}`}
                onPress={() => {
                  alert(slide.url);
                }}
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
              onPress={() => {
                alert('wlArrowR')
              }}
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
