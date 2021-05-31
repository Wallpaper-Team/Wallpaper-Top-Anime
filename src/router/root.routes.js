import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import FullScreenPreview from '../screens/FullScreenPreview';
import SliderScreen from '../screens/SliderScreen';
import BottomHomeNavigator from './bottomHomeNavigator.routes';

const RootStack = createStackNavigator();

const RootRoutes = () => (
  <RootStack.Navigator screenOptions={{headerShown: false}}>
    <RootStack.Screen name="BottomNavigation" component={BottomHomeNavigator} />
    <RootStack.Screen name="Preview" component={FullScreenPreview} />
    <RootStack.Screen name="Slider" component={SliderScreen} />
  </RootStack.Navigator>
);

export default RootRoutes;
