import React, {useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Carousel from 'react-native-anchor-carousel';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import * as characterActions from '../../store/actions/character';

const CategoryScreen = ({navigation}) => {
  const characters = useSelector((state) => state.character.characters);
  const selected = useSelector((state) => state.character.selected);
  const [background, setBackground] = useState(selected);

  const [key, setKey] = useState('');

  const dispatch = useDispatch();

  const carouselRef = useRef(null);
  const searchRef = useRef(null);

  const {width, height} = Dimensions.get('window');

  const onPressHandler = () => {
    dispatch(characterActions.selectCharacter(background));
    navigation.navigate('Home');
  };

  const renderItem = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            carouselRef.current.scrollToIndex(index);
            setBackground(item);
          }}>
          <Image source={{uri: item.imageUrl}} style={styles.carouselImage} />
          <Text style={styles.carouselText}>{item.name}</Text>
          <MaterialIcons
            name="library-add"
            size={30}
            color="white"
            style={styles.carouselIcon}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ImageBackground
      source={{uri: background.imageUrl}}
      style={styles.ImageBg}
      blurRadius={10}>
      <TouchableOpacity
        style={styles.SearchboxContainer}
        onPress={() => searchRef.current.focus()}>
        <TextInput
          placeholder="Search Animes"
          placeholderTextColor="#666"
          value={key}
          onChangeText={(text) => setKey(text)}
          ref={searchRef}
          style={styles.Searchbox}></TextInput>
        <Feather
          name="search"
          size={22}
          color="#666"
          style={styles.SearchboxIcon}
        />
      </TouchableOpacity>

      <View style={styles.carouselContainerView}>
        <Carousel
          style={styles.carousel}
          data={characters.filter((item) => {
            return item.name.indexOf(key) != -1;
          })}
          renderItem={renderItem}
          itemWidth={250}
          containerWidth={width - 20}
          separatorWidth={0}
          ref={carouselRef}
          inActiveOpacity={0.4}
        />
      </View>

      <View style={styles.movieInfoContainer}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={styles.movieName}>{background.name}</Text>
        </View>
        <TouchableOpacity
          style={styles.playIconContainer}
          onPress={onPressHandler}>
          <FontAwesome5
            name="play"
            size={22}
            color="#02ad94"
            style={{marginLeft: 4}}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  carouselImage: {
    width: 250,
    height: 400,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  carouselText: {
    paddingLeft: 14,
    color: 'white',
    position: 'absolute',
    bottom: 10,
    left: 2,
    fontWeight: 'bold',
  },
  carouselIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  carouselContentContainer: {
    flex: 1,
    backgroundColor: '#000',
    height: 200,
    paddingHorizontal: 14,
  },
  SearchboxContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 10,
    borderRadius: 4,
  },
  Searchbox: {
    padding: 12,
    paddingLeft: 20,
    fontSize: 16,
  },
  SearchboxIcon: {
    position: 'absolute',
    right: 20,
    top: 14,
  },
  ImageBg: {
    flex: 1,
    height: null,
    width: null,
    opacity: 1,
    justifyContent: 'flex-start',
  },
  carouselContainerView: {
    width: '100%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carousel: {
    flex: 1,
    overflow: 'visible',
  },
  movieInfoContainer: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between',
    width: Dimensions.get('window').width - 14,
  },
  movieName: {
    paddingLeft: 14,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 36,
    marginBottom: 6,
  },
  playIconContainer: {
    backgroundColor: '#212121',
    padding: 18,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 25,
    borderWidth: 4,
    borderColor: 'rgba(2, 173, 148, 0.2)',
    marginBottom: 14,
  },
});

export default CategoryScreen;
