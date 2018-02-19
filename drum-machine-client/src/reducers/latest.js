const latest = (state = null, action) => {
    switch (action.type) {
        case "LOAD_LATEST":
            return action.latest;
        default:
            return state;
    }
}

export default latest;