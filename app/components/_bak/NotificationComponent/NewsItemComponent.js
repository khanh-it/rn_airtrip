/**
 * 
 */
import React, { PureComponent } from "react";
//
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
//
import Ionicon from 'react-native-vector-icons/Ionicons';
// Css
import styles from './styles';

/**
 * @class NewsItemComponent
 */
export default class NewsItemComponent extends PureComponent {
  constructor(props) {
    super(props);
    // Init state
    this.state = {};
    // Bind method(s)
    // ...
    console.log('constructor NewsItemComponent');
  }

  render() {
    // console.log('render NewsItemComponent');
    let {
      data,
      handleViewNewsDetails
    } = this.props;
    let { item, index } = (data || {});
    return (
      <TouchableOpacity
        key={`news-${item.id}`}
        onPress={() => handleViewNewsDetails(item, index)}
      >
        <View style={[styles.news, (item.read && styles.newsRead)]}>
          <View style={[styles.newsItem, styles.newsDate]}>
            <Text style={[styles.newsTxt]}>[{item.id}]</Text>
            <Text style={[styles.newsTxt]}>{item.pubDate[0]}</Text>
            {!item.read && (<Text style={[styles.newsTxt, styles.newsTxtUnread]}>{$g.Lang('未読')}</Text>)}
          </View>
          <View style={[styles.newsItem, styles.newsMsg]}>
            <Text style={[styles.newsTxt]}>{item.title[0]}</Text>
          </View>
          <View style={[styles.newsItem, styles.newsDetails]}>
            <Ionicon style={[styles.newsDetailsIcon]} name='ios-arrow-forward' />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
