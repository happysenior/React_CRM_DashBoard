/*
 *
 * App reducer
 *
 */
import produce, { setAutoFreeze } from 'immer';

import {
  LOGGED_IN,
  IS_LOGGED_SUCCESS,
  IS_LOGGED_ERROR,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
} from './constants';

export const initialState = {
  isLogged: false,
  error: '',
};

setAutoFreeze(false);
/* eslint-disable default-case, no-param-reassign */
const appPageReducer = produce((draft, action) => {
  switch (action.type) {
    case LOGGED_IN:
      draft.isLogged = true;
      break;
    case IS_LOGGED_SUCCESS:
      draft.isLogged = true;
      break;
    case IS_LOGGED_ERROR:
      draft.isLogged = false;
      break;
    case LOGOUT:
      draft.error = '';
      break;
    case LOGOUT_SUCCESS:
      draft.error = '';
      draft.isLogged = false;
      break;
    case LOGOUT_ERROR:
      draft.error = '';
      break;
  }
}, initialState);

export default appPageReducer;
