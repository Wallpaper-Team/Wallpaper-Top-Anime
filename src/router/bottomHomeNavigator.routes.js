import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CategoryScreen from '../screens/CategoryScreen';
import FavoriteRoutes from './favorite.routes';
import HomeRoutes from './home.routes';

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
        if (route.name === 'Category') {
          return <Ionicons name="grid-outline" size={32} color="white" />;
        }
        if (route.name === 'Favorite') {
          return <AntDesign name="heart" size={24} color={color} />;
        }
      },
    })}
    tabBarOptions={{
      showLabel: false,
      keyboardHidesTabBar: true,
    }}>
    <Tab.Screen name="Home" component={HomeRoutes} />
    <Tab.Screen
      name="Category"
      component={CategoryScreen}
      options={{
        tabBarButton: (props) => <CustomTabBarButton {...props} />,
      }}
    />
    <Tab.Screen name="Favorite" component={FavoriteRoutes} />
  </Tab.Navigator>
);

export default BottomHomeNavigator;
