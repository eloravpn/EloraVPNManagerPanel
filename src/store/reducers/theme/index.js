import { CHANGE_THEME } from '../../types';

const INITIAL_STATE = {
  isDarkTheme: true
};

const ThemeReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return { ...state, isDarkTheme: action.payload };
    default:
      return state;
  }
};

export default ThemeReducers;
