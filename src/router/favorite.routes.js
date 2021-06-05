import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import AlbumScreen, {
  screenOptions as AlbumScreenOptions,
} from '../screens/AlbumScreen';
import AnonymousScreen from '../screens/AnonymousScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
const FavoriteStack = createStackNavigator();

const FavoriteRoutes = ({navigation}) => {
  const isAnonymous = useSelector((state) => state.auth.isAnonymous);
  return (
    <FavoriteStack.Navigator>
      <FavoriteStack.Screen
        name="Favor"
        component={isAnonymous ? AnonymousScreen : FavoriteScreen}
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
};

export default FavoriteRoutes;
