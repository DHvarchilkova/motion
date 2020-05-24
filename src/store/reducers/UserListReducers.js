import { STORE_USERS_LIST } from '../../Types';


const usersListReducer = (state = {}, action) => {
    switch(action.type) {
        case STORE_USERS_LIST:
            return {
                ...state,
                usersList: action.usersList
            };
        default:
            return state
    };
};

export default usersListReducer;
