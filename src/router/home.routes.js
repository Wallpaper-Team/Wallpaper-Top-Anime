import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Image} from 'react-native';
import ic_launcher from '../assets/images/ic_launcher.png';
import logo from '../assets/images/logo.gif';
import CommentScreen from '../screens/CommentScreen';
import EditPostScreen from '../screens/EditPostScreen';
import HomeScreen from '../screens/HomeScreen';

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
    <HomeStack.Screen name="Edit" component={EditPostScreen} />
  </HomeStack.Navigator>
);

export default HomeRoutes;
