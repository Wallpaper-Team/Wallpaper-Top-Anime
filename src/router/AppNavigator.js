import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {useSelector} from 'react-redux';
import LoginScreen from '../screens/LoginScreen';
import BottomHomeNavigator from './bottomHomeNavigator.routes';

const AppNavigator = () => {
  const token = useSelector((state) => state.auth.token);
  return (
    <NavigationContainer>
      {token && <BottomHomeNavigator />}
      {!token && <LoginScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
