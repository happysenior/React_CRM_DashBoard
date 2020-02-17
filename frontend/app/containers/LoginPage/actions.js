/*
 *
 * LoginPage actions
 *
 */

import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_REQUEST,
  IS_LOGGED,
  CLEAR_ERROR,
} from './constants';

export function isLoggedAction() {
  return {
    type: IS_LOGGED,
  };
}

export function loginSuccessAction({ id, avatar }) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      id,
      avatar,
    },
  };
}

export function loginRequestAction({ email, password }) {
  return {
    type: LOGIN_REQUEST,
    payload: { email, password },
  };
}

export function loginErrorAction(error) {
  return {
    type: LOGIN_ERROR,
    error,
  };
}

export function clearErrorAction() {
  return {
    type: CLEAR_ERROR,
  };
}
