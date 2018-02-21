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