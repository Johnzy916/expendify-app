import {
    firebase,
    googleAuthProvider,
    githubAuthProvider,
    facebookAuthProvider
} from '../firebase/firebase';
import oauthLogin from '../firebase/oauthLogin';

export const login = (uid) => ({
    type: 'LOGIN',
    uid
});

export const startLogin = (type) => {
    return (dispatch) => {
        switch(type) {
            case 'google':
                return oauthLogin(googleAuthProvider)
            case 'github':
                return oauthLogin(githubAuthProvider)
            case 'facebook':
                return oauthLogin(facebookAuthProvider)
            default:
                return null;
        }
       
    };
};

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return (dispatch) => {
        return firebase.auth().signOut();
    }
}

export const setUserName = (userName) => ({
    type: 'SET_USER_NAME',
    userName
})