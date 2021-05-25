import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import CreatePostScreen, {
  screenOptions as CreatePostScreenOptions,
} from '../screens/CreatePostScreen';
import EditPostScreen, {
  screenOptions as EditPostScreenOptions,
} from '../screens/EditPostScreen';

const PostStack = createStackNavigator();

const PostRoutes = () => (
  <PostStack.Navigator>
    <PostStack.Screen
      name="Post"
      component={CreatePostScreen}
      options={CreatePostScreenOptions}
    />
    <PostStack.Screen
      name="Edit"
      component={EditPostScreen}
      options={EditPostScreenOptions}
    />
  </PostStack.Navigator>
);

export default PostRoutes;
