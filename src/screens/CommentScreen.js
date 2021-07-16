import database from '@react-native-firebase/database';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

const CommentScreen = ({route}) => {
  const {item} = route?.params;
  const [comment, setComment] = useState();
  const [comments, setComments] = useState([]);

  const selected = useSelector((state) => state.character.selected);

  useEffect(() => {
    database()
      .ref('Comments')
      .orderByChild('postId')
      .equalTo(item)
      .limitToLast(20)
      .once('value', (snapshot) => {
        const listComment = [];
        snapshot.forEach((item) => {
          listComment.unshift(item.val());
        });
        setComments(listComment);
      });
  }, []);

  const onSendHandler = () => {
    if (!comment || comment.trim().length == 0) return;
    const cmt = {
      userName: 'Anonymous',
      postId: item,
      comment: comment,
      createdAt: -new Date().getTime(),
    };
    database().ref('Comments').push().set(cmt);
    setComments((comments) => [cmt, ...comments]);
    database()
      .ref(`Posts/${selected.name}/${item}/commentCount`)
      .transaction((count) => {
        if (!count) return 1;
        return count + 1;
      });
    setComment(null);
  };

  return (
    <View style={styles.root}>
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          autoCapitalize="sentences"
          autoCorrect
          placeholder="Write a comment"
          multiline
          value={comment}
          onChangeText={(text) => setComment(text)}
        />
        <View style={styles.buttonSend}>
          <Ionicons
            name="send"
            color="blue"
            size={36}
            onPress={onSendHandler}
          />
        </View>
      </View>
      <FlatList
        data={comments}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        keyExtractor={(item, index) => {
          return item.createdAt + `${index}`;
        }}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              height: 300,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>No comment, let's create the first one</Text>
            <Ionicons name="ios-create-outline" size={50} />
          </View>
        )}
        renderItem={({item}) => {
          return (
            <View style={styles.container}>
              <TouchableOpacity onPress={() => {}}>
                <Image style={styles.image} source={{uri: selected.imageUrl}} />
              </TouchableOpacity>
              <View style={styles.content}>
                <View style={styles.contentHeader}>
                  <Text style={styles.name}>{item.userName}</Text>
                  <Text style={styles.time}>
                    {moment(new Date(Math.abs(item.createdAt))).fromNow()}
                  </Text>
                </View>
                <Text multiline>{item.comment}</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: 10,
  },
  inputArea: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  input: {
    padding: 10,
    borderWidth: 1,
    width: '90%',
    borderColor: 'gray',
    borderRadius: 20,
  },
  buttonSend: {padding: 10},
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20,
  },
  time: {
    fontSize: 11,
    color: '#808080',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CommentScreen;
