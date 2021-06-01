import {AdEventType} from '@react-native-firebase/admob';
import React, {useEffect} from 'react';
import {BackHandler, SafeAreaView, StyleSheet} from 'react-native';
import Slider from '../components/UI/slider';
import {interstitial} from '../utils/admob/Interstitial';

const SliderScreen = ({route}) => {
  const {images, index, handleLongPress} = route?.params;
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
      <Slider
        images={images}
        fullScreen
        handleLongPress={handleLongPress}
        initial={index}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  content2: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: 'red',
  },
});

export default SliderScreen;
