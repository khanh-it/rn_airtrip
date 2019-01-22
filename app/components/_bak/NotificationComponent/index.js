/**
 * 
 */
import React, { Component } from "react";
//
import { connect } from 'react-redux';
//
import NotificationComponent from './NotificationComponent';

// Action(s)
import {
  newsAdd,
  newsDel,
  newsEdit
} from '../../actions/news';

/**
 * 
 * @class [HOC] ConnectedComponent
 */
const ConnectedComponent = connect(
  (state) => {
    let { news } = state;
    return { news };
  },
  (dispatch) => {
    return {
      /**
       * 
       */
      storeNewsData: function storeNewsData(data) {
        dispatch(newsAdd(data));
      },
      /**
       * 
       */
      markNewsRead: function markNewsRead(data) {
        dispatch(newsEdit(data));
      }
    };
  }
)(NotificationComponent);
export default ConnectedComponent;
