import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import Feed from '../../components/Feed';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({navigation}) => {
  const [feedMode, setFeedMode] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name="filter"
          size={25}
          onPress={() => setFeedMode((feedMode) => !feedMode)}
        />
      ),
    });
  }, [navigation, feedMode]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {feedMode && <Feed feedMode />}
      {!feedMode && <Feed />}
    </SafeAreaView>
  );
};

export default HomeScreen;
