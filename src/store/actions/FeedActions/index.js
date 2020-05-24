import axios from '../../../axios';

import { GET_FEED, FETCH_FEED_ERROR } from '../../Types';


export const getFeed = feed => {
    return {
        type: GET_FEED,
        feed: feed.data
    };
};

export const fetchFeedError = error => {
    return {
        type: FETCH_FEED_ERROR,
        error,
    };
};

export const fetchFeed = () => (dispatch, getState) => {
    const token = getState().userReducer.currentUser.token;
    const myConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    return axios.get('api/feed', myConfig)
        .then(response => {
            const feed = response;
            dispatch(getFeed(feed))
        })
        .catch(error => {
            alert(error);
            dispatch(fetchFeedError(error));
        });
};

export const postNewFeed = content => (dispatch, getState) => {
    const token = getState().userReducer.currentUser.token;
    const postConfig = {
        method: 'POST',
        body: JSON.stringify(content),
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": 'Application/json',
        },
    };
    return fetch('https://motion.propulsion-home.ch/backend/api/social/posts', postConfig)
        .then(dispatch(fetchFeed()))
        .catch(error => console.log('ERROR', error));
};
