import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DiscoveryRoutes from './discovery.routes';
import FavoriteRoutes from './favorite.routes';
import HomeRoutes from './home.routes';
import PostRoutes from './post.routes';
import ProfileRoutes from './profile.routes';

const Tab = createBottomTabNavigator();

const BottomHomeNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        if (route.name === 'Home') {
          return <Foundation name="home" size={size} color={color} />;
        }
        if (route.name === 'Discovery') {
          return <Ionicons name="ios-grid-outline" size={size} color={color} />;
        }
        if (route.name === 'Post') {
          return <Feather name="plus-square" size={size} color={color} />;
        }
        if (route.name === 'Favorite') {
          return <AntDesign name="hearto" size={size} color={color} />;
        }
        if (route.name === 'Account') {
          return <Ionicons name="person-outline" size={size} color={color} />;
        }
      },
    })}
    tabBarOptions={{
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
      showLabel: true,
    }}>
    <Tab.Screen
      name="Home"
      component={HomeRoutes}
      options={({route}) => {
        return {
          tabBarVisible: route.state ? route.state.index === 0 : true,
        };
      }}
    />
    <Tab.Screen
      name="Discovery"
      component={DiscoveryRoutes}
      options={({route}) => {
        return {
          tabBarVisible: route.state ? route.state.index === 0 : true,
        };
      }}
    />
    <Tab.Screen
      name="Post"
      component={PostRoutes}
      options={{tabBarVisible: false}}
    />
    <Tab.Screen
      name="Favorite"
      component={FavoriteRoutes}
      options={{tabBarVisible: false}}
    />
    <Tab.Screen
      name="Account"
      component={ProfileRoutes}
      options={{tabBarVisible: false}}
    />
  </Tab.Navigator>
);

export default BottomHomeNavigator;
