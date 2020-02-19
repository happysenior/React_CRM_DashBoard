import { call, put, select, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { format } from 'date-fns';

// Import Utils
import request from 'utils/request';
import ApiEndpoint from 'utils/api';

// Import Services
import AuthService from 'services/auth.service';

// Import Selectors
import {
  makeNotificationCountSelector,
  makeIsNewMessagesSelector,
} from 'containers/App/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

// Import Actions
import {
  logoutErrorAction,
  logoutSuccessAction,
  isLoggedSuccessAction,
  isLoggedErroAction,
} from './actions';

// Import Constants
import { LOGOUT, IS_LOGGED } from './constants';

export function* handleLogout() {
  const auth = new AuthService();
  const api = new ApiEndpoint();
  const token = auth.getToken();
  const requestURL = api.getLogoutPath();

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const { success } = response;
    if (!success) return yield put(logoutErrorAction('error'));

    yield put(logoutSuccessAction());
    auth.unsetToken();
    yield put(push('/'));
  } catch (error) {
    yield put(logoutErrorAction(error));
    auth.unsetToken();
    yield put(push('/'));
  }
}

export function* handleLogged() {
  const auth = new AuthService();
  const isLogged = auth.loggedIn();

  if (isLogged) return yield put(isLoggedSuccessAction());

  yield put(isLoggedErroAction());
  yield put(logoutErrorAction('error'));
  auth.unsetToken();
  yield put(push('/'));
}

export default function* appPageSaga() {
  yield takeLatest(LOGOUT, handleLogout);
  yield takeLatest(IS_LOGGED, handleLogged);
}
