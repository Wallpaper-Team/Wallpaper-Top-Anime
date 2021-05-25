import React from 'react';
import {View} from 'react-native';
import Body from '../components/Post/components/Body';

const ProfilePictureScreen = ({route}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Body imageUri={route?.params?.imageUri} />
    </View>
  );
};

export default ProfilePictureScreen;
