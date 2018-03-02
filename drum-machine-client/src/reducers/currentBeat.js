const currentBeat = (state = null, action) => {
    switch (action.type) {
        case "LOAD_LATEST":
            return Object.assign({}, action.latest, {editable: false});
        case "UPDATE_BEAT":
            return Object.assign({}, state, action.newData)
        default:
            return state;
    }
}

export default currentBeat;