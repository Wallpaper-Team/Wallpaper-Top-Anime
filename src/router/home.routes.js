import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ic_launcher from '../assets/images/ic_launcher.png';
import logo from '../assets/images/logo.gif';
import CommentScreen from '../screens/CommentScreen';
import HomeScreen from '../screens/HomeScreen';
import {shareApp} from '../utils/share';

const HomeStack = createStackNavigator();

const HomeRoutes = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerLeftContainerStyle: {
          marginLeft: 15,
        },
        headerRightContainerStyle: {
          marginRight: 15,
        },
        headerLeft: () => (
          <Image
            source={ic_launcher}
            resizeMode="contain"
            style={{width: 50}}
          />
        ),
        headerTitle: () => (
          <Image source={logo} resizeMode="contain" style={{width: 200}} />
        ),
      }}
    />
    <HomeStack.Screen name="Comment" component={CommentScreen} />
  </HomeStack.Navigator>
);

export default HomeRoutes;
