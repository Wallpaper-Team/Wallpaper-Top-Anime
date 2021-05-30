import {SELECT_CHARACTER, SET_CHARACTERS} from '../actions/character';

const initialState = {
  characters: [],
  selected: null,
};

const characterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHARACTERS:
      return {
        ...state,
        characters: action.characters,
      };
    case SELECT_CHARACTER:
      return {
        ...state,
        selected: action.item,
      };
    default:
      return state;
  }
};

export default characterReducer;
