/**
 * Home screen's notifications feed
 */
import {
    NEWS_ADD,
    NEWS_DEL,
    NEWS_EDIT
} from '../actions/constants';

// default data
let dfData = [];

/**
 * 
 */ 
export default function news(state = dfData, action) {
    state = (state instanceof Array) ? state : dfData; // set default value
    switch (action.type) {
        // NEWS_ADD
        case NEWS_ADD:
            state = state.concat([action.data]);
        break; // #end
        // NEWS_DEL
        case NEWS_DEL:
            let foundIdx = state.findIndex(item => (item.id === action.id));
            if (foundIdx >= 0) {
                state = state.splice(foundIdx, 1);
            }
        break; // #end
        // NEWS_EDIT
        case NEWS_EDIT:
            let foundItem = state.find(item => (item.id === action.id));
            if (foundItem) {
                Object.assign(foundItem, action.data);
                state = state.concat([]); // trigger state change
            }
        break; // #end
        default:
    }
    return state;
}
