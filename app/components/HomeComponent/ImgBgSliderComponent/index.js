/**
 * 
 */
import React, { Component } from "react";
//
import {
  View,
  ImageBackground
} from 'react-native';
//
import * as Animatable from 'react-native-animatable';
// +++
const ImageBackgroundAni = Animatable.createAnimatableComponent(ImageBackground);

// Css
import styles from './styles';

// Contants
const ImgBgDir = '../../../assets/img/';
const ImgBgArr = [
  require(ImgBgDir + 'home_bg1.png'),
  require(ImgBgDir + 'home_bg2.png'),
  require(ImgBgDir + 'home_bg3.jpg'),
  require(ImgBgDir + 'home_bg4.jpg')
];

/**
 * @class ImgBgSliderComponent
 */
export default class ImgBgSliderComponent extends Component {
  constructor(props) {
    super(props);
    // Init state
    const imgIdx = ImgBgArr[props.imgIdx] ? props.imgIdx : 0;
    this.state = {
      imgIdx
    };
  }

  render() {
    let { imgIdx, aniDelay } = this.state;
    let imgSrc = ImgBgArr[imgIdx];
    return (
      <ImageBackgroundAni
        key={new Date().toString() /* Force re-render */}
        source={imgSrc}
        resizeMode='cover'
        style={[styles.root]}
        animation='fadeIn'
        duration={3000}
        delay={0}
        onAnimationEnd={evt => {
          setTimeout(() => {
            this.setState(({ imgIdx }) => {
              ++imgIdx;
              if (!ImgBgArr[imgIdx]) { imgIdx = 0; }
              return { imgIdx };
            });
          }, 2000);
        }}
      />
    );
  }
}
