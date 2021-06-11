import { auth, db } from '../config/firebase';

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
    .then((doc): void | PromiseLike<void> | [] => {
      const userArr = doc.data();
      if (!userArr || !userArr.hasOwnProperty('userInfo')) {
        return db
          .collection('users')
          .doc(aUID)
          .set({
            userInfo: {
              id: `${auth.currentUser?.uid}`,
              imageUrl: `${auth.currentUser?.photoURL}`,
              name: `${auth.currentUser?.displayName}`,
              email: `${auth.currentUser?.email}`,
            },
          });
      }
      return [];
    });
};

export const addGame = (items: any) => {
  db.collection('users')
    .doc(aUID)
    .get()
    .then((doc) => {
      const userArr = doc.data();
      if (
        userArr &&
        userArr.hasOwnProperty('games') &&
        !userArr['games'].hasOwnProperty(items.id)
      ) {
        const newItems = {
          ...userArr['games'],
          [items.id]: items,
        };
        userArr['games'] = newItems;
        db.collection('users').doc(aUID).set(userArr);
      } else {
        if (userArr) {
          userArr['games'] = { [items.id]: items };
          db.collection('users').doc(aUID).set(userArr);
        }
      }
    });
};

export const deleteGame = (gameId: number) => {
  db.collection('users')
    .doc(aUID)
    .get()
    .then((doc) => {
      const userArr = doc.data();
      delete userArr!['games'][gameId];
      db.collection('users').doc(aUID).set(userArr!);
    });
};
