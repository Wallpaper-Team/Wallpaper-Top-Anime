import React from 'react';
import {Button, View, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import * as authActions from '../store/actions/auth';

const AnonymousScreen = () => {
  const dispatch = useDispatch();
  const loginHandler = () => {
    dispatch(authActions.googleLogin());
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{margin: 20, textAlign: 'center'}}>
        You are in anonymous mode, you need login with google to can create new
        albums, add favorite images to albums,...
      </Text>
      <Button title="Login" onPress={loginHandler}></Button>
    </View>
  );
};

export default AnonymousScreen;
