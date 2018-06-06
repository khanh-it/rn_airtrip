/**
 * Define project's actions#news
 */
//
import {
    NEWS_ADD,
    NEWS_DEL,
    NEWS_EDIT
} from './constants';

//
import * as helpers from '../helpers';

/**
 * 
 */
export function newsAdd(data) {
    return { type: NEWS_ADD, data };
}

/**
 * Delete (remove) items
 * @param {Number|String|Array} id 
 * @return {Object}
 */
export function newsDel(data) {
    return { type: NEWS_DEL, data };
}

/**
 * Edit item
 * @param {Object|Array} data 
 * @return {Object}
 */
export function newsEdit(data) {
    return { type: NEWS_EDIT, data };
}

/**
 * 
 * @param {Object|null} news
 * @return {Object}
 */
export function authSet(auth) {
    auth = helpers.isPlainObject(auth, null);
    return { type: AUTH_SET, auth };
}
