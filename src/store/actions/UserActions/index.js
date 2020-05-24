import axios from '../../../axios';

import { ADD_CURRENT_USER, USER_LOGIN_ERROR, UNAUTH_USER, UPDATE_FOLLOWERS } from '../../Types';


export const addCurrentUser = userDetails => {
    return {
        type: ADD_CURRENT_USER,
        currentUser: userDetails
    };
};

export const userLoginError = error => {
    return {
        type: USER_LOGIN_ERROR,
        error
    };
};

export const userRegisterAction = ({ email, password }) => dispatch => {
    return axios.post('api/users', { email, password })
        .then(response => {
            return response
        });
};

export const userLogout = () => {
    localStorage.clear()
    return {
        type: UNAUTH_USER,
    };
};

export const fetchLocalUser = () => (dispatch) => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        const user = JSON.parse(userStr);
        dispatch(addCurrentUser(user)); // dispatching an action to save it to Redux Store
    };
};

export const userLoginAction = ({ email, password }) => (dispatch, getState) => {
    return axios.post('/api/login', { email, password })
        .then(response => {
            const currentUser = response.data;
            dispatch(addCurrentUser(currentUser));
            localStorage.setItem('user', JSON.stringify(currentUser));
            return response
        })
        .catch(error => {
            alert(error.response.data)
            dispatch(userLoginError(error))
        });
};

export const update_followers = follows => {
    return {
        type: UPDATE_FOLLOWERS,
        follows
    };
};

export const follow_user = id => (dispatch, getState) => {
    const currentUserID = getState().userReducer.currentUser._id
    const token = getState().userReducer.currentUser.token
    const headers = new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    });
    const postConfig = {
        method: "POST",
        headers: headers,
    };
    const getConfig = {
        method: "GET",
        headers: headers,
    };
    fetch(`https://motion.propulsion-home.ch/backend/api/users/${id}/follow`, postConfig)
        .then(response => console.log(response))
        .then(() => {
            fetch(`https://motion.propulsion-home.ch/backend/api/users/${currentUserID}`, getConfig)
                .then(result => result.json())
                .then(data => {
                    dispatch(update_followers(data.follows))
                })
        })
        .catch(error => {
            console.log('ERROR', error)
        })
};
