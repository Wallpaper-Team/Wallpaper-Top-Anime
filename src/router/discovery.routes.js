import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DiscoveryScreen from '../screens/DiscoveryScreen';
import {shareApp} from '../utils/share';
const DiscoveryStack = createStackNavigator();

const DiscoveryRoutes = () => (
  <DiscoveryStack.Navigator>
    <DiscoveryStack.Screen
      name="Discovery"
      component={DiscoveryScreen}
      options={{
        headerRightContainerStyle: {
          marginRight: 15,
        },
        headerRight: () => (
          <Ionicons
            name="paper-plane-outline"
            size={25}
            color={'#545454'}
            onPress={shareApp}
          />
        ),
      }}
    />
  </DiscoveryStack.Navigator>
);

export default DiscoveryRoutes;
