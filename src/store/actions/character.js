import database from '@react-native-firebase/database';

export const SET_CHARACTERS = 'SET_CHARACTERS';
export const SELECT_CHARACTER = 'SELECT_CHARACTER';
export const CLEAR = 'CLEAR';

export const fetchCharacters = () => async (dispatch) => {
  database()
    .ref('Characters/')
    .on('value', async (snapshot) => {
      const listCharacter = [];
      snapshot.forEach((item) => {
        listCharacter.push({
          key: item.key,
          imageUrl: item.val().imageUrl,
          name: item.val().name,
        });
      });
      dispatch({type: SET_CHARACTERS, characters: listCharacter});
    });
};

export const selectCharacter = (item) => async (dispatch) => {
  dispatch({type: SELECT_CHARACTER, item: item});
};

export const clearSelect = () => async (dispatch) => {
  dispatch({type: CLEAR});
};
