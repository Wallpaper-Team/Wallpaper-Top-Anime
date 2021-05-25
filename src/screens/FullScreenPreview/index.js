import React from 'react';
import {ImageBackground, SafeAreaView} from 'react-native';
import OptionsFooter from './footer';
import styles from './styles';

const FullScreenPreview = ({route}) => {
  const {item} = route?.params;

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={{uri: item.full}} style={styles.image} />
      <OptionsFooter imageUrl={item.full} />
    </SafeAreaView>
  );
};

export default FullScreenPreview;
