import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {useSelector} from 'react-redux';
import LoginScreen from '../screens/LoginScreen';
import RootRoutes from './root.routes';

const AppNavigator = () => {
  const uid = useSelector((state) => state.auth.userId);
  return (
    <NavigationContainer>
      {uid && <RootRoutes />}
      {!uid && <LoginScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
