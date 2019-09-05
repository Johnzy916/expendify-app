import {
    firebase,
    googleAuthProvider,
    githubAuthProvider,
    facebookAuthProvider
} from '../firebase/firebase';
import oauthLogin from '../firebase/oauthLogin';
import { showModal } from './modal';

export const login = (uid) => ({
    type: 'LOGIN',
    uid
});

export const startLogin = (type) => {
    
    return (dispatch) => {
        
        const connectAccounts = async (linkedProvider, err) => {
            linkedProvider.setCustomParameters({ login_hint: err.email });
            const result = await firebase.auth().signInWithPopup(linkedProvider);
            result.user.linkWithCredential(err.credential);
        };
        
        const confirmConnectAccount = () => {
            return new Promise((resolve, reject) => {
                return dispatch(showModal({
                    contentLabel: 'Connect accounts',
                    header: 'You already have an account under this email!',
                    subtitle: 'Do you want to connect these accounts?',
                    cancelText: 'No, that\'s alright',
                    confirmText: 'Yes, continue',
                    confirmType: 'connect',
                    confirmAuth: () => resolve(),
                    cancelAuth: (error) => reject(error)
                }));
            });
        };
        
        const startPopupToConfirm = result => {
            if (result) {
                confirmConnectAccount()
                    .then(() => connectAccounts(result.linkedProvider, result.err))
                    .catch(error => console.log('can\'t connect accounts :', error))
            }
        };
        
        switch(type) {
            case 'google':
                return oauthLogin(googleAuthProvider)
                    .then(result => startPopupToConfirm(result))
                    .catch(error => console.log('can\'t connect accounts :', error));
            case 'github':
                return oauthLogin(githubAuthProvider)
                    .then(result => startPopupToConfirm(result))
                    .catch(error => console.log('can\'t connect accounts :', error));
            case 'facebook':
                return oauthLogin(facebookAuthProvider)
                    .then(result => startPopupToConfirm(result))
                    .catch(error => console.log('can\'t connect accounts :', error));
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