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
 * @param {String} id 
 * @return {Object}
 */
export function newsDel(id) {
    return { type: NEWS_DEL, id };
}

/**
 * Edit item
 * @param {String} id 
 * @return {Object}
 */
export function newsEdit(id, data) {
    return { type: NEWS_EDIT, id, data };
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
