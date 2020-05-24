import { FETCH_USER_DETAILS } from '../../Types';


const userDetailsReducer = (state = {}, action) => {
    switch(action.type) {
        case FETCH_USER_DETAILS:
            return {
                ...state,
                userDetails: action.userDetails
            };
        default: 
            return state
    };
};

export default userDetailsReducer;
