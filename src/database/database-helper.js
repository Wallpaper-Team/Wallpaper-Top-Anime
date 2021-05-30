import database from '@react-native-firebase/database';

export const USERS = 'Users';

// Return chat room with id (Search in Users table)
export const lookUpUserFromUserId = async (userId) => {
  let value = null;
  await database()
    .ref(USERS)
    .orderByChild('uid')
    .equalTo(userId)
    .once('value', (snapshot) => {
      snapshot.forEach((item) => {
        value = item.key;
      });
    });
  return value;
};

// Create and return id of new user with uid (Create instance in Users table)
export const createUserIfNeccessary = async (user) => {
  const userKey = await lookUpUserFromUserId(user.uid);
  if (!userKey) {
    const newReference = database().ref(USERS).push();
    await newReference.set({
      uid: user.uid,
      name: user.name,
      photoUrl: user.photoUrl,
      email: user.email,
    });
    return newReference.key;
  }
  return userKey;
};

// Toggle like state
export const toggleLikeState = (isLiked, item, type) => {
  if (isLiked) {
    database()
      .ref(`${type}/${item}/likeCount`)
      .transaction((likeCount) => {
        if (!likeCount) return 0;
        return likeCount - 1;
      });
  } else {
    database()
      .ref(`${type}/${item}/likeCount`)
      .transaction((likeCount) => {
        if (!likeCount) return 1;
        return likeCount + 1;
      });
  }
};
