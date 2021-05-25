import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from '../screens/ProfileScreen';
import {shareApp} from '../utils/share';
const ProfileStack = createStackNavigator();

const ProfileRoutes = ({navigation}) => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerLeftContainerStyle: {
          marginLeft: 15,
        },
        headerRightContainerStyle: {
          marginRight: 15,
        },
        headerLeft: () => (
          <Ionicons
            name="arrow-back"
            size={25}
            color={'#000'}
            onPress={() => {
              navigation.goBack();
            }}
          />
        ),
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
  </ProfileStack.Navigator>
);

export default ProfileRoutes;
