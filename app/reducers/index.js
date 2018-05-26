/**
 * Project's reducers
 */
import { combineReducers } from 'redux';
//
import users from './users';
import auth from './auth';

// export default
const reducers = combineReducers({
    users,
    auth
});
export default reducers;
