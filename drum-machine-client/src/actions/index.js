import history from '../history';

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
        const user = await axios({
            method: 'post',
            url: '/api/auth/signin/' + idToken,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        return user.data;
}

export const signIn = (idToken) => (
    async (dispatch, getState) => {
        try {
            const user = await authRequest(idToken);
            dispatch(authenticateUser(user));
        } catch (e) {
            console.log(e);
        }
    }
);

//currentBeat
export const loadLatest = latest => ({
    type:"LOAD_LATEST",
    latest
});

export const resetBeat = () => ({
    type: "RESET_BEAT"
})

export const loadBeat = beat => ({
    type:"LOAD_BEAT",
    beat
});

export const changeStatus = status => ({
    type:"CHANGE_STATUS",
    status
})

export const displayResult = result => ({
    type:"DISPLAY_RESULT",
    result
})

export const emptyBeat = () => ({
    type:"EMPTY_BEAT",
    beat: {
        bpm: 120,
        title: '',
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
        userId: {
            displayName: undefined,
            _id: undefined
        }
    }
})
/* Homepage.js */
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
const beatRequest = async (userId, beatId) => {
    const beat = await axios.get('/api/users/' + userId + '/beats/' + beatId);
    return beat.data;
}

export const getBeat = (userId, beatId) => (
    async (dispatch, getState) => {
        const { user } = getState();

        try {
            const beat = await beatRequest(userId, beatId);
            dispatch(loadBeat(beat));
            if(user) {
                if(user.id === beat.userId._id) dispatch(updateBeat({editable: true}));
            }
            
        } catch (e) {
            history.push('/users/' + userId);
            dispatch(displayResult(true));
            dispatch(changeStatus("NO_BEAT"));
            setTimeout(() => dispatch(displayResult(false)), 2000)
        }
    }
);

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

    return updatedBeat.data;
}

export const saveBeat = () => (
    async (dispatch, getState) => {
        dispatch(changeStatus("PENDING"))
        const { user, currentBeat } = getState();

        try {
            //const updatedBeat = await saveRequest(user, currentBeat);
            await saveRequest(user, currentBeat);
            dispatch(displayResult(true));
            dispatch(changeStatus("SUCCESS"));
            setTimeout(() => dispatch(displayResult(false)), 2000)

        } catch (e) {
            console.log(e.response);
            dispatch(displayResult(true));
            dispatch(changeStatus("FAILED"));
            setTimeout(() => dispatch(displayResult(false)), 2000)
        }

    }
)

const deleteRequest = async (user, currentBeat) => {
    const url = '/api/users/' + user.id + '/beats/' + currentBeat._id;

    const deletedBeat = await axios({
        method: 'delete',
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + user.token
        }
    });

    return deletedBeat.data;
}

export const deleteBeat = () => (
    async (dispatch, getState) => {
        const { user, currentBeat } = getState();
        dispatch(changeStatus("DELETING"));

        try {
            //const deletedBeat = await deleteRequest(user, currentBeat);
            await deleteRequest(user, currentBeat);
            dispatch(resetBeat());
            history.push('/users/' + user.id);
            dispatch(changeStatus("DELETED"));
            dispatch(displayResult(true));
            setTimeout(() => dispatch(displayResult(false)), 2000);

        } catch (e) {
            dispatch(changeStatus("FAILED"));
            dispatch(displayResult(true));
            setTimeout(() => dispatch(displayResult(false)), 2000);
        }
    }
)

/* Create.js */
const createRequest = async (user, currentBeat) => {
    const url = '/api/users/' + user.id + '/beats/';
    const data = {
        bpm: currentBeat.bpm,
        title: currentBeat.title,
        pattern: currentBeat.pattern
    }

    const createdBeat = await axios({
        method: 'post',
        url: url,
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + user.token
        },
        data: JSON.stringify(data)
    });

    return createdBeat.data;
}

export const createBeat = () => (
    async (dispatch, getState) => {
        const { user, currentBeat } = getState();
        dispatch(changeStatus("PENDING"))

        try {
            const createdBeat = await createRequest(user, currentBeat);
            dispatch(changeStatus("SUCCESS"));
            dispatch(displayResult(true));
            setTimeout(() => dispatch(displayResult(false)), 2000);
            const beat = await beatRequest(createdBeat.userId, createdBeat._id);
            dispatch(loadBeat(beat));
            history.push('/users/' + createdBeat.userId + '/' + createdBeat._id);

        } catch(e) {
            dispatch(changeStatus(e.response && e.response.data.code === 11000 ? "DUPLICATE" : "FAILED"));
            dispatch(displayResult(true));
            setTimeout(()=> dispatch(displayResult(false)), 2000);
        }
    }
)

//updates currentBeat but doesn't push to DB
export const updateBeat = newData => ({
    type: "UPDATE_BEAT",
    newData
})

//beats
export const resetBeats = () => ({
    type:"RESET_BEATS"
})

export const loadBeats = beats => ({
    type:"LOAD_BEATS",
    beats
});

const beatsRequest = async (userID) => {
    const beats = await axios.get(`/api/users/${userID}/beats`);
    return beats.data;
}

export const getBeats = (userID) => (
    async (dispatch, getState) => {
        try {
            const beats = await beatsRequest(userID);
            dispatch(loadBeats(beats));
        } catch (e) {
            history.push('/');
            dispatch(changeStatus("NO_USER"));
            dispatch(displayResult(true));
            setTimeout(()=> dispatch(displayResult(false)), 2000);

        }
    }
);