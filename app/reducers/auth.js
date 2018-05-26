/**
 * 
 */
import {
    AUTH_SET
} from '../actions/constants';

//
let auth = null; // default data

/**
 * 
 */ 
export default function auth(state = auth, action) {
    switch (action.type) {
        // USER_ADD
        case AUTH_SET:
            state = action.auth;
        break; // #end
        default:
    }
    return state;
}
