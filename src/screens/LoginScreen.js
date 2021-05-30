import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, Image, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import * as authActions from '../store/actions/auth';
import logo from '../assets/images/logo.gif';

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
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
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
          color={GoogleSigninButton.Color.Dark}
          onPress={googleLoginHandler}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  image: {
    width: '80%',
    height: 100,
    resizeMode: 'contain',
  },
  googleButton: {
    bottom: '15%',
    position: 'absolute',
    width: 250,
    height: 60,
  },
});

export default LoginScreen;
