import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {useSelector} from 'react-redux';
import LoginScreen from '../screens/LoginScreen';
import RootRoutes from './root.routes';

const AppNavigator = () => {
  const selected = useSelector((state) => state.character.selected);
  return (
    <NavigationContainer>
      {selected && <RootRoutes />}
      {!selected && <LoginScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
