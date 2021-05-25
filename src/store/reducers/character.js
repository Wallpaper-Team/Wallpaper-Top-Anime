import {CLEAR, SELECT_CHARACTER, SET_CHARACTERS} from '../actions/character';

const initialState = {
  characters: [],
  selected: [],
};

const characterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHARACTERS:
      return {
        ...state,
        characters: action.characters,
      };
    case SELECT_CHARACTER:
      const index = state.selected.indexOf(action.item);
      if (index != -1) {
        state.selected.splice(index, 1);
      } else {
        state.selected.push(action.item);
      }
      return {
        ...state,
      };
    case CLEAR:
      return {
        ...state,
        selected: [],
      };
    default:
      return state;
  }
};

export default characterReducer;
