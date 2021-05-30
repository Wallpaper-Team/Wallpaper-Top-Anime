import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CommentScreen from '../screens/CommentScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfilePictureScreen from '../screens/ProfilePictureScreen';
import SliderScreen from '../screens/SliderScreen';
import {shareApp} from '../utils/share';
import logo from '../assets/images/logo.gif';
import ic_launcher from '../assets/images/ic_launcher.png';
import {Image} from 'react-native';

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
    <HomeStack.Screen
      name="Slider"
      component={SliderScreen}
      options={{headerShown: false}}
    />
    <HomeStack.Screen name="Comment" component={CommentScreen} />
    <HomeStack.Screen name="ProfilePicture" component={ProfilePictureScreen} />
  </HomeStack.Navigator>
);

export default HomeRoutes;
