import { firebase } from './firebase';


const oauthLogin = async (provider) => {
    
    function getProvider(providerId) {
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
    }
    
    const supportedPopupSignInMethods = [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ];
    
  try {
    await firebase.auth().signInWithPopup(provider);
  } catch (err) {
    if (err.email && err.credential && err.code === 'auth/account-exists-with-different-credential') {
      const providers = await firebase.auth().fetchSignInMethodsForEmail(err.email)
      const firstPopupProviderMethod = providers.find(p => supportedPopupSignInMethods.includes(p));

      // Test: Could this happen with email link then trying social provider?
      if (!firstPopupProviderMethod) {
        throw new Error(`Your account is linked to a provider that isn't supported.`);
      }

      const linkedProvider = getProvider(firstPopupProviderMethod);
      linkedProvider.setCustomParameters({ login_hint: err.email });

      const result = await firebase.auth().signInWithPopup(linkedProvider);
      result.user.linkWithCredential(err.credential);
    }

    // Handle errors...
    // toast.error(err.message || err.toString());
  }
}

export default oauthLogin;