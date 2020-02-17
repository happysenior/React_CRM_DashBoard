/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import { LOCATION_CHANGE } from 'connected-react-router';
import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_REQUEST,
  CLEAR_ERROR,
} from './constants';

export const initialState = {
  email: '',
  password: '',
  error: '',
  isLoading: false,
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = produce((draft, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      draft.isLoading = false;
      break;
    case LOGIN_REQUEST:
      draft.isLoading = true;
      break;
    case LOGIN_ERROR:
      draft.error = action.error;
      draft.isLoading = false;
      break;
    case CLEAR_ERROR:
      draft.error = '';
      break;
    case LOCATION_CHANGE:
      draft.error = '';
      draft.isLoading = false;
      break;
  }
}, initialState);

export default loginPageReducer;
