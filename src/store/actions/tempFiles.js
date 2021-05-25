export const SET_FILES = 'SET_FILES';
export const RESET = 'RESET';

export const setFiles = (files) => (dispatch) => {
  dispatch({type: SET_FILES, files: files});
};

export const reset = () => (dispatch) => {
  dispatch({type: RESET});
};
