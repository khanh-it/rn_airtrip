/**
 * Define project's actions#user
 */
//
import {
    USER_ADD,
    USER_DEL,
    USER_EDIT,
    AUTH_SET
} from './constants';

//
import * as helpers from '../helpers';

/**
 * 
 */
export function userAdd(user) {
    return { type: USER_ADD, user };
}

/**
 * Delete (remove) user item
 * @param {String} id 
 * @return {Object}
 */
export function userDel(id) {
    return { type: USER_DEL, id };
}

/**
 * Edit user item
 * @param {String} id 
 * @return {Object}
 */
export function userEdit(id, user) {
    return { type: USER_EDIT, id, user };
}

/**
 * 
 * @param {Object|null} user
 * @return {Object}
 */
export function authSet(auth) {
    auth = helpers.isPlainObject(auth, null);
    return { type: AUTH_SET, auth };
}
