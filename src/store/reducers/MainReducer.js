import { combineReducers } from 'redux';
import userReducer from './userReducer';
import authUserReducer from './AuthenticationReducer';
import feedReducer from './FeedReducer';
import userDetailsReducer from './UserDetailsReducer';
import usersListReducer from './UsersListReducer';


const masterReducer = combineReducers({
    userReducer,
    authUserReducer,
    feedReducer,
    userDetailsReducer,
    usersListReducer
});

export default masterReducer;
