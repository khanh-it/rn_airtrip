/**
 * 
 */
import {
    MSG_ADD,
    MSG_DEL,
    MSG_EDIT,
    MSG_SET
} from '../actions/constants';
//
import { msgs as msgsData } from './_generator';

let defaultData = []; // default data
defaultData = msgsData.concat([]);

/**
 * 
 */
export default function msgs(state = defaultData /* set default value */, action)
{
    // state = (state instanceof Array) ? state : defaultData; // set default value
    switch (action.type) {
        // MSG_ADD
        case MSG_ADD:
            state = state.concat([action.msg]);
        break; // #end
        // MSG_DEL
        case MSG_DEL:
            let foundUserIdx = state.findIndex(msg => (msg.id === action.id));
            if (foundUserIdx >= 0) {
                state = state.splice(foundUserIdx, 1);
            }
        break; // #end
        // MSG_EDIT
        case MSG_EDIT:
            alert('MSG_EDIT has not yet implemented');
        break; // #end
        // MSG_SET
        case MSG_SET:
            state = defaultData.concat([]);
            // state = (action.data || {}).concat([]);
        break; // #end
        default:
    }
    return state;
}
