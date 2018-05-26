/**
 * 
 */
import {
    USER_ADD,
    USER_DEL,
    USER_EDIT
} from '../actions/constants';

//
let users = []; // default data

/**
 * 
 */ 
export default function users(state = users, action) {
    state = (state instanceof Array) ? state : users; // set default value
    switch (action.type) {
        // USER_ADD
        case USER_ADD:
            state = state.concat([action.user]);
        break; // #end
        // USER_DEL
        case USER_DEL:
            let foundUserIdx = state.findIndex(user => (user.id === action.id));
            if (foundUserIdx >= 0) {
                state = state.splice(foundUserIdx, 1);
            }
        break; // #end
        // USER_EDIT
        case USER_EDIT:
            alert('USER_EDIT has not yet implemented');
        break; // #end
        default:
    }
    return state;
}
