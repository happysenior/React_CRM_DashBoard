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
  GO_PROSPECT,
  LOAD_APP_STATE,
  RECEIVE_NEW_MESSAGE,
  READ_MESSAGE,
} from './constants';

export const initialState = {
  user: null,
  unreadMessage: 0,
  isLogged: false,
  error: '',
};

// setAutoFreeze(false);
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
    case GO_PROSPECT:
      draft.error = '';
      break;
    case RECEIVE_NEW_MESSAGE:
      draft.unreadMessage = draft.unreadMessage + 1;
      break;
    case READ_MESSAGE:
      draft.unreadMessage = draft.unreadMessage - action.payload.readMessage;
      break;
    case LOAD_APP_STATE:
      draft.unreadMessage = action.payload.unreadMessage;
      draft.user = action.payload.user;
      break;
  }
}, initialState);

export default appPageReducer;
