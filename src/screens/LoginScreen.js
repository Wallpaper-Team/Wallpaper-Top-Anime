import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, Image, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import logo from '../assets/images/logo.gif';
import * as authActions from '../store/actions/auth';

const LoginScreen = (props) => {
  const [error, setError] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error, [{text: 'Okay'}]);
    }
  }, [error]);

  useEffect(() => {
    const tryLogin = async () => {
      try {
        const userData = await authActions.getData();
        if (userData != null) {
          authActions.saveUserAndDispatchAuthenticate(dispatch, userData);
        } else {
          dispatch(authActions.signInAnonymously());
        }
      } catch (error) {
        setError(error.message);
      }
    };
    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
      <ActivityIndicator
        style={styles.googleButton}
        size="large"
        color="blue"
      />
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
});

export default LoginScreen;
