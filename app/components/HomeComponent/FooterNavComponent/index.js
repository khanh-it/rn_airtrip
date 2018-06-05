/**
 * 
 */
import React, { Component } from "react";
//
import {
  View,
  Text,
  Image
} from 'react-native';

// Css
import styles from './styles';

/**
 * @class FooterNavComponent
 */
export default class FooterNavComponent extends Component {
  constructor(props) {
    super(props);

    // Init state
    this.state = {
      auth: null
    };
  }

  render() {
    let { auth } = this.state;
    return (
      <View style={[styles.root]}>
        <View style={[styles.mnbars]}>
          <View style={[styles.mnbar, styles.mnbarMenu]}>
            <Image
              source={require('../../../assets/img/menu_tab.png')}
              style={[styles.mnbarImg]}
              resizeMode='contain'
            />
            <Text style={[styles.mnbarTxt]}>
              {$g.Lang('メニュー')}
            </Text>
          </View>
          <View style={[styles.mnbar, , styles.mnbarReservList]}>
            <Image
              source={require('../../../assets/img/reservation_list_tab.png')}
              style={[styles.mnbarImg]}
              resizeMode='contain'
            />
            <Text style={[styles.mnbarTxt]}>
              {$g.Lang('予約確認')}
            </Text>
          </View>
          <View style={[styles.mnbar, , styles.mnbarMyPage]}>
            {auth 
              ? (<Image
                  source={require('../../../assets/img/mypage_login_tab.png')}
                  style={[styles.mnbarImg]}
                  resizeMode='contain'
                />) /* login */
              : (<Image
                  source={require('../../../assets/img/mypage_nologin_tab.png')}
                  style={[styles.mnbarImg]}
                  resizeMode='contain'
                />) /* no login */
            }
            <Text style={[styles.mnbarTxt]}>
              {$g.Lang('ログイン・会員登録')}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
