import React from 'react';
import {Image, View} from 'react-native';
import styles from './styles';

const ProfilePicture = ({uri, size = 70}) => (
  <View style={styles.container}>
    <Image source={{uri}} style={[styles.image, {width: size, height: size}]} />
  </View>
);

export default ProfilePicture;
