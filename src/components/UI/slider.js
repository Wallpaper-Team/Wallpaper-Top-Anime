import {useNavigation} from '@react-navigation/core';
import React, {useRef} from 'react';
import {Alert, FlatList, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import OptionsFooter from '../../screens/FullScreenPreview/footer';
import * as fileActions from '../../store/actions/tempFiles';
import Body from '../Post/components/Body';

const Slider = (props) => {
  const {images, initial} = props;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const scrollViewRef = useRef();

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
    <FlatList
      {...props}
      pagingEnabled
      data={images}
      initialScrollIndex={initial}
      horizontal
      showsHorizontalScrollIndicator
      keyExtractor={(item, index) => {
        return item.full + index;
      }}
      renderItem={({item}) => {
        return (
          <TouchableOpacity onLongPress={() => onLongPressHandler(item)}>
            <Body imageUri={item.full} fullScreen={props.fullScreen} />
            {!props.handlePress && <OptionsFooter imageUrl={item.full} />}
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default Slider;
