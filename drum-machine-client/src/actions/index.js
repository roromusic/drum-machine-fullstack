const axios = require('axios');

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