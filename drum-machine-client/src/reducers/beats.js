const beats = (state = null, action) => {
    switch (action.type) {
        case "LOAD_BEATS":
            return action.beats;
        default:
            return state;
    }
}

export default beats;