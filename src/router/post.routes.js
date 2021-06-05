import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useSelector} from 'react-redux';
import AnonymousScreen from '../screens/AnonymousScreen';
import CreatePostScreen, {
  screenOptions as CreatePostScreenOptions,
} from '../screens/CreatePostScreen';
import EditPostScreen, {
  screenOptions as EditPostScreenOptions,
} from '../screens/EditPostScreen';

const PostStack = createStackNavigator();

const PostRoutes = () => {
  const isAnonymous = useSelector((state) => state.auth.isAnonymous);
  return (
    <PostStack.Navigator>
      <PostStack.Screen
        name="Post"
        component={isAnonymous ? AnonymousScreen : CreatePostScreen}
        options={CreatePostScreenOptions}
      />
      <PostStack.Screen
        name="Edit"
        component={EditPostScreen}
        options={EditPostScreenOptions}
      />
    </PostStack.Navigator>
  );
};

export default PostRoutes;
