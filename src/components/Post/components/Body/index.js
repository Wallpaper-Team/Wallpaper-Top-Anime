import React from 'react';
import {Image} from 'react-native';
import styles from './styles';

const Body = ({imageUri, fullScreen}) => (
  <Image
    source={{uri: imageUri}}
    style={!fullScreen ? styles.image : styles.fullimage}
  />
);

export default Body;
