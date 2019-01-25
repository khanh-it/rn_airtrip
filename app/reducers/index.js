/**
 * Project's reducers
 */
import { combineReducers } from 'redux';
//
import users from './users';
import auth from './auth';
import msgs from './msgs';

// export default
const reducers = combineReducers({
    users,
    auth,
    msgs
});
export default reducers;
