import React, { useReducer } from 'react';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { FormattedMessage } from 'react-intl';
import { push } from 'connected-react-router';
import messages from 'containers/LoginPage/messages';
import * as HttpStatus from 'http-status-codes';
// Import Utils
import ApiEndpoint from 'utils/api';
import request from 'utils/request';

// Import Services
import AuthService from 'services/auth.service';

// Import Selectors
import {
  makeEmailSelector,
  makePasswordSelector,
} from 'containers/LoginPage/selectors';

// Import Actions
import { loginSuccessAction, loginErrorAction } from './actions';
import { loggedInAction } from 'containers/App/actions';

// Import Constants
import { IS_LOGGED, LOGIN_REQUEST } from './constants';

export function* handleLogged() {
  const auth = new AuthService();
  const isLogged = auth.loggedIn();

  if (isLogged) return yield put(push('/prospects'));
}

export function* loginAttempt({ payload: { email, password } }) {
  const api = new ApiEndpoint();
  const auth = new AuthService();
  const requestURL = api.getLoginPath();
  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    if (!response.success)
      return yield put(
        loginErrorAction(<FormattedMessage {...messages.passwordError} />),
      );
    auth.setToken(response.token);

    yield put(loginSuccessAction());
    yield put(loggedInAction());
    yield put(push('/'));
  } catch (error) {
    if (error.response.status === HttpStatus.NOT_FOUND) {
      yield put(
        loginErrorAction(<FormattedMessage {...messages.emailNotFound} />),
      );
    } else if (error.response.status === HttpStatus.UNAUTHORIZED) {
      yield put(
        loginErrorAction(<FormattedMessage {...messages.passwordError} />),
      );
    } else {
      yield put(
        loginErrorAction(<FormattedMessage {...messages.serverError} />),
      );
    }
  }
}

export default function* loginPageSaga() {
  yield takeLatest(LOGIN_REQUEST, loginAttempt);
  yield takeLatest(IS_LOGGED, handleLogged);
}
