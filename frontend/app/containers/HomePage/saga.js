import { put, call, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import AuthService from 'services/auth.service';
import { IS_LOGGED } from './constants';
import { loadAppStateSuccessAction } from 'containers/App/actions';
import ApiEndpoint from 'utils/api';
import request from 'utils/request';

export function* handleLogged() {
  const auth = new AuthService();
  const isLogged = auth.loggedIn();
  const api = new ApiEndpoint();
  const requestURL = api.getAuthenticatePath();
  try {
    if (isLogged) {
      const token = auth.getToken();
      const response = yield call(request, requestURL, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.success && response.user) {
        yield put(loadAppStateSuccessAction(response));
        if (response.user.role == 'admin')
          return yield put(push('/admin/dashboard'));
        else return yield put(push('/prospects'));
      }
    } else {
      return yield put(push('/login'));
    }
  } catch (error) {
    console.log(error);
    return yield put(push('/login'));
  }
}

export default function* homePageSaga() {
  yield takeLatest(IS_LOGGED, handleLogged);
}
