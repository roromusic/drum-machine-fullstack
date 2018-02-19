const user = (state = null, action) => {
    switch (action.type) {
        case "USER_LOGOUT":
            return null;
        case "AUTHENTICATE_USER":
            return { ...action.user };
        default:
            return state;
    }
}

export default user;