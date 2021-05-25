import {useNavigation} from '@react-navigation/core';
import React, {useRef} from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import OptionsFooter from '../../screens/FullScreenPreview/footer';
import * as fileActions from '../../store/actions/tempFiles';
import Body from '../Post/components/Body';

const Slider = (props) => {
  const {images, initial} = props;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const scrollViewRef = useRef();

  const onPressHandler = (index) => {
    if (props.handlePress) {
      navigation.navigate('Slider', {
        images: images,
        index: index,
        handleLongPress: true,
      });
    }
  };

  const navigateHanlder = (imageUrl) => {
    dispatch(fileActions.setFiles([imageUrl]));
    navigation.navigate('Favorite', {
      screen: 'Favor',
    });
  };

  const onLongPressHandler = (imageUrl) => {
    if (props.handleLongPress) {
      Alert.alert('BookMark', 'Add this image to favorite album?', [
        {text: 'Cancel'},
        {
          text: 'Ok',
          onPress: () => navigateHanlder(imageUrl),
        },
      ]);
    }
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView
        {...props}
        ref={scrollViewRef}
        pagingEnabled
        onContentSizeChange={() => {
          if (initial)
            scrollViewRef.current.scrollTo({
              x: Dimensions.get('window').width * initial,
              animated: false,
            });
        }}
        horizontal
        persistentScrollbar
        showsHorizontalScrollIndicator
        scrollEventThrottle={1}>
        {images.map((image, index) => {
          return (
            <TouchableOpacity
              key={`${image.full}_${index}`}
              onLongPress={() => onLongPressHandler(image)}
              onPress={() => onPressHandler(images.indexOf(image))}>
              <Body imageUri={image.full} fullScreen={props.fullScreen} />
              {!props.handlePress && <OptionsFooter imageUrl={image.full} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Slider;
