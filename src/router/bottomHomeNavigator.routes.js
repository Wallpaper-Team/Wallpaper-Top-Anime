import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DiscoveryRoutes from './discovery.routes';
import FavoriteRoutes from './favorite.routes';
import HomeRoutes from './home.routes';
import PostRoutes from './post.routes';
import ProfileRoutes from './profile.routes';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TouchableOpacity, View} from 'react-native';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity
    style={{top: -10, justifyContent: 'center', alignItems: 'center'}}
    onPress={onPress}>
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'orange',
      }}>
      {children}
    </View>
  </TouchableOpacity>
);

const BottomHomeNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({color}) => {
        if (route.name === 'Home') {
          return <Foundation name="home" size={24} color={color} />;
        }
        if (route.name === 'Discovery') {
          return <Ionicons name="grid" size={24} color={color} />;
        }
        if (route.name === 'Post') {
          return <Ionicons name="add" size={50} color="white" />;
        }
        if (route.name === 'Favorite') {
          return <AntDesign name="heart" size={24} color={color} />;
        }
        if (route.name === 'Account') {
          return (
            <MaterialIcons name="account-circle" size={26} color={color} />
          );
        }
      },
    })}
    tabBarOptions={{
      showLabel: false,
    }}>
    <Tab.Screen name="Home" component={HomeRoutes} />
    <Tab.Screen name="Discovery" component={DiscoveryRoutes} />
    <Tab.Screen
      name="Post"
      component={PostRoutes}
      options={{
        tabBarButton: (props) => <CustomTabBarButton {...props} />,
      }}
    />
    <Tab.Screen name="Favorite" component={FavoriteRoutes} />
    <Tab.Screen name="Account" component={ProfileRoutes} />
  </Tab.Navigator>
);

export default BottomHomeNavigator;
