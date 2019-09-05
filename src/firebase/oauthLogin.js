import React, { Component } from 'react';
import { firebase } from './firebase';
import { connect } from 'react-redux';
import { showModal } from '../actions/modal';

const oauthLogin = async (provider) => {
    
    const getProvider = (providerId) => {
      switch (providerId) {
        case firebase.auth.GoogleAuthProvider.PROVIDER_ID:
          return new firebase.auth.GoogleAuthProvider();
        case firebase.auth.FacebookAuthProvider.PROVIDER_ID:
          return new firebase.auth.FacebookAuthProvider();
        case firebase.auth.GithubAuthProvider.PROVIDER_ID:
          return new firebase.auth.GithubAuthProvider();
        default:
          throw new Error(`No provider implemented for ${providerId}`);
      }
    };
    
    const supportedPopupSignInMethods = [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ];

 
  try {
    await firebase.auth().signInWithPopup(provider);
    return null;
    
  } catch (err) {
    if (err.email && err.credential && err.code === 'auth/account-exists-with-different-credential') {
      const providers = await firebase.auth().fetchSignInMethodsForEmail(err.email)
      const firstPopupProviderMethod = providers.find(p => supportedPopupSignInMethods.includes(p));

      // Test: Could this happen with email link then trying social provider?
      if (!firstPopupProviderMethod) {
        throw new Error(`Your account is linked to a provider that isn't supported.`);
      }

      const linkedProvider = getProvider(firstPopupProviderMethod);
      
      return {
        linkedProvider,
        err
      };
    }

    // Handle errors...
    // toast.error(err.message || err.toString());
  }
}

export default oauthLogin;