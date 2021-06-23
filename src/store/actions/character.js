import database from '@react-native-firebase/database';

export const SET_CHARACTERS = 'SET_CHARACTERS';
export const SELECT_CHARACTER = 'SELECT_CHARACTER';

export const fetchCharacters = () => async (dispatch) => {
  const snapshot = await database().ref('Animes/').once('value');
  const listCharacter = [];
  snapshot.forEach((item) => {
    listCharacter.push({
      key: item.key,
      imageUrl: item.val().imageUrl,
      name: item.val().name,
    });
  });
  dispatch({type: SET_CHARACTERS, characters: listCharacter});
};

export const selectCharacter = (item) => async (dispatch) => {
  dispatch({type: SELECT_CHARACTER, item: item});
};
