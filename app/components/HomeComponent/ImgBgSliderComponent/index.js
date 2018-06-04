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
import imgBgArr from './images';

/**
 * @class ImgBgSliderComponent
 */
export default class ImgBgSliderComponent extends Component {
  constructor(props) {
    super(props);
    // Init state
    const imgIdx = imgBgArr[props.imgIdx] ? props.imgIdx : 0;
    this.state = {
      imgIdx
    };
  }

  render() {
    let { imgIdx, aniDelay } = this.state;
    let imgSrc = imgBgArr[imgIdx];
    return (
      <ImageBackgroundAni
        key={new Date().toString() /* Force re-render */}
        source={imgSrc}
        resizeMode='cover'
        style={[styles.root]}
        animation='fadeIn'
        duration={2000}
        delay={0}
        onAnimationEnd={evt => {
          setTimeout(() => {
            this.setState(({ imgIdx }) => {
              ++imgIdx;
              if (!imgBgArr[imgIdx]) { imgIdx = 0; }
              return { imgIdx };
            });
          }, 8000);
        }}
      />
    );
  }
}
