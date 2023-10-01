import { CHANGE_THEME } from '../../types';

export const themeChanged = (status) => {
  return {
    type: CHANGE_THEME,
    payload: status
  };
};
