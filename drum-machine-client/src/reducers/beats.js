const beats = (state = null, action) => {
    switch (action.type) {
        case "LOAD_BEATS":
            return action.beats;
        case "RESET_BEATS":
            return Object.assign({}, state, {
                beats: [],
                displayName: "",
            })
        default:
            return state;
    }
}

export default beats;