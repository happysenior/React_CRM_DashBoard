import React, { useReducer } from 'react';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { FormattedMessage } from 'react-intl';
import { push } from 'connected-react-router';
import * as HttpStatus from 'http-status-codes';
// Import Utils
import ApiEndpoint from 'utils/api';
import request from 'utils/request';

// Import Services
import AuthService from 'services/auth.service';

// Import Selectors

import { makeSelectedProspectIdsSelector } from 'containers/ProspectPage/selectors';

// Import Actions

import { broadcastAction } from './actions';

// Import Constants

import { GO_PROSPECT, BROADCAST } from './constants';

export function* broadcast({ payload: { message, method } }) {
  const api = new ApiEndpoint();
  const auth = new AuthService();
  const token = auth.getToken();
  const requestURL = api.getBroadcastPath();

  try {
    const selectedProspectIds = yield select(makeSelectedProspectIdsSelector());
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message,
        selectedProspectIds,
        method
      }),
    });
    yield put(push('/conversations'));
  } catch (error) {
    console.log(error);
  }
}

export function* goProspect() {
  return yield put(push('/prospects'));
}

export default function* broadcastPageSaga() {
  yield takeLatest(BROADCAST, broadcast);
  yield takeLatest(GO_PROSPECT, goProspect);
}
