const axios = require('axios');

//user
export const userLogout = () => ({
    type: "USER_LOGOUT"
})

export const authenticateUser = user => ({
    type:"AUTHENTICATE_USER",
    user
});

const authRequest = async (idToken) => {
    try {
        const user = await axios({
            method: 'post',
            url: '/api/auth/signin/' + idToken,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        return user.data;

    } catch (e) {
        console.log(e);
    }
}

export const signIn = (idToken) => (
    (dispatch, getState) => (
        authRequest(idToken)
            .then(user => dispatch(authenticateUser(user)))
    )
);

//currentBeat

/* Homepage.js */
export const loadLatest = latest => ({
    type:"LOAD_LATEST",
    latest
});

const latestRequest = async () => {
    try{
        const latest = await axios.get('/api/latest');
        return latest.data;
    }catch (e) {
        console.log(e);
    }
}

export const getLatest = () => (
    (dispatch, getState) => (
        latestRequest()
            .then(latest => dispatch(loadLatest(latest[0])))
    )
);

/* Beat.js */
export const loadBeat = beat => ({
    type:"LOAD_BEAT",
    beat
});

const beatRequest = async (userId, beatId) => {
    try {
        const beat = await axios.get('/api/users/' + userId + '/beats/' + beatId);
        return beat.data;
    }catch (e) {
        console.log(e);
    }
}

export const getBeat = (userId, beatId) => (
    (dispatch, getState) => (
        beatRequest(userId, beatId)
            .then(beat => dispatch(loadBeat(beat)))
    )
);

export const changeStatus = status => ({
    type:"CHANGE_STATUS",
    status
})

export const displayResult = result => ({
    type:"DISPLAY_RESULT",
    result
})

const saveRequest = async (user, currentBeat) => {
    const url = '/api/users/' + user.id + '/beats/' + currentBeat._id;
    const data = {
        bpm: currentBeat.bpm,
        title: currentBeat.title,
        pattern: currentBeat.pattern
    }

    const updatedBeat = await axios({
        method: 'put',
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + user.token
        },
        data: JSON.stringify(data)
    });

    console.log(updatedBeat);

    return updatedBeat.data;
}

export const saveBeat = () => (
    async (dispatch, getState) => {
        dispatch(changeStatus("PENDING"))
        const { user, currentBeat } = getState();

        try {
            const updatedBeat = await saveRequest(user, currentBeat);
            dispatch(displayResult(true));
            dispatch(changeStatus("SUCCESS"));
            setTimeout(() => dispatch(displayResult(false)), 2000)

        } catch (e) {
            console.log(e);
            dispatch(displayResult(true));
            dispatch(changeStatus("FAILED"));
            setTimeout(() => dispatch(displayResult(false)), 2000)
        }

    }
)

//updates currentBeat but doesn't push to DB
export const updateBeat = newData => ({
    type: "UPDATE_BEAT",
    newData
})

//beats

export const loadBeats = beats => ({
    type:"LOAD_BEATS",
    beats
});

const beatsRequest = async (userID) => {
    try{
        const beats = await axios.get(`/api/users/${userID}/beats`)
        return beats.data;
    }catch (e) {
        console.log(e);
    }
}

export const getBeats = (userID) => (
    (dispatch, getState) => (
        beatsRequest(userID)
            .then(beats => dispatch(loadBeats(beats)))
    )
);