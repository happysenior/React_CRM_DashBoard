/*
 *
 * App actions
 *
 */

import {
  IS_LOGGED,
  IS_LOGGED_SUCCESS,
  IS_LOGGED_ERROR,
  LOGGED_IN,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  GO_PROSPECT,
} from './constants';

/**
 * Check user is logged, this action starts the request saga
 *
 * @return {object} An action object with a type of IS_LOGGED
 */
export function isLoggedAction() {
  return {
    type: IS_LOGGED,
  };
}

/**
 * TODO
 * Check user is logged, this action starts the request saga
 *
 * @return {object} An action object with a type of IS_LOGGED
 */
export function isLoggedSuccessAction() {
  return {
    type: IS_LOGGED_SUCCESS,
  };
}

/**
 * TODO
 * Check user is logged, this action starts the request saga
 *
 * @return {object} An action object with a type of IS_LOGGED
 */
export function isLoggedErroAction() {
  return {
    type: IS_LOGGED_ERROR,
  };
}

/**

 * User login to the application, this is the global action
 *
 * @return {object} An action object with a type of LOGGED_IN
 */
export function loggedInAction() {
  return {
    type: LOGGED_IN,
  };
}

/**
 * Start the logout process, this action starts the request saga
 *
 * @return {object} An action object with a type of LOGOUT
 */
export function logoutAction() {
  console.log('second step');
  return {
    type: LOGOUT,
  };
}

/**
 * Dispatched when the logout process are loaded by the request saga
 *
 * @return {object} An action object with a type of LOGOUT_SUCCESS
 */
export function logoutSuccessAction() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

/**
 * Dispatched when loading the new notifications fails
 *
 * @param  {object} error The error
 *
 * @return {object}      An action object with a type of LOGOUT_ERROR passing the repos
 */
export function logoutErrorAction(error) {
  return {
    type: LOGOUT_ERROR,
    error,
  };
}

export function goProspectAction() {
  return {
    type: GO_PROSPECT,
  };
}
