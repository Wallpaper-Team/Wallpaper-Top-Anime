import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import ImageCustom from '../../components/UI/image';
import * as dataActions from '../../store/actions/data';

const DiscoveryScreen = (props) => {
  const selected = useSelector((state) => state.character.selected);
  const images = useSelector((state) => state.data.images.get(selected));
  const [isFetching, setIsFetching] = useState(false);

  const dispatch = useDispatch();

  const onEndReachedHandler = () => {
    dispatch(dataActions.fetchMoreData());
  };

  const onRefreshHandler = () => {
    dispatch(dataActions.fetchData());
  };

  return (
    <FlatList
      data={images}
      refreshing={isFetching}
      onRefresh={onRefreshHandler}
      renderItem={({item}) => {
        return <ImageCustom item={item} />;
      }}
      numColumns={3}
      keyExtractor={(item, index) => item.full + index}
      onEndReached={onEndReachedHandler}
      onEndReachedThreshold={3}
      ListEmptyComponent={() => (
        <View
          style={{
            flex: 1,
            height: 300,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>No image, let's create the first one</Text>
          <MaterialIcons name="find-in-page" size={50} color="gray" />
        </View>
      )}
    />
  );
};

export default DiscoveryScreen;
