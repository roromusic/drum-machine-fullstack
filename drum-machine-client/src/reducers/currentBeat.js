const currentBeat = (state = null, action) => {
    switch (action.type) {
        case "LOAD_LATEST":
            return Object.assign({}, action.latest, {editable: false})
        case "LOAD_BEAT":
            return Object.assign({}, state, action.beat)
        case "UPDATE_BEAT":
            return Object.assign({}, state, action.newData)
        case "CHANGE_STATUS":
            return Object.assign({}, state, {saveStatus: action.status})
        case "DISPLAY_RESULT":
            return Object.assign({}, state, {displayResult: action.result})
        default:
            return state;
    }
}

export default currentBeat;