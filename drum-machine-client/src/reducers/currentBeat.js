const currentBeat = (state = null, action) => {
    switch (action.type) {
        case "LOAD_LATEST":
            return Object.assign({}, action.latest, {editable: false});
        default:
            return state;
    }
}

export default currentBeat;