import axios from '../../../axios';

import { STORE_USERS_LIST } from '../../Types';


export const storeUsers = usersList => {
    return {
        type: STORE_USERS_LIST,
        usersList: usersList
    }
}

export const fetchUserList = () => (dispatch, getState) => {
    const token = getState().userReducer.currentUser.token;
    const myConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    return axios.get(`api/users/`, myConfig)
        .then(response => {
            const userDetails = response.data;
            dispatch(storeUsers(userDetails));
        })
        .catch(error => {
            console.log('ERROR', error)
        });
};
