import {AdEventType} from '@react-native-firebase/admob';
import React, {useEffect} from 'react';
import {BackHandler, ImageBackground, SafeAreaView} from 'react-native';
import {interstitial} from '../../utils/admob/Interstitial';
import OptionsFooter from './footer';
import styles from './styles';

const FullScreenPreview = ({route}) => {
  const {item} = route?.params;
  useEffect(() => {
    const eventListener = interstitial.onAdEvent((type) => {
      if (type === AdEventType.CLOSED) {
        interstitial.load();
      }
    });

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        try {
          interstitial.show();
        } catch (error) {
          console.log(error.message);
        }
      },
    );

    interstitial.load();

    return () => {
      eventListener();
      backHandler.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={{uri: item.full}} style={styles.image} />
      <OptionsFooter imageUrl={item.full} />
    </SafeAreaView>
  );
};

export default FullScreenPreview;
