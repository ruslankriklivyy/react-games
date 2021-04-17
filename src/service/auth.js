import firebase from '../config/firebase';

const socialMediaAuth = (provider) => {
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => {
      return res.user.providerData;
    })
    .catch((err) => {
      return err;
    });
};

export default socialMediaAuth;
