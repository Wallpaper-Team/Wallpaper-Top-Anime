import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import * as helper from '../../database/database-helper';

GoogleSignin.configure({
  webClientId:
    '780648862225-5nh6f1a55muot70qs861f7u6edk1tdjk.apps.googleusercontent.com',
});

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const UPDATE = 'UPDATE';

export const saveUserAndDispatchAuthenticate = async (dispatch, userInfo) => {
  const userKey = await helper.createUserIfNeccessary(userInfo);
  database()
    .ref(`Users/${userKey}`)
    .once('value', (snapshot) => {
      const item = snapshot.val();
      if (item) {
        dispatch({
          type: AUTHENTICATE,
          token: userInfo.token,
          userId: item.uid,
          userName: item.name,
          userEmail: item.email,
          userPhone: item.phone,
          userPhoto: item.photoUrl,
          isAnonymous: false,
        });
      }
    });
};

export const signInAnonymously = () => async (dispatch) => {
  let userInfo;
  try {
    userInfo = await auth().signInAnonymously();
    dispatch({
      type: AUTHENTICATE,
      userId: userInfo.user.uid,
      userName: userInfo.user.displayName,
      userPhoto: userInfo.user.photoURL,
      userEmail: userInfo.user.email,
      isAnonymous: true,
    });
  } catch (err) {
    throw err;
  }
};

export const googleLogin = () => async (dispatch) => {
  let userInfo;
  try {
    await GoogleSignin.hasPlayServices();
    const respone = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(
      respone.idToken,
    );
    userInfo = await auth().signInWithCredential(googleCredential);
    const user = {
      uid: userInfo.user.uid,
      name: userInfo.user.displayName,
      photoUrl: userInfo.user.photoURL,
      email: userInfo.user.email,
      token: userInfo.user.providerId,
    };
    storeData(user);
    saveUserAndDispatchAuthenticate(dispatch, user);
  } catch (err) {
    throw err;
  }
};

const googleLogOut = async () => {
  try {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (!isSignedIn) return;
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  } catch (error) {
    console.error(error);
  }
};

export const updateAvatar = (url) => {
  return async (dispatch) =>
    dispatch({
      type: UPDATE,
      userPhoto: url,
    });
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await googleLogOut();
      await auth().signOut();
      await removeValue();
    } catch (err) {
      console.log(err.message);
    }
    dispatch({type: LOGOUT});
  };
};

export const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@userData', jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@userData');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

const removeValue = async () => {
  try {
    await AsyncStorage.removeItem('@userData');
  } catch (e) {}
};
