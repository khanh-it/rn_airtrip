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

// Component(s)
import ImgBgSliderComponent from './ImgBgSliderComponent';

//
import weblinks from './weblinks';

/**
 * @class HomeComponent
 */
export default class HomeComponent extends Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      auth: null
    };
  }

  componentDidMount() {}

  /**
   * Page's header
   */
  _renderPageHead() {
    //
    let { auth } = this.state;
    //  
    return (
      <View style={[styles.head]}>
        {/*Head title*/}
        <View style={[styles.title]}>
          <Text style={[styles.titleTxt]}>
            {$g.Lang('エアトリ')}
          </Text>
          <Text style={[styles.titleWelcome]}>
            {$g.Lang(auth ? 'さん、おかえりなさい' : 'ゲストさん、こんにちは')}
          </Text>
        </View>
        {/*.end#Head title*/}

        {/*Main navigation*/}
        <View style={[styles.mainNav]}>
          <View style={[styles.mainNavL]}>
            <TouchableWithoutFeedback
              onPress={evt => {
                alert('domestic')
              }}
            >
              <View style={[styles.mnavItem, styles.mnavDomestic]}>
                <View style={[styles.mnavItemBg]} />
                <View style={[styles.mnavItemContent]}>
                  <Image style={[styles.mnavImg]} source={require('../../assets/img/ic_domestic.png')} />
                  <Text style={[styles.mnavItemTxt]}>
                    {$g.Lang('国内航空券')}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={[styles.mainNavR]}>
            <TouchableWithoutFeedback
              onPress={evt => {
                alert('overseas')
              }}
            >
              <View style={[styles.mnavItem, styles.mnavOverseas]}>
                <View style={[styles.mnavItemBg]} />
                <View style={[styles.mnavItemContent]}>
                  <Image style={[styles.mnavImg]} source={require('../../assets/img/ic_overseas.png')} />
                  <Text style={[styles.mnavItemTxt]}>
                    {$g.Lang('海外航空券')}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        {/*.end#Main navigation*/}
      </View>
    );
  }

  _renderWeblinks() {
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
                source={require('../../assets/img/arrow_left.png')}
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
                source={require('../../assets/img/arrow_right.png')}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
  }

  render() {
    let { bgSrc } = this.state;
    return (
      <View
        style={[styles.body]}
      >
        <ImgBgSliderComponent />
        <ScrollView
          style={[styles.root]}
          contentContainerStyle={[styles.page]}
        >
         {this._renderPageHead()}
         {this._renderWeblinks()}
        </ScrollView>
      </View>
    );
  }
}
