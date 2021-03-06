import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DialogInput from 'react-native-dialog-input';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AlbumCustom from '../../components/UI/album';
import * as helper from '../../database/sqlite';

const FavoriteScreen = ({navigation}) => {
  const [albums, setAlbums] = useState([]);

  const [isDialogVisible, setDialogVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const albums = await helper.getAlbums();
    setAlbums(albums);
  };

  const checkTitle = (title) => {
    return albums.some((album) => {
      return album.title == title;
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons
          name="ios-create-outline"
          size={25}
          onPress={createAlbumHandler}
        />
      ),
    });
  }, [navigation, albums]);

  const createAlbumHandler = () => {
    setDialogVisible(true);
  };

  const onSubmitInputHandler = (text) => {
    if (!text) {
      return;
    }
    if (checkTitle(text)) {
      alert('This album does exist');
      return;
    }
    helper.addNewAlbum(text);
    fetchData();
    setDialogVisible(false);
    showModal();
  };

  const showModal = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
    }, 2000);
  };

  const onDeleteHandler = (item) => {
    setAlbums((albums) => albums.filter((album) => album.id !== item.id));
  };

  return (
    <View style={{flex: 1}}>
      {modalVisible && (
        <Modal
          animationType="fade"
          transparent
          visible={modalVisible}
          backdropOpacity={0.3}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>Created album</Text>
              <MaterialIcons name="done" size={64} color="green" />
            </View>
          </View>
        </Modal>
      )}
      {isDialogVisible && (
        <DialogInput
          isDialogVisible={isDialogVisible}
          title={'Create album'}
          message={'Please enter the title of album'}
          hintInput={'album'}
          submitInput={(inputText) => {
            onSubmitInputHandler(inputText);
          }}
          closeDialog={() => setDialogVisible(false)}
        />
      )}
      <FlatList
        style={{width: '100%'}}
        data={albums}
        renderItem={({item}) => {
          return <AlbumCustom item={item} onDeleteHandler={onDeleteHandler} />;
        }}
        numColumns={2}
        keyExtractor={(item) => item.key}
        ListEmptyComponent={() => (
          <View style={styles.emptyComponent}>
            <Text>No album, let's create the first one</Text>
            <TouchableOpacity onPress={createAlbumHandler}>
              <Ionicons name="ios-create-outline" size={50} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  emptyComponent: {
    flex: 1,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FavoriteScreen;
