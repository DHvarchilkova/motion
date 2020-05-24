import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from '../../types';

const authUserReducer = (state = {}, action) => {
    switch (action.type) {
        case AUTH_USER: {
            const newState = { ...state, error: '', authenticated: true }
            return newState
        }
        case UNAUTH_USER: {
            const newState = { ...state, authenticated: false }
            return newState
        }
        case AUTH_ERROR: {
            const newState = { ...state, authenticated: false, error: action.payload }
            return newState
        }
        default:
            return state
    };
};

export default authUserReducer;
