import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AlbumScreen, {
  screenOptions as AlbumScreenOptions,
} from '../screens/AlbumScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import SliderScreen from '../screens/SliderScreen';
const FavoriteStack = createStackNavigator();

const FavoriteRoutes = ({navigation}) => (
  <FavoriteStack.Navigator>
    <FavoriteStack.Screen
      name="Favor"
      component={FavoriteScreen}
      options={{
        title: 'Favorite Albums',
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
      }}
    />
    <FavoriteStack.Screen
      name="Album"
      component={AlbumScreen}
      options={AlbumScreenOptions}
    />
  </FavoriteStack.Navigator>
);

export default FavoriteRoutes;
