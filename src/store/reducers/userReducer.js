
const userReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_CURRENT_USER: {
            const newState = {
                ...state,
                currentUser: action.currentUser
            };
            return newState;
        };
    }
}

export default userReducer;