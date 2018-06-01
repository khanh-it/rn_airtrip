/**
 * Project's reducers
 */
import { combineReducers } from 'redux';
//
import users from './users';
import auth from './auth';
import news from './news';

// export default
const reducers = combineReducers({
    users,
    auth,
    news
});
export default reducers;
