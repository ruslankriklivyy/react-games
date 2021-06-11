import firebase from '../config/firebase';

const socialLogout = () => {
  return firebase
    .auth()
    .signOut()
    .then(function () {
      // Sign-out successful.
    })
    .catch(function (error) {
      alert(error);
    });
};

export default socialLogout;
