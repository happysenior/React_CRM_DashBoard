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

// Import Actions

// Import Constants

import { GO_SEND_BROADCAST } from './constants';

export function* goSendBroadcast() {
  const auth = new AuthService();
  const isLogged = auth.loggedIn();

  if (isLogged) return yield put(push('/forgot-password'));
}

export default function* importProspectCSVPageSaga() {
  yield takeLatest(GO_SEND_BROADCAST, goSendBroadcast);
}
