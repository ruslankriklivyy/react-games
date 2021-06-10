import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAQ-IQHcIwH8lJ6dEwR3nibf41zjuoOMAs',
  authDomain: 'react-games-9df73.firebaseapp.com',
  databaseURL: 'react-games-9df73.firebaseapp.com',
  projectId: 'react-games-9df73',
  storageBucket: 'react-games-9df73.appspot.com',
  messagingSenderId: '720876942796',
  appId: '1:720876942796:web:952ee4d3a830286f201969',
  measurementId: 'G-4J45C84QMT',
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();

let aUID = '';

auth.onAuthStateChanged((user) => {
  if (user) {
    aUID = user.uid;
  }
});

export const createUser = () => {
  db.collection('users')
    .doc(aUID)
    .get()
    .then((doc) => {
      const userArr = doc.data();
      if (!userArr || !userArr.hasOwnProperty('userInfo')) {
        return db
          .collection('users')
          .doc(aUID)
          .set({
            userInfo: {
              id: `${auth.currentUser.uid}`,
              imageUrl: `${auth.currentUser.photoURL}`,
              name: `${auth.currentUser.displayName}`,
              email: `${auth.currentUser.email}`,
            },
          });
      }
      return [];
    });
};

export const addGame = (items) => {
  db.collection('users')
    .doc(aUID)
    .get()
    .then((doc) => {
      const userArr = doc.data();
      if (userArr.hasOwnProperty('games') && !userArr['games'].hasOwnProperty(items.id)) {
        const newItems = {
          ...userArr['games'],
          [items.id]: items,
        };
        userArr['games'] = newItems;
        db.collection('users').doc(aUID).set(userArr);
      } else {
        userArr['games'] = { [items.id]: items };
        db.collection('users').doc(aUID).set(userArr);
      }
    });
};

export const deleteGame = (gameId) => {
  db.collection('users')
    .doc(aUID)
    .get()
    .then((doc) => {
      const userArr = doc.data();
      delete userArr['games'][gameId];
      db.collection('users').doc(aUID).set(userArr);
    });
};

export default firebase;
