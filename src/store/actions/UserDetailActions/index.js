import axios from "../../../axios";

import { FETCH_USER_DETAILS } from '../../Types';


export const storeUserDetails = userDetails => {
    return {
        type: FETCH_USER_DETAILS,
        userDetails
    };
};

export const fetchUserDetails = id => (dispatch, getState) => {
    const token = getState().userReducer.currentUser.token;
    const userID = id
    const myConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    return axios.get(`api/users/${userID}`, myConfig)
        .then(response => {
            const userDetails = response.data;
            dispatch(storeUserDetails(userDetails));
        })
        .catch(error => {
            console.log('ERROR', error);
        });
};
