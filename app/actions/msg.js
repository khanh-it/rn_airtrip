/**
 * Define project's actions#msg
 */
//
import {
    MSG_ADD,
    MSG_DEL,
    MSG_EDIT,
    MSG_SET
} from './constants';

//
import * as helpers from '../helpers';

/**
 * 
 */
export function msgAdd(data) {
    return { type: MSG_ADD, data };
}

/**
 * Delete (remove) items
 * @param {Number|String|Array} id 
 * @return {Object}
 */
export function msgDel(data) {
    return { type: MSG_DEL, data };
}

/**
 * Edit item
 * @param {Object|Array} data 
 * @return {Object}
 */
export function msgEdit(data) {
    return { type: MSG_EDIT, data };
}

/**
 * Set items
 * @param {Object|Array} data 
 * @return {Object}
 */
export function msgSet(data) {
    return { type: MSG_SET, data };
}


