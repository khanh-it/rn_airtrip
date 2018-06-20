/**
 * Home screen's notifications feed
 */
import {
    NEWS_ADD,
    NEWS_DEL,
    NEWS_EDIT,
    NEWS_RESET
} from '../actions/constants';

// default data
let dfData = {
    data: [],
    count: 0, // total items count
    readCount: 0, // total items read count
};

/**
 * 
 * @param {object} state 
 * @param {number|string} id
 */
function findItemById(state, id) {
    let foundItem = state.data.find(item => (item.id === id));
    return foundItem;
}

/**
 * 
 */ 
export default function news(state = dfData, action) {
    switch (action.type) {
        // NEWS_ADD
        case NEWS_ADD: {
            let items = action.data;
            if (items) {
                let stateChanged = false;
                let { data, count, readCount } = state;
                items = (items instanceof Array) ? items : [items];
                items.forEach(item => {
                    let foundItem = findItemById(state, (item || {}).id);
                    /* if (foundItem) {
                        console.log(NEWS_ADD + ' item duplicated: ', foundItem.id);
                    } */
                    if (!foundItem) {
                        data = data.concat([item]);
                        count += 1;
                        readCount += !!((item || {}).read);
                        stateChanged = true;
                    }
                });
                // trigger state change?
                if (stateChanged) {
                    state = Object.assign({}, state, { data, count, readCount });
                }
            }
        } break; // #end
        // NEWS_DEL
        case NEWS_DEL: {
            let items = action.data;
            if (items) {
                let stateChanged = false;
                let { data, count, readCount } = state;
                items = (items instanceof Array) ? items : [items];
                items.forEach(id => {
                    let foundIdx = state.data.findIndex(item => (item.id === id));
                    if (foundIdx >= 0) {
                        count -= 1;
                        readCount -= !!((data[foundIdx] || {}).read);
                        data.splice(foundIdx, 1);
                        stateChanged = true;
                    }
                });
                // trigger state change
                if (stateChanged) {
                    state = Object.assign({}, state, { data, count, readCount });
                }
            }
        } break; // #end
        // NEWS_EDIT
        case NEWS_EDIT: {
            let items = action.data;
            if (items) {
                let stateChanged = false;
                let { readCount } = state;
                items = (items instanceof Array) ? items : [items];
                items.forEach(item => {
                    let foundItem = findItemById(state, (item || {}).id);
                    if (foundItem) {
                        let { read } = foundItem;
                        Object.assign(foundItem, item);
                        readCount += (!!((item || {}).read) - read);
                        stateChanged = true;
                    }
                });
                // trigger state change?
                if (stateChanged) {
                    state = Object.assign({}, state, { readCount });
                }                
            }
        } break; // #end
        // NEWS_RESET
        case NEWS_RESET: {
            state = dfData;
        } break; // #end
        default:
    }
    return state;
}
/*
{
    type: 'NEWS_ADD', 
    data: { id: 3, read: false }
}
{
    type: 'NEWS_DEL', 
    id: 2
}
{
    type: 'NEWS_EDIT', 
    data: { id: 2, read: false }
}
*/