import { GET_FEED } from '../../types';
import { FETCH_FEED_ERROR } from '../../types';


const feedReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_FEED: {
            const newState = {
                ...state,
                feed: action.feed
            };
            return newState
        };
        case FETCH_FEED_ERROR: {
            const newState = {
                ...state,
                error: action.error
            };
            return newState
        };
        default:
            return state;
    };
};

export default feedReducer;
