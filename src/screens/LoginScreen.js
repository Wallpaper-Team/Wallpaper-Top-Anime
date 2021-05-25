import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import start_up from '../assets/images/start_up.png';
import * as authActions from '../store/actions/auth';

const LoginScreen = (props) => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error, [{text: 'Okay'}]);
    }
  }, [error]);

  const googleLoginHandler = () => {
    setError(null);
    setLoading(true);
    try {
      dispatch(authActions.googleLogin());
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await authActions.getData();
      if (userData != null) {
        setLoading(true);
        authActions.saveUserAndDispatchAuthenticate(dispatch, userData);
      }
    };
    tryLogin();
  }, [dispatch]);

  return (
    <ImageBackground source={start_up} style={styles.container}>
      {loading ? (
        <ActivityIndicator
          style={styles.googleButton}
          size="large"
          color="blue"
        />
      ) : (
        <GoogleSigninButton
          style={styles.googleButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={googleLoginHandler}
        />
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B0E0E6',
  },
  googleButton: {
    bottom: '15%',
    position: 'absolute',
    width: 250,
    height: 60,
  },
});

export default LoginScreen;
