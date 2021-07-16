import database from '@react-native-firebase/database';

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
