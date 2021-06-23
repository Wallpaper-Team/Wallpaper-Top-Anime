import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DiscoveryScreen from '../screens/DiscoveryScreen';
import {rateAppHandler} from '../screens/ProfileScreen';
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
        headerLeftContainerStyle: {
          marginLeft: 15,
        },
        headerRight: () => (
          <Ionicons
            name="star-half-outline"
            size={25}
            color={'#545454'}
            onPress={rateAppHandler}
          />
        ),
      }}
    />
  </DiscoveryStack.Navigator>
);

export default DiscoveryRoutes;
