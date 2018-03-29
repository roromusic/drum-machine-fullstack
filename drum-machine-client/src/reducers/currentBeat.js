const currentBeat = (state = null, action) => {
    switch (action.type) {
        case "LOAD_LATEST":
            return Object.assign({}, state, action.latest, {editable: false})
        case "LOAD_BEAT":
            return Object.assign({}, state, action.beat)
        case "UPDATE_BEAT":
            return Object.assign({}, state, action.newData)
        case "CHANGE_STATUS":
            return Object.assign({}, state, {saveStatus: action.status})
        case "DISPLAY_RESULT":
            return Object.assign({}, state, {displayResult: action.result})
        case "RESET_BEAT":
            return Object.assign({}, {
                bpm: 120,
                title: "Untitled",
                pattern: [[
                    [0, ["cowbell"]],
                    [1, []],
                    [2, []],
                    [3, []],
                    [4, ["cowbell"]],
                    [5, []],
                    [6, []],
                    [7, []],
                    [8, ["cowbell"]],
                    [9, []],
                    [10, []],
                    [11, []],
                    [12, ["cowbell"]],
                    [13, []],
                    [14, []],
                    [15, []],
                ]],
                userId: undefined,
                editable: true,
                saveStatus: state.saveStatus,
                userId: {
                    displayName: undefined,
                    _id: undefined
                }
            })
        case "EMPTY_BEAT":
            return Object.assign({}, action.beat);
        default:
            return state;
    }
}

export default currentBeat;